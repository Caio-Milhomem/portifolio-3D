import { useCallback, useState, useEffect } from "react";
import "./App.css";
import Hero from "./components/Hero/Hero";
import { SideMenu } from "./components/SideMenu/SideMenu";
import { HelpButton } from "./components/HelpButton/HelpButton";
import { About } from "./components/About/About";
import { Technologies } from "./components/Technologies/Technologies";
import { Contact } from "./components/Contact/Contact";

const FORCE_LOADING = false; // trava na tela de loading se true

type Theme = "light" | "dark";

type SectionName = "inicio" | "sobre" | "tecnologias" | "contato";

export default function App() {
  const [heroReady, setHeroReady] = useState(false);
  const [theme, setTheme] = useState<Theme>("light");
  const [activeSection, setActiveSection] = useState<SectionName>("inicio");

  const handleHeroReady = useCallback(() => {
    setHeroReady(true);
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

  const helpContent = {
    inicio: {
      title: "Como navegar",
      content: (
        <>
          <p>
            Use o menu na lateral esquerda {"(>)"} para navegar pelas diferentes
            áreas do portfólio ou role a página.
          </p>

          <p>
            O botão no canto superior direito permite alternar entre o tema
            claro e escuro.
          </p>

          <p>Clique no personagem para abrir o menu de animações.</p>
        </>
      ),
    },

    sobre: {
      title: "Sobre esta seção",
      content: (
        <>
          <p>
            Aqui você encontra mais informações sobre mim, minha trajetória e
            minhas áreas de interesse.
          </p>
        </>
      ),
    },

    tecnologias: {
      title: "Tecnologias",
      content: (
        <>
          <p>
            Explore as tecnologias para conhecer algumas das soluções que
            desenvolvi.
          </p>

          <p>Clique em uma tecnologia para visualizar mais detalhes.</p>
        </>
      ),
    },

    contato: {
      title: "Contato",
      content: (
        <>
          <p>
            Nesta seção você encontra os canais para entrar em contato comigo.
          </p>
        </>
      ),
    },
  };

  const currentHelp = helpContent[activeSection];

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

          <HelpButton title={currentHelp.title}>
            {currentHelp.content}
          </HelpButton>
        </>
      )}

      <section id="inicio">
        <Hero
          onReady={handleHeroReady}
          forceLoading={FORCE_LOADING}
          theme={theme}
          isActive={activeSection === "inicio"}
        />
      </section>

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
