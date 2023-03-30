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

  const projectSection = useRef([]);
  const projectTitle = useRef([]);
  const projectStack = useRef([]);
  const projectLink = useRef([]);
  const projectBg = useRef([]);

  let currentIndex = -1,
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
      onDown: () => !animating && goToSection(currentIndex - 1),
      onUp: () => !animating && goToSection(currentIndex + 1),
      tolerance: 130,
    })

    wrap = gsap.utils.wrap(0, sections.current.length)

    goToSection(0, 1);

  }, [])  

  function goToSection(index) {

    index = wrap(index)
    animating = true

    let t2 = gsap.timeline({
          defaults: { duration: 1.25, ease: "power1.inOut" },
          onComplete: () => animating = false
        })
    
    // Disappear current section
    if (currentIndex >= 0) {
      gsap.set(sections.current[currentIndex], { zIndex: 0, });
      t2.to(textSections.current[currentIndex], { opacity: 0, duration: .5 })
        .set(sections.current[currentIndex], { autoAlpha: 0, duration: .5 })
    }

    // Make next section appear
    gsap.to(sections.current[index], { autoAlpha: 1, zIndex: 1, duration: 1, delay: .5 })
    gsap.to(textSections.current[index], { opacity: 1, duration: .5, delay: .5 })

    // Turn on blur
    if (currentIndex === 0) {
      gsap.to(".tColor", {
        backdropFilter: "saturate(180%)",
        duration: 1.5,
        delay: .5
      })
      gsap.to(".tColor", {
        backdropFilter: "blur(40px)",
        duration: 1.5,
        delay: .5
      })
    }

    if (index === 0) {
      gsap.to(".tColor", {
        backdropFilter: "saturate(0%)",
        duration: 1,
        delay: .5
      })
      gsap.to(".tColor", {
        backdropFilter: "blur(0px)",
        duration: 1,
        delay: .5
      })
      gsap.to(sections.current[index], { autoAlpha: 1, zIndex: 1, duration: 1, delay: .5 })
    }
    currentIndex = index;

    gsap.set(projectBg.current[0], {
      x: -projectBg.current[0].offsetWidth
    })
  }



  function handleHover(index, hovering) {

    if (hovering){
      gsap.to(projectBg.current[0], {
        x: 0,
        duration: 0.2,
        ease: "power4.easeOut"
      })
    }
    if (!hovering){
      gsap.to(projectBg.current[0], {
        x: -projectBg.current[0].offsetWidth,
        duration: 0.2
      })
    }
  }

  return (
    <div className="App">
      <div className='bg-transparent z-50 absolute w-full h-full overflow-y-hidden'>
        <NavBar isMobile={isMobile} />
        <div className="flex w-full h-[90%] md:h-[100%] md:h-full md:py-20 md:px-16 md:pb-32 mt-16 md:mt-0 ">
          <div className="tColor w-full h-full sm:border overflow-hidden mt-8">

            <div ref={el => sections.current[0] = el} className="homepage fixed flex flex-col h-full md:h-[93%] w-full justify-end text-white md:mb-14 px-4 md:px-16  invisible">
              <div ref={el => textSections.current[0] = el} className="textSectionOne">
                <p className="cooper lg:text-9xl sm:text-8xl text-7xl">I'm a</p>
                <p className="cooper lg:text-9xl sm:text-8xl text-7xl">Frontend</p>
                <p className="cooper lg:text-9xl sm:text-8xl text-7xl">Engineer</p>
                <p className="cooper lg:text-4xl sm:text-8xl text-2xl">with startup experience</p>
                <p className="cooper lg:text-4xl sm:text-8xl text-2xl mb-32 md:mb-8 md:mt-2">based in New York City.</p>
              </div>
            </div>

            <div ref={el => sections.current[1] = el} className="flex fixed flex-col h-full w-full text-white pt-8 md:pt-0 px-4 md:px-0 invisible">
              <div ref={el => textSections.current[1] = el} >

                <div
                  className="accordion flex justify-between items-center border-t-2 h-36 px-8 text-2xl hover:pointer overflow-hidden gap-x-2"
                  onMouseEnter={() => handleHover(0, true)}
                  onMouseLeave={() => handleHover(0, false)}
                  ref={el => projectSection.current[0] = el} 
                >
                  <div ref={el => projectBg.current[0] = el}  className="absolute h-36 w-full bg-white ml-[-2rem]" />
                  <div className="flex flex-col justify-center">
                    <div
                      className="text-6xl"
                      ref={el => projectTitle.current[0] = el} 
                    >
                      Spotlist
                    </div>
                    <div 
                      className="text-sm"
                      ref={el => projectStack.current[0] = el} 
                    >
                      React Native / Django 
                    </div>
                  </div>
                  <a target="_blank" href="https://www.github.com">
                    <div 
                      className="text-lg underline"
                      ref={el => projectLink.current[0] = el} 
                    >
                      website
                    </div>
                  </a>
                </div>

                <div
                  className="accordion flex justify-between items-center border-t-2 h-36 pt-2 px-8 text-2xl hover:pointer overflow-hidden gap-x-2"
                  onMouseEnter={() => handleHover()}
                  onMouseLeave={() => handleHover()}
                >
                  <div className="flex flex-col justify-center">
                    <div className="text-6xl">
                      Hotswaps
                    </div>
                    <div className="text-sm">
                      React / TailwindCSS / PostgreSQL / Express / AWS
                    </div>
                  </div>
                  <a target="_blank" href="https://www.github.com">
                    <div className="text-lg underline">
                      website
                    </div>
                  </a>
                </div>
                <div
                  className="accordion flex justify-between items-center border-t-2 h-36 pt-2 px-8 text-2xl hover:pointer overflow-hidden gap-x-2"
                  onMouseEnter={() => handleHover()}
                  onMouseLeave={() => handleHover()}
                >
                  <div className="flex flex-col justify-center">
                    <div className="text-6xl">
                      AudioAnalyzer
                    </div>
                    <div className="text-sm">
                      React / TailwindCSS / PostgreSQL / Express / AWS
                    </div>
                  </div>
                  <a target="_blank" href="https://www.github.com">
                    <div className="text-lg underline">
                      github
                    </div>
                  </a>
                </div>
                <div
                  className="accordion flex justify-between items-center border-t-2 h-36 pt-2 px-8 text-2xl hover:pointer overflow-hidden gap-x-2"
                  onMouseEnter={() => handleHover()}
                  onMouseLeave={() => handleHover()}
                >
                  <div className="flex flex-col justify-center">
                    <div className="text-6xl">
                      Client-Server Network Visualization
                    </div>
                    <div className="text-sm">
                      React / TailwindCSS / PostgreSQL / Express / AWS
                    </div>
                  </div>
                  <a target="_blank" href="https://www.github.com">
                    <div className="text-lg underline">
                      github
                    </div>
                  </a>
                </div>
                <div
                  className="accordion flex justify-between items-center border-t-2 border-b-2 h-36 pt-2 px-8 text-2xl hover:pointer overflow-hidden gap-x-2"
                  onMouseEnter={() => handleHover()}
                  onMouseLeave={() => handleHover()}
                >
                  <div className="flex flex-col justify-center">
                    <div className="text-6xl">
                      Algorithm Visualizer
                    </div>
                    <div className="text-sm">
                      React / TailwindCSS / PostgreSQL / Express / AWS
                    </div>
                  </div>
                  <a target="_blank" href="https://www.github.com">
                    <div className="text-lg underline">
                      github
                    </div>
                  </a>
                </div>
              </div>
            </div>

            <div ref={el => sections.current[2] = el} className="flex fixed flex-col h-full w-full text-white pt-28 px-14 invisible">
            <div ref={el => textSections.current[2] = el} >
                About Me
              </div>
            </div>

            <div ref={el => sections.current[3] = el} className="flex fixed flex-col h-full w-full text-white pt-28 px-14 invisible">
            <div ref={el => textSections.current[3] = el} >
                Contact Me
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


// ideas
// 1. Navigation in NavBar -> dot dot sectionName dot dot
//  - on mobile this could be on the bottom?
// 2. 

// https://codepen.io/GreenSock/pen/XWzRraJ
// add custom mouse circle, goes well with balls
// https://codepen.io/GreenSock/pen/oNYXzYB

// To-Do
// 2. Disable scroll until first transition is finished -- May need if implementing loading page
// 3. Something wrong going on with mobile landscape and canvas(?), may need resizing?

// Done
// 1. Make animation times faster -- DONE
