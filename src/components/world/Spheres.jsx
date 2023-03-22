function Spheres() {
  return (
    <instancedMesh>
      <sphereGeometry args={[1, 16, 16]} />
      <meshToonMaterial color="ff7b00" />
    </instancedMesh>
  )
}

export default Spheres;