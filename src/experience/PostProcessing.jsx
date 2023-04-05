import { useContext } from "react";
import { GPUContext } from "../App";
import { EffectComposer, SSAO, Bloom } from "@react-three/postprocessing";

function PostProcessing() {

  const { tier } = useContext(GPUContext);

  return (
    <EffectComposer>
      {(tier >= 2) && (
        <>
          <SSAO radius={0.4} intensity={50} luminanceInfluence={0.4} color="blue" />
          {/* <Bloom intensity={1.25} kernelSize={3} luminanceThreshold={0.5} luminanceSmoothing={0.0} /> */}
        </>
      )}
    </EffectComposer>
  )
}

export default PostProcessing;