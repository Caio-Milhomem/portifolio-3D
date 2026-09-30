import { memo, useMemo } from "react";

import { useLoader } from "@react-three/fiber";

import { SVGLoader } from "three/examples/jsm/loaders/SVGLoader.js";

import * as THREE from "three";

type TechnologyIcon3DProps = {
  src: string;
  scale?: number;
  color?: string;
};

const EXTRUDE_SETTINGS: THREE.ExtrudeGeometryOptions = {
  depth: 8,

  bevelEnabled: true,

  bevelThickness: 1,
  bevelSize: 1,
  bevelSegments: 2,
};

export const TechnologyIcon3D = memo(function TechnologyIcon3D({
  src,
  scale = 0.01,
  color = "#ffffff",
}: TechnologyIcon3DProps) {
  /*
   * useLoader já possui cache do arquivo SVG.
   */
  const svg = useLoader(SVGLoader, src);

  /*
   * IMPORTANTE:
   *
   * As shapes só são calculadas novamente
   * se o SVG realmente mudar.
   */
  const shapes = useMemo(() => {
    return svg.paths.flatMap((path) => path.toShapes());
  }, [svg]);

  return (
    <group scale={[scale, -scale, scale]}>
      {shapes.map((shape, index) => (
        <mesh key={index}>
          <extrudeGeometry args={[shape, EXTRUDE_SETTINGS]} />

          <meshStandardMaterial color={color} roughness={0.5} metalness={0.1} />
        </mesh>
      ))}
    </group>
  );
});
