import { useThree } from "@react-three/fiber"
import { useSphere } from "@react-three/cannon"
import { useFrame } from '@react-three/fiber'
import { useEffect, useRef } from "react";

function Spheres({ count }) {
  const initialPos = [6, 2 + Math.random() * 30, 0]
  const { viewport } = useThree();
  const [ ref, api ] = useSphere((index) => ({ mass: 5, position: initialPos, args: [1] }))

  const position = useRef([0, 0, 0])

  useEffect(() => {
    api.position.subscribe((p) => (position.current = p))
  }, [])

  useFrame(() => {
    if (position.current[0] < -20) {
      api.position.set(initialPos[0], initialPos[1], initialPos[2])
    }

    console.log(position.current)
  })

  return (
    <mesh ref={ref} castShadow receiveShadow>
      <sphereGeometry args={[1, 32, 32]} />
      <meshToonMaterial color="#FADCE0" />
    </mesh>
  )
}

export default Spheres;

//args={[null, null, count]} 