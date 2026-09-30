import {
  useRef,
  useState,
  type MutableRefObject,
  type PointerEvent as ReactPointerEvent,
} from "react";

import { Canvas, useFrame } from "@react-three/fiber";

import { Environment, Billboard } from "@react-three/drei";

import * as THREE from "three";

import { TechnologyIcon3D } from "./TechnologyIcon3D";
import { Model } from "../Hero/Model";

import "./Technologies.css";

type Technology = {
  id: string;
  name: string;
  icon: string;
  icon3D: string;
  text: string;
  color: string;
};

const technologies: Technology[] = [
  {
    id: "react",
    name: "React",
    icon: "/icons/react-icon-svg.svg",
    icon3D: "/icons/react-icon-svg.svg",
    color: "#61dafb",
    text: `
Utilizo React para desenvolver interfaces modernas e componentizadas,
trabalhando com estados, propriedades, hooks e organização de componentes.

Tenho utilizado React principalmente no desenvolvimento de interfaces
interativas e experiências web integradas com recursos 3D.
    `,
  },

  {
    id: "typescript",
    name: "TypeScript",
    icon: "/icons/react-icon-svg.svg",
    icon3D: "/icons/react-icon-svg.svg",
    color: "#3178c6",
    text: `
Utilizo TypeScript para adicionar tipagem ao desenvolvimento JavaScript,
deixando componentes, propriedades e estruturas de dados mais previsíveis.
    `,
  },

  {
    id: "javascript",
    name: "JavaScript",
    icon: "/icons/react-icon-svg.svg",
    icon3D: "/icons/react-icon-svg.svg",
    color: "#f7df1e",
    text: `
JavaScript está presente em boa parte dos projetos web que desenvolvo,
principalmente na criação de comportamentos, interações e integrações.
    `,
  },

  {
    id: "three",
    name: "Three.js",
    icon: "/icons/react-icon-svg.svg",
    icon3D: "/icons/react-icon-svg.svg",
    color: "#ffffff",
    text: `
Utilizo Three.js em conjunto com React Three Fiber para trabalhar com
modelos, animações e experiências tridimensionais diretamente no navegador.
    `,
  },
];

type TechnologiesProps = {
  isActive: boolean;
};

type CloudInteraction = {
  dragging: boolean;
  pointerDown: boolean;
  /*
   * Rotação que veio diretamente
   * do arraste do mouse.
   */
  pendingRotationX: number;
  pendingRotationY: number;

  /*
   * Inércia depois que o usuário
   * solta o mouse.
   */
  inertiaX: number;
  inertiaY: number;

  /*
   * Posição do mouse relativa
   * ao centro da área.
   *
   * -1 até 1
   */
  hoverX: number;
  hoverY: number;

  /*
   * Evita abrir uma tecnologia
   * depois de um drag.
   */
  suppressClickUntil: number;
};

type TechnologySceneProps = {
  selectedTechnology: Technology | null;

  onSelect: (technology: Technology) => void;

  interaction: MutableRefObject<CloudInteraction>;
};

