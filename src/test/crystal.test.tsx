import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ScenePanel } from "../components/three/ScenePanel";

const motion = vi.hoisted(() => ({ reduced: false, visible: true }));

vi.mock("framer-motion", async (importOriginal) => ({
  ...(await importOriginal<typeof import("framer-motion")>()),
  useInView: () => motion.visible,
  useReducedMotion: () => motion.reduced,
}));

vi.mock("../components/three/TechnicalScene", () => ({
  default: (props: {
    held: boolean;
    animated: boolean;
    reducedMotion: boolean;
    lowPower: boolean;
  }) => (
    <div
      data-testid="crystal-scene"
      data-held={props.held}
      data-animated={props.animated}
      data-reduced-motion={props.reducedMotion}
      data-low-power={props.lowPower}
    />
  ),
}));

beforeEach(() => {
  motion.reduced = false;
  motion.visible = true;
  vi.spyOn(window, "matchMedia").mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }));
  vi.spyOn(HTMLCanvasElement.prototype, "getContext").mockReturnValue({
    getExtension: () => ({ loseContext: vi.fn() }),
  } as unknown as ReturnType<HTMLCanvasElement["getContext"]>);
});

afterEach(() => {
  vi.restoreAllMocks();
});

async function renderCrystal() {
  const result = render(<ScenePanel />);
  await screen.findByTestId("crystal-scene");
  const control = screen.getByRole("button", {
    name: "Hold to open the crystal",
  });
  const captured = new Set<number>();
  Object.defineProperties(control, {
    setPointerCapture: { value: (id: number) => captured.add(id) },
    hasPointerCapture: { value: (id: number) => captured.has(id) },
    releasePointerCapture: { value: (id: number) => captured.delete(id) },
  });
  return { ...result, control };
}

function expectHeld(held: boolean) {
  expect(
    screen
      .getByRole("button", { name: "Hold to open the crystal" })
      .getAttribute("aria-pressed"),
  ).toBe(String(held));
  expect(screen.getByTestId("crystal-scene").dataset.held).toBe(String(held));
}

const primaryPointer = {
  pointerId: 1,
  isPrimary: true,
  pointerType: "mouse",
  button: 0,
};

describe("Interactive home crystal", () => {
  it("opens while a primary pointer is held and reforms on release", async () => {
    const { control } = await renderCrystal();
    expectHeld(false);
    fireEvent.pointerDown(control, primaryPointer);
    expectHeld(true);
    expect(screen.getByText("RELEASE TO REFORM")).toBeTruthy();
    fireEvent.pointerUp(control, primaryPointer);
    expectHeld(false);
    expect(screen.getByText("CLICK & HOLD")).toBeTruthy();
  });

  it.each(["pointerCancel", "lostPointerCapture"] as const)(
    "reforms when an active pointer receives %s",
    async (event) => {
      const { control } = await renderCrystal();
      fireEvent.pointerDown(control, primaryPointer);
      expectHeld(true);
      fireEvent[event](control, primaryPointer);
      expectHeld(false);
    },
  );

  it("ignores additional pointers and release from a different pointer", async () => {
    const { control } = await renderCrystal();
    fireEvent.pointerDown(control, { ...primaryPointer, isPrimary: false });
    expectHeld(false);
    fireEvent.pointerDown(control, primaryPointer);
    fireEvent.pointerUp(control, { ...primaryPointer, pointerId: 2 });
    expectHeld(true);
    fireEvent.pointerUp(control, primaryPointer);
    expectHeld(false);
  });

  it.each([
    ["Space", "[Space>]", "[/Space]"],
    ["Enter", "[Enter>]", "[/Enter]"],
  ])(
    "reforms after keyboard %s release without a sticky synthetic click",
    async (_, down, up) => {
      const user = userEvent.setup();
      const { control } = await renderCrystal();
      control.focus();
      await user.keyboard(down);
      expectHeld(true);
      await user.keyboard(up);
      expectHeld(false);
    },
  );

  it("releases the crystal on window blur or Escape", async () => {
    const { control } = await renderCrystal();
    fireEvent.pointerDown(control, primaryPointer);
    fireEvent.blur(window);
    expectHeld(false);
    fireEvent.keyDown(control, { key: "Enter" });
    expectHeld(true);
    fireEvent.keyDown(control, { key: "Escape" });
    expectHeld(false);
  });

  it("pauses animation, releases the crystal, and disables further interaction", async () => {
    const user = userEvent.setup();
    const { control } = await renderCrystal();
    fireEvent.pointerDown(control, primaryPointer);
    expectHeld(true);
    await user.click(
      screen.getByRole("button", { name: "Pause 3D animation" }),
    );
    expectHeld(false);
    expect(control.hasAttribute("disabled")).toBe(true);
    expect(screen.getByTestId("crystal-scene").dataset.animated).toBe("false");
    await user.pointer({ keys: "[MouseLeft>]", target: control });
    expectHeld(false);
    await user.pointer({ keys: "[/MouseLeft]", target: control });
    await user.click(screen.getByRole("button", { name: "Play 3D animation" }));
    expect(control.hasAttribute("disabled")).toBe(false);
    expect(screen.getByTestId("crystal-scene").dataset.animated).toBe("true");
  });

  it("honors reduced motion while preserving deliberate keyboard interaction", async () => {
    motion.reduced = true;
    const user = userEvent.setup();
    const { control } = await renderCrystal();
    expect(screen.getByTestId("crystal-scene").dataset.animated).toBe("false");
    expect(screen.getByTestId("crystal-scene").dataset.reducedMotion).toBe(
      "true",
    );
    expect(
      screen.queryByRole("button", { name: "Pause 3D animation" }),
    ).toBeNull();
    control.focus();
    await user.keyboard("[Space>]");
    expectHeld(true);
    await user.keyboard("[/Space]");
    expectHeld(false);
  });

  it("supports touch hold and release with the cheaper rendering mode", async () => {
    vi.mocked(window.matchMedia).mockImplementation((query) => ({
      matches: query.includes("pointer: coarse"),
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));
    const { control } = await renderCrystal();
    expect(screen.getByTestId("crystal-scene").dataset.lowPower).toBe("true");
    fireEvent.pointerDown(control, { ...primaryPointer, pointerType: "touch" });
    expectHeld(true);
    fireEvent.pointerUp(control, { ...primaryPointer, pointerType: "touch" });
    expectHeld(false);
  });

  it("shows a faceted crystal fallback without WebGL or inactive controls", () => {
    vi.mocked(HTMLCanvasElement.prototype.getContext).mockReturnValue(null);
    const { container } = render(<ScenePanel />);
    expect(
      screen.getByRole("group", { name: "Interactive faceted glass crystal" }),
    ).toBeTruthy();
    expect(screen.getByText("FACETED GLASS STUDY")).toBeTruthy();
    expect(
      screen.queryByRole("button", { name: "Hold to open the crystal" }),
    ).toBeNull();
    expect(screen.queryByTestId("crystal-scene")).toBeNull();
    expect(
      container.querySelectorAll("svg.static-structure path").length,
    ).toBeGreaterThan(10);
    expect(container.querySelector("svg.static-structure rect")).toBeNull();
  });
});
