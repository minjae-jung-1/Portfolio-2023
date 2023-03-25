import { useState, useEffect } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import { useSphere } from "@react-three/cannon"
import * as THREE from "three";

function Raycaster() {
  const { camera, scene, viewport } = useThree();
  const [, api] = useSphere(() => ({ type: "Kinematic", args: [10] }))
  const [mouseState, setMouseState] = useState({});

  useEffect(() => {
    function handleMouseMove(event) {
      const mouse = new THREE.Vector2();
      mouse.x =  (event.clientX - (window.innerWidth / 2)) / (window.innerWidth / 2);
      mouse.y = -(event.clientY - (window.innerHeight / 2)) / (window.innerHeight / 2);
      setMouseState({x: mouse.x, y: mouse.y});
    }
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [camera, scene]);

  return useFrame((state) => {
    api.position.set((mouseState.x * viewport.width) / 2, (mouseState.y * viewport.height) / 2, 7)
   })
}

export default Raycaster;