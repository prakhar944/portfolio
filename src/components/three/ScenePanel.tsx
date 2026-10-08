import {
  Component,
  lazy,
  Suspense,
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import type { KeyboardEvent, PointerEvent, ReactNode } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import { Pause, Play } from "lucide-react";
import type { CrystalInput } from "./TechnicalScene";

const TechnicalScene = lazy(() => import("./TechnicalScene"));

function StaticCrystal() {
  const gradient = useId();
  return (
    <svg viewBox="0 0 400 380" className="static-structure" aria-hidden="true">
      <defs>
        <linearGradient id={gradient} x1="0" x2="1" y1="0" y2="1">
          <stop stopColor="#e3e0d9" />
          <stop offset="0.45" stopColor="#3e424a" />
          <stop offset="1" stopColor="#101114" />
        </linearGradient>
      </defs>
      <path
        d="M200 34 264 136 293 221 277 284 239 321 190 333 137 311 105 269 104 219 126 146Z"
        fill="#111316"
      />
      <path d="m200 34-15 123-59-11Z" fill="#22262c" />
      <path d="m200 34 64 102-34 35Z" fill={`url(#${gradient})`} />
      <path d="m200 34 30 137-45-14Z" fill="#060709" />
      <path d="m126 146 59 11-81 62Z" fill="#383d46" />
      <path d="m185 157 45 14-21 68Z" fill="#171b20" />
      <path d="m230 171 34-35 29 85Z" fill="#0b0d10" />
      <path d="m230 171 63 50-36 37Z" fill={`url(#${gradient})`} />
      <path d="m185 157 24 82-65-28Z" fill="#070809" />
      <path d="m104 219 40-8-39 58Z" fill={`url(#${gradient})`} />
      <path d="m144 211 65 28-44 60Z" fill="#24272b" />
      <path d="m209 239 48 19-29 37Z" fill="#08090c" />
      <path d="m293 221-16 63-20-26Z" fill="#31353e" />
      <path d="m105 269 60 30-28 12Z" fill="#44464b" />
      <path d="m165 299 44-60 19 56Z" fill="#111318" />
      <path d="m257 258 20 26-38 37Z" fill="#5f5251" />
      <path d="m165 299 63-4-38 38Z" fill="#08090c" />
      <path d="m228 295 11 26-49 12Z" fill={`url(#${gradient})`} />
    </svg>
  );
}

class SceneBoundary extends Component<
  { children: ReactNode; onUnavailable: () => void },
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch() {
    this.props.onUnavailable();
  }
  render() {
    return this.state.failed ? <StaticCrystal /> : this.props.children;
  }
}

