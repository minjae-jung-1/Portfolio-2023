import gsap from "gsap"
import { Observer } from "gsap/Observer";
import useWidthBreakpointReached from "./utils/Hooks";

import Experience from './experience/Experience';
import NavBar from './components/NavBar';
import { useLayoutEffect } from "react";


function App() {

  gsap.registerPlugin(Observer);

  const isMobile = useWidthBreakpointReached("md")

  useLayoutEffect(() => {
    const t1 = gsap.timeline();
    const t2 = gsap.timeline();

    t1.from(".ease", {
      y: 400,
      ease: "Power4.easeOut",
      delay: 0.1,
      duration: 1.8,
      stagger: {
        amount: 0.4,
      },
    }).from(".tColor", {
      opacity: 0,
      duration: .2
    }).to('.scrollText', {
      y: '8px',
      duration: 1,
      ease: 'power3.inOut',
      yoyo: true,
      repeat: -1,
    })
    
    Observer.create({
      target: window,
      type: "wheel, touch, scroll, pointer",
      onChange: (self) => console.log(self.deltaY)
    })

  }, [])

  return (
    <div className="App">
      <div className='bg-transparent absolute w-full h-full z-50'>
        <NavBar isMobile={isMobile} />
        <div className="w-[92%] h-[85%] tColor relative border mt-24 ml-16 mr-16">
          <div className="flex flex-col w-full h-full justify-end text-white pb-14 pl-10">
            <p className="luckiestGuy text-9xl px-0 mx-0">Frontend</p>
            <p className="luckiestGuy text-9xl">Engineer</p>
          </div>
        </div>
        <div className="scrollTextContainer w-full h-max-content flex justify-center mt-8">
          <p className="scrollText">Scroll to continue</p>
        </div>
      </div>
      <Experience />
    </div>
  )
}

export default App;

// fonts
// name - Anton, Luckiest Guy, Bungee Shade

//https://codepen.io/GreenSock/pen/XWzRraJ