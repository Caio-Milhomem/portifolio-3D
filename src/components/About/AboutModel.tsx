import { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

type AboutModelProps = {
  modelPath: string;
};

export function AboutModel({ modelPath }: AboutModelProps) {
  const group = useRef<THREE.Group>(null);

  const { scene } = useGLTF(modelPath);

  const baseY = -0.4;

  useFrame((state, delta) => {
    if (!group.current) return;

    // Rotação contínua
    group.current.rotation.y += delta * 0.4;

    // Flutuação vertical
    group.current.position.y =
      baseY + Math.sin(state.clock.elapsedTime * 1.2) * 0.12;
  });
  useEffect(() => {
    let meshes = 0;
    let triangles = 0;

    scene.traverse((child) => {
      if (!(child instanceof THREE.Mesh)) return;

      meshes++;

      const geometry = child.geometry;

      if (geometry.index) {
        triangles += geometry.index.count / 3;
      } else if (geometry.attributes.position) {
        triangles += geometry.attributes.position.count / 3;
      }
    });

    console.log("Modelo:", modelPath);
    console.log("Meshes:", meshes);
    console.log("Triângulos:", triangles);
  }, [scene, modelPath]);
  return (
    <group ref={group}>
      <primitive
        object={scene}
        scale={3}
        onPointerOver={() => {
          document.body.style.cursor = "grab";
        }}
        onPointerOut={() => {
          document.body.style.cursor = "default";
        }}
      />
    </group>
  );
}
