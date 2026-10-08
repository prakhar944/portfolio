import { BufferGeometry, Float32BufferAttribute, Vector3 } from "three";

const SECTORS = 12;
const TAU = Math.PI * 2;

/**
 * A closed, faceted droplet. Each triangle owns its vertices so the material can
 * rotate and separate individual facets without tearing adjacent triangles.
 * The caller owns this geometry and must dispose it when the scene unmounts.
 */
export function createCrystalGeometry(): BufferGeometry {
  const profile = [
    { y: 1.12, radius: 0.19 },
    { y: 0.67, radius: 0.4 },
    { y: 0.14, radius: 0.65 },
    { y: -0.36, radius: 0.85 },
    { y: -0.79, radius: 0.73 },
    { y: -1.05, radius: 0.43 },
  ];
  const rings = profile.map(({ y, radius }, ringIndex) =>
    Array.from({ length: SECTORS }, (_, sector) => {
      const angle = (sector / SECTORS) * TAU + (ringIndex % 2) * 0.115;
      const irregularity =
        1 + 0.026 * Math.sin(sector * 2.13 + ringIndex * 1.71);
      const lean = Math.max(0, y) * 0.045;

      return new Vector3(
        Math.cos(angle) * radius * irregularity + lean,
        y + Math.sin(sector * 1.83 + ringIndex * 2.17) * 0.018,
        Math.sin(angle) * radius * irregularity,
      );
    }),
  );
  const tip = new Vector3(0.085, 1.55, 0.018);
  const base = new Vector3(-0.025, -1.2, 0);
  const interior = new Vector3(0, -0.2, 0);
  const positions: number[] = [];
  const normals: number[] = [];
  const colors: number[] = [];
  const centroids: number[] = [];
  const axes: number[] = [];
  const phases: number[] = [];
  let faceIndex = 0;

  const addFace = (first: Vector3, second: Vector3, third: Vector3) => {
    const a = first;
    let b = second;
    let c = third;
    const centroid = a
      .clone()
      .add(b)
      .add(c)
      .multiplyScalar(1 / 3);
    const normal = b.clone().sub(a).cross(c.clone().sub(a)).normalize();

    // Keep front faces outward, including both poles of the drop.
    if (normal.dot(centroid.clone().sub(interior)) < 0) {
      [b, c] = [c, b];
      normal.negate();
    }

    const axis = new Vector3(
      Math.sin(faceIndex * 1.73 + 0.2),
      Math.cos(faceIndex * 2.31 + 0.7),
      Math.sin(faceIndex * 0.91 + 1.7),
    ).normalize();
    const variation = (Math.sin(faceIndex * 2.39996 + 0.6) + 1) * 0.5;
    const silver = 0.84 + variation * 0.13;
    const phase = (faceIndex * 0.61803398875) % 1;

    for (const vertex of [a, b, c]) {
      positions.push(vertex.x, vertex.y, vertex.z);
      normals.push(normal.x, normal.y, normal.z);
      colors.push(silver * 0.98, silver * 0.965, silver);
      centroids.push(centroid.x, centroid.y, centroid.z);
      axes.push(axis.x, axis.y, axis.z);
      phases.push(phase);
    }

    faceIndex += 1;
  };

  for (let sector = 0; sector < SECTORS; sector += 1) {
    const next = (sector + 1) % SECTORS;
    addFace(tip, rings[0][sector], rings[0][next]);

    for (let ringIndex = 0; ringIndex < rings.length - 1; ringIndex += 1) {
      const upper = rings[ringIndex];
      const lower = rings[ringIndex + 1];

      // Alternate diagonals to avoid a conspicuous repeated spiral seam.
      if ((sector + ringIndex) % 2 === 0) {
        addFace(upper[sector], lower[sector], upper[next]);
        addFace(upper[next], lower[sector], lower[next]);
      } else {
        addFace(upper[sector], lower[sector], lower[next]);
        addFace(upper[sector], lower[next], upper[next]);
      }
    }

    const bottomRing = rings[rings.length - 1];
    addFace(bottomRing[sector], base, bottomRing[next]);
  }

  const geometry = new BufferGeometry();
  geometry.setAttribute("position", new Float32BufferAttribute(positions, 3));
  geometry.setAttribute("normal", new Float32BufferAttribute(normals, 3));
  geometry.setAttribute("color", new Float32BufferAttribute(colors, 3));
  geometry.setAttribute("aCentroid", new Float32BufferAttribute(centroids, 3));
  geometry.setAttribute("aAxis", new Float32BufferAttribute(axes, 3));
  geometry.setAttribute("aPhase", new Float32BufferAttribute(phases, 1));
  geometry.computeBoundingBox();
  geometry.computeBoundingSphere();

  return geometry;
}
