import { type ReactNode } from "react";

import "./TechKeyButton.css";

type TechKeyButtonProps = {
  icon: ReactNode;
  active?: boolean;
  disabled?: boolean;
  onClick?: () => void;
};

export function TechKeyButton({
  icon,
  active = false,
  disabled = false,
  onClick,
}: TechKeyButtonProps) {
  return (
    <div className={`tech-key-hole ${active ? "tech-key-hole--active" : ""}`}>
      <button
        type="button"
        className={`tech-key-button ${active ? "tech-key-button--active" : ""}`}
        disabled={disabled}
        onClick={onClick}
      >
        {/* ============================
            TOPO DA TECLA
        ============================ */}

        <div className="tech-key-top">
          <div className="tech-key-symbol">{icon}</div>
        </div>

        {/* ============================
            LATERAL / PROFUNDIDADE
        ============================ */}

        <div className="tech-key-bottom" />

        {/* ============================
            BASE
        ============================ */}

        <div className="tech-key-base" />
      </button>
    </div>
  );
}
