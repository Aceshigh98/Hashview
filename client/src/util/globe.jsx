import React from "react";
import { Scene, PerspectiveCamera, Vector3 } from "three";
import ThreeGlobe from "three-globe";
import { Canvas, extend } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import countries from "../components/data/globe.json";

extend({ ThreeGlobe }); // Extend Three.js with ThreeGlobe

const aspect = 1.2;
const cameraZ = 300;

function Globe() {
  const globe = new ThreeGlobe()
    .hexPolygonsData(countries.features)
    .hexPolygonResolution(3)
    .hexPolygonMargin(0.7)
    .showAtmosphere(true)
    .atmosphereColor("#F6931A")
    .atmosphereAltitude(0.1)
    .hexPolygonColor(() => "rgba(240,186,51, 1)");

  return <primitive object={globe} />;
}

function WorldComponent() {
  const scene = new Scene();
  const camera = new PerspectiveCamera(60, aspect, 0.5, 1000);
  camera.position.set(0, 0, cameraZ);

  return (
    <Canvas camera={camera} scene={scene}>
      <ambientLight intensity={0.5} />
      <directionalLight position={new Vector3(-400, 100, 400)} />
      <directionalLight position={new Vector3(-200, 500, 200)} />
      <pointLight position={new Vector3(-200, 500, 200)} intensity={1} />
      <Globe />
      <OrbitControls
        enablePan={false}
        enableZoom={false}
        minDistance={cameraZ}
        maxDistance={cameraZ}
        autoRotateSpeed={1}
        autoRotate={true}
        minPolarAngle={Math.PI / 3.5}
        maxPolarAngle={Math.PI - Math.PI / 3}
      />
    </Canvas>
  );
}

const World = React.memo(WorldComponent);

export { World };
