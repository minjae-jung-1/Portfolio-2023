import { EffectComposer, SSAO, Bloom } from "@react-three/postprocessing";

function PostProcessing() {
  return (
    <EffectComposer>
        <SSAO radius={0.4} intensity={50} luminanceInfluence={0.4} color="red" />
        <Bloom intensity={1.25} kernelSize={3} luminanceThreshold={0.5} luminanceSmoothing={0.0} />
    </EffectComposer>
  )
}

export default PostProcessing;