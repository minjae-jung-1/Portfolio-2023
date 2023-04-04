import { createContext, useLayoutEffect, useRef } from "react";
import gsap from "gsap"
import { Observer } from "gsap/Observer";

import { useDetectGPU } from "@react-three/drei";

import useWidthBreakpointReached from "./utils/Hooks";
import Experience from './experience/Experience';
import NavBar from './components/NavBar';

export const GPUContext = createContext(null)


function App() {

  gsap.registerPlugin(Observer);

  const isMobile = useWidthBreakpointReached("md")

  const GPUTier = useDetectGPU()

  const sections = useRef([]);
  
  const textSections = useRef([]);

  const projectSection = useRef([]);
  const projectTitle = useRef([]);
  const projectStack = useRef([]);
  const projectLink = useRef([]);
  const projectBg = useRef([]);
  let isLoaded = false;
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

    isLoaded = true

  }, [])  
  
  function goToSection(index) {

    index = wrap(index)
    animating = true

    let t2 = gsap.timeline({
      defaults: { duration: 1.25, ease: "power1.inOut" },
      onComplete: () => animating = false
    })


    if(isLoaded !== false){
      if (currentIndex >= 0) {
        gsap.set(sections.current[currentIndex], { zIndex: 0, });
        t2.to(textSections.current[currentIndex], { opacity: 0, duration: .5 })
          .set(sections.current[currentIndex], { autoAlpha: 0, duration: .5 })
      }
  
      // Make next section appear
      gsap.to(sections.current[index], { autoAlpha: 1, zIndex: 1, duration: 1, delay: .5 })
      gsap.to(textSections.current[index], { opacity: 1, duration: .5, delay: .5 })
    }
    // Disappear current section
    
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

    for (let i = 0; i < projectBg.current.length; i++) {
      gsap.set(projectBg.current[i], {
        x: -projectBg.current[i].offsetWidth
      })
    }
  }

  // const projectSection = useRef([]);
  // const projectTitle = useRef([]);
  // const projectStack = useRef([]);
  // const projectLink = useRef([]);
  // const projectBg = useRef([]);

  function handleHover(index, hovering) {

    const textElements = [projectTitle.current[index], projectStack.current[index], projectLink.current[index]];

    console.log(textElements)

    console.log('project',projectTitle)


    if (hovering){
      gsap.to(projectBg.current[index], {
        x: 0,
        duration: 0.2,
        ease: "power4.easeOut"
      })
      for (let i = 0; i < textElements.length; i ++) {
        gsap.to(textElements[i], {
          color: 'black',
          duration: .2,
        })
      }
    }
    if (!hovering){
      gsap.to(projectBg.current[index], {
        x: -projectBg.current[index].offsetWidth,
        duration: 0.2
      })
      for (let i = 0; i < textElements.length; i ++) {
        gsap.to(textElements[i], {
          color: 'white',
          duration: .2,
        })
      }
    }
  }

  return (
    <GPUContext.Provider
      value={GPUTier}
    >
      <div className="App">
        <div className='bg-transparent z-50 absolute w-full h-full overflow-y-hidden'>
          <NavBar isMobile={isMobile} />
          <div className="flex w-full h-[100%] md:h-full md:py-20 md:px-16 md:pb-16 mt-16 md:mt-0 ">
            <div className="tColor w-full h-full sm:border overflow-hidden mt-0">

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
                    <div className="flex flex-col justify-center z-50">
                      <div
                        className="text-6xl bg-clip-text"
                        ref={el => projectTitle.current[0] = el} 
                      >
                        Spotlist
                      </div>
                      <div 
                        className="text-sm"
                        ref={el => projectStack.current[0] = el} 
                      >
                        React Native / Django / AWS Elastic Beanstalk
                      </div>
                    </div>
                    <a className="z-50" target="_blank" href="https://www.github.com">
                      <div 
                        className="text-lg underline z-50"
                        ref={el => projectLink.current[0] = el} 
                      >
                        website
                      </div>
                    </a>
                  </div>

                  <div
                    className="accordion flex justify-between items-center border-t-2 h-36 px-8 text-2xl hover:pointer overflow-hidden gap-x-2"
                    onMouseEnter={() => handleHover(1, true)}
                    onMouseLeave={() => handleHover(1, false)}
                    ref={el => projectSection.current[1] = el} 
                  >
                    <div ref={el => projectBg.current[1] = el}  className="absolute h-36 w-full bg-white ml-[-2rem]" />
                    <div className="flex flex-col justify-center z-50">
                      <div
                        className="text-6xl bg-clip-text"
                        ref={el => projectTitle.current[1] = el} 
                      >
                        Hotswaps
                      </div>
                      <div 
                        className="text-sm"
                        ref={el => projectStack.current[1] = el} 
                      >
                        React / TailwindCSS / Node / Express / PostgreSQL / AWS
                      </div>
                    </div>
                    <a className="z-50" target="_blank" href="https://www.github.com">
                      <div 
                        className="text-lg underline z-50"
                        ref={el => projectLink.current[1] = el} 
                      >
                        website
                      </div>
                    </a>
                  </div>

                  <div
                    className="accordion flex justify-between items-center border-t-2 h-36 px-8 text-2xl hover:pointer overflow-hidden gap-x-2"
                    onMouseEnter={() => handleHover(2, true)}
                    onMouseLeave={() => handleHover(2, false)}
                    ref={el => projectSection.current[2] = el} 
                  >
                    <div ref={el => projectBg.current[2] = el}  className="absolute h-36 w-full bg-white ml-[-2rem]" />
                    <div className="flex flex-col justify-center z-50">
                      <div
                        className="text-6xl bg-clip-text"
                        ref={el => projectTitle.current[2] = el} 
                      >
                        AudioAnalyzer
                      </div>
                      <div 
                        className="text-sm"
                        ref={el => projectStack.current[2] = el} 
                      >
                        React / TailwindCSS / Node / Express / PostgreSQL / AWS
                      </div>
                    </div>
                    <a className="z-50" target="_blank" href="https://www.github.com">
                      <div 
                        className="text-lg underline z-50"
                        ref={el => projectLink.current[2] = el} 
                      >
                        github
                      </div>
                    </a>
                  </div>

                  <div
                    className="accordion flex justify-between items-center border-t-2 h-36 px-8 text-2xl hover:pointer overflow-hidden gap-x-2"
                    onMouseEnter={() => handleHover(3, true)}
                    onMouseLeave={() => handleHover(3, false)}
                    ref={el => projectSection.current[3] = el} 
                  >
                    <div ref={el => projectBg.current[3] = el}  className="absolute h-36 w-full bg-white ml-[-2rem]" />
                    <div className="flex flex-col justify-center z-50">
                      <div
                        className="text-6xl bg-clip-text"
                        ref={el => projectTitle.current[3] = el} 
                      >
                        Client-Server Network Visualization
                      </div>
                      <div 
                        className="text-sm"
                        ref={el => projectStack.current[3] = el} 
                      >
                        React / TailwindCSS / Node / Express / PostgreSQL / AWS
                      </div>
                    </div>
                    <a className="z-50" target="_blank" href="https://www.github.com">
                      <div 
                        className="text-lg underline z-50"
                        ref={el => projectLink.current[3] = el} 
                      >
                        github
                      </div>
                    </a>
                  </div>

                  <div
                    className="accordion flex justify-between items-center border-t-2 border-b-2 h-36 px-8 text-2xl hover:pointer overflow-hidden gap-x-2"
                    onMouseEnter={() => handleHover(4, true)}
                    onMouseLeave={() => handleHover(4, false)}
                    ref={el => projectSection.current[4] = el} 
                  >
                    <div ref={el => projectBg.current[4] = el}  className="absolute h-36 w-full bg-white ml-[-2rem]" />
                    <div className="flex flex-col justify-center z-50">
                      <div
                        className="text-6xl bg-clip-text"
                        ref={el => projectTitle.current[4] = el} 
                      >
                        Algorithm Visualizer
                      </div>
                      <div 
                        className="text-sm"
                        ref={el => projectStack.current[4] = el} 
                      >
                        React / TailwindCSS / Node / Express / PostgreSQL / AWS
                      </div>
                    </div>
                    <a className="z-50" target="_blank" href="https://www.github.com">
                      <div 
                        className="text-lg underline z-50"
                        ref={el => projectLink.current[4] = el} 
                      >
                        github
                      </div>
                    </a>
                  </div>



                </div>
              </div>

              <div ref={el => sections.current[2] = el} className="flex fixed flex-col h-full w-full text-white invisible">
              <div ref={el => textSections.current[2] = el} className="flex" >
                <div className="w-1/2 h-full">
                  <img src="https://static.foxnews.com/foxnews.com/content/uploads/2023/03/Kim-Jong-Un.jpg" />
                </div>
                <div className="w-1/2">
                  rwar
                </div>
                  {/* <div>
                    My Interests include
                    <p>Soccer</p>
                    <p>Guitar</p>
                    <p>Snowboarding</p>
                    <p>Skateboarding</p>
                    <p>Cards</p>
                  </div> */}
                </div>
              </div>

              <div ref={el => sections.current[3] = el} className="flex fixed flex-col h-full w-full text-white pt-28 px-14 invisible">
              <div ref={el => textSections.current[3] = el} >
                  Contact Me
                  <div>
                    Form? Or Email?
                    <div>
                      <button>form</button>
                      <button>email</button>
                    </div>
                  </div>
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
    </GPUContext.Provider>
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
// 3. Something wrong going on with mobile landscape and canvas(?), may need resizing?

// Done
// 1. Make animation times faster -- DONE
// 2. Disable scroll until first transition is finished -- DONE

