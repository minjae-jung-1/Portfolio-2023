import gsap from "gsap"
import useWidthBreakpointReached from "./utils/Hooks";

import Experience from './experience/Experience';
import NavBar from './components/NavBar';
import { useLayoutEffect } from "react";

function App() {

  const isMobile = useWidthBreakpointReached("md")

  useLayoutEffect(() => {
    const t1 = gsap.timeline();
    t1.from(".ease", {
      y: 400,
      ease: "Power4.easeOut",
      delay: 0.1,
      duration: 1.8,
      stagger: {
        amount: 0.4,
      },
    })
  }, [])

  return (
    <div className="App">
      <div className='bg-transparent absolute w-full z-50'>
        <NavBar isMobile={isMobile} />
      </div>
      <Experience />
    </div>
  )
}

export default App;

// fonts
// name - Anton, Luckiest Guy, Bungee Shade