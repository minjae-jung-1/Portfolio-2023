import { useLayoutEffect, useState } from "react";
import gsap from "gsap"
import { Observer } from "gsap/Observer";

import useWidthBreakpointReached from "./utils/Hooks";
import Experience from './experience/Experience';
import NavBar from './components/NavBar';


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
      duration: .4
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
      <div className='bg-transparent z-50 absolute w-full h-full'>
        <NavBar isMobile={isMobile} />
        <div className="flex w-full h-full md:py-20 md:px-16 py-16 px-8">
          <div className="tColor w-full h-full sm:border">
            <secion className="flex flex-col h-full justify-end text-white pb-14 pl-14">
              <p className="cooper lg:text-9xl sm:text-8xl text-5xl">I'm a</p>
              <p className="cooper lg:text-9xl sm:text-8xl text-5xl">Frontend</p>
              <p className="cooper lg:text-9xl sm:text-8xl text-5xl">Engineer</p>
            </secion>
            {/* <section className="flex flex-col h-full text-white py-14 px-14">
              <h1 className="text-9xl">Southpole</h1>
            </section> */}
            {/* <section className="flex flex-col h-full w-1/3 text-white pt-28 px-14">
              <h1 className="text-9xl mb-4 projects">Projects</h1>
              <div
                className="accordion flex justify-start border-t-4 h-24 pt-2 text-2xl hover:pointer overflow-hidden gap-x-2"
                onMouseEnter={() => handleAccordion()}
                onMouseLeave={() => handleAccordion()}
              >
                <div className="arrow">
                  <div>
                    Hotswaps
                  </div>
                  <div className="text-sm">
                    React / TailwindCSS / PostgreSQL / Express / AWS
                  </div>
                </div>
              </div>
              <div className="flex items-center border-t-4 h-24 pt-2 text-2xl">AudioAnalyzer</div>
              <div className="flex items-center border-t-4 h-24 pt-2 text-2xl">Client to Server Network Visualization</div>
              <div className="flex items-center border-t-4 h-24 pt-2 border-b-4 text-2xl">Algorithm Visualizer</div>
              <div className="w-full h-full pt-8">
              </div>
            </section> */}
          </div>
        </div>
        {/* <div className="scrollTextContainer w-full h-max-content flex justify-center mt-8">
          <p className="scrollText">Scroll to continue</p>
        </div> */}
      </div>
      <Experience isMobile={isMobile} />
    </div>
  )
}

export default App;

// fonts
// name - Anton, Luckiest Guy, Bungee Shade

//https://codepen.io/GreenSock/pen/XWzRraJ
// add custom mouse circle, goes well with balls