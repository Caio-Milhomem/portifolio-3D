import { Canvas } from "@react-three/fiber";
import { Environment, useGLTF } from "@react-three/drei";

type AboutTabIconProps = {
  modelPath: string;
};

function StaticModel({ modelPath }: AboutTabIconProps) {
  const { scene } = useGLTF(modelPath);

  return <primitive object={scene} scale={1.4} rotation={[0.3, -0.5, 0]} />;
}

export function AboutTabIcon({ modelPath }: AboutTabIconProps) {
  return (
    <div className="about-tab-icon">
      <Canvas
        camera={{
          position: [0, 0, 5],
          fov: 40,
        }}
      >
        <ambientLight intensity={1} />

        <directionalLight position={[3, 4, 5]} intensity={1} />

        <Environment preset="studio" environmentIntensity={0.5} />

        <StaticModel modelPath={modelPath} />
      </Canvas>
    </div>
  );
}
