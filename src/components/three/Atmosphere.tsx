import { useEffect, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import {
  BufferGeometry,
  Color,
  Float32BufferAttribute,
  MathUtils,
  ShaderMaterial,
} from "three";

type AtmosphereProps = {
  animated: boolean;
  lowPower: boolean;
  held: boolean;
  reducedMotion: boolean;
};

const vertexShader = /* glsl */ `
  uniform float uTime;
  uniform float uOpen;
  uniform float uPixelRatio;
  attribute vec4 aOrbit;
  attribute float aSize;
  attribute vec3 aColor;
  varying vec3 vColor;
  varying float vAlpha;
  void main() {
    vec3 point = position;
    if (aOrbit.w < 0.5) {
      float direction = mod(aOrbit.z, 2.0) < 1.0 ? 1.0 : -1.0;
      float angle = aOrbit.x + uTime * 0.065 * direction;
      float radius = aOrbit.y * (1.0 + uOpen * 0.18);
      point.x = cos(angle) * radius + sin(angle * 2.0 + aOrbit.z) * 0.32;
      point.y = sin(angle) * radius * 0.38 + sin(angle * 2.0 + aOrbit.z) * 0.3;
      point.y += (aOrbit.z - 1.0) * 0.21;
      point.z = sin(angle) * 1.1 + cos(angle * 3.0 + aOrbit.z) * 0.18;
      point += position * 0.085;
    } else {
      point.y += sin(uTime * 0.12 + aOrbit.x) * 0.1;
      point.x += cos(uTime * 0.08 + aOrbit.x) * 0.08;
    }
    vec4 viewPosition = modelViewMatrix * vec4(point, 1.0);
    gl_Position = projectionMatrix * viewPosition;
    gl_PointSize = clamp(aSize * 11.0 * uPixelRatio / max(2.0, -viewPosition.z), 0.8, 3.4);
    vColor = aColor;
    vAlpha = (aOrbit.w < 0.5 ? 0.72 : 0.24) * (1.0 - smoothstep(7.0, 13.0, -viewPosition.z));
  }
`;
const fragmentShader = /* glsl */ `
  varying vec3 vColor;
  varying float vAlpha;
  void main() {
    float distanceFromCenter = length(gl_PointCoord - vec2(0.5));
    float alpha = (1.0 - smoothstep(0.12, 0.5, distanceFromCenter)) * vAlpha;
    if (alpha < 0.015) discard;
    gl_FragColor = vec4(vColor, alpha);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
  }
`;

export default function Atmosphere({
  animated,
  lowPower,
  held,
  reducedMotion,
}: AtmosphereProps) {
  const gl = useThree((state) => state.gl);
  const geometry = useMemo(() => {
    const count = lowPower ? 1600 : 6800;
    const positions = new Float32Array(count * 3);
    const orbits = new Float32Array(count * 4);
    const sizes = new Float32Array(count);
    const colors = new Float32Array(count * 3);
    const crimson = new Color("#b11226");
    const brightCrimson = new Color("#d11a2a");
    const parchment = new Color("#e8ddc7");
    let seed = 84273;
    const random = () => {
      seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
      return seed / 4294967296;
    };
    for (let i = 0; i < count; i++) {
      const dust = i > count * 0.9;
      const strand = i % 3;
      const angle = random() * Math.PI * 2;
      const width = (random() + random() + random() - 1.5) * 0.38;
      positions.set(
        dust
          ? [(random() - 0.5) * 12, (random() - 0.5) * 6, (random() - 0.5) * 5]
          : [random() - 0.5, random() - 0.5, random() - 0.5],
        i * 3,
      );
      orbits.set(
        [angle, 2.0 + strand * 0.5 + width, strand, dust ? 1 : 0],
        i * 4,
      );
      sizes[i] = 0.45 + random() * 0.9;
      const color =
        strand === 1 ? parchment : strand === 0 ? crimson : brightCrimson;
      colors.set([color.r, color.g, color.b], i * 3);
    }
    const result = new BufferGeometry();
    result.setAttribute("position", new Float32BufferAttribute(positions, 3));
    result.setAttribute("aOrbit", new Float32BufferAttribute(orbits, 4));
    result.setAttribute("aSize", new Float32BufferAttribute(sizes, 1));
    result.setAttribute("aColor", new Float32BufferAttribute(colors, 3));
    return result;
  }, [lowPower]);
  const material = useMemo(
    () =>
      new ShaderMaterial({
        vertexShader,
        fragmentShader,
        transparent: true,
        depthWrite: false,
        uniforms: {
          uTime: { value: 0 },
          uOpen: { value: 0 },
          uPixelRatio: { value: 1 },
        },
      }),
    [],
  );
  useEffect(() => () => geometry.dispose(), [geometry]);
  useEffect(() => () => material.dispose(), [material]);
  useFrame((_, delta) => {
    material.uniforms.uPixelRatio.value = gl.getPixelRatio();
    if (reducedMotion) {
      material.uniforms.uOpen.value = held ? 1 : 0;
      return;
    }
    if (!animated) return;
    const step = Math.min(delta, 0.05);
    material.uniforms.uTime.value += step;
    material.uniforms.uOpen.value = MathUtils.damp(
      material.uniforms.uOpen.value,
      held ? 1 : 0,
      3,
      step,
    );
  });
  return (
    <points
      geometry={geometry}
      material={material}
      frustumCulled={false}
      dispose={null}
    />
  );
}
