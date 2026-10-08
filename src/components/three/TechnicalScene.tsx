import { useEffect, useMemo, useRef } from "react";
import type { RefObject } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Lightformer } from "@react-three/drei";
import { DoubleSide, Group, MathUtils, MeshPhysicalMaterial } from "three";
import { createCrystalGeometry } from "./crystalGeometry";

export type CrystalInput = { x: number; y: number };
type CrystalSceneProps = {
  animated: boolean;
  held: boolean;
  reducedMotion: boolean;
  lowPower: boolean;
  interaction: RefObject<CrystalInput>;
  onUnavailable: () => void;
};

const facetShader = /* glsl */ `
  uniform float uOpen;
  uniform float uTime;
  attribute vec3 aCentroid;
  attribute vec3 aAxis;
  attribute float aPhase;

  float facetOpening() {
    return smoothstep(0.0, 1.0, clamp(uOpen * 1.3 - aPhase * 0.3, 0.0, 1.0));
  }

  mat3 facetRotation(float opening) {
    float angle = opening * (0.25 + aPhase * 0.8);
    float s = sin(angle);
    float c = cos(angle);
    float v = 1.0 - c;
    vec3 a = aAxis;
    return mat3(
      a.x * a.x * v + c,       a.y * a.x * v + a.z * s, a.z * a.x * v - a.y * s,
      a.x * a.y * v - a.z * s, a.y * a.y * v + c,       a.z * a.y * v + a.x * s,
      a.x * a.z * v + a.y * s, a.y * a.z * v - a.x * s, a.z * a.z * v + c
    );
  }
`;

function Crystal({
  animated,
  held,
  reducedMotion,
  lowPower,
  interaction,
  onUnavailable,
}: CrystalSceneProps) {
  const sculpture = useRef<Group>(null);
  const time = useRef(0);
  const spin = useRef(0.35);
  const geometry = useMemo(createCrystalGeometry, []);
  const uniforms = useMemo(
    () => ({ uOpen: { value: 0 }, uTime: { value: 0 } }),
    [],
  );
  const { invalidate, gl, viewport } = useThree();
  const material = useMemo(() => {
    const glass = new MeshPhysicalMaterial({
      color: "#a3a6ae",
      metalness: lowPower ? 1 : 0.16,
      roughness: 0.065,
      transmission: lowPower ? 0 : 0.72,
      thickness: 1.25,
      ior: 1.85,
      dispersion: lowPower ? 0 : 0.06,
      clearcoat: 1,
      clearcoatRoughness: 0.04,
      envMapIntensity: 1.65,
      attenuationColor: "#777c88",
      attenuationDistance: 0.75,
      side: DoubleSide,
      flatShading: true,
      vertexColors: true,
    });
    glass.onBeforeCompile = (shader) => {
      Object.assign(shader.uniforms, uniforms);
      shader.vertexShader = facetShader + shader.vertexShader;
      shader.vertexShader = shader.vertexShader.replace(
        "#include <beginnormal_vertex>",
        "#include <beginnormal_vertex>\nobjectNormal = facetRotation(facetOpening()) * objectNormal;",
      );
      shader.vertexShader = shader.vertexShader.replace(
        "#include <begin_vertex>",
        /* glsl */ `
          #include <begin_vertex>
          float opening = facetOpening();
          vec3 radial = normalize(vec3(aCentroid.x, aCentroid.y * 0.4, aCentroid.z));
          transformed = facetRotation(opening) * (position - aCentroid)
            * (1.0 - opening * 0.04) + aCentroid;
          transformed += radial * opening * (0.2 + aPhase * 0.28);
          transformed.y += sin(aPhase * 6.2831 + uTime * 0.7) * opening * 0.045;
        `,
      );
    };
    glass.customProgramCacheKey = () => "portfolio-faceted-crystal-v1";
    return glass;
  }, [lowPower, uniforms]);

  useEffect(() => {
    invalidate();
  }, [held, reducedMotion, invalidate]);
  useEffect(() => {
    const canvas = gl.domElement;
    const handleContextLost = (event: Event) => {
      event.preventDefault();
      onUnavailable();
    };
    canvas.addEventListener("webglcontextlost", handleContextLost);
    return () =>
      canvas.removeEventListener("webglcontextlost", handleContextLost);
  }, [gl, onUnavailable]);
  useEffect(() => () => geometry.dispose(), [geometry]);
  useEffect(() => () => material.dispose(), [material]);

  useFrame((_, delta) => {
    if (!sculpture.current) return;
    if (reducedMotion) {
      uniforms.uOpen.value = held ? 1 : 0;
      return;
    }
    if (!animated) return;
    // Local time preserves the pose when paused or when the tab is hidden.
    const step = Math.min(delta, 0.05);
    time.current += step;
    const t = time.current;
    uniforms.uTime.value = t;
    uniforms.uOpen.value = MathUtils.damp(
      uniforms.uOpen.value,
      held ? 1 : 0,
      held ? 3.8 : 5.5,
      step,
    );
    spin.current += step * (0.12 + uniforms.uOpen.value * 0.24);
    sculpture.current.rotation.y = MathUtils.damp(
      sculpture.current.rotation.y,
      spin.current + interaction.current.x * 0.48,
      3.5,
      step,
    );
    sculpture.current.rotation.x = MathUtils.damp(
      sculpture.current.rotation.x,
      -0.08 - interaction.current.y * 0.23,
      3.5,
      step,
    );
    sculpture.current.rotation.z = MathUtils.damp(
      sculpture.current.rotation.z,
      Math.sin(t * 0.35) * 0.035 + interaction.current.x * 0.06,
      3.5,
      step,
    );
    sculpture.current.position.y = Math.sin(t * 0.8) * 0.055;
  });

  return (
    <group
      ref={sculpture}
      rotation={[-0.08, 0.35, 0]}
      scale={Math.min(1, viewport.width / 3.05)}
    >
      <mesh
        geometry={geometry}
        material={material}
        frustumCulled={false}
        dispose={null}
      />
    </group>
  );
}

