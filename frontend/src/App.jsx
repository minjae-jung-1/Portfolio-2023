import { createContext, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap"
import { Observer } from "gsap/Observer";

import { useDetectGPU } from "@react-three/drei";

import useWidthBreakpointReached from "./utils/Hooks";
import Experience from './experience/Experience';
import NavBar from './components/NavBar';
import Footer from './components/Footer';

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
          <div className="flex w-full h-full md:h-[94%] md:pt-16 md:px-0 mt-14 md:mt-0 ">
            <div className="tColor w-full h-[94%] md:h-full overflow-hidden mt-0">

              <div ref={el => sections.current[0] = el} className="homepage fixed flex flex-col h-full w-full justify-between text-white px-4 md:px-16 lg:px-24 invisible">
                <div 
                  ref={el => textSections.current[0] = el} 
                  className="textSectionOne h-full flex flex-col justify-center items-center md:py-24 
                             md:pb-4 md:pt-16
                             tall:pb-8 tall:pt-20
                             2tall:pb-12 2tall:pt-28
                             3tall:pb-24"
                >
                  <div className="flex flex-col justify-center items-center">
                    <p className="font-fragment text-[7vh] lg:text-[12vh] xl:text-[14vh] leading-none mb-4">I'm Minjae,</p>
                    <p className="font-fragment text-center text-[4vh] lg:text-[12vh] xl:text-[9vh] leading-none mb-4 md:mb-8">a Frontend Engineer</p>
                    <p className="font-fragment text-center text-[2vh] lg:text[4vh] lg:text-[5vh] leading-tight mb-16">with startup experience based in NYC.</p>
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
                      heroku
                    </div>
                  </div>
                </div>
              </div>

              <div ref={el => sections.current[1] = el} className="flex fixed flex-col h-full w-full text-white md:pt-0 md:px-0 invisible">
                <div ref={el => textSections.current[1] = el} className="h-full" >

                  <div
                    className="accordion flex justify-between items-center h-1/5 px-8 text-2xl hover:pointer overflow-hidden"
                    onMouseEnter={() => handleHover(0, true)}
                    onMouseLeave={() => handleHover(0, false)}
                    ref={el => projectSection.current[0] = el} 
                  >
                    <div ref={el => projectBg.current[0] = el}  className="absolute h-1/5 w-full bg-white ml-[-2rem]" />
                    <div className="flex flex-col w-full justify-center z-50">
                      <div ref={el => projectHeader.current[0] = el} className="text-[1.5vh] mb-2">
                        Frontend Developer
                      </div>
                      <div
                        className="font-fragment flex justify-between items-center mb-2 text-[7vh] 3tall:text-[11vh] 2tall:leading-none bg-clip-text"
                        ref={el => projectTitle.current[0] = el} 
                      >
                        Hotswaps
                        <a className="z-50" target="_blank" href="https://www.hotswaps.io/">
                          <div 
                            className="text-sm md:text-lg underline z-50"
                            ref={el => projectLink.current[0] = el} 
                          >
                            website
                          </div>
                        </a>
                      </div>
                    </div>
                  </div>

                  <div
                    className="accordion flex justify-between items-center border-t-2 h-1/5 px-8 text-2xl hover:pointer overflow-hidden"
                    onMouseEnter={() => handleHover(1, true)}
                    onMouseLeave={() => handleHover(1, false)}
                    ref={el => projectSection.current[1] = el} 
                  >
                    <div ref={el => projectBg.current[1] = el}  className="absolute h-1/5 w-full bg-white ml-[-2rem]" />
                    <div className="flex flex-col justify-center z-50 w-full">
                      <div ref={el => projectHeader.current[1] = el} className="text-[1.5vh]">
                        It-Specialist
                      </div>
                      <div
                        className="font-fragment flex justify-between items-center w-full mb-2 text-[4.5vh] md:text-[6vh] 3tall:text-[11vh] 2tall:leading-none bg-clip-text"
                        ref={el => projectTitle.current[1] = el} 
                      >
                        Southpole
                        <a className="z-50" target="_blank" href="http://www.southpole-usa.com/">
                          <div 
                            className="text-sm md:text-lg underline z-50"
                            ref={el => projectLink.current[1] = el} 
                          >
                            Website
                          </div>
                        </a>
                      </div>
                    </div>

                  </div>

                  <div
                    className="accordion flex justify-between items-center border-t-2 h-1/5 px-8 text-2xl hover:pointer overflow-hidden gap-x-2"
                    onMouseEnter={() => handleHover(2, true)}
                    onMouseLeave={() => handleHover(2, false)}
                    ref={el => projectSection.current[2] = el} 
                  >
                    <div ref={el => projectBg.current[2] = el}  className="absolute h-1/5 w-full bg-white ml-[-2rem]" />
                    <div className="flex flex-col w-full justify-center z-50">
                      <div ref={el => projectHeader.current[2] = el} className="text-[1.5vh]">
                        Software Programmer
                      </div>
                      <div
                        className="font-fragment flex justify-between items-center text-[4.5vh] md:text-[6vh] 3tall:text-[11vh] 2tall:leading-none bg-clip-text"
                        ref={el => projectTitle.current[2] = el} 
                      >
                        Against All Odds
                        <a className="z-50" target="_blank" href="https://aao-usa.com/">
                          <div 
                            className="text-sm md:text-lg underline z-50"
                            ref={el => projectLink.current[2] = el} 
                          >
                            Website
                          </div>
                        </a>
                      </div>
                    </div>
                  </div>

                  <div
                    className="accordion flex justify-between items-center border-t-2 h-1/5 px-8 text-2xl hover:pointer overflow-hidden gap-x-2"
                    onMouseEnter={() => handleHover(3, true)}
                    onMouseLeave={() => handleHover(3, false)}
                    ref={el => projectSection.current[3] = el} 
                  >
                    <div ref={el => projectBg.current[3] = el}  className="absolute h-1/5 w-full bg-white ml-[-2rem]" />
                    <div className="flex flex-col w-full justify-center z-50">
                      <div ref={el => projectHeader.current[3] = el} className="text-[1.5vh]">
                        Web Developer
                      </div>
                      <div
                        className="font-fragment flex justify-between items-center text-[3vh] md:text-[6vh] 3tall:text-[11vh] 2tall:leading-none bg-clip-text"
                        ref={el => projectTitle.current[3] = el} 
                      >
                        Allerton Flowers
                        <a className="z-50" target="_blank" href="https://www.github.com">
                          <div 
                            className="text-sm md:text-lg underline z-50"
                            ref={el => projectLink.current[3] = el} 
                          >
                            Webiste
                          </div>
                        </a>
                      </div>
                    </div>
                  </div>
                  
                  <div
                    className="accordion flex justify-between items-center border-t-2 h-1/5 px-8 text-2xl hover:pointer overflow-hidden gap-x-2"
                    onMouseEnter={() => handleHover(4, true)}
                    onMouseLeave={() => handleHover(4, false)}
                    ref={el => projectSection.current[4] = el} 
                  >
                    <div ref={el => projectBg.current[4] = el}  className="absolute h-1/5 w-full bg-white ml-[-2rem]" />
                    <div className="flex flex-col w-full justify-center z-50">
                      <div ref={el => projectHeader.current[4] = el} className="text-[1.5vh] mb-2">
                        Frontend Engineer
                      </div>
                      <div
                        className="font-fragment flex justify-between items-center mb-2 text-[6vh] 3tall:text-[11vh] 2tall:leading-none bg-clip-text"
                        ref={el => projectTitle.current[4] = el} 
                      >
                        Spotlist
                        <a className="z-50" target="_blank" href="https://www.linkedin.com/company/spotlist-inc/">
                          <div 
                            className="text-sm md:text-lg underline z-50"
                            ref={el => projectLink.current[4] = el} 
                          >
                            website
                          </div>
                        </a>
                      </div>
                    </div>
                  </div>
                  
                </div>
              </div>

              <div ref={el => sections.current[2] = el} className="flex fixed flex-col h-full w-full text-white invisible">
                <div ref={el => textSections.current[2] = el} className="flex flex-col w-full h-full justify-evenly" >
                  <div className="w-full h-full px-8 pb-12 lg:px-16 pt-12">
                    <h1 className="text-4xl font-bold font-fragment">About Me</h1>
                    <br className="hidden lg:block" />
                    <p className="font-fragment">Welcome to my Page! My name is <b>Minjae Jung</b>, and I studied biomedical engineering at The College of New Jersey.</p>
                    <br className="hidden lg:block" />
                    <p className="font-fragment">In 2020, I graduated from the Columbia Engineering Full-Stack Development bootcamp and became a <b>React Native Developer</b> for SpotList, a cosmetology-technology startup located in New York City</p>
                    <br className="hidden lg:block" />
                    <p className="font-fragment">Since, I've held positions as an It Specialist, Software Programmer, and Frontend Engineer</p>
                    <br className="hidden lg:block" />
                    <p className="font-fragment">In my spare time, you can find me drawing, skateboarding, and playing rock on my electric guitar. Thanks for visiting my portfolio!</p>
                    <div className="sm:py-8 lg:py-12">
                      <h1 className="text-4xl font-bold font-fragment">
                        Current Work In Progress
                      </h1>
                      <br className="hidden lg:block"/>
                      <p>Allerton Flowers: Freelance Website</p>
                      <br className="hidden lg:block"/>
                      <p>TheCodingPlace: Freelance Website and Web Development Curriculum</p>
                      <br className="hidden lg:block"/>
                      <p>AWS Cloud Practioner Certificate</p>
                    </div>
                    {/* shows on small screens */}
                    <div className="xl:hidden mt-8">
                      <h1 className="text-4xl font-bold font-fragment">Hiring?</h1>
                      <div className="flex justify-between w-1/2 md:w-1/6 mt-4 md:mt-8">
                      <a target="_blank" href="https://github.com/minjae-jung-1">
                        <img className="ease h-[24px] w-[24px]" src="/github.png" alt="github" />
                      </a>
                      <a target="_blank" href="https://www.linkedin.com/in/minjae-jung-linked/">
                        <img className="ease h-[24px] w-[24px]" src="/linkedin.png" alt="linkedin" />
                      </a>
                      <a target="_blank" href="/Resume 4_2024.pdf">
                        <img className="ease h-[24px] w-[24px]" src="/resume.png" alt="rez zoo may" />
                      </a>
                      </div>
                    </div>
                  </div>
                  <div className="hidden xl:flex flex-col 2xl:justify-between w-full h-full px-8 pt-0 lg:px-16 pt-12 pb-32">
                    <h1 className="text-4xl font-bold font-fragment">Hiring?</h1>
                    <div className="flex font-fragment w-1/3 justify-between md:mt-8">
                      <a target="_blank" href="/Resume 4_2024.pdf">Resume</a>
                      <a target="_blank" href="https://www.linkedin.com/in/minjae-jung-linked/">LinkedIn</a>
                      <a target="_blank" href="https://github.com/minjae-jung-1/">GitHub</a>
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

// https://codepen.io/GreenSock/pen/XWzRraJ
// add custom mouse circle, goes well with balls
// https://codepen.io/GreenSock/pen/oNYXzYB

// 2. Add 3D models ( I have atm ) and have it rotateable ... changelles ( Canvas underneath, observer underneath interactions + responsiveness )


// To-Do
// 3. Something wrong going on with mobile landscape and canvas(?), may need resizing?
// 4. Medium sizing responsive, not sure if we need to do this
// [  May not be needed.... Images lowkey ugly
// 5. Try and animate images with css keyframes
// 6. Add endpoints for form... It might be able to save everything in an s3bucket so we dont need a server(?) aws probably offers something
// 7. Host images on a bucket or something and abstract from app... can add async code to fetch.
// 8. Form and Button Styling... can be better
// ]

// Done
// 1. Make animation times faster -- DONE
// 2. Disable scroll until first transition is finished -- DONE

