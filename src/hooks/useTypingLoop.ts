import { useEffect, useRef, useState } from "react";

type Correction = {
  correctChar: string;
  stage: "wrong" | "deleted";
} | null;

const keyboardNeighbors: Record<string, string[]> = {
  a: ["s", "q"],
  b: ["v", "n"],
  c: ["x", "v"],
  d: ["s", "f"],
  e: ["w", "r"],
  f: ["d", "g"],
  g: ["f", "h"],
  h: ["g", "j"],
  i: ["u", "o"],
  j: ["h", "k"],
  k: ["j", "l"],
  l: ["k"],
  m: ["n"],
  n: ["b", "m"],
  o: ["i", "p"],
  p: ["o"],
  q: ["w", "a"],
  r: ["e", "t"],
  s: ["a", "d"],
  t: ["r", "y"],
  u: ["y", "i"],
  v: ["c", "b"],
  w: ["q", "e"],
  x: ["z", "c"],
  y: ["t", "u"],
  z: ["x"],
};

function getReusablePrefixLength(current: string, next: string) {
  let index = 0;

  const currentLower = current.toLowerCase();
  const nextLower = next.toLowerCase();

  // Descobre quantos caracteres iniciais são iguais
  while (
    index < current.length &&
    index < next.length &&
    currentLower[index] === nextLower[index]
  ) {
    index++;
  }

  // Queremos preservar palavras completas
  const commonPart = current.slice(0, index);

  const lastSpace = commonPart.lastIndexOf(" ");

  if (lastSpace === -1) {
    return 0;
  }

  return lastSpace + 1;
}

function randomDelay(base: number, variation = 0.45) {
  const factor = 1 + (Math.random() * 2 - 1) * variation;

  return Math.max(20, base * factor);
}

function typingDelay(char: string, base: number) {
  let delay = randomDelay(base);

  // Humanos costumam fazer uma pequena pausa no espaço
  if (char === " ") {
    delay += randomDelay(30);
  }

  // Pausa maior depois de pontuação
  if (/[,.!?;:]/.test(char)) {
    delay += randomDelay(150);
  }

  return delay;
}

function getWrongCharacter(char: string) {
  const lower = char.toLowerCase();
  const options = keyboardNeighbors[lower];

  if (!options) {
    return char;
  }

  const wrong = options[Math.floor(Math.random() * options.length)];

  return char === lower ? wrong : wrong.toUpperCase();
}

function removeLastCharacter(text: string) {
  return Array.from(text).slice(0, -1).join("");
}

export function useTypingLoop(
  phrases: string[],
  typingSpeed = 70,
  deletingSpeed = 35,
  pauseTime = 1500,
  errorRate = 0.5,
) {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [visibleText, setVisibleText] = useState("");
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [correction, setCorrection] = useState<Correction>(null);

  const lastMistakeIndex = useRef(-10);

  const currentPhrase = phrases[phraseIndex] ?? "";

  const nextPhraseIndex = (phraseIndex + 1) % phrases.length;

  const nextPhrase = phrases[nextPhraseIndex] ?? "";

  const reusablePrefixLength = getReusablePrefixLength(
    currentPhrase,
    nextPhrase,
  );

  const characters = Array.from(currentPhrase);

  useEffect(() => {
    if (!phrases.length) return;

    let timeout: ReturnType<typeof setTimeout>;

    // -------------------------
    // Apagando frase inteira
    // -------------------------

    if (isDeleting) {
      if (visibleText.length <= reusablePrefixLength) {
        timeout = setTimeout(() => {
          setIsDeleting(false);

          setPhraseIndex(nextPhraseIndex);

          setCharIndex(reusablePrefixLength);
        }, randomDelay(250));

        return () => clearTimeout(timeout);
      }

      timeout = setTimeout(
        () => {
          setVisibleText((prev) => removeLastCharacter(prev));
        },
        randomDelay(deletingSpeed, 0.35),
      );

      return () => clearTimeout(timeout);
    }

    // -------------------------
    // Percebeu que digitou errado
    // -------------------------

    if (correction?.stage === "wrong") {
      timeout = setTimeout(
        () => {
          setVisibleText((prev) => removeLastCharacter(prev));

          setCorrection({
            ...correction,
            stage: "deleted",
          });
        },
        randomDelay(300, 0.5),
      );

      return () => clearTimeout(timeout);
    }

    // -------------------------
    // Digita a letra correta
    // -------------------------

    if (correction?.stage === "deleted") {
      timeout = setTimeout(() => {
        setVisibleText((prev) => prev + correction.correctChar);

        setCharIndex((prev) => prev + 1);
        setCorrection(null);
      }, randomDelay(typingSpeed));

      return () => clearTimeout(timeout);
    }

    // -------------------------
    // Terminou a frase
    // -------------------------

    if (charIndex >= characters.length) {
      timeout = setTimeout(
        () => {
          setIsDeleting(true);
        },
        pauseTime + Math.random() * 500,
      );

      return () => clearTimeout(timeout);
    }

    // -------------------------
    // Próxima letra
    // -------------------------

    const correctChar = characters[charIndex];

    const canMakeMistake =
      keyboardNeighbors[correctChar.toLowerCase()] !== undefined;

    const enoughDistanceFromLastMistake =
      charIndex - lastMistakeIndex.current > 5;

    const shouldMakeMistake =
      canMakeMistake &&
      enoughDistanceFromLastMistake &&
      Math.random() < errorRate;

    timeout = setTimeout(
      () => {
        if (shouldMakeMistake) {
          const wrongChar = getWrongCharacter(correctChar);

          setVisibleText((prev) => prev + wrongChar);

          setCorrection({
            correctChar,
            stage: "wrong",
          });

          lastMistakeIndex.current = charIndex;

          return;
        }

        setVisibleText((prev) => prev + correctChar);

        setCharIndex((prev) => prev + 1);
      },
      typingDelay(correctChar, typingSpeed),
    );

    return () => clearTimeout(timeout);
  }, [
    visibleText,
    charIndex,
    phraseIndex,
    isDeleting,
    correction,
    currentPhrase,
    phrases.length,
    typingSpeed,
    deletingSpeed,
    pauseTime,
    errorRate,
  ]);

  return visibleText;
}
