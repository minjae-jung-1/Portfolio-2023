function NavBar({ isMobile }) {
  
  return (
    <div className={`
      fixed flex w-full h-20 top-0 px-4 md:px-16 pt-4 py-6 text-base justify-between text-lg overflow-hidden text-white items-center
    `}>
      <div className="ease luckiestGuy text-2xl">Minjae Jung</div>
      {isMobile && <a className="ease">Menu</a>}
      {!isMobile && (<div className="flex w-28 justify-between">
        <a target="_blank" href="https://github.com/minjae-jung-1">
          <img className="ease h-[24px] w-[24px]" src="/github.png" alt="github" />
        </a>
        <a target="_blank" href="https://www.linkedin.com/in/minjae-jung-linked/">
          <img className="ease h-[24px] w-[24px]" src="/linkedin.png" alt="linkedin" />
        </a>
        <img className="ease h-[24px] w-[24px]" src="/resume.png" alt="rez zoo may" />
      </div>)}
    </div>
  )
}

export default NavBar;
