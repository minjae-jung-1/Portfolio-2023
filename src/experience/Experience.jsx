import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { Physics } from "@react-three/cannon";

import Spheres from "./world/Spheres";
import Borders from "./world/Borders";
import Mouse from "./world/Mouse";
import PostProcessing from "./PostProcessing"
import Raycaster from "./Raycaster";

const Experience = () => {
  return(
    <Canvas shadows gl={{ stencil: false, antialias: false }} camera={{ position: [0, 0, 60 ], fov: 35  }} className="hello">
      {/* <OrbitControls /> */}
      {/* <fog attach="fog" args={["red", 10, 150]}/> */}
      <color attach="background" args={["#E83F28"]} />
      <ambientLight intensity={.5} />
      <directionalLight position={[-9, -10, -5]} intensity={0.5} />
      <directionalLight
        castShadow
        intensity={1}
        position={[50, 50, 25]}
        shadow-mapSize={[256, 256]}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />
      <Suspense>
        <Physics gravity={[-5, 0, 0]} defaultContactMaterial={{ restitution: 0.5 }}>
          <group position={[0, 0, -10]}>
            {Array.from({ length: 100 }, (_, i) => <Spheres key={i} index={i} />)}
            <Borders />
            {/* <Mouse /> */}
            <Raycaster />
          </group>
        </Physics>
      </Suspense>
      <PostProcessing />
    </Canvas>
  )
};

export default Experience;