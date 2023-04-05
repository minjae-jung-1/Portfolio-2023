function Footer() {
  return (
    <footer className="flex w-full h-[8%] justify-between items-center px-4 md:px-16">
      <div className="flex w-32 justify-between items-center overflow-hidden">
        <p className="mt-0.5">Home</p>
        <div className="border w-2 h-2 rounded-[50%]" />
        <div className="border w-2 h-2 rounded-[50%]" />
        <div className="border w-2 h-2 rounded-[50%]" />
        <div className="border w-2 h-2 rounded-[50%]" />
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
}

export default Footer;