import {
  useRef,
  useState,
  useEffect,
  type AnimationEvent as ReactAnimationEvent,
  type MutableRefObject,
  type PointerEvent as ReactPointerEvent,
} from "react";

import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Billboard } from "@react-three/drei";

import * as THREE from "three";

import { TechnologyIcon3D } from "./TechnologyIcon3D";
import { TechnologyIconPNG } from "./TechnologyIconPNG";
import { Model } from "../Hero/Model";

import "./Technologies.css";

type Technology = {
  id: string;
  name: string;
  icon: string;
  icon3D: string;
  iconScale?: number;
  asciiFile?: string;
  text: string;
};

const technologies: Technology[] = [
  {
    id: "azure",
    name: "Azure",
    icon: "/icons/azure-icon.svg",
    icon3D: "/icons/azure-icon.png",
    asciiFile: "/ascii-icons/azure.txt",
    text: `
Descreva aqui sua experiência com Azure.
    `,
  },

  {
    id: "bootstrap",
    name: "Bootstrap",
    icon: "/icons/bootstrap-icon.png",
    icon3D: "/icons/bootstrap-icon.png",
    text: `
Descreva aqui sua experiência com Bootstrap.
    `,
  },

  {
    id: "cpp",
    name: "C++",
    icon: "/icons/cpp-icon.svg",
    icon3D: "/icons/cpp-icon.svg",
    text: `
Descreva aqui sua experiência com C++.
    `,
  },

  {
    id: "css",
    name: "CSS",
    icon: "/icons/css-icon.svg",
    icon3D: "/icons/css-icon.svg",
    text: `
Descreva aqui sua experiência com CSS.
    `,
  },

  {
    id: "docker",
    name: "Docker",
    icon: "/icons/docker-icon.svg",
    icon3D: "/icons/docker-icon.svg",
    text: `
Descreva aqui sua experiência com Docker.
    `,
  },

  {
    id: "git",
    name: "Git",
    icon: "/icons/git-icon.svg",
    icon3D: "/icons/git-icon.svg",
    text: `
Descreva aqui sua experiência com Git.
    `,
  },

  {
    id: "github",
    name: "GitHub",
    icon: "/icons/github-icon.svg",
    icon3D: "/icons/github-icon.svg",
    text: `
Descreva aqui sua experiência com GitHub.
    `,
  },

  {
    id: "html",
    name: "HTML",
    icon: "/icons/html-icon.svg",
    icon3D: "/icons/html-icon.svg",
    text: `
Descreva aqui sua experiência com HTML.
    `,
  },

  {
    id: "java",
    name: "Java",
    icon: "/icons/java-icon.svg",
    icon3D: "/icons/java-icon.svg",
    text: `
Descreva aqui sua experiência com Java.
    `,
  },

  {
    id: "javascript",
    name: "JavaScript",
    icon: "/icons/js-icon.svg",
    icon3D: "/icons/js-icon.svg",
    text: `
Descreva aqui sua experiência com JavaScript.
    `,
  },

  {
    id: "mongodb",
    name: "MongoDB",
    icon: "/icons/mongodb-icon.svg",
    icon3D: "/icons/mongodb-icon.svg",
    text: `
Descreva aqui sua experiência com MongoDB.
    `,
  },

  {
    id: "nodejs",
    name: "Node.js",
    icon: "/icons/node-js-icon.svg",
    icon3D: "/icons/node-js-icon.svg",
    text: `
Descreva aqui sua experiência com Node.js.
    `,
  },

  {
    id: "npm",
    name: "npm",
    icon: "/icons/npm-icon.svg",
    icon3D: "/icons/npm-icon.svg",
    iconScale: 1.3,
    text: `
Descreva aqui sua experiência com npm.
    `,
  },

  {
    id: "postgresql",
    name: "PostgreSQL",
    icon: "/icons/postgre-icon.svg",
    icon3D: "/icons/postgre-icon.svg",
    text: `
Descreva aqui sua experiência com PostgreSQL.
    `,
  },

  {
    id: "postman",
    name: "Postman",
    icon: "/icons/postman-icon.svg",
    icon3D: "/icons/postman-icon.svg",
    text: `
Descreva aqui sua experiência com Postman.
    `,
  },

  {
    id: "prisma",
    name: "Prisma",
    icon: "/icons/prisma-icon.svg",
    icon3D: "/icons/prisma-icon.svg",
    text: `
Descreva aqui sua experiência com Prisma.
    `,
  },

  {
    id: "react",
    name: "React",
    icon: "/icons/react-icon.svg",
    icon3D: "/icons/react-icon.svg",
    text: `
Utilizo React para desenvolver interfaces modernas e componentizadas,
trabalhando com estados, propriedades, hooks e organização de componentes.

Tenho utilizado React principalmente no desenvolvimento de interfaces
interativas e experiências web integradas com recursos 3D.
    `,
  },

  {
    id: "threejs",
    name: "Three.js",
    icon: "/icons/threejs-icon.svg",
    icon3D: "/icons/threejs-icon.svg",
    text: `
Utilizo Three.js em conjunto com React Three Fiber para trabalhar com
modelos, animações e experiências tridimensionais diretamente no navegador.
    `,
  },

  {
    id: "typescript",
    name: "TypeScript",
    icon: "/icons/typescript-icon.svg",
    icon3D: "/icons/typescript-icon.svg",
    text: `
Utilizo TypeScript para adicionar tipagem ao desenvolvimento JavaScript,
deixando componentes, propriedades e estruturas de dados mais previsíveis.
    `,
  },

  {
    id: "vite",
    name: "Vite",
    icon: "/icons/vite-icon.svg",
    icon3D: "/icons/vite-icon.png",
    text: `
Descreva aqui sua experiência com Vite.
    `,
  },

  {
    id: "n8n",
    name: "n8n",
    icon: "/icons/n8n-icon.svg",
    icon3D: "/icons/n8n-icon.svg",
    iconScale: 1.9,
    text: `
Descreva aqui sua experiência com n8n.
    `,
  },
];

