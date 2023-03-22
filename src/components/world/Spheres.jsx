import { useThree } from "@react-three/fiber"
import { useSphere } from "@react-three/cannon"

function Spheres() {
  const { viewport } = useThree();
  const [ ref ] = useSphere((index) => ({ mass: 5, position: [4, 2 - Math.random() * 8, 0], args: [1.2] }))
  return (
    <instancedMesh ref={ref} castShadow receiveShadow args={[null, null, 100]}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshToonMaterial color="#FADCE0" />
    </instancedMesh>
  )
}

export default Spheres;