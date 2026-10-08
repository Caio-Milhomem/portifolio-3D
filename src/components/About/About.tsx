import { type ReactNode, useState } from "react";

import { Canvas } from "@react-three/fiber";

import { Environment } from "@react-three/drei";

import { AvatarModel } from "../three/AvatarModel";

import { TechKeyButton } from "../ui/TechKeyButton/TechKeyButton";

import { TerminalWindow } from "../ui/TerminalWindow/TerminalWindow";

import "./About.css";

type AboutTabId = "computacao" | "jogos" | "skate";

type AboutTab = {
  id: AboutTabId;

  title: string;

  icon: ReactNode;

  command: string;

  text: string;
};

const tabs: AboutTab[] = [
  {
    id: "computacao",

    title: "Computação",

    icon: (
      <svg
        className="tech-key-svg--stroke"
        viewBox="0 0 15 15"
        aria-hidden="true"
      >
        <path
          d="
            M9.5 14.5H13.5
            C14.0523 14.5 14.5 14.0523 14.5 13.5
            V1.5
            C14.5 0.947715 14.0523 0.5 13.5 0.5
            H9.5
            C8.94772 0.5 8.5 0.947716 8.5 1.5
            V13.5
            C8.5 14.0523 8.94772 14.5 9.5 14.5
            Z

            M9.5 14.5H4

            M6.5 11.5V14.5

            M8.5 5.5H14.5

            M10 11.5H13

            M1.5 3.5H8.5
            V11.5
            H1.5
            C0.947715 11.5 0.5 11.0523 0.5 10.5
            V4.5
            C0.5 3.94772 0.947715 3.5 1.5 3.5
            Z
          "
        />
      </svg>
    ),

    command: "open computacao",

    text: `
A computação representa uma das áreas que mais despertam minha curiosidade.

Gosto especialmente de entender como sistemas, aplicações e experiências digitais são construídos, explorando desenvolvimento, automação e novas tecnologias.

É um espaço onde consigo unir lógica, criatividade e resolução de problemas.
    `.trim(),
  },

  {
    id: "jogos",

    title: "Jogos",

    icon: (
      <svg
        className="tech-key-svg--fill"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          d="
            M7.99999 8.5
            C7.99999 7.94772 7.55227 7.5 6.99999 7.5
            C6.4477 7.5 5.99999 7.94772 5.99999 8.5
            V9
            H5.49999
            C4.9477 9 4.49999 9.44771 4.49999 10
            C4.49999 10.5523 4.9477 11 5.49999 11
            H5.99999
            V11.5
            C5.99999 12.0523 6.4477 12.5 6.99999 12.5
            C7.55227 12.5 7.99999 12.0523 7.99999 11.5
            V11
            H8.49999
            C9.05227 11 9.49999 10.5523 9.49999 10
            C9.49999 9.44771 9.05227 9 8.49999 9
            H7.99999
            V8.5
            Z
          "
        />

        <path
          d="
            M18 8
            C18 8.55229 17.5523 9 17 9
            C16.4477 9 16 8.55229 16 8
            C16 7.44772 16.4477 7 17 7
            C17.5523 7 18 7.44772 18 8
            Z
          "
        />

        <path
          d="
            M17 13
            C17.5523 13 18 12.5523 18 12
            C18 11.4477 17.5523 11 17 11
            C16.4477 11 16 11.4477 16 12
            C16 12.5523 16.4477 13 17 13
            Z
          "
        />

        <path
          d="
            M16 10
            C16 10.5523 15.5523 11 15 11
            C14.4477 11 14 10.5523 14 10
            C14 9.44771 14.4477 9 15 9
            C15.5523 9 16 9.44771 16 10
            Z
          "
        />

        <path
          d="
            M19 11
            C19.5523 11 20 10.5523 20 10
            C20 9.44771 19.5523 9 19 9
            C18.4477 9 18 9.44771 18 10
            C18 10.5523 18.4477 11 19 11
            Z
          "
        />

        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="
            M12 3
            C10.1879 3 7.96237 3.25817 6.21782 3.5093
            C3.94305 3.83676 2.09096 5.51696 1.60993 7.7883
            C1.34074 9.05935 1.07694 10.5622 1.01649 11.8204
            C0.973146 12.7225 0.877981 13.9831 0.777155 15.1923
            C0.672256 16.4504 1.09148 17.7464 1.86079 18.6681
            C2.64583 19.6087 3.88915 20.2427 5.32365 19.8413
            C6.24214 19.5842 6.97608 18.9387 7.5205 18.3026
            C8.07701 17.6525 8.51992 16.9124 8.83535 16.3103
            C9.07821 15.8467 9.50933 15.5855 9.91539 15.5855
            H14.0846
            C14.4906 15.5855 14.9218 15.8467 15.1646 16.3103
            C15.4801 16.9124 15.923 17.6525 16.4795 18.3026
            C17.0239 18.9387 17.7578 19.5842 18.6763 19.8413
            C20.1108 20.2427 21.3541 19.6087 22.1392 18.6681
            C22.9085 17.7464 23.3277 16.4504 23.2228 15.1923
            C23.122 13.9831 23.0268 12.7225 22.9835 11.8204
            C22.923 10.5622 22.6592 9.05935 22.39 7.7883
            C21.909 5.51696 20.0569 3.83676 17.7821 3.5093
            C16.0376 3.25817 13.8121 3 12 3

            Z

            M6.50279 5.48889
            C8.22744 5.24063 10.3368 5 12 5
            C13.6632 5 15.7725 5.24063 17.4972 5.4889
            C18.965 5.70019 20.1311 6.77489 20.4334 8.20267
            C20.6967 9.44565 20.9332 10.8223 20.9858 11.9164
            C21.0309 12.856 21.1287 14.1463 21.2297 15.3585
            C21.2912 16.0956 21.0342 16.8708 20.6037 17.3866
            C20.1889 17.8836 19.7089 18.0534 19.2153 17.9153
            C18.8497 17.8129 18.4327 17.509 17.9989 17.0021
            C17.5771 16.5094 17.2144 15.9131 16.9362 15.3822
            C16.4043 14.3667 15.3482 13.5855 14.0846 13.5855
            H9.91539
            C8.65178 13.5855 7.59571 14.3667 7.06374 15.3822
            C6.78558 15.9131 6.42285 16.5094 6.00109 17.0021
            C5.56723 17.509 5.15027 17.8129 4.78463 17.9153
            C4.29109 18.0534 3.81102 17.8836 3.39625 17.3866
            C2.96576 16.8708 2.70878 16.0956 2.77024 15.3585
            C2.87131 14.1463 2.96904 12.856 3.01418 11.9164
            C3.06675 10.8223 3.30329 9.44565 3.56653 8.20267
            C3.86891 6.77489 5.03497 5.70019 6.50279 5.48889
            Z
          "
        />
      </svg>
    ),

    command: "open jogos",

    text: `
Games são uma das formas que encontro para me divertir, explorar novos mundos e viver experiências diferentes.

Além da diversão, gosto especialmente da combinação entre desafio, estratégia, evolução e tecnologia que os jogos proporcionam.

É um universo que também alimenta minha curiosidade por tecnologia, design e pela forma como experiências digitais são construídas.
    `.trim(),
  },

  {
    id: "skate",

    title: "Skate",

    icon: (
      <svg
        className="tech-key-svg--fill"
        viewBox="0 0 512 512"
        aria-hidden="true"
      >
        <path
          d="
            M477.521 46.197
            L465.779 34.45
            C419.88 -11.446 345.202 -11.448 299.305 34.45
            L139.686 194.069
            L150.452 204.834
            L310.07 45.216
            C350.029 5.257 415.052 5.257 455.011 45.216
            L466.754 56.963
            C486.112 76.321 496.773 102.058 496.773 129.434
            C496.773 156.81 486.112 182.547 466.752 201.904
            L201.928 466.73
            C182.571 486.088 156.834 496.748 129.457 496.748
            C102.082 496.748 76.345 486.088 56.987 466.73
            L45.241 454.985
            C25.884 435.627 15.224 409.89 15.224 382.514
            C15.224 355.138 25.885 329.401 45.241 310.044
            L132.953 222.33
            L122.187 211.565
            L34.475 299.279
            C12.244 321.51 0 351.071 0 382.514
            C0 413.957 12.244 443.517 34.477 465.751
            L46.223 477.496
            C68.455 499.729 98.016 511.973 129.459 511.973
            C160.903 511.973 190.462 499.729 212.696 477.496
            L477.52 212.668
            C499.754 190.436 512 160.876 512 129.432
            C512 97.99 499.754 68.43 477.521 46.197
            Z
          "
        />

        <path
          d="
            M451.279 72.44
            L440.513 83.205
            C453.345 96.036 460.291 113.83 459.575 132.027
            L474.788 132.627
            C475.671 110.201 467.103 88.264 451.279 72.44
            Z
          "
        />

        <path
          d="
            M415.058 134.246
            L396.391 152.913
            L359.063 115.584
            L377.728 96.919
            L333.526 52.717
            L257.437 128.807
            L301.639 173.008
            L320.304 154.343
            L357.635 191.671
            L338.969 210.337
            L383.169 254.538
            L459.259 178.451
            L415.058 134.246
            Z

            M309.536 143.577
            L301.638 151.477
            L278.967 128.807
            L333.525 74.248
            L356.196 96.919
            L348.297 104.818
            L309.536 143.577
            Z

            M331.068 143.578
            L348.298 126.348
            L385.625 163.678
            L368.398 180.905
            L331.068 143.578
            Z

            M360.499 210.336
            L368.399 202.436
            L407.158 163.677
            L415.059 155.776
            L437.728 178.448
            L383.169 233.005
            L360.499 210.336
            Z
          "
        />

        <path
          d="
            M210.364 338.942
            L191.699 357.606
            L154.369 320.275
            L173.035 301.61
            L128.833 257.409
            L52.744 333.498
            L96.944 377.7
            L115.609 359.036
            L152.94 396.367
            L134.274 415.032
            L178.476 459.233
            L254.565 383.143
            L210.364 338.942
            Z

            M104.843 348.27
            L96.944 356.169
            L74.274 333.499
            L128.832 278.941
            L151.503 301.612
            L143.604 309.511
            L104.843 348.27
            Z

            M126.374 348.27
            L143.604 331.041
            L180.932 368.368
            L163.702 385.598
            L126.374 348.27
            Z

            M155.805 415.031
            L210.364 360.473
            L233.034 383.142
            L178.476 437.701
            L155.805 415.031
            Z
          "
        />
      </svg>
    ),

    command: "open skate",

    text: `
O skate faz parte da minha vida e representa muito da forma como encaro aprendizado, evolução e persistência.

É algo que exige prática, tentativa, erro e repetição até que aquilo que parecia difícil comece a se tornar natural.
    `.trim(),
  },
];

export function About() {
  const [activeTab, setActiveTab] = useState<AboutTabId | null>(null);

  const selectedTab = activeTab
    ? (tabs.find((tab) => tab.id === activeTab) ?? null)
    : null;

  function toggleTab(tabId: AboutTabId) {
    setActiveTab((current) => (current === tabId ? null : tabId));
  }

  return (
    <section className="about" id="about">
      {/* ============================
            BOTÕES
        ============================ */}

      <div className="about-key-list">
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

      <div className="about-avatar">
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
          INTERFACE
      ============================ */}

      <div className={`about-interface ${selectedTab ? "has-selection" : ""}`}>
        {/* ============================
            TERMINAL
        ============================ */}

        <div className="about-terminal-area">
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
