import { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";

import "./About.css";

import { AboutModel } from "./AboutModel";
import { AboutTabIcon } from "./AboutTabIcon";

type AboutTab = {
  id: string;
  title: string;
  modelPath: string;
  text: string;
  icon?: string;
  image?: string;
};

const tabs: AboutTab[] = [
  {
    id: "skate",
    title: "Skate",
    icon: "🛹",
    modelPath: "/models/skate.glb",
    text: `
      O skate faz parte da minha vida e representa muito da forma
      como encaro aprendizado, evolução e persistência.

      É algo que exige prática, tentativa, erro e repetição até que
      aquilo que parecia difícil comece a se tornar natural.
    `,
  },
  {
    id: "gamer",
    title: "Gamer",
    icon: "🎮",
    modelPath: "/models/controller.glb",
    text: `
      Games são uma das formas que encontro para me divertir,
      explorar novos mundos e viver experiências diferentes.

      Além da diversão, gosto especialmente da combinação entre
      desafio, estratégia, evolução e tecnologia que os jogos proporcionam.

      É um universo que também alimenta minha curiosidade por tecnologia,
      design e pela forma como experiências digitais são construídas.
    `,
  },
];

const ENABLE_3D_MODELS = false;

export function About() {
  const [activeTab, setActiveTab] = useState(tabs[0].id);

  const selectedTab = tabs.find((tab) => tab.id === activeTab) ?? tabs[0];

  return (
    <div className="about">
      <div className="about-left">
        {/* Abas */}
        <div className="about-tabs">
          {tabs.map((tab) => (
            <button
              type="button"
              key={tab.id}
              className={`about-tab ${activeTab === tab.id ? "active" : ""}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.image ? (
                <img src={tab.image} alt="" className="about-tab-image" />
              ) : (
                <span className="about-tab-icon">{tab.icon}</span>
              )}

              <span>{tab.title}</span>
            </button>
          ))}
        </div>

        {/* Conteúdo */}
        <div className="about-text">
          <span className="about-eyebrow">SOBRE MIM</span>

          <h2>{selectedTab.title}</h2>

          <p>{selectedTab.text}</p>
        </div>
      </div>

      {/* Display */}
      <div className="about-display">
        {ENABLE_3D_MODELS ? (
          <Canvas
            dpr={1}
            gl={{
              antialias: false,
              powerPreference: "high-performance",
            }}
            camera={{
              position: [0, 0, 6],
              fov: 45,
            }}
          >
            <ambientLight intensity={0.7} />

            <directionalLight position={[-4, 6, 5]} intensity={1.2} />

            <Environment preset="studio" environmentIntensity={0.4} />

            <AboutModel modelPath={selectedTab.modelPath} />

            <OrbitControls />
          </Canvas>
        ) : (
          <div className="about-model-placeholder">
            {selectedTab.image ? (
              <img src={selectedTab.image} alt={selectedTab.title} />
            ) : (
              <span>{selectedTab.icon}</span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
