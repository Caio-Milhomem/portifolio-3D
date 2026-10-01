import { memo } from "react";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";

type TechnologyIconPNGProps = {
  src: string;
  size?: number;
};

export const TechnologyIconPNG = memo(function TechnologyIconPNG({
  src,
  size = 0.9,
}: TechnologyIconPNGProps) {
  const texture = useTexture(src);

  texture.colorSpace = THREE.SRGBColorSpace;

  return (
    <mesh scale={[size, size, 1]}>
      <planeGeometry args={[1, 1]} />

      <meshBasicMaterial
        map={texture}
        transparent
        alphaTest={0.01}
        depthWrite={false}
        toneMapped={false}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
});
