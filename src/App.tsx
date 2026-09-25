import { useCallback, useState } from "react";
import "./App.css";
import Hero from "./components/Hero/Hero";
import { SideMenu } from "./components/SideMenu/SideMenu";

const FORCE_LOADING = false; // trava na tela de loading se true

type Theme = "light" | "dark";

export default function App() {
  const [heroReady, setHeroReady] = useState(false);
  const [theme, setTheme] = useState<Theme>("light");

  const handleHeroReady = useCallback(() => {
    setHeroReady(true);
  }, []);

  function toggleTheme() {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  }

  return (
    <main className="app" data-theme={theme}>
      {/* Interface só aparece depois do carregamento */}
      {heroReady && !FORCE_LOADING && (
        <>
          <button
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label="Alternar tema"
          >
            <span className="theme-icon-wrapper">
              <span className="moon-icon" />
              <span className="sun-icon">☀</span>
            </span>
          </button>

          <SideMenu />
        </>
      )}

      <section id="inicio">
        <Hero
          onReady={handleHeroReady}
          forceLoading={FORCE_LOADING}
          theme={theme}
        />
      </section>

      <section id="sobre">{/* Sobre */}</section>

      <section id="projetos">{/* Projetos */}</section>
    </main>
  );
}
