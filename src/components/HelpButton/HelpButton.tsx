import { useState } from "react";

import "./HelpButton.css";

type HelpButtonProps = {
  title: string;

  children: React.ReactNode;
};

export function HelpButton({ title, children }: HelpButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`help-container ${isOpen ? "open" : ""}`}>
      {/* ============================
          CAIXA
      ============================ */}

      <div className="help-content">
        <div className="help-header">
          <strong>{title}</strong>

          <button
            type="button"
            className="help-close"
            onClick={() => {
              setIsOpen(false);
            }}
            aria-label="Fechar ajuda"
          >
            ×
          </button>
        </div>

        <div className="help-body">{children}</div>
      </div>

      {/* ============================
          BOTÃO
      ============================ */}

      <button
        type="button"
        className="help-button global-action-button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label="Ajuda"
        title="Ajuda"
      >
        ?
      </button>
    </div>
  );
}
