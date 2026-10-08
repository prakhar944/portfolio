import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Edges } from "@react-three/drei";
import {
  DynamicDrawUsage,
  Group,
  InstancedMesh,
  MathUtils,
  Mesh,
  MeshStandardMaterial,
  Object3D,
} from "three";

const corners = [
  [-1.07, -1.07],
  [1.07, -1.07],
  [1.07, 1.07],
  [-1.07, 1.07],
] as const;
const levels = [-1, 0, 1] as const;
const packetCount = 16;

// Static circuit geometry is created once. Frame updates reuse a single matrix.
const circuitPositions = new Float32Array(
  corners.flatMap(([x, z], index) => {
    const [nextX, nextZ] = corners[(index + 1) % corners.length];
    return [
      x,
      0.09,
      z,
      nextX,
      0.09,
      nextZ,
      x,
      0.09,
      z,
      x * 0.52,
      0.09,
      z,
      x * 0.52,
      0.09,
      z,
      x * 0.52,
      0.09,
      z * 0.52,
      x * 0.52,
      0.09,
      z * 0.52,
      0,
      0.09,
      z * 0.52,
    ];
  }),
);
const framePositions = new Float32Array(
  corners.flatMap(([x, z]) => [x, -1.12, z, x, 1.28, z]),
);

