import { useCallback, useEffect, useState } from "react";

import "./App.css";

import Hero from "./components/Hero/Hero";

import { SideMenu } from "./components/SideMenu/SideMenu";

import { HelpButton } from "./components/HelpButton/HelpButton";

import { About } from "./components/About/About";

import { Technologies } from "./components/Technologies/Technologies";

import { Contact } from "./components/Contact/Contact";

import { ResumeButton } from "./components/ResumeButton/ResumeButton";

import {
  helpContent,
  type SectionName,
} from "./components/HelpButton/HelpContent";

import { ThemeButton } from "./components/ThemeButton/ThemeButton";

import { preloadTechnologyAscii } from "./components/Technologies/TechnologyAsciiCache";

const FORCE_LOADING = false;

type Theme = "light" | "dark";

export default function App() {
  const [heroReady, setHeroReady] = useState(false);

  const [asciiReady, setAsciiReady] = useState(false);

  const [theme, setTheme] = useState<Theme>("light");

  const [activeSection, setActiveSection] = useState<SectionName>("inicio");

  const handleHeroReady = useCallback(() => {
    setHeroReady(true);
  }, []);

  useEffect(() => {
    preloadTechnologyAscii()
      .then(() => {
        setAsciiReady(true);
      })
      .catch((error) => {
        console.error("Erro no preload dos ASCII:", error);

        // Evita travar o site caso algum ASCII falhe.
        setAsciiReady(true);
      });
  }, []);

  function toggleTheme() {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  }

  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>("section[id]");

    function updateActiveSection() {
      const viewportCenter = window.innerHeight / 2;

      for (const section of sections) {
        const rect = section.getBoundingClientRect();

        const isInCenter =
          rect.top <= viewportCenter && rect.bottom >= viewportCenter;

        if (isInCenter) {
          setActiveSection(section.id as SectionName);

          break;
        }
      }
    }

    updateActiveSection();

    window.addEventListener("scroll", updateActiveSection);

    window.addEventListener("resize", updateActiveSection);

    return () => {
      window.removeEventListener("scroll", updateActiveSection);

      window.removeEventListener("resize", updateActiveSection);
    };
  }, []);

  const currentHelp = helpContent[activeSection];

  return (
    <main className="app" data-theme={theme}>
      {/* ============================
          INTERFACE GLOBAL
      ============================ */}

      {heroReady && !FORCE_LOADING && (
        <>
          <SideMenu />

          {/* TEMA - CANTO SUPERIOR DIREITO */}
          <ThemeButton theme={theme} onToggle={toggleTheme} />

          {/* DOWNLOAD + AJUDA - CANTO INFERIOR DIREITO */}
          <div className="global-actions">
            <ResumeButton />

            <HelpButton title={currentHelp.title}>
              {currentHelp.content}
            </HelpButton>
          </div>
        </>
      )}

      {/* ============================
          HERO
      ============================ */}

      <section id="inicio">
        <Hero
          onReady={handleHeroReady}
          forceLoading={FORCE_LOADING}
          preloadReady={asciiReady}
          theme={theme}
          isActive={activeSection === "inicio"}
        />
      </section>

      {/* ============================
          DEMAIS SEÇÕES
      ============================ */}

      {heroReady && !FORCE_LOADING && (
        <>
          <section id="sobre">
            <About />
          </section>

          <section id="tecnologias">
            <Technologies isActive={activeSection === "tecnologias"} />
          </section>

          <section id="contato">
            <Contact />
          </section>
        </>
      )}
    </main>
  );
}
