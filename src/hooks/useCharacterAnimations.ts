import * as THREE from "three";

import { useLayoutEffect, type RefObject } from "react";

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
  onAnimationFinished?: () => void,
) {
  const { actions, mixer } = useAnimations(animations, group) as unknown as {
    actions: GLTFActions;
    mixer: THREE.AnimationMixer;
  };

  useLayoutEffect(() => {
    const action = actions[activeAction];

    if (!action) return;

    const isIdle = activeAction === "idle.001";

    action.reset();
    action.enabled = true;

    action.setEffectiveWeight(1);
    action.setEffectiveTimeScale(1);

    /*
     * IDLE
     */
    if (isIdle) {
      action.setLoop(THREE.LoopRepeat, Infinity);

      action.clampWhenFinished = false;
    } else {

    /*
     * EMOTES
     */
      action.setLoop(THREE.LoopOnce, 1);

      action.clampWhenFinished = true;
    }

    action.fadeIn(0.2).play();

    /*
     * Aplica imediatamente a pose.
     * Evita flash de T-pose.
     */
    mixer.update(0);

    function handleFinished(
      event: THREE.Event & {
        action: THREE.AnimationAction;
      },
    ) {
      if (event.action === action && !isIdle) {
        onAnimationFinished?.();
      }
    }

    mixer.addEventListener("finished", handleFinished);

    return () => {
      mixer.removeEventListener("finished", handleFinished);

      action.fadeOut(0.15);
    };
  }, [actions, mixer, activeAction, onAnimationFinished]);

  return actions;
}
