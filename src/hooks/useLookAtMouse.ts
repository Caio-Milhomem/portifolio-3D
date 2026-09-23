import * as THREE from "three";
import { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";

export function useLookAtMouse(headBone: THREE.Bone, followMouse?: boolean) {
  /*
  useEffect(() => {
    if (!headBone) return;
    const helper = new THREE.AxesHelper(1); // tamanho 1 unidade
    headBone.add(helper);
  }, [headBone]);
  */
  const headTargetPlane = useRef(
    new THREE.Plane(new THREE.Vector3(0, 0, 1), -5),
  );

  const mouseWorldPosition = useRef(new THREE.Vector3());
  const headWorldPosition = useRef(new THREE.Vector3());

  useFrame((state) => {
    if (!followMouse || !headBone) {
      return;
    }

    state.raycaster.ray.intersectPlane(
      headTargetPlane.current,
      mouseWorldPosition.current,
    );

    const intersection = state.raycaster.ray.intersectPlane(
      headTargetPlane.current,
      mouseWorldPosition.current,
    );

    if (intersection) {
      headBone.getWorldPosition(headWorldPosition.current);
      headBone.lookAt(mouseWorldPosition.current);
      headBone.rotateY(-Math.PI / 2 - 0.3); // Ajuste de rotação para alinhar corretamente
    }
  });
}
