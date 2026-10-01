import { memo, useMemo } from "react";
import { useLoader } from "@react-three/fiber";
import { SVGLoader } from "three/examples/jsm/loaders/SVGLoader.js";
import * as THREE from "three";

type TechnologyIcon3DProps = {
  src: string;
  scale?: number;
};

const EXTRUDE_SETTINGS: THREE.ExtrudeGeometryOptions = {
  depth: 8,
  bevelEnabled: false,
};

const REFERENCE_SIZE = 128;

export const TechnologyIcon3D = memo(function TechnologyIcon3D({
  src,
  scale = 0.008,
}: TechnologyIcon3DProps) {
  const svg = useLoader(SVGLoader, src);

  const iconData = useMemo(() => {
    const parts: {
      geometry: THREE.ExtrudeGeometry;
      color: THREE.Color;
      z: number;
    }[] = [];

    const boundingBox = new THREE.Box3();

    svg.paths.forEach((path, pathIndex) => {
      const shapes = path.toShapes();

      shapes.forEach((shape) => {
        const geometry = new THREE.ExtrudeGeometry(shape, EXTRUDE_SETTINGS);

        geometry.computeBoundingBox();

        if (geometry.boundingBox) {
          boundingBox.union(geometry.boundingBox);
        }

        parts.push({
          geometry,
          color: path.color.clone(),
          z: pathIndex * 0.02,
        });
      });
    });

    const size = new THREE.Vector3();
    const center = new THREE.Vector3();

    boundingBox.getSize(size);
    boundingBox.getCenter(center);

    const maxDimension = Math.max(size.x, size.y);

    const normalizeScale = maxDimension > 0 ? REFERENCE_SIZE / maxDimension : 1;

    return {
      parts,
      center,
      normalizeScale,
    };
  }, [svg]);

  return (
    <group
      scale={[
        scale * iconData.normalizeScale,
        -scale * iconData.normalizeScale,
        scale * iconData.normalizeScale,
      ]}
      rotation={[0, 0.22, 0]}
    >
      {iconData.parts.map((part, index) => (
        <mesh
          key={index}
          geometry={part.geometry}
          position={[-iconData.center.x, -iconData.center.y, part.z]}
        >
          <meshStandardMaterial
            color={part.color}
            roughness={0.55}
            metalness={0.05}
          />
        </mesh>
      ))}
    </group>
  );
});