type TechnologiesProps = {
  isActive: boolean;
};

type CloudInteraction = {
  dragging: boolean;
  pointerDown: boolean;

  pendingRotationX: number;
  pendingRotationY: number;

  inertiaX: number;
  inertiaY: number;

  hoverX: number;
  hoverY: number;

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

  /* ==============================
     CONFIGURAÇÕES DA NUVEM
  ============================== */

  const CLOUD_RADIUS = 1.5;

  const DEBUG_CLOUD_CENTER = true;

  const autoVelocity = useRef({
    x: 0.02,
    y: 0.12,
  });

  useFrame((_, delta) => {
    if (orbitGroup.current) {
      /* ==============================
         DRAG DIRETO
      ============================== */

      orbitGroup.current.rotation.x += interaction.current.pendingRotationX;

      orbitGroup.current.rotation.y += interaction.current.pendingRotationY;

      interaction.current.pendingRotationX = 0;
      interaction.current.pendingRotationY = 0;

      /* ==============================
         SEM ARRASTAR
      ============================== */

      if (!interaction.current.dragging) {
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

        orbitGroup.current.rotation.x +=
          (autoVelocity.current.x + interaction.current.inertiaX) * delta;

        orbitGroup.current.rotation.y +=
          (autoVelocity.current.y + interaction.current.inertiaY) * delta;

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

    /* ==============================
       MOVIMENTO DA CENA
    ============================== */

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
      ============================ */}

      <group position={[0, -0.5, 0]}>
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

            const goldenAngle = Math.PI * (3 - Math.sqrt(5));

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
                <Billboard>
                  <group
                    onClick={(event) => {
                      event.stopPropagation();

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
                    {/* HITBOX */}

                    <mesh>
                      <planeGeometry args={[0.55, 0.55]} />

                      <meshBasicMaterial
                        transparent
                        opacity={0}
                        depthWrite={false}
                      />
                    </mesh>

                    {/* ÍCONE */}

                    {technology.icon3D.endsWith(".png") ? (
                      <TechnologyIconPNG
                        src={technology.icon3D}
                        size={0.55 * (technology.iconScale ?? 1)}
                      />
                    ) : (
                      <TechnologyIcon3D
                        src={technology.icon3D}
                        scale={0.004 * (technology.iconScale ?? 1)}
                      />
                    )}
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

  const [isCardClosing, setIsCardClosing] = useState(false);

  const [asciiArt, setAsciiArt] = useState("");

  /* ==============================
     INTERAÇÃO DA ICON CLOUD
  ============================== */

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

  /* ==============================
     CARD
  ============================== */

  function handleCardAnimationEnd(event: ReactAnimationEvent<HTMLDivElement>) {
    /*
     * O cursor do terminal também possui
     * uma animação.
     *
     * Ignoramos animationend de elementos
     * filhos do card.
     */
    if (event.target !== event.currentTarget) {
      return;
    }

    /*
     * Só removemos o card quando a
     * animação de saída realmente terminar.
     */
    if (!isCardClosing || event.animationName !== "technologyCardExit") {
      return;
    }

    setSelectedTechnology(null);
    setIsCardClosing(false);
  }

  function closeTechnology() {
    if (!selectedTechnology || isCardClosing) {
      return;
    }

    /*
     * Não removemos selectedTechnology
     * agora.
     *
     * Primeiro executamos a animação
     * de saída.
     */
    setIsCardClosing(true);

    document.body.style.cursor = "default";
  }

  function selectTechnology(technology: Technology) {
    /*
     * Se clicar em outra tecnologia
     * durante o fechamento, cancela
     * a saída e mantém o card aberto.
     */
    setIsCardClosing(false);

    setSelectedTechnology(technology);
  }

  /* ==============================
     ASCII
  ============================== */

  useEffect(() => {
    if (!selectedTechnology?.asciiFile) {
      setAsciiArt("");
      return;
    }

    setAsciiArt("");

    fetch(selectedTechnology.asciiFile)
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `Erro ao carregar ASCII: ${selectedTechnology.asciiFile}`,
          );
        }

        return response.text();
      })
      .then((text) => {
        setAsciiArt(text);
      })
      .catch((error) => {
        console.error(error);

        setAsciiArt(`[ ${selectedTechnology.name} ]`);
      });
  }, [selectedTechnology]);

  /* ==============================
     POINTER DOWN
  ============================== */

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
  }

  /* ==============================
     POINTER MOVE
  ============================== */

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

    if (!interaction.current.pointerDown) {
      return;
    }

    const totalDragX = event.clientX - dragStart.current.x;

    const totalDragY = event.clientY - dragStart.current.y;

    const dragDistance = Math.hypot(totalDragX, totalDragY);

    /*
     * Só vira drag depois de 6px.
     */
    if (!interaction.current.dragging && dragDistance < 6) {
      return;
    }

    if (!interaction.current.dragging) {
      interaction.current.dragging = true;

      document.body.style.cursor = "grabbing";

      interaction.current.suppressClickUntil = performance.now() + 200;

      event.currentTarget.setPointerCapture(event.pointerId);

      lastPointer.current = {
        x: event.clientX,
        y: event.clientY,
      };

      return;
    }

    const deltaX = event.clientX - lastPointer.current.x;

    const deltaY = event.clientY - lastPointer.current.y;

    interaction.current.pendingRotationY += deltaX * 0.01;

    interaction.current.pendingRotationX += deltaY * 0.01;

    interaction.current.inertiaY = deltaX * 0.16;

    interaction.current.inertiaX = deltaY * 0.16;

    lastPointer.current = {
      x: event.clientX,
      y: event.clientY,
    };
  }

  /* ==============================
     POINTER UP
  ============================== */

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

  /* ==============================
     POINTER ENTER
  ============================== */

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

  /* ==============================
     POINTER LEAVE
  ============================== */

  function handleCloudPointerLeave() {
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
            if (selectedTechnology && !isCardClosing) {
              closeTechnology();
            }
          }}
        >
          <ambientLight intensity={0.4} />

          <directionalLight position={[-4, 6, 5]} intensity={0.8} />

          <Environment preset="studio" environmentIntensity={0.15} />

          <TechnologyScene
            selectedTechnology={selectedTechnology}
            onSelect={selectTechnology}
            interaction={interaction}
          />
        </Canvas>
      </div>

      {/* ============================
          TERMINAL
      ============================ */}

      {selectedTechnology && (
        <div
          className={`technology-card ${isCardClosing ? "closing" : ""}`}
          onAnimationEnd={handleCardAnimationEnd}
          onClick={(event) => {
            event.stopPropagation();
          }}
        >
          <div className="technology-terminal">
            {/* ============================
                CABEÇALHO
            ============================ */}

            <div className="technology-terminal-header">
              <span>technology.exe</span>

              <div className="technology-terminal-controls">
                <span>—</span>
                <span>□</span>
                <span>×</span>
              </div>
            </div>

            {/* ============================
                CONTEÚDO
            ============================ */}

            <div className="technology-terminal-content">
              {/* COMANDO */}

              <div className="technology-terminal-command">
                <span className="technology-terminal-path">
                  {"C:\\portfolio\\technologies>"}
                </span>

                <span> show {selectedTechnology.id}</span>
              </div>

              {/* RESULTADO */}

              <div className="technology-terminal-result">
                <div className="technology-terminal-ascii-container">
                  <pre className="technology-terminal-ascii">
                    {asciiArt || `[ ${selectedTechnology.name} ]`}
                  </pre>
                </div>

                <h2>{selectedTechnology.name}</h2>

                <p>{selectedTechnology.text}</p>
              </div>

              {/* PROMPT FINAL */}

              <div className="technology-terminal-prompt">
                <span>{"C:\\portfolio\\technologies>"}</span>

                <span className="technology-terminal-cursor">_</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
