import { usePlane } from "@react-three/cannon";

function Plane({ color, ...props }) {
  usePlane(() => ({ ...props }))
  return null
}

export default Plane;