export default function TechnicalScene(props: CrystalSceneProps) {
  return (
    <Canvas
      camera={{ position: [0, 0.13, 6.3], fov: 36 }}
      dpr={props.lowPower ? 1 : [1, 1.5]}
      frameloop={props.animated ? "always" : "demand"}
      gl={{
        antialias: !props.lowPower,
        alpha: true,
        powerPreference: "low-power",
      }}
      onCreated={({ gl }) => {
        gl.debug.onShaderError = (context, program) => {
          console.error(
            "Crystal shader could not compile:",
            context.getProgramInfoLog(program),
          );
          props.onUnavailable();
        };
      }}
      aria-hidden="true"
    >
      <ambientLight intensity={0.18} />
      <directionalLight position={[3, 5, 4]} intensity={1.5} color="#f1e8d8" />
      <directionalLight
        position={[-3, -1, 2]}
        intensity={0.65}
        color="#b11226"
      />
      <Environment resolution={props.lowPower ? 64 : 128} frames={1}>
        <color attach="background" args={["#08090c"]} />
        <Lightformer
          form="rect"
          intensity={4}
          color="#f4f1e9"
          position={[-3, 2, 3]}
          scale={[1.1, 5, 1]}
          target={[0, 0, 0]}
        />
        <Lightformer
          form="rect"
          intensity={2.5}
          color="#b6c1d7"
          position={[4, 1, 1]}
          scale={[0.55, 4, 1]}
          target={[0, 0, 0]}
        />
        <Lightformer
          form="rect"
          intensity={3}
          color="#eee9df"
          position={[0, 4, -1]}
          scale={[3, 1, 1]}
          target={[0, 0, 0]}
        />
        <Lightformer
          form="rect"
          intensity={1.8}
          color="#b11226"
          position={[-2, -2, -3]}
          scale={[1.4, 2.4, 1]}
          target={[0, 0, 0]}
        />
        <Lightformer
          form="rect"
          intensity={1.4}
          color="#c9c1b5"
          position={[1, 0, -4]}
          scale={[0.65, 4.5, 1]}
          target={[0, 0, 0]}
        />
      </Environment>
      <Crystal {...props} />
    </Canvas>
  );
}