function TechnologyScene({
  selectedTechnology,
  onSelect,
  interaction,
}: TechnologySceneProps) {
  const sceneGroup = useRef<THREE.Group>(null);

  const orbitGroup = useRef<THREE.Group>(null);

  /*
   * ==============================
   * CONFIGURAÇÕES DA NUVEM
   * ==============================
   */

  const CLOUD_RADIUS = 1;

  /*
   * Deixe true enquanto estiver
   * acertando o centro da nuvem.
   */
  const DEBUG_CLOUD_CENTER = true;

  /*
   * Velocidade automática atual.
   */
  const autoVelocity = useRef({
    x: 0.02,
    y: 0.12,
  });

  useFrame((_, delta) => {
    if (orbitGroup.current) {
      /*
       * ==============================
       * DRAG DIRETO
       * ==============================
       *
       * O movimento acumulado pelo DOM
       * é aplicado diretamente aqui.
       */

      orbitGroup.current.rotation.x += interaction.current.pendingRotationX;

      orbitGroup.current.rotation.y += interaction.current.pendingRotationY;

      interaction.current.pendingRotationX = 0;

      interaction.current.pendingRotationY = 0;

      /*
       * ==============================
       * SEM ARRASTAR
       * ==============================
       */

      if (!interaction.current.dragging) {
        /*
         * O mouse influencia a direção
         * da rotação automática.
         */

        const targetVelocityX = -interaction.current.hoverY * 0.12;

        const targetVelocityY = 0.12 + interaction.current.hoverX * 0.18;

        autoVelocity.current.x = THREE.MathUtils.damp(
          autoVelocity.current.x,
          targetVelocityX,
          3,
          delta,
        );

        autoVelocity.current.y = THREE.MathUtils.damp(
          autoVelocity.current.y,
          targetVelocityY,
          3,
          delta,
        );

        /*
         * Movimento automático
         * + inércia do drag.
         */

        orbitGroup.current.rotation.x +=
          (autoVelocity.current.x + interaction.current.inertiaX) * delta;

        orbitGroup.current.rotation.y +=
          (autoVelocity.current.y + interaction.current.inertiaY) * delta;

        /*
         * Inércia desaparece
         * progressivamente.
         */

        interaction.current.inertiaX = THREE.MathUtils.damp(
          interaction.current.inertiaX,
          0,
          4,
          delta,
        );

        interaction.current.inertiaY = THREE.MathUtils.damp(
          interaction.current.inertiaY,
          0,
          4,
          delta,
        );
      }
    }

    /*
     * ==============================
     * MOVIMENTO DA CENA
     * ==============================
     */

    if (sceneGroup.current) {
      const targetX = selectedTechnology ? -1.8 : 0;

      sceneGroup.current.position.x = THREE.MathUtils.damp(
        sceneGroup.current.position.x,
        targetX,
        5,
        delta,
      );
    }
  });

  return (
    <group ref={sceneGroup} position={[0, 0, -0.6]}>
      {/* ============================
          PERSONAGEM
      ============================ */}

      <Model
        scale={2.25}
        position={[0, -2.15, 0]}
        rotation={[0, 0, 0]}
        activeAction="idle.001"
        followMouse={true}
      />

      {/* ============================
          CENTRO DA NUVEM

          ALTERE ESTE POSITION PARA
          MOVER A NUVEM INTEIRA.
      ============================ */}

      <group position={[0, 0, 0]}>
        {/* ============================
            DEBUG DO CENTRO
        ============================ */}

        {DEBUG_CLOUD_CENTER && (
          <>
            <mesh>
              <sphereGeometry args={[0.06, 16, 16]} />

              <meshBasicMaterial color="#ff0055" depthTest={false} />
            </mesh>

            <axesHelper args={[0.5]} />
          </>
        )}

        {/* ============================
            ICON CLOUD
        ============================ */}

        <group ref={orbitGroup}>
          {technologies.map((technology, index) => {
            const count = technologies.length;

            /*
             * Fibonacci Sphere.
             *
             * Distribuição uniforme
             * dos ícones pela esfera.
             */

            const goldenAngle = Math.PI * (3 - Math.sqrt(5));

            /*
             * O +0.5 evita colocar
             * ícones exatamente nos
             * polos da esfera.
             */

            const normalizedY = 1 - (2 * (index + 0.5)) / count;

            const horizontalRadius = Math.sqrt(
              Math.max(0, 1 - normalizedY * normalizedY),
            );

            const theta = goldenAngle * index;

            const x = Math.cos(theta) * horizontalRadius * CLOUD_RADIUS;

            const y = normalizedY * CLOUD_RADIUS;

            const z = Math.sin(theta) * horizontalRadius * CLOUD_RADIUS;

            return (
              <group key={technology.id} position={[x, y, z]}>
                {/*
                    A posição é realmente
                    tridimensional.

                    O Billboard serve apenas
                    para o logo continuar
                    olhando para a câmera.
                  */}

                <Billboard>
                  <group
                    onClick={(event) => {
                      event.stopPropagation();

                      /*
                       * Se acabamos de
                       * arrastar a nuvem,
                       * não abrimos o card.
                       */

                      if (
                        performance.now() <
                        interaction.current.suppressClickUntil
                      ) {
                        return;
                      }

                      onSelect(technology);
                    }}
                    onPointerOver={() => {
                      if (!interaction.current.dragging) {
                        document.body.style.cursor = "pointer";
                      }
                    }}
                    onPointerOut={() => {
                      if (!interaction.current.dragging) {
                        document.body.style.cursor = "default";
                      }
                    }}
                  >
                    <TechnologyIcon3D
                      src={technology.icon3D}
                      color={technology.color}
                      scale={0.008}
                    />
                  </group>
                </Billboard>
              </group>
            );
          })}
        </group>
      </group>
    </group>
  );
}

