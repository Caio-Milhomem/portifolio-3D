import "./EmoteMenu.css";
import type { ActionName } from "../../hooks/useCharacterAnimations";

type EmoteMenuProps = {
  onSelect: (action: ActionName) => void;
};

const emotes: {
  label: string;
  action: ActionName;
}[] = [
  {
    label: "Boxe",
    action: "box_01.001",
  },
  {
    label: "Concordar",
    action: "agree.001",
  },
  {
    label: "Olhar ao redor",
    action: "look_around.001",
  },
  {
    label: "Alongar",
    action: "scratch.001",
  },
  {
    label: "Cumprimentar",
    action: "greet_01.001",
  },
  {
    label: "Correr",
    action: "run.001",
  },
  {
    label: "Sentar",
    action: "sit.001",
  },
  {
    label: "Caminhar",
    action: "walk.001",
  },
  {
    label: "Frustrado",
    action: "frustrated_01.001",
  },
  {
    label: "Estrelinha",
    action: "flip.001",
  },
  {
    label: "Braços cruzados",
    action: "fold_arms.001",
  },
  {
    label: "Reverência",
    action: "bow.001",
  },
];

export function EmoteMenu({ onSelect }: EmoteMenuProps) {
  return (
    <div className="emote-menu">
      <div className="emote-menu-title">Escolha uma animação</div>

      <div className="emote-menu-grid">
        {emotes.map((emote) => (
          <button
            key={emote.action}
            className="emote-option"
            onClick={() => onSelect(emote.action)}
          >
            {emote.label}
          </button>
        ))}
      </div>
    </div>
  );
}
