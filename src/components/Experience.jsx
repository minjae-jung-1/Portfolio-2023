import { Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Physics } from "@react-three/cannon";

import Spheres from "./world/Spheres";
import Borders from "./world/Borders";
import Mouse from "./world/Mouse";
import PostProcessing from "./world/PostProcessing"

const Experience = () => {

  return(
    <Canvas shadows gl={{ stencil: false, antialias: false }} camera={{ position: [0, 0, 20 ], fov: 45  }}>
      <color attach="background" args={["#E83F28"]} />
      <ambientLight intensity={1} />
      <directionalLight position={[-10, -10, -5]} intensity={0.5} />
      <directionalLight
        castShadow
        intensity={4}
        position={[50, 50, 25]}
        shadow-mapSize={[256, 256]}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />
      <Suspense>
        <Physics gravity={[-100, -100, 0]} defaultContactMaterial={{ restitution: 0.5 }}>
          <group position={[0, 0, -10]}>
            <Spheres />
            <Borders />
            <Mouse />
          </group>
        </Physics>
      </Suspense>
      <PostProcessing />
    </Canvas>
  )
};

export default Experience;