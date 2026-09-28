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
};

const tabs: AboutTab[] = [
  {
    id: "skate",
    title: "Skate",
    modelPath: "/models/skate.glb",
    text: `
      O skate faz parte da minha vida e representa muito da forma
      como encaro aprendizado, evolução e persistência.

      É algo que exige prática, tentativa, erro e repetição até que
      aquilo que parecia difícil comece a se tornar natural.
    `,
  },
];

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
              key={tab.id}
              className={`about-tab ${activeTab === tab.id ? "active" : ""}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <AboutTabIcon modelPath={tab.modelPath} />

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

      {/* Display 3D */}
      <div className="about-display">
        <Canvas
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
      </div>
    </div>
  );
}
