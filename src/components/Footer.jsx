import React from 'react'

const Footer = React.forwardRef((props, ref ) => {
  return (
    <footer className="flex w-full h-[8%] justify-between items-center px-4 md:px-16">
      <div className="flex w-32 justify-between items-center overflow-hidden gap-x-4">
        <p ref={el => ref.current.ref1 = [ el ]} className="ease mt-0.5">Home</p>
        <p ref={el => ref.current.ref1 = [...ref.current.ref1, el]} className="mt-0.5 invisible fixed">Work</p>
        <p ref={el => ref.current.ref1 = [...ref.current.ref1, el]} className="mt-0.5 invisible fixed">About</p>
        <p ref={el => ref.current.ref1 = [...ref.current.ref1, el]} className="mt-0.5 invisible fixed">Contact</p>
        <div className="flex h-2 w-32 justify-between overflow-hidden relative">
          <div className="ease border w-2 h-2 rounded-[50%] z-50 overflow-hidden">
            <div ref={el => ref.current.ref2 = [ el ]} className="bg-white absolute w-2 h-2" />
          </div>
          <div className="ease border w-2 h-2 rounded-[50%] z-50 overflow-hidden">
            <div ref={el => ref.current.ref2 = [...ref.current.ref2, el]} className="bg-white absolute w-2 h-2" />
          </div>
          <div className="ease border w-2 h-2 rounded-[50%] z-50 overflow-hidden">
            <div ref={el => ref.current.ref2 = [...ref.current.ref2, el]} className="bg-white absolute w-2 h-2" />
          </div>
          <div className="ease border w-2 h-2 rounded-[50%] z-50 overflow-hidden">
            <div ref={el => ref.current.ref2 = [...ref.current.ref2, el]} className="bg-white absolute w-2 h-2" />
          </div>
        </div>
      </div>
      <div className="flex w-28 justify-between">
        <a target="_blank" href="https://github.com/minjae-jung-1">
          <img className="ease h-[24px] w-[24px]" src="/github.png" alt="github" />
        </a>
        <a target="_blank" href="https://www.linkedin.com/in/minjae-jung-linked/">
          <img className="ease h-[24px] w-[24px]" src="/linkedin.png" alt="linkedin" />
        </a>
        <img className="ease h-[24px] w-[24px]" src="/resume.png" alt="rez zoo may" />
      </div>
    </footer>
  )
})

export default Footer;