import { useThree } from "@react-three/fiber";
import Plane from "./Plane";

function Borders({ isMobile }) {
  const { viewport } = useThree()

  let multiplier = isMobile ? 10.0 : 1.0

  return (
    <>

      {/* top side plane */}
      <Plane position={[0, (viewport.height / 1.25) * multiplier, 0]} rotation={[Math.PI / 2, 0, 0]} />
      
      {/* Bottom side plane */}
      <Plane position={[0, -viewport.height * multiplier, 0]} rotation={[-Math.PI / 2, 0, 0]} />

      {/* Left side plane */}
      <Plane position={[-viewport.width * 2 * multiplier, 0, 0]} rotation={[0, Math.PI / 2, 0]} />

      {/* Right side plane */}
      <Plane position={[viewport.width * 2 * multiplier, 0, 0]} rotation={[0, -Math.PI / 2, 0]} />

      {/* Back (z) side plane */}
      <Plane position={[0, , -10 * multiplier]} rotation={[0, 0, 0]} />

      {/* Front (z) side plane */}
      <Plane position={[0, 0, 20 * multiplier]} rotation={[0, -Math.PI, 0]} />
    </>
  )
}

export default Borders;