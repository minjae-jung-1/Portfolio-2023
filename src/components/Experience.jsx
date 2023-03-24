import { Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Html, OrbitControls } from "@react-three/drei";
import { Physics } from "@react-three/cannon";

import Spheres from "./world/Spheres";
import Borders from "./world/Borders";
import Mouse from "./world/Mouse";
import PostProcessing from "./world/PostProcessing"
import { Noise } from "@react-three/postprocessing";

const Experience = () => {

  return(
    <Canvas shadows gl={{ stencil: false, antialias: false }} camera={{ position: [0, 0, 60 ], fov: 35  }}>
      <OrbitControls />
      <color attach="background" args={["#E83F28"]} />
      <ambientLight intensity={.5} />
      <directionalLight position={[-5, -10, -5]} intensity={0.5} />
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
        <Physics gravity={[-0.5, 0, 0]} defaultContactMaterial={{ restitution: 0.5 }}>
          <group position={[0, 0, -10]}>
            {Array.from({ length: 100 }, (_, i) => <Spheres key={i} index={i} />)}
            {/* <Spheres count={100} /> */}
            <Borders />
            <Mouse />
          </group>
        </Physics>
        {/* <Html position={[0, 0, 0, -10]} occlude transform>
          <div className="bg-white w-full h-full">
            It's me bitch
          </div>
        </Html> */}
      </Suspense>
      <PostProcessing />
    </Canvas>
  )
};

export default Experience;