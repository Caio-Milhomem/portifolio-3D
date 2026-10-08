import "./ThemeButton.css";

type Theme = "light" | "dark";

type ThemeButtonProps = {
  theme: Theme;
  onToggle: () => void;
};

export function ThemeButton({ theme, onToggle }: ThemeButtonProps) {
  return (
    <button
      type="button"
      className="theme-toggle global-action-button"
      onClick={onToggle}
      aria-label="Alternar tema"
      title="Alternar tema"
    >
      <span className="theme-icon-wrapper">
        <span className="moon-icon" />
        <span className="sun-icon">☀</span>
      </span>
    </button>
  );
}
