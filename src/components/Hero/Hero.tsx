import { Canvas } from "@react-three/fiber";
import { ContactShadows, Environment } from "@react-three/drei";
import { PCFShadowMap } from "three";
import { Suspense, useCallback, useEffect, useState } from "react";

import { Model } from "./Model";
import { TypingText3D } from "./TypingText3D";
import { Loading3D } from "../Loading3D";

type HeroProps = {
  onReady?: () => void;
  forceLoading?: boolean;
};

type HeroContentProps = {
  visible: boolean;
  onAssetsReady: () => void;
};

function HeroContent({ visible, onAssetsReady }: HeroContentProps) {
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
        />
      </group>

      {/* Personagem */}
      <Model
        scale={2}
        position={[4, -1, 0]}
        followMouse
        rotation={[0, -0.4, 0]}
      />
    </group>
  );
}

export default function Hero({ onReady, forceLoading = false }: HeroProps) {
  const [assetsReady, setAssetsReady] = useState(false);

  const [minimumLoadingDone, setMinimumLoadingDone] = useState(false);

  /*
   * Tempo mínimo do loading.
   *
   * Mesmo que os arquivos estejam em cache e carreguem
   * instantaneamente, o loader ficará visível por 1.2s.
   */
  useEffect(() => {
    const timer = setTimeout(() => {
      setMinimumLoadingDone(true);
    }, 1800);

    return () => clearTimeout(timer);
  }, []);

  /*
   * É executado somente depois que HeroContent conseguiu
   * montar dentro do Suspense.
   *
   * Ou seja: Model + fonte do Text3D já carregaram.
   */
  const handleAssetsReady = useCallback(() => {
    setAssetsReady(true);
  }, []);

  /*
   * O Hero só aparece quando:
   *
   * 1. Os assets carregaram.
   * 2. O tempo mínimo do loading terminou.
   */
  const showHero = assetsReady && minimumLoadingDone && !forceLoading;

  /*
   * Só avisa o App que o Hero está pronto quando
   * ele realmente puder aparecer.
   *
   * É daqui que o SideMenu poderá ser liberado.
   */
  useEffect(() => {
    if (!showHero) return;

    onReady?.();
  }, [showHero, onReady]);

  return (
    <div
      className="hero"
      style={{
        width: "100%",
        height: "100vh",

        background: `
          linear-gradient(
            180deg,
            #f8fafc 0%,
            #e5e8ec 55%,
            #717474 100%
          )
        `,
      }}
    >
      <Canvas
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

        {/* 
          Os assets são carregados aqui.

          Enquanto estiverem carregando,
          o Suspense simplesmente não renderiza HeroContent.

          O loader é controlado separadamente.
        */}

        {!forceLoading && (
          <Suspense fallback={null}>
            <HeroContent visible={showHero} onAssetsReady={handleAssetsReady} />
          </Suspense>
        )}

        {/* Loader */}

        {!showHero && <Loading3D />}

        {/* Chão */}

        <mesh
          rotation={[-Math.PI / 2, 0, 0]}
          position={[0, -1, 0]}
          receiveShadow
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
    </div>
  );
}
