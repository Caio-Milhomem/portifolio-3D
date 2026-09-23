import * as THREE from "three";
import { useEffect, useState, type RefObject } from "react";
import { useAnimations } from "@react-three/drei";

export type ActionName =
  | "box_01.001"
  | "agree.001"
  | "look_around.001"
  | "scratch.001"
  | "wait.001"
  | "idle.001"
  | "wave_goodbye_02.001"
  | "basketball_shot.001"
  | "greet_01.001"
  | "run.001"
  | "clap.001"
  | "sit.001"
  | "walk.001"
  | "frustrated_01.001"
  | "flip.001"
  | "fold_arms.001"
  | "bow.001";

type GLTFActions = Record<ActionName, THREE.AnimationAction>;

export function useCharacterAnimations(
  animations: THREE.AnimationClip[],
  group: RefObject<THREE.Group | null>,
  activeAction: ActionName,
) {
  const { actions } = useAnimations(animations, group) as unknown as {
    actions: GLTFActions;
  };

  console.log(actions);

  useEffect(() => {
    actions[activeAction]?.play();

    return () => {
      actions[activeAction]?.stop();
    };
  }, [actions, activeAction]);

  return actions;
}
