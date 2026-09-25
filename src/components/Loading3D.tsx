import * as THREE from "three";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

export function Loading3D() {
  const spinner = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (!spinner.current) return;

    spinner.current.rotation.z -= delta * 3;
  });

  return (
    <group position={[0, 0, 0]}>
      <mesh ref={spinner}>
        <torusGeometry
          args={[
            0.45, // raio
            0.045, // grossura
            16, // segmentos da grossura
            64, // segmentos do círculo
            Math.PI * 1.65, // deixa uma abertura
          ]}
        />

        <meshBasicMaterial color="#000000" side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}
