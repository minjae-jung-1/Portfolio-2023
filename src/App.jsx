import { createContext, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap"
import { Observer } from "gsap/Observer";

import { useDetectGPU } from "@react-three/drei";

import useWidthBreakpointReached from "./utils/Hooks";
import Experience from './experience/Experience';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import Form from './components/Form'

export const GPUContext = createContext(null)

function App() {

  gsap.registerPlugin(Observer);

  const isMobile = useWidthBreakpointReached("md")

  const GPUTier = useDetectGPU()

  // Main Refs
  const sections = useRef([]);
  
  const textSections = useRef([]);

  const [visible, setVisible] = useState(false)

  const projectSection = useRef([]);
  const projectTitle = useRef([]);
  const projectStack = useRef([]);
  const projectLink = useRef([]);
  const projectBg = useRef([]);
  const projectHeader = useRef([]);
  let isLoaded = false;
  let currentIndex = -1,
      wrap,
      animating;

  // Footer Refs
  const footerRefs = useRef({});

  useLayoutEffect(() => {

    const t1 = gsap.timeline();
    const t4 = gsap.timeline();

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

    t4.to(".arrow", {
      y: 5,
      delay: .5,
      duration: 1,
      ease: "Power2.easeOut"
    }).to (".arrow", {
      y: 0,
      duration: 1,
      ease: "Power2.easeOut"
    }).repeat(-1)
    
    Observer.create({
      type: "wheel, touch, scroll, pointer",
      wheelSpeed: -1,
      onDown: () => !animating && goToSection(currentIndex - 1, 1),
      onUp: () => !animating && goToSection(currentIndex + 1, -1),
      tolerance: 130,
    })

    wrap = gsap.utils.wrap(0, sections.current.length)

    goToSection(0, 1);

    isLoaded = true

    for (let i = 1; i < footerRefs.current.ref1.length; i++) {
      gsap.set(footerRefs.current.ref1[i], {
        yPercent: -200
      })
    }

    console.log(GPUTier)

  }, [])  
  
  function goToSection(index, direction) {

    index = wrap(index)
    animating = true

    let t2 = gsap.timeline({
      defaults: { duration: 1.25, ease: "power1.inOut" },
      onComplete: () => animating = false
    })

    let t3 = gsap.timeline()

    if (index > 0) {
      gsap.to(footerRefs.current.ref2[index], {
        xPercent: 0,
      })
    }

    t3.to(footerRefs.current.ref1[currentIndex], {
      yPercent: 200
    }).set(footerRefs.current.ref1[currentIndex], {
      yPercent: -200
    })
    gsap.to(footerRefs.current.ref1[index], {
      yPercent: 0
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
      // Turn off blur if title section
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

      if (direction === -1) {
        for (let i = 1; i < footerRefs.current.ref2.length; i++) {
          gsap.to(footerRefs.current.ref2[i], {
            xPercent: 0
          })
        }
      }

      for (let i = 1; i < footerRefs.current.ref2.length; i++) {
        gsap.to(footerRefs.current.ref2[i], {
          xPercent: -100
        })
      }

      gsap.to(footerRefs.current.ref2[index], {
        xPercent: 0,
        delay: 1.2
      })

    }

    currentIndex = index;

    for (let i = 0; i < projectBg.current.length; i++) {
      gsap.set(projectBg.current[i], {
        x: -projectBg.current[i].offsetWidth
      })
    }
  }

  function handleHover(index, hovering) {

    const textElements = [projectTitle.current[index], projectStack.current[index], projectLink.current[index], projectHeader.current[index]];

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
          <div className="flex w-full h-full md:h-[92%] md:pt-20 md:px-16 mt-16 md:mt-0 ">
            <div className="tColor w-full h-[93%] md:h-full sm:border overflow-hidden mt-0">

              <div ref={el => sections.current[0] = el} className="homepage fixed flex flex-col h-full w-full justify-between text-white px-4 md:px-16 lg:px-24 invisible">
                <div 
                  ref={el => textSections.current[0] = el} 
                  className="textSectionOne h-full flex flex-col justify-between items-between py-24 
                             md:pb-4 md:pt-16
                             tall:pb-8 tall:pt-20
                             2tall:pb-12 2tall:pt-28
                             3tall:pb-24"
                >
                  <div>
                    <p className="luckiestGuy text-[9vh] lg:text-[12vh] xl:text-[15vh] leading-none">I'm a</p>
                    <p className="luckiestGuy text-[9vh] lg:text-[12vh] xl:text-[15vh] leading-none">Frontend</p>
                    <p className="luckiestGuy text-[9vh] lg:text-[12vh] xl:text-[15vh] leading-none">Engineer</p>
                    <p className="luckiestGuy text-[3vh] lg:text[4vh] lg:text-[5vh] leading-tight mt-2">with startup experience based in New York City.</p>
                    {/* <p className="luckiestGuy text-2xl sm:text-4xl">based in New York City.</p> */}
                  </div>
                  <div className="flex flex-col 2xl:gap-y-8 gap-y-4 md:gap-y-2 tall:gap-y-8 justify-center items-center 2xl:mt-4">
                    <div className="h-12 w-12 flex justify center items-center border rounded-[50%]
                                    tall:h-16 tall:w-16"
                    >
                      <svg
                        className="w-full arrow"
                        viewBox="0 0 24 24" 
                        width="24px" 
                        height="24px"
                        fill="white"
                        >
                          <path d="M 11 1 L 11 19 L 8 19 L 12 23 L 16 19 L 13 19 L 13 1 L 11 1 z"/>
                      </svg>
                    </div>
                    <div className="">
                      Scroll to continue
                    </div>
                  </div>
                </div>
              </div>

              <div ref={el => sections.current[1] = el} className="flex fixed flex-col h-full w-full text-white md:pt-0 md:px-0 invisible">
                <div ref={el => textSections.current[1] = el} className="h-full" >

                  <div
                    className="accordion flex justify-between items-center border-t-2 h-1/5 px-8 text-2xl hover:pointer overflow-hidden"
                    onMouseEnter={() => handleHover(0, true)}
                    onMouseLeave={() => handleHover(0, false)}
                    ref={el => projectSection.current[0] = el} 
                  >
                    <div ref={el => projectBg.current[0] = el}  className="absolute h-1/5 w-full bg-white ml-[-2rem]" />
                    <div className="flex flex-col justify-center z-50">
                      <div ref={el => projectHeader.current[0] = el} className="hidden text-[1.5vh] leading-none mb-4 md:block">
                        App Engineer
                      </div>
                      <div
                        className="luckiestGuy text-[3vh] 3tall:text-[3vh] 2tall:leading-tight bg-clip-text"
                        ref={el => projectTitle.current[0] = el} 
                      >
                        Spotlist
                      </div>
                      <div 
                        className="text-sm md:text-lg"
                        ref={el => projectStack.current[0] = el} 
                      >
                        React Native / Django / AWS Elastic Beanstalk
                      </div>
                    </div>
                    <a className="z-50" target="_blank" href="https://www.spotlistinc.com/">
                      <div 
                        className="text-sm md:text-lg underline z-50"
                        ref={el => projectLink.current[0] = el} 
                      >
                        website
                      </div>
                    </a>
                  </div>

                  <div
                    className="accordion flex justify-between items-center border-t-2 h-1/5 px-8 text-2xl hover:pointer overflow-hidden gap-x-2"
                    onMouseEnter={() => handleHover(1, true)}
                    onMouseLeave={() => handleHover(1, false)}
                    ref={el => projectSection.current[1] = el} 
                  >
                    <div ref={el => projectBg.current[1] = el}  className="absolute h-1/5 w-full bg-white ml-[-2rem]" />
                    <div className="flex flex-col justify-center z-50">
                      <div ref={el => projectHeader.current[1] = el} className="hidden text-[1.5vh] leading-none mb-4 md:block">
                        Co-Founder & Frontend Engineer
                      </div>
                      <div
                        className="luckiestGuy text-[3vh] 3tall:text-[3vh] 2tall:leading-tight bg-clip-text"
                        ref={el => projectTitle.current[1] = el} 
                      >
                        Hotswaps, LLC.
                      </div>
                      <div 
                        className="text-sm md:text-lg"
                        ref={el => projectStack.current[1] = el} 
                      >
                        React / TailwindCSS / Node / Express / PostgreSQL / AWS
                      </div>
                    </div>
                    <a className="z-50" target="_blank" href="https://www.github.com">
                      <div 
                        className="text-sm md:text-lg underline z-50"
                        ref={el => projectLink.current[1] = el} 
                      >
                        website
                      </div>
                    </a>
                  </div>

                  <div
                    className="accordion flex justify-between items-center border-t-2 h-1/5 px-8 text-2xl hover:pointer overflow-hidden gap-x-2"
                    onMouseEnter={() => handleHover(2, true)}
                    onMouseLeave={() => handleHover(2, false)}
                    ref={el => projectSection.current[2] = el} 
                  >
                    <div ref={el => projectBg.current[2] = el}  className="absolute h-1/5 w-full bg-white ml-[-2rem]" />
                    <div className="flex flex-col justify-center z-50">
                      <div ref={el => projectHeader.current[2] = el} className="hidden text-[1.5vh] leading-none mb-4 md:block">
                        Project
                      </div>
                      <div
                        className="luckiestGuy text-[3vh] 3tall:text-[3vh] 2tall:leading-tight bg-clip-text"
                        ref={el => projectTitle.current[2] = el} 
                      >
                        AudioAnalyzer
                      </div>
                      <div 
                        className="text-sm md:text-lg"
                        ref={el => projectStack.current[2] = el} 
                      >
                        React / TailwindCSS / Node / Express / PostgreSQL / AWS
                      </div>
                    </div>
                    <a className="z-50" target="_blank" href="https://www.github.com">
                      <div 
                        className="text-sm md:text-lg underline z-50"
                        ref={el => projectLink.current[2] = el} 
                      >
                        github
                      </div>
                    </a>
                  </div>

                  <div
                    className="accordion flex justify-between items-center border-t-2 h-1/5 px-8 text-2xl hover:pointer overflow-hidden gap-x-2"
                    onMouseEnter={() => handleHover(3, true)}
                    onMouseLeave={() => handleHover(3, false)}
                    ref={el => projectSection.current[3] = el} 
                  >
                    <div ref={el => projectBg.current[3] = el}  className="absolute h-1/5 w-full bg-white ml-[-2rem]" />
                    <div className="flex flex-col justify-center z-50">
                      <div ref={el => projectHeader.current[3] = el} className="hidden text-[1.5vh] leading-none mb-4 md:block">
                        Project
                      </div>
                      <div
                        className="luckiestGuy text-[3vh] 3tall:text-[3vh] 2tall:leading-tight bg-clip-text"
                        ref={el => projectTitle.current[3] = el} 
                      >
                        Client-Server Network Visualization
                      </div>
                      <div 
                        className="text-sm md:text-lg"
                        ref={el => projectStack.current[3] = el} 
                      >
                        React / TailwindCSS / Node / Express / PostgreSQL / AWS
                      </div>
                    </div>
                    <a className="z-50" target="_blank" href="https://www.github.com">
                      <div 
                        className="text-sm md:text-lg underline z-50"
                        ref={el => projectLink.current[3] = el} 
                      >
                        github
                      </div>
                    </a>
                  </div>

                  <div
                    className="accordion flex justify-between items-center border-t-2 border-b-2 h-1/5 px-8 text-2xl hover:pointer overflow-hidden gap-x-2"
                    onMouseEnter={() => handleHover(4, true)}
                    onMouseLeave={() => handleHover(4, false)}
                    ref={el => projectSection.current[4] = el} 
                  >
                    <div ref={el => projectBg.current[4] = el}  className="absolute h-1/5 w-full bg-white ml-[-2rem]" />
                    <div className="flex flex-col justify-center z-50">
                      <div ref={el => projectHeader.current[4] = el} className="hidden text-[1.5vh] leading-none mb-4 md:block">
                        Project
                      </div>
                      <div
                        className="luckiestGuy text-[3vh] 3tall:text-[3vh] 2tall:leading-tight bg-clip-text"
                        ref={el => projectTitle.current[4] = el} 
                      >
                        Algorithm Visualizer
                      </div>
                      <div 
                        className="text-sm md:text-lg"
                        ref={el => projectStack.current[4] = el} 
                      >
                        React / TailwindCSS / Node / Express / PostgreSQL / AWS
                      </div>
                    </div>
                    <a className="z-50" target="_blank" href="https://www.github.com">
                      <div 
                        className="text-sm md:text-lg underline z-50"
                        ref={el => projectLink.current[4] = el} 
                      >
                        github
                      </div>
                    </a>
                  </div>
                </div>
              </div>

              <div ref={el => sections.current[2] = el} className="flex fixed flex-col h-full w-full text-white invisible">
              <div ref={el => textSections.current[2] = el} className="flex flex-col w-full h-full px-4 md:px-12 py-12" >
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                  <p>My Interests include</p>
                  <p>Soccer       </p>
                  <p>Guitar       </p>
                  <p>Snowboarding </p>
                  <p>Skateboarding</p>
                  <p>Cards</p>
                </div>
                <div className="w-full h-full flex flex-col justify-end ">
                  {/* <h1 className="lg:text-[20rem] sm:text-8xl text-7xl">About Me</h1> */}
                  <p className="text-[4vh] md:text-[5vh] 3tall:text-[4vh] leading-tight">
                    Hello, there! My name is Minjae Jung. 
                    I am a front-end engineer. 
                    I've done e-commerce stuff at Against All Odds 
                    and startup stuff at Spotlist, Inc. 
                    Besides working on digital projects, 
                    I like playing guitar, drawing, and 
                    grinding rails at the skatepark.
                    {/* <p>Hello, there! My name is Minjae Jung.</p> 
                    <p>I am a front-end engineer. </p>
                    <p>I've done e-commerce stuff at Against All Odds </p>
                    <p>and startup stuff at Spotlist, Inc. </p>
                    <p>Besides working on digital projects, </p>
                    <p>I like playing guitar, drawing, and </p>
                    <p>grinding rails at the skatepark.</p> */}
                  </p>
                </div>
                </div>
              </div>

              <div ref={el => sections.current[3] = el} className="flex fixed flex-col h-full w-full text-white pt-28 px-14 invisible">
              <div ref={el => textSections.current[3] = el} >
                  <div className="sm:text-lg">
                    Contact Me
                  </div>
                  <div className="flex flex-row justify-evenly w-full">
                    <div>
                      Send an Email
                      <div>
                        <a href="mailto:recipient@example.com">
                          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">email</button>
                        </a>
                      </div>
                    </div>
                    <div>
                      Submit a message
                      <div>
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={()=>{console.log(visible), setVisible(!visible)}}>form</button>
                      </div>
                      <Form visible={visible}></Form>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
          <Footer ref={footerRefs} />
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

