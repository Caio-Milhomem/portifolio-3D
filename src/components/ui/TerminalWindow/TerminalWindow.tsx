import { useEffect, useState } from "react";

import "./TerminalWindow.css";

type TerminalWindowProps = {
  open: boolean;

  title?: string;

  command: string;

  heading: string;

  text: string;

  confirmAccentColor?: string;

  onClose?: () => void;

  confirmQuestion?: string;

  onConfirmYes?: () => void;

  onConfirmNo?: () => void;
};

export function TerminalWindow({
  open,

  title = "terminal.exe",

  command,

  heading,

  text,

  onClose,

  confirmQuestion,

  confirmAccentColor,

  onConfirmYes,

  onConfirmNo,
}: TerminalWindowProps) {
  const [typedText, setTypedText] = useState("");

  const [answer, setAnswer] = useState("");

  /* ==============================
     TYPING
  ============================== */

  useEffect(() => {
    setAnswer("");

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
  }, [open, text, command]);

  if (!open) {
    return null;
  }

  const typingFinished = typedText.length >= text.length;

  function handleAnswer(value: string) {
    const normalized = value.slice(-1).toUpperCase();

    if (normalized === "" || normalized === "S" || normalized === "N") {
      setAnswer(normalized);
    }
  }

  function submitAnswer() {
    if (answer === "S") {
      onConfirmYes?.();

      return;
    }

    if (answer === "N") {
      onConfirmNo?.();
    }
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

            {!typingFinished && (
              <span className="terminal-window-cursor">_</span>
            )}
          </p>
        </div>

        {/* ============================
            CONFIRMAÇÃO
        ============================ */}

        {typingFinished && confirmQuestion && (
          <div className="terminal-window-confirm">
            <div className="terminal-window-question">
              {confirmQuestion} <span>[S/N]</span>
            </div>

            <div className="terminal-window-input-line">
              <span className="terminal-window-path">{"C:\\portfolio>"}</span>

              <input
                autoFocus
                type="text"
                value={answer}
                maxLength={1}
                spellCheck={false}
                autoComplete="off"
                aria-label="Responder S ou N"
                onChange={(event) => handleAnswer(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    submitAnswer();
                  }
                }}
              />

              {!answer && <span className="terminal-window-cursor">_</span>}
            </div>
          </div>
        )}

        {/* PROMPT NORMAL */}

        {!confirmQuestion && (
          <div className="terminal-window-prompt">
            <span>{"C:\\portfolio>"}</span>
          </div>
        )}
      </div>
    </div>
  );
}
