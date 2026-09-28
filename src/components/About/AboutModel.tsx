import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

type AboutModelProps = {
  modelPath: string;
};

export function AboutModel({ modelPath }: AboutModelProps) {
  const group = useRef<THREE.Group>(null);

  const { scene } = useGLTF(modelPath);

  useFrame((state, delta) => {
    if (!group.current) return;

    // Rotação contínua
    group.current.rotation.y += delta * 0.4;

    // Flutuação vertical
    group.current.position.y = Math.sin(state.clock.elapsedTime * 1.2) * 0.12;
  });

  return (
    <group ref={group}>
      <primitive object={scene} scale={1.5} />
    </group>
  );
}
