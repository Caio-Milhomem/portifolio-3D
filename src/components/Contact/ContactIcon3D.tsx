import { memo, useMemo } from "react";

import { useLoader } from "@react-three/fiber";

import { SVGLoader } from "three/examples/jsm/loaders/SVGLoader.js";

import * as THREE from "three";

export type ContactIconName = "whatsapp" | "email" | "linkedin";

type ContactIcon3DProps = {
  src: string;
  icon: ContactIconName;
};

/* ==============================
   CONFIGURAÇÃO DOS ÍCONES
============================== */

const ICON_CONFIG = {
  whatsapp: {
    scale: 0.0062,

    rotationY: -0.3,

    depth: 7,

    bevel: true,
    bevelSize: 0.7,
    bevelThickness: 0.8,
    bevelSegments: 3,
  },

  email: {
    scale: 0.0062,

    rotationY: 0,

    depth: 7,

    bevel: true,
    bevelSize: 0.65,
    bevelThickness: 0.75,
    bevelSegments: 3,
  },

  linkedin: {
    scale: 0.0062,

    rotationY: 0,

    depth: 7,

    bevel: true,
    bevelSize: 0.45,
    bevelThickness: 0.55,
    bevelSegments: 2,
  },
} satisfies Record<
  ContactIconName,
  {
    scale: number;

    rotationY: number;

    depth: number;

    bevel: boolean;
    bevelSize: number;
    bevelThickness: number;
    bevelSegments: number;
  }
>;

const REFERENCE_SIZE = 128;

/* ==============================
   COMPONENTE
============================== */

export const ContactIcon3D = memo(function ContactIcon3D({
  src,
  icon,
}: ContactIcon3DProps) {
  const svg = useLoader(SVGLoader, src);

  const config = ICON_CONFIG[icon];

  const iconData = useMemo(() => {
    const parts: {
      geometry: THREE.ExtrudeGeometry;
      color: THREE.Color;
      z: number;
    }[] = [];

    const boundingBox = new THREE.Box3();

    const extrudeSettings: THREE.ExtrudeGeometryOptions = {
      depth: config.depth,

      bevelEnabled: config.bevel,

      bevelSize: config.bevelSize,

      bevelThickness: config.bevelThickness,

      bevelSegments: config.bevelSegments,
    };

    svg.paths.forEach((path, pathIndex) => {
      const shapes = path.toShapes();

      /*
       * Usa a cor carregada
       * diretamente pelo SVGLoader.
       *
       * Por enquanto não vamos
       * complicar com gradientes.
       */
      const pathColor = path.color
        ? path.color.clone()
        : new THREE.Color("#ffffff");

      shapes.forEach((shape) => {
        const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);

        geometry.computeBoundingBox();

        if (geometry.boundingBox) {
          boundingBox.union(geometry.boundingBox);
        }

        parts.push({
          geometry,

          color: pathColor,

          z: pathIndex * 0.03,
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
  }, [svg, config]);

  return (
    <group
      scale={[
        config.scale * iconData.normalizeScale,

        -config.scale * iconData.normalizeScale,

        config.scale * iconData.normalizeScale,
      ]}
      rotation={[0, config.rotationY, 0]}
    >
      {iconData.parts.map((part, index) => (
        <mesh
          key={index}
          geometry={part.geometry}
          position={[-iconData.center.x, -iconData.center.y, part.z]}
        >
          <meshStandardMaterial
            color={part.color}
            roughness={0.48}
            metalness={0.05}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}
    </group>
  );
});
