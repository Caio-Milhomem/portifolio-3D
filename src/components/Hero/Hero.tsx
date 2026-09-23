import { Canvas } from "@react-three/fiber";
import { Model } from "./Model";
import { OrbitControls } from "@react-three/drei";

export default function Hero() {
  return (
    <div className="hero" style={{ width: "100vw", height: "100vh" }}>
      <Canvas camera={{ position: [0, 1, 8], fov: 50 }}>
        <OrbitControls />
        <ambientLight intensity={0.9} />
        <directionalLight color="white" position={[0, 5, 5]} />
        <pointLight position={[10, 10, 10]} />
        <Model scale={3} position={[0, 0, 0]} followMouse={true} />
      </Canvas>
    </div>
  );
}
