import * as THREE from "three";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

export function useLookAtMouse(headBone: THREE.Bone, followMouse?: boolean) {
  const headTargetPlane = useRef(
    new THREE.Plane(new THREE.Vector3(0, 0, 1), -3),
  );

  const mouseWorldPosition = useRef(new THREE.Vector3());

  const headWorldPosition = useRef(new THREE.Vector3());

  useFrame((state) => {
    if (!followMouse || !headBone) {
      return;
    }

    const intersection = state.raycaster.ray.intersectPlane(
      headTargetPlane.current,
      mouseWorldPosition.current,
    );

    if (intersection) {
      headBone.getWorldPosition(headWorldPosition.current);

      // Aumenta o movimento para os lados
      const horizontalSensitivity = 2.2;

      mouseWorldPosition.current.x =
        headWorldPosition.current.x +
        (mouseWorldPosition.current.x - headWorldPosition.current.x) *
          horizontalSensitivity;

      // Aumenta o movimento para baixo
      if (state.pointer.y < 0) {
        mouseWorldPosition.current.y += state.pointer.y * 2;
      }

      headBone.lookAt(mouseWorldPosition.current);

      headBone.rotateY(-Math.PI / 2 - 0.3);
    }
  });
}
