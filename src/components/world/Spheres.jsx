import { useThree } from "@react-three/fiber"
import { useSphere } from "@react-three/cannon"
import { useFrame } from '@react-three/fiber'
import { useEffect, useRef } from "react";

function Spheres({ count }) {
  const colors = ["#4071B8", "#3C4073", "#EDF7FB"]
  const initialPos = [90, (0.5 - Math.random()) * 70, (1 - Math.random()) * 20]
  const { viewport } = useThree();
  const [ ref, api ] = useSphere((index) => ({ mass: 1000, position: initialPos, args: [2], linearDamping: 0.0 }))

  const position = useRef([0, 0, 0])

  useEffect(() => {
    api.position.subscribe((p) => (position.current = p))
  }, [])

  useFrame(() => {
    if (position.current[0] < -60) {
      api.position.set(initialPos[0], initialPos[1], initialPos[2])
    }
  })

  return (
    <mesh ref={ref} castShadow receiveShadow>
      <sphereGeometry args={[4, 32, 32]} />
      <meshToonMaterial color={colors[Math.floor(Math.random() * 2)]} />
    </mesh>
  )
}

export default Spheres;

//args={[null, null, count]} 