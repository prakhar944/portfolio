import { Component, lazy, Suspense, useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import { Pause, Play } from "lucide-react";

const TechnicalScene = lazy(() => import("./TechnicalScene"));
function StaticStructure() {
  return (
    <svg viewBox="0 0 400 380" className="static-structure" aria-hidden="true">
      {[0, 70, 140].map((offset, i) => (
        <g key={offset} transform={`translate(0 ${offset})`}>
          <path
            d="M65 105 200 45 335 105 200 165Z"
            fill={i === 1 ? "#791422" : "#322d27"}
            stroke={i === 1 ? "#d11a2a" : "#a69780"}
          />
          <path d="M65 105v65m135-5v65m135-125v65" stroke="#756655" />
        </g>
      ))}
    </svg>
  );
}
class SceneBoundary extends Component<
  { children: ReactNode },
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? <StaticStructure /> : this.props.children;
  }
}

export function ScenePanel() {
  const ref = useRef<HTMLDivElement>(null);
  const visible = useInView(ref);
  const reduced = useReducedMotion();
  const [capable, setCapable] = useState(false);
  const [paused, setPaused] = useState(false);
  const [tabActive, setTabActive] = useState(true);
  useEffect(() => {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("webgl2");
    const desktop = window.matchMedia(
      "(min-width: 768px) and (pointer: fine)",
    ).matches;
    setCapable(!!context && desktop && navigator.hardwareConcurrency >= 4);
    context?.getExtension("WEBGL_lose_context")?.loseContext();
    const visibility = () => setTabActive(!document.hidden);
    document.addEventListener("visibilitychange", visibility);
    return () => document.removeEventListener("visibilitychange", visibility);
  }, []);
  return (
    <div
      className="scene-panel"
      ref={ref}
      role="group"
      aria-label="Layered architectural structure representing frontend, API and database systems"
    >
      <div className="scene-caption">
        <span>SYSTEM / 001</span>
        <span>FULL-STACK ARCHITECTURE</span>
      </div>
      <div className="scene-cross scene-cross-one">+</div>
      <div className="scene-cross scene-cross-two">+</div>
      <div className="scene-render">
        <SceneBoundary>
          {capable ? (
            <Suspense fallback={<StaticStructure />}>
              <TechnicalScene
                animated={visible && tabActive && !paused && !reduced}
              />
            </Suspense>
          ) : (
            <StaticStructure />
          )}
        </SceneBoundary>
      </div>
      <div className="scene-bottom">
        <span>
          <i /> INTERFACE. LOGIC. DATA.
        </span>
        {capable && !reduced && (
          <button
            onClick={() => setPaused(!paused)}
            aria-label={paused ? "Play 3D animation" : "Pause 3D animation"}
          >
            {paused ? <Play size={13} /> : <Pause size={13} />}
          </button>
        )}
      </div>
    </div>
  );
}