function CircuitLayer({ level }: { level: number }) {
  const accent = level === 0;
  return (
    <group position={[0, level * 0.92, 0]}>
      <mesh>
        <boxGeometry args={[2.5, 0.1, 2.5]} />
        <meshStandardMaterial
          color={accent ? "#791422" : "#37332e"}
          metalness={0.65}
          roughness={0.35}
          transparent
          opacity={0.72}
          depthWrite={false}
        />
        <Edges color={accent ? "#d94352" : "#c8b99d"} />
      </mesh>
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[circuitPositions, 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial
          color={accent ? "#de6070" : "#b5a589"}
          transparent
          opacity={0.65}
        />
      </lineSegments>
      <mesh position={[0, 0.11, 0]}>
        <boxGeometry args={[0.66, 0.11, 0.66]} />
        <meshStandardMaterial
          color={accent ? "#b11226" : "#897a63"}
          metalness={0.7}
          roughness={0.3}
        />
        <Edges color={accent ? "#ee6975" : "#dac9a8"} />
      </mesh>
      {corners.map(([x, z], index) => (
        <mesh key={index} position={[x, 0.1, z]}>
          <boxGeometry args={[0.1, 0.08, 0.1]} />
          <meshBasicMaterial color={accent ? "#d94352" : "#d5c5a8"} />
        </mesh>
      ))}
    </group>
  );
}

function Structure({ animated }: { animated: boolean }) {
  const structure = useRef<Group>(null);
  const layers = useRef<Group>(null);
  const core = useRef<Group>(null);
  const coreMaterial = useRef<MeshStandardMaterial>(null);
  const scanner = useRef<Mesh>(null);
  const packets = useRef<InstancedMesh>(null);
  const time = useRef(0);
  const initialized = useRef(false);
  const transform = useMemo(() => new Object3D(), []);

  useFrame(({ pointer }, delta) => {
    // Pausing freezes every moving part; resuming never jumps ahead in time.
    if (!animated && initialized.current) return;
    const step = Math.min(delta, 0.05);
    if (animated) time.current += step;
    const t = time.current;

    if (structure.current) {
      structure.current.rotation.y = MathUtils.damp(
        structure.current.rotation.y,
        0.65 + t * 0.07 + Math.sin(t * 0.25) * 0.13 + pointer.x * 0.22,
        3,
        step,
      );
      structure.current.rotation.x = MathUtils.damp(
        structure.current.rotation.x,
        0.24 + Math.sin(t * 0.3) * 0.035 - pointer.y * 0.13,
        3,
        step,
      );
      structure.current.position.y = Math.sin(t * 0.65) * 0.055;
    }

    if (layers.current) {
      layers.current.children.forEach((layer, index) => {
        layer.position.y = levels[index] * (0.92 + Math.sin(t * 0.6) * 0.075);
      });
    }
    if (core.current) {
      core.current.rotation.y = -t * 0.45;
      core.current.rotation.z = Math.PI / 4 + Math.sin(t * 0.75) * 0.1;
    }
    if (coreMaterial.current) {
      coreMaterial.current.emissiveIntensity =
        0.22 + (Math.sin(t * 1.6) + 1) * 0.12;
    }
    if (scanner.current) {
      scanner.current.position.y = Math.sin(t * 0.55) * 1.18;
    }

    if (packets.current) {
      for (let index = 0; index < packetCount; index++) {
        const progress = (t * 0.13 + index / packetCount) % 1;
        if (index < 8) {
          // Ascending / descending data along the four corner connections.
          const [x, z] = corners[index % corners.length];
          const direction = index % 2 === 0 ? progress : 1 - progress;
          transform.position.set(x, -1.08 + direction * 2.36, z);
          transform.scale.set(0.05, 0.15, 0.05);
        } else {
          // Packets trace the square perimeter of each circuit layer.
          const path = progress * 4;
          const edge = Math.floor(path);
          const [startX, startZ] = corners[edge];
          const [endX, endZ] = corners[(edge + 1) % corners.length];
          const level = levels[index % levels.length];
          transform.position.set(
            MathUtils.lerp(startX, endX, path - edge),
            level * (0.92 + Math.sin(t * 0.6) * 0.075) + 0.11,
            MathUtils.lerp(startZ, endZ, path - edge),
          );
          transform.scale.set(0.075, 0.035, 0.075);
        }
        transform.updateMatrix();
        packets.current.setMatrixAt(index, transform.matrix);
      }
      packets.current.instanceMatrix.needsUpdate = true;
    }
    initialized.current = true;
  });

  return (
    <group ref={structure} rotation={[0.24, 0.65, -0.08]}>
      <group ref={layers}>
        {levels.map((level) => (
          <CircuitLayer key={level} level={level} />
        ))}
      </group>
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[framePositions, 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial color="#a6977e" transparent opacity={0.5} />
      </lineSegments>
      <group ref={core} position={[0, 1.5, 0]} rotation={[0, 0, Math.PI / 4]}>
        <mesh>
          <boxGeometry args={[0.38, 0.38, 0.38]} />
          <meshStandardMaterial
            ref={coreMaterial}
            color="#b11226"
            emissive="#b11226"
            emissiveIntensity={0.34}
            metalness={0.5}
            roughness={0.25}
          />
          <Edges color="#ef8a8e" />
        </mesh>
        <mesh rotation={[Math.PI / 4, Math.PI / 4, 0]}>
          <boxGeometry args={[0.67, 0.67, 0.67]} />
          <meshBasicMaterial visible={false} />
          <Edges color="#b9a98d" transparent opacity={0.7} />
        </mesh>
      </group>
      <mesh ref={scanner} position={[0, 0, 0]}>
        <boxGeometry args={[2.74, 0.008, 2.74]} />
        <meshBasicMaterial visible={false} />
        <Edges color="#b11226" transparent opacity={0.45} />
      </mesh>
      <instancedMesh
        ref={packets}
        args={[undefined, undefined, packetCount]}
        frustumCulled={false}
        onUpdate={(mesh) => mesh.instanceMatrix.setUsage(DynamicDrawUsage)}
      >
        <boxGeometry args={[1, 1, 1]} />
        <meshBasicMaterial color="#efb1a1" toneMapped={false} />
      </instancedMesh>
    </group>
  );
}

export default function TechnicalScene({ animated }: { animated: boolean }) {
  return (
    <Canvas
      camera={{ position: [4.2, 3.1, 7.1], fov: 37 }}
      dpr={[1, 1.4]}
      frameloop={animated ? "always" : "demand"}
      gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
      aria-hidden="true"
    >
      <ambientLight intensity={1.1} />
      <directionalLight position={[4, 7, 4]} intensity={3} />
      <directionalLight position={[-4, 0, 1]} color="#b11226" intensity={2} />
      <directionalLight position={[0, 2, -5]} color="#e8ddc7" intensity={1.5} />
      <Structure animated={animated} />
    </Canvas>
  );
}