export function ScenePanel() {
  const ref = useRef<HTMLDivElement>(null);
  const interaction = useRef<CrystalInput>({ x: 0, y: 0 });
  const activePointer = useRef<number | null>(null);
  const visible = useInView(ref);
  const reduced = !!useReducedMotion();
  const [capable, setCapable] = useState(false);
  const [lowPower, setLowPower] = useState(true);
  const [paused, setPaused] = useState(false);
  const [held, setHeld] = useState(false);
  const [tabActive, setTabActive] = useState(true);
  const instructions = useId();
  const unavailable = useCallback(() => {
    setCapable(false);
    setHeld(false);
  }, []);

  useEffect(() => {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("webgl2");
    // Touch devices get the same interaction, with cheaper reflection rendering.
    setLowPower(
      window.matchMedia("(max-width: 767px), (pointer: coarse)").matches ||
        (navigator.hardwareConcurrency ?? 4) < 4,
    );
    setCapable(!!context);
    context?.getExtension("WEBGL_lose_context")?.loseContext();
    const release = () => {
      activePointer.current = null;
      setHeld(false);
    };
    const visibility = () => {
      setTabActive(!document.hidden);
      if (document.hidden) release();
    };
    visibility();
    document.addEventListener("visibilitychange", visibility);
    window.addEventListener("blur", release);
    return () => {
      document.removeEventListener("visibilitychange", visibility);
      window.removeEventListener("blur", release);
    };
  }, []);

  useEffect(() => {
    if (!visible || paused) {
      setHeld(false);
      activePointer.current = null;
    }
  }, [visible, paused]);

  function move(event: PointerEvent<HTMLButtonElement>) {
    const bounds = event.currentTarget.getBoundingClientRect();
    if (!bounds.width || !bounds.height) return;
    interaction.current.x = Math.max(
      -1,
      Math.min(1, ((event.clientX - bounds.left) / bounds.width) * 2 - 1),
    );
    interaction.current.y = Math.max(
      -1,
      Math.min(1, 1 - ((event.clientY - bounds.top) / bounds.height) * 2),
    );
  }
  function press(event: PointerEvent<HTMLButtonElement>) {
    if (paused || !capable) return;
    if (
      !event.isPrimary ||
      event.button !== 0 ||
      activePointer.current !== null
    )
      return;
    activePointer.current = event.pointerId;
    event.currentTarget.setPointerCapture(event.pointerId);
    move(event);
    setHeld(true);
  }
  function release(event: PointerEvent<HTMLButtonElement>) {
    if (activePointer.current !== event.pointerId) return;
    activePointer.current = null;
    setHeld(false);
    if (event.currentTarget.hasPointerCapture(event.pointerId))
      event.currentTarget.releasePointerCapture(event.pointerId);
  }
  function keyDown(event: KeyboardEvent<HTMLButtonElement>) {
    if (paused || !capable) return;
    if (event.key === " " || event.key === "Enter") {
      event.preventDefault();
      if (!event.repeat) setHeld(true);
    }
    if (event.key === "Escape") {
      activePointer.current = null;
      setHeld(false);
    }
  }
  function keyUp(event: KeyboardEvent<HTMLButtonElement>) {
    if (event.key === " " || event.key === "Enter") {
      event.preventDefault();
      setHeld(false);
    }
  }

  return (
    <div
      className={`scene-panel crystal-panel${held ? " is-held" : ""}`}
      ref={ref}
      role="group"
      aria-label="Interactive faceted glass crystal"
    >
      <div className="scene-caption">
        <span>FORM / 001</span>
        <span>AN INTERACTIVE STUDY</span>
      </div>
      <div className="scene-render">
        <SceneBoundary onUnavailable={unavailable}>
          {capable ? (
            <Suspense fallback={<StaticCrystal />}>
              <TechnicalScene
                animated={visible && tabActive && !paused && !reduced}
                held={held}
                reducedMotion={reduced}
                lowPower={lowPower}
                interaction={interaction}
                onUnavailable={unavailable}
              />
            </Suspense>
          ) : (
            <StaticCrystal />
          )}
        </SceneBoundary>
      </div>
      {capable && (
        <button
          type="button"
          className="crystal-control"
          aria-label="Hold to open the crystal"
          aria-describedby={instructions}
          aria-pressed={held}
          disabled={paused}
          onPointerDown={press}
          onPointerMove={move}
          onPointerUp={release}
          onPointerCancel={release}
          onLostPointerCapture={() => {
            activePointer.current = null;
            setHeld(false);
          }}
          onPointerLeave={() => {
            if (activePointer.current === null)
              interaction.current = { x: 0, y: 0 };
          }}
          onKeyDown={keyDown}
          onKeyUp={keyUp}
          onBlur={() => {
            activePointer.current = null;
            setHeld(false);
          }}
          onClick={(event) => {
            if (event.detail === 0 && !paused) setHeld((current) => !current);
          }}
        >
          <span className="sr-only">
            Press and hold, or hold Space or Enter, to separate the facets.
            Release to reform.
          </span>
        </button>
      )}
      <div className="scene-bottom">
        <span className="crystal-instruction" id={instructions}>
          {!capable
            ? "FACETED GLASS STUDY"
            : paused
              ? "MOTION PAUSED"
              : held
                ? "RELEASE TO REFORM"
                : "CLICK & HOLD"}
        </span>
        {capable && !reduced && (
          <button
            type="button"
            className="crystal-pause"
            onClick={() => {
              setHeld(false);
              setPaused(!paused);
            }}
            aria-label={paused ? "Play 3D animation" : "Pause 3D animation"}
          >
            {paused ? <Play size={14} /> : <Pause size={14} />}
          </button>
        )}
      </div>
    </div>
  );
}
