import { useEffect, useState } from "react";
import "./TerminalWindow.css";

type TechKeyButtonProps = {
  iconSrc: string;

  iconAlt?: string;

  active?: boolean;

  disabled?: boolean;

  onClick?: () => void;
};

export function TechKeyButton({
  iconSrc,
  iconAlt = "",
  active = false,
  disabled = false,
  onClick,
}: TechKeyButtonProps) {
  const [pressed, setPressed] = useState(false);

  return (
    <div
      className={[
        "tech-key",
        active ? "tech-key--active" : "",
        pressed ? "tech-key--pressed" : "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {/* ============================
          GLOW EXTERNO
      ============================ */}

      <div className="tech-key-glow" />

      {/* ============================
          BASE
      ============================ */}

      <div className="tech-key-base">
        <div className="tech-key-base-shine" />
      </div>

      {/* ============================
          BOTÃO
      ============================ */}

      <button
        type="button"
        className="tech-key-button"
        disabled={disabled}
        onPointerDown={() => {
          setPressed(true);
        }}
        onPointerUp={() => {
          setPressed(false);
        }}
        onPointerLeave={() => {
          setPressed(false);
        }}
        onPointerCancel={() => {
          setPressed(false);
        }}
        onClick={onClick}
      >
        {/* ============================
            CANTOS / REFLEXOS
        ============================ */}

        <div className="tech-key-corners" />

        {/* ============================
            SUPERFÍCIE INTERNA
        ============================ */}

        <div className="tech-key-inner">
          <div className="tech-key-symbol">
            <img src={iconSrc} alt={iconAlt} draggable={false} />
          </div>
        </div>
      </button>

      {/* ============================
          LED
      ============================ */}

      <div className="tech-key-led" />
    </div>
  );
}

type TerminalWindowProps = {
  open: boolean;

  title?: string;

  command: string;

  heading: string;

  text: string;

  onClose?: () => void;
};

export function TerminalWindow({
  open,
  title = "terminal.exe",
  command,
  heading,
  text,
  onClose,
}: TerminalWindowProps) {
  const [typedText, setTypedText] = useState("");

  /* ==============================
     TYPING
  ============================== */

  useEffect(() => {
    if (!open) {
      setTypedText("");

      return;
    }

    let index = 0;

    setTypedText("");

    const interval = window.setInterval(() => {
      index += 1;

      setTypedText(text.slice(0, index));

      if (index >= text.length) {
        window.clearInterval(interval);
      }
    }, 18);

    return () => {
      window.clearInterval(interval);
    };
  }, [open, text]);

  if (!open) {
    return null;
  }

  return (
    <div
      className="terminal-window"
      onClick={(event) => {
        event.stopPropagation();
      }}
    >
      {/* ============================
          CABEÇALHO
      ============================ */}

      <div className="terminal-window-header">
        <span>{title}</span>

        <div className="terminal-window-controls">
          <span>—</span>

          <span>□</span>

          <button
            type="button"
            className="terminal-window-close"
            onClick={onClose}
          >
            ×
          </button>
        </div>
      </div>

      {/* ============================
          CONTEÚDO
      ============================ */}

      <div className="terminal-window-content">
        {/* COMANDO */}

        <div className="terminal-window-command">
          <span className="terminal-window-path">{"C:\\portfolio>"}</span>

          <span> {command}</span>
        </div>

        {/* RESULTADO */}

        <div className="terminal-window-result">
          <h2>{heading}</h2>

          <p>
            {typedText}

            <span className="terminal-window-cursor">_</span>
          </p>
        </div>

        {/* PROMPT */}

        <div className="terminal-window-prompt">
          <span>{"C:\\portfolio>"}</span>
        </div>
      </div>
    </div>
  );
}
