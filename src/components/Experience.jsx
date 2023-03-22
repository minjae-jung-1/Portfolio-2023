import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei';
import Spheres from './world/Spheres';

const Experience = () =>{
  return(
    <Canvas shadows >
      <OrbitControls />
      <ambientLight />
      <color attach="background" args="green" />
      <Spheres />
    </Canvas>
  )
}
export default Experience;