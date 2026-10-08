import { useState } from "react";

import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";

import { AvatarModel } from "../three/AvatarModel";
import { TechKeyButton } from "../ui/TechKeyButton/TechKeyButton";
import { TerminalWindow } from "../ui/TerminalWindow/TerminalWindow";

import { tabs, type AboutTabId } from "./AboutTabs";

import "./About.css";

export function About() {
  const [activeTab, setActiveTab] = useState<AboutTabId | null>(null);

  const selectedTab = activeTab
    ? (tabs.find((tab) => tab.id === activeTab) ?? null)
    : null;

  function toggleTab(tabId: AboutTabId) {
    setActiveTab((current) => (current === tabId ? null : tabId));
  }

  function closeAboutLayout() {
    if (!activeTab) {
      return;
    }

    setActiveTab(null);
  }

  return (
    <section
      className={`about ${selectedTab ? "about--active" : "about--idle"}`}
      id="about"
      onClick={closeAboutLayout}
    >
      {/* ============================
          BOTÕES
      ============================ */}

      <div
        className="about-key-list"
        onClick={(event) => {
          event.stopPropagation();
        }}
      >
        {tabs.map((tab) => (
          <div
            key={tab.id}
            className={`about-key-item ${activeTab === tab.id ? "active" : ""}`}
          >
            <TechKeyButton
              active={activeTab === tab.id}
              onClick={() => {
                toggleTab(tab.id);
              }}
              icon={tab.icon}
            />

            <span className="about-key-label">{tab.title}</span>
          </div>
        ))}
      </div>

      {/* ============================
          AVATAR
      ============================ */}

      <div
        className="about-avatar"
        onPointerDown={(event) => {
          event.stopPropagation();
        }}
        onClick={(event) => {
          event.stopPropagation();
        }}
      >
        <Canvas
          dpr={1}
          frameloop="always"
          camera={{
            position: [0, 1.3, 6],
            fov: 45,
          }}
        >
          <ambientLight intensity={0.4} />

          <directionalLight position={[-4, 6, 5]} intensity={0.8} />

          <Environment preset="studio" environmentIntensity={0.15} />

          <AvatarModel
            scale={2.3}
            position={[0, -2.2, 0]}
            rotation={[0, 0, 0]}
            activeAction="idle.001"
            followMouse={true}
          />
        </Canvas>
      </div>

      {/* ============================
          TERMINAL
      ============================ */}

      <div className={`about-interface ${selectedTab ? "has-selection" : ""}`}>
        <div
          className="about-terminal-area"
          onPointerDown={(event) => {
            event.stopPropagation();
          }}
          onClick={(event) => {
            event.stopPropagation();
          }}
        >
          {selectedTab && (
            <TerminalWindow
              open
              title="about.exe"
              command={selectedTab.command}
              heading={selectedTab.title}
              text={selectedTab.text}
              onClose={() => {
                setActiveTab(null);
              }}
            />
          )}
        </div>
      </div>
    </section>
  );
}
