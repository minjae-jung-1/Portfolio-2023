import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { Physics } from "@react-three/cannon";

import Spheres from "./world/Spheres";
import Borders from "./world/Borders";
import Mouse from "./Mouse";
import PostProcessing from "./PostProcessing"

const Experience = ({ isMobile }) => {
  return(
    <Canvas shadows gl={{ stencil: false, antialias: false }} camera={{ position: [0, 0, 60 ], fov: 35  }} className="hello">
      <Suspense>
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
          <Physics gravity={[-5, -1, 1]} defaultContactMaterial={{ restitution: 0.5 }}>
            <group position={[0, 0, -10]}>
              {Array.from({ length: isMobile ? 10 : 100 }, (_, i) => <Spheres isMobile={isMobile} key={i} index={i} />)}
              <Borders isMobile={isMobile} />
              <Mouse />
            </group>
          </Physics>
        <PostProcessing />
      </Suspense>
    </Canvas>
  )
};

export default Experience;