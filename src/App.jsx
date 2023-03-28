import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap"
import { Observer } from "gsap/Observer";

import useWidthBreakpointReached from "./utils/Hooks";
import Experience from './experience/Experience';
import NavBar from './components/NavBar';


function App() {

  gsap.registerPlugin(Observer);

  const isMobile = useWidthBreakpointReached("md")
  const sections = useRef([]);
  const textSections = useRef([]);

  let currentIndex = 0,
      wrap,
      animating;

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
      type: "wheel, touch, scroll, pointer",
      wheelSpeed: -1,
      onDown: () => !animating && goToSection(currentIndex - 1, -1),
      onUp: () => !animating && goToSection(currentIndex + 1, 1),
      tolerance: 130,
    })

    wrap = gsap.utils.wrap(0, sections.current.length)

  }, [])  

  function goToSection(index, direction) {
    index = wrap(index)
    animating = true
    let fromTop = direction === 1,
        dFactor = fromTop ? -1 : 1,
        t2 = gsap.timeline({
          defaults: { duration: 1.25, ease: "power1.inOut" },
          onComplete: () => animating = false
        })
    
    if (currentIndex >= 0) {
      console.log('if running')
      gsap.set(sections.current[currentIndex], { zIndex: 0, });
      t2.to(textSections.current[currentIndex], { opacity: 0, duration: 1 })
        .set(sections.current[currentIndex], { autoAlpha: 0, duration: 1  })
    }
    gsap.to(sections.current[index], { autoAlpha: 1, zIndex: 1, duration: 2, delay: 1 })
    if (currentIndex === 0) {
      gsap.to(".tColor", {
        backdropFilter: "saturate(180%)",
        duration: 3,
        delay: 1
      })
      gsap.to(".tColor", {
        backdropFilter: "blur(40px)",
        duration: 3,
        delay: 1
      })
    }
    currentIndex = index;
  }

  return (
    <div className="App">
      <div className='bg-transparent z-50 absolute w-full h-full'>
        <NavBar isMobile={isMobile} />
        <div className="flex w-full h-full md:py-20 md:px-16 py-16 px-8">
          <div className="tColor w-full h-full sm:border">

            <div ref={el => sections.current[0] = el} className="homepage fixed flex flex-col h-[85%] justify-end text-white mb-14 pl-14">
              <div ref={el => textSections.current[0] = el} className="textSectionOne">
                <p className="cooper lg:text-9xl sm:text-8xl text-5xl">I'm a</p>
                <p className="cooper lg:text-9xl sm:text-8xl text-5xl">Frontend</p>
                <p className="cooper lg:text-9xl sm:text-8xl text-5xl">Engineer</p>
                <p className="cooper lg:text-4xl sm:text-8xl text-5xl">with startup experience</p>
                <p className="cooper lg:text-4xl sm:text-8xl text-5xl mt-2">based in New York City.</p>
              </div>
            </div>

            <div ref={el => sections.current[1] = el} className="flex fixed flex-col h-[85%] w-1/3 text-white pt-28 px-14 invisible">
              <div ref={el => textSections.current[1] = el} >
                <h1 className="text-9xl mb-4 projects">Projects</h1>
                <div
                  className="accordion flex justify-start border-t-4 h-28 pt-2 text-2xl hover:pointer overflow-hidden gap-x-2"
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
              </div>
            </div>

            <div ref={el => sections.current[2] = el} className="flex fixed flex-col h-[85%] w-1/3 text-white pt-28 px-14 invisible">
              <div>
                About Me
              </div>
            </div>

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