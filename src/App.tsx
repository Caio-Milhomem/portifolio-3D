import { useCallback, useState } from "react";

import Hero from "./components/Hero/Hero";
import { SideMenu } from "./components/SideMenu/SideMenu";

const FORCE_LOADING = false;

export default function App() {
  const [heroReady, setHeroReady] = useState(false);

  const handleHeroReady = useCallback(() => {
    setHeroReady(true);
  }, []);

  return (
    <>
      {heroReady && !FORCE_LOADING && <SideMenu />}

      <section id="inicio">
        <Hero onReady={handleHeroReady} forceLoading={FORCE_LOADING} />
      </section>

      <section id="sobre">{/* Sobre */}</section>

      <section id="projetos">{/* Projetos */}</section>
    </>
  );
}
