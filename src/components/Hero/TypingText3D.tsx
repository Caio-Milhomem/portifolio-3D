import { Text3D } from "@react-three/drei";
import { useEffect, useState } from "react";
import { useTypingLoop } from "../../hooks/useTypingLoop";

type TypingText3DProps = {
  phrases: string[];
  speed?: number;
  color?: string;
};

export function TypingText3D({
  phrases,
  speed = 70,
  color = "#111111",
}: TypingText3DProps) {
  const visibleText = useTypingLoop(phrases, speed);

  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <Text3D
      font="/fonts/ChakraPetch-Regular.typeface.json"
      size={0.5}
      height={0.08}
      curveSegments={12}
      bevelEnabled
      bevelThickness={0.015}
      bevelSize={0.01}
    >
      {visibleText}
      {showCursor ? "|" : " "}

      <meshStandardMaterial color={color} roughness={0.7} metalness={0} />
    </Text3D>
  );
}
