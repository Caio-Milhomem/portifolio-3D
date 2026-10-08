export type SectionName = "inicio" | "sobre" | "tecnologias" | "contato";

type HelpContentItem = {
  title: string;
  content: React.ReactNode;
};

export const helpContent: Record<SectionName, HelpContentItem> = {
  inicio: {
    title: "Como navegar",
    content: (
      <>
        <p>
          Use o menu na lateral esquerda {"(>)"} para navegar pelas diferentes
          áreas do portfólio ou role a página.
        </p>

        <p>O botão de tema permite alternar entre o tema claro e escuro.</p>

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
