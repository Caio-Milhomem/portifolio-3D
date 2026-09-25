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
) {
  const { actions, mixer } = useAnimations(animations, group) as unknown as {
    actions: GLTFActions;
    mixer: THREE.AnimationMixer;
  };

  /*
   * useLayoutEffect acontece antes do navegador
   * apresentar o frame visual.
   *
   * Isso ajuda a impedir que o boneco apareça
   * primeiro na T-pose.
   */
  useLayoutEffect(() => {
    const action = actions[activeAction];

    if (!action) {
      return;
    }

    /*
     * Volta a animação para o início.
     */
    action.reset();

    /*
     * Garante que a animação esteja habilitada.
     */
    action.enabled = true;

    /*
     * Peso normal da animação.
     */
    action.setEffectiveWeight(1);

    /*
     * Velocidade normal.
     */
    action.setEffectiveTimeScale(1);

    /*
     * Começa a animação.
     */
    action.play();

    /*
     * Força o AnimationMixer a aplicar imediatamente
     * a pose da animação ao esqueleto.
     *
     * Isso é importante para evitar um frame em T-pose.
     */
    mixer.update(0);

    return () => {
      action.stop();
    };
  }, [actions, mixer, activeAction]);

  return actions;
}
