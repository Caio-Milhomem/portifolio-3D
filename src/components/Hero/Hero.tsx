import { Canvas } from "@react-three/fiber";
import { ContactShadows, Environment } from "@react-three/drei";
import { PCFShadowMap } from "three";
import { Suspense, useCallback, useEffect, useState } from "react";
import "./Hero.css";

import { AvatarModel } from "../three/AvatarModel";
import { TypingText3D } from "./TypingText3D";
import { Loading3D } from "../Loading3D";
import { EmoteMenu } from "../EmoteMenu/EmoteMenu";

import type { ActionName } from "../../hooks/useCharacterAnimations";

type HeroProps = {
  onReady?: () => void;
  forceLoading?: boolean;
  theme: "light" | "dark";
  isActive: boolean;
  preloadReady?: boolean;
};

type HeroContentProps = {
  visible: boolean;
  onAssetsReady: () => void;
  activeAction: ActionName;
  onModelClick: () => void;
  onAnimationFinished: () => void;
  theme: "light" | "dark";
};

function HeroContent({
  visible,
  onAssetsReady,
  activeAction,
  onModelClick,
  onAnimationFinished,
  theme,
}: HeroContentProps) {
  useEffect(() => {
    onAssetsReady();
  }, [onAssetsReady]);

  return (
    <group visible={visible}>
      {/* Texto */}
      <group position={[-5, 1, 0]} rotation={[0, 0.4, 0]}>
        <TypingText3D
          phrases={[
            "Oi, eu sou o Caio.",
            "Bem-vindo ao meu portfólio!",
            "Sou desenvolvedor,",
            "Sou skatista,",
            "Sou gamer.",
          ]}
          speed={70}
          color={theme === "dark" ? "#f5f5f5" : "#111111"}
        />
      </group>

      {/* Personagem */}
      <AvatarModel
        scale={2}
        position={[4, -1, 0]}
        rotation={[0, -0.4, 0]}
        activeAction={activeAction}
        followMouse={activeAction === "idle.001"}
        onModelClick={onModelClick}
        onAnimationFinished={onAnimationFinished}
      />
    </group>
  );
}

export default function Hero({
  onReady,
  forceLoading = false,
  theme,
  isActive,
  preloadReady = true,
}: HeroProps) {
  const [assetsReady, setAssetsReady] = useState(false);

  const [minimumLoadingDone, setMinimumLoadingDone] = useState(false);

  const [emoteMenuOpen, setEmoteMenuOpen] = useState(false);

  const [activeAction, setActiveAction] = useState<ActionName>("idle.001");

  /*
   * Tempo mínimo do loading.
   */
  useEffect(() => {
    const timer = setTimeout(() => {
      setMinimumLoadingDone(true);
    }, 1800);

    return () => clearTimeout(timer);
  }, []);

  /*
   * Assets terminaram de carregar.
   */
  const handleAssetsReady = useCallback(() => {
    setAssetsReady(true);
  }, []);

  /*
   * Seleciona um emote e fecha o menu.
   */
  function handleEmoteSelect(action: ActionName) {
    setActiveAction(action);
    setEmoteMenuOpen(false);
  }

  /*
   * Quando o emote termina,
   * volta para idle.
   */
  const handleAnimationFinished = useCallback(() => {
    setActiveAction("idle.001");
  }, []);

  /*
   * Hero só aparece quando:
   *
   * 1. Assets carregaram.
   * 2. Tempo mínimo terminou.
   * 3. Preload global (ASCII) terminou.
   * 4. forceLoading está desligado.
   */
  const showHero = assetsReady && minimumLoadingDone && preloadReady;

  /*
   * Avisa o App quando o Hero estiver pronto.
   */
  useEffect(() => {
    if (!showHero) return;

    onReady?.();
  }, [showHero, onReady]);

  return (
    <div className="hero">
      <Canvas
        onPointerMissed={() => {
          setEmoteMenuOpen(false);
        }}
        shadows={{
          type: PCFShadowMap,
        }}
        gl={{
          alpha: true,
        }}
        camera={{
          position: [0, 1, 8],
          fov: 50,
        }}
      >
        {/* Iluminação */}

        <ambientLight intensity={0.3} />

        <directionalLight
          position={[-6, 8, 3]}
          intensity={0.7}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
          shadow-radius={8}
          shadow-bias={-0.0005}
        />

        <Environment preset="studio" environmentIntensity={0.15} />

        {/* Conteúdo */}

        {!forceLoading && (
          <Suspense fallback={null}>
            <HeroContent
              visible={showHero}
              onAssetsReady={handleAssetsReady}
              theme={theme}
              activeAction={activeAction}
              onModelClick={() => {
                setEmoteMenuOpen((prev) => !prev);
              }}
              onAnimationFinished={handleAnimationFinished}
            />
          </Suspense>
        )}

        {/* Loader */}

        {!showHero && <Loading3D />}

        {/* Chão */}

        <mesh
          rotation={[-Math.PI / 2, 0, 0]}
          position={[0, -1, 0]}
          receiveShadow
          onClick={() => {
            setEmoteMenuOpen(false);
          }}
        >
          <planeGeometry args={[100, 100]} />

          <shadowMaterial transparent opacity={0.3} />
        </mesh>

        {/* Sombra de contato */}

        <ContactShadows
          position={[0, -0.99, 0]}
          opacity={0.9}
          scale={20}
          blur={1}
          far={10}
        />
      </Canvas>

      {/* Menu de animações */}

      {emoteMenuOpen && <EmoteMenu onSelect={handleEmoteSelect} />}
    </div>
  );
}
