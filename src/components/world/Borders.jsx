import { useThree } from "@react-three/fiber";
import Plane from "./Plane";

function Borders() {
  const { viewport } = useThree()

  console.log(viewport.height, viewport.width)
  
  return (
    <>
      {/* Bottom side plane */}
      <Plane position={[0, -viewport.height / 2, 0]} rotation={[-Math.PI / 2, 0, 0]} />

      {/* Left side plane */}
      <Plane position={[-viewport.width * 2, 0, 0]} rotation={[0, Math.PI / 2, 0]} />

      {/* Right side plane */}
      <Plane position={[viewport.width * 2, 0, 0]} rotation={[0, -Math.PI / 2, 0]} />

      {/* Back (z) side plane */}
      <Plane position={[0, 0, -1]} rotation={[0, 0, 0]} />

      {/* Front (z) side plane */}
      <Plane position={[0, 0, 12]} rotation={[0, -Math.PI, 0]} />
    </>
  )
}

export default Borders;