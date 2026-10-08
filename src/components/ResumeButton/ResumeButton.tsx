import "./ResumeButton.css";

export function ResumeButton() {
  return (
    <a
      href="/files/curriculo-caio-milhomem.pdf"
      download="Curriculo-Caio-Milhomem.pdf"
      className="
        resume-button
        global-action-button
      "
      aria-label="Baixar currículo"
      title="Baixar currículo"
    >
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path
          d="
            M12 3
            V15

            M12 15
            L7.5 10.5

            M12 15
            L16.5 10.5

            M5 19
            H19
          "
        />
      </svg>
    </a>
  );
}
