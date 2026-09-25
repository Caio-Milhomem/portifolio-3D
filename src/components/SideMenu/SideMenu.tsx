import { useState } from "react";
import "./SideMenu.css";

export function SideMenu() {
  const [isOpen, setIsOpen] = useState(false);

  function scrollToSection(id: string) {
    const section = document.getElementById(id);

    if (!section) return;

    section.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }

  return (
    <nav className={`side-menu ${isOpen ? "open" : ""}`}>
      <div className="terminal">
        <div className="terminal-header">
          <span>portfolio.exe</span>

          <div className="terminal-controls">
            <span>─</span>
            <span>□</span>
            <span>×</span>
          </div>
        </div>

        <div className="terminal-content">
          <p className="terminal-command">C:\portfolio&gt; dir</p>

          <div className="terminal-options">
            <button onClick={() => scrollToSection("inicio")}>
              <span>&gt;</span> inicio
            </button>

            <button onClick={() => scrollToSection("sobre")}>
              <span>&gt;</span> sobre
            </button>

            <button onClick={() => scrollToSection("projetos")}>
              <span>&gt;</span> projetos
            </button>

            <button onClick={() => scrollToSection("contato")}>
              <span>&gt;</span> contato
            </button>
          </div>

          <div className="terminal-prompt">
            C:\portfolio&gt;
            <span className="cursor" />
          </div>
        </div>
      </div>

      <button
        className="side-menu-toggle"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
      >
        {isOpen ? "‹" : "›"}
      </button>
    </nav>
  );
}