export function Technologies({ isActive }: TechnologiesProps) {
  const [selectedTechnology, setSelectedTechnology] =
    useState<Technology | null>(null);

  /*
   * ==============================
   * INTERAÇÃO DA ICON CLOUD
   * ==============================
   *
   * Agora toda a interação acontece
   * no DIV HTML da cena.
   *
   * Não depende mais do raycaster
   * do Three.js.
   */

  const interaction = useRef<CloudInteraction>({
    dragging: false,
    pointerDown: false,

    pendingRotationX: 0,
    pendingRotationY: 0,

    inertiaX: 0,
    inertiaY: 0,

    hoverX: 0,
    hoverY: 0,

    suppressClickUntil: 0,
  });

  const lastPointer = useRef({
    x: 0,
    y: 0,
  });

  const dragStart = useRef({
    x: 0,
    y: 0,
  });

  function closeTechnology() {
    setSelectedTechnology(null);

    document.body.style.cursor = "default";
  }

  /*
   * ==============================
   * POINTER DOWN
   * ==============================
   */

  function handleCloudPointerDown(event: ReactPointerEvent<HTMLDivElement>) {
    interaction.current.pointerDown = true;
    interaction.current.dragging = false;

    interaction.current.inertiaX = 0;
    interaction.current.inertiaY = 0;

    interaction.current.suppressClickUntil = 0;

    lastPointer.current = {
      x: event.clientX,
      y: event.clientY,
    };

    dragStart.current = {
      x: event.clientX,
      y: event.clientY,
    };

    /*
     * IMPORTANTE:
     *
     * NÃO fazemos setPointerCapture aqui.
     *
     * Se for apenas clique, deixamos o Canvas
     * receber pointerDown + pointerUp + click normalmente.
     */
  }

  /*
   * ==============================
   * POINTER MOVE
   * ==============================
   */

  function handleCloudPointerMove(event: ReactPointerEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();

    const centerX = rect.left + rect.width / 2;

    const centerY = rect.top + rect.height / 2;

    interaction.current.hoverX = THREE.MathUtils.clamp(
      (event.clientX - centerX) / (rect.width / 2),
      -1,
      1,
    );

    interaction.current.hoverY = THREE.MathUtils.clamp(
      (event.clientY - centerY) / (rect.height / 2),
      -1,
      1,
    );

    /*
     * Mouse não está pressionado.
     *
     * Só influencia a rotação automática.
     */
    if (!interaction.current.pointerDown) {
      return;
    }

    const totalDragX = event.clientX - dragStart.current.x;

    const totalDragY = event.clientY - dragStart.current.y;

    const dragDistance = Math.hypot(totalDragX, totalDragY);

    /*
     * Só começa a arrastar depois
     * de movimentar 6 pixels.
     */
    if (!interaction.current.dragging && dragDistance < 6) {
      return;
    }

    /*
     * A partir daqui virou drag.
     */
    if (!interaction.current.dragging) {
      interaction.current.dragging = true;

      document.body.style.cursor = "grabbing";

      interaction.current.suppressClickUntil = performance.now() + 200;

      /*
       * Agora sim:
       * sabemos que virou um drag real.
       */
      event.currentTarget.setPointerCapture(event.pointerId);

      lastPointer.current = {
        x: event.clientX,
        y: event.clientY,
      };

      return;
    }

    const deltaX = event.clientX - lastPointer.current.x;

    const deltaY = event.clientY - lastPointer.current.y;

    /*
     * Rotação direta.
     */
    interaction.current.pendingRotationY += deltaX * 0.01;

    interaction.current.pendingRotationX += deltaY * 0.01;

    /*
     * Inércia.
     */
    interaction.current.inertiaY = deltaX * 0.16;

    interaction.current.inertiaX = deltaY * 0.16;

    lastPointer.current = {
      x: event.clientX,
      y: event.clientY,
    };
  }

  /*
   * ==============================
   * POINTER UP
   * ==============================
   */

  function handleCloudPointerUp(event: ReactPointerEvent<HTMLDivElement>) {
    const wasDragging = interaction.current.dragging;

    interaction.current.pointerDown = false;

    interaction.current.dragging = false;

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }

    if (wasDragging) {
      interaction.current.suppressClickUntil = performance.now() + 150;

      document.body.style.cursor = "grab";
    }
  }

  /*
   * ==============================
   * POINTER ENTER
   * ==============================
   */

  function handleCloudPointerEnter(event: ReactPointerEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();

    const centerX = rect.left + rect.width / 2;

    const centerY = rect.top + rect.height / 2;

    interaction.current.hoverX = THREE.MathUtils.clamp(
      (event.clientX - centerX) / (rect.width / 2),
      -1,
      1,
    );

    interaction.current.hoverY = THREE.MathUtils.clamp(
      (event.clientY - centerY) / (rect.height / 2),
      -1,
      1,
    );

    if (!interaction.current.dragging) {
      document.body.style.cursor = "grab";
    }
  }

  /*
   * ==============================
   * POINTER LEAVE
   * ==============================
   */

  function handleCloudPointerLeave() {
    /*
     * Quando o mouse sai da área,
     * a influência volta para o centro.
     */

    interaction.current.hoverX = 0;
    interaction.current.hoverY = 0;

    if (!interaction.current.dragging) {
      document.body.style.cursor = "default";
    }
  }

  return (
    <div className="technologies">
      {/* ============================
          CENA 3D
      ============================ */}

      <div
        className="technologies-scene"
        onPointerDown={handleCloudPointerDown}
        onPointerMove={handleCloudPointerMove}
        onPointerUp={handleCloudPointerUp}
        onPointerCancel={handleCloudPointerUp}
        onPointerEnter={handleCloudPointerEnter}
        onPointerLeave={handleCloudPointerLeave}
      >
        <Canvas
          dpr={1}
          frameloop="always"
          camera={{
            position: [0, 1.4, 6.5],

            fov: 45,
          }}
          onPointerMissed={() => {
            if (selectedTechnology) {
              closeTechnology();
            }
          }}
        >
          <ambientLight intensity={0.4} />

          <directionalLight position={[-4, 6, 5]} intensity={0.8} />

          <Environment preset="studio" environmentIntensity={0.15} />

          <TechnologyScene
            selectedTechnology={selectedTechnology}
            onSelect={setSelectedTechnology}
            interaction={interaction}
          />
        </Canvas>
      </div>

      {/* ============================
          CARD
      ============================ */}

      {selectedTechnology && (
        <div
          className="technology-card"
          onClick={(event) => {
            event.stopPropagation();
          }}
        >
          <div className="technology-card-header">
            <img src={selectedTechnology.icon} alt={selectedTechnology.name} />

            <h2>{selectedTechnology.name}</h2>
          </div>

          <div className="technology-card-text">
            <p>{selectedTechnology.text}</p>
          </div>
        </div>
      )}
    </div>
  );
}
