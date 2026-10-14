import { useEffect, useState } from "react";

import { useProgress } from "@react-three/drei";

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

import { preloadSiteAssets } from "./components/loading/PreloadSiteAssets";

const FORCE_LOADING = false;

type Theme = "light" | "dark";

export default function App() {
  /* ==============================
     TEMA / NAVEGAÇÃO
  ============================== */

  const [theme, setTheme] = useState<Theme>("light");

  const [activeSection, setActiveSection] = useState<SectionName>("inicio");

  /* ==============================
     LOADING GLOBAL
  ============================== */

  const [staticAssetsReady, setStaticAssetsReady] = useState(false);

  const [minimumLoadingDone, setMinimumLoadingDone] = useState(false);

  const [threeLoadingStarted, setThreeLoadingStarted] = useState(false);

  /*
   * Depois que siteReady vira true,
   * nunca volta para false.
   */
  const [siteReady, setSiteReady] = useState(false);

  /*
   * useProgress observa o
   * THREE.DefaultLoadingManager.
   *
   * Isso inclui loaders usados
   * pelo Drei/Three.
   */
  const { active, loaded, total } = useProgress();

  /* ==============================
     ASSETS ESTÁTICOS
  ============================== */

  useEffect(() => {
    let cancelled = false;

    preloadSiteAssets()
      .then(() => {
        if (cancelled) {
          return;
        }

        setStaticAssetsReady(true);
      })
      .catch((error) => {
        /*
         * Como a regra agora é:
         *
         * "só libera se TUDO
         * carregou",
         *
         * não marcamos ready
         * em caso de erro.
         */
        console.error("Erro no preload do site:", error);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  /* ==============================
     THREE COMEÇOU A CARREGAR
  ============================== */

  useEffect(() => {
    if (total > 0) {
      setThreeLoadingStarted(true);
    }
  }, [total]);

  const threeReady =
    threeLoadingStarted && !active && total > 0 && loaded >= total;

  /* ==============================
     TEMPO MÍNIMO DO LOADING
  ============================== */

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setMinimumLoadingDone(true);
    }, 1800);

    return () => {
      window.clearTimeout(timer);
    };
  }, []);

  /* ==============================
     SITE PRONTO
  ============================== */

  useEffect(() => {
    if (siteReady) {
      return;
    }

    if (!staticAssetsReady || !threeReady || !minimumLoadingDone) {
      return;
    }

    setSiteReady(true);
  }, [staticAssetsReady, threeReady, minimumLoadingDone, siteReady]);

  const canShowSite = siteReady && !FORCE_LOADING;

  /* ==============================
     TRAVA SCROLL DURANTE LOADING
  ============================== */

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;

    if (!canShowSite) {
      document.body.style.overflow = "hidden";

      window.scrollTo({
        top: 0,
        left: 0,
      });
    } else {
      document.body.style.overflow = previousOverflow;
    }

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [canShowSite]);

  /* ==============================
     TEMA
  ============================== */

  function toggleTheme() {
    setTheme((current) => (current === "light" ? "dark" : "light"));
  }

  /* ==============================
     SEÇÃO ATIVA
  ============================== */

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

      {canShowSite && (
        <>
          <SideMenu />

          <ThemeButton theme={theme} onToggle={toggleTheme} />

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

          Continua sendo onde a
          tela de loading aparece.
      ============================ */}

      <section id="inicio">
        <Hero
          forceLoading={FORCE_LOADING}
          theme={theme}
          isActive={canShowSite && activeSection === "inicio"}
          preloadReady={canShowSite}
        />
      </section>

      {/* ============================
          ABOUT

          IMPORTANTE:
          já existe desde o começo.
          Não precisa estar ativo.
      ============================ */}

      <section id="sobre">
        <About />
      </section>

      {/* ============================
          TECNOLOGIAS
      ============================ */}

      <section id="tecnologias">
        <Technologies
          isActive={canShowSite && activeSection === "tecnologias"}
        />
      </section>

      {/* ============================
          CONTACT
      ============================ */}

      <section id="contato">
        <Contact />
      </section>
    </main>
  );
}
