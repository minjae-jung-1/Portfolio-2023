function NavBar({ isMobile }) {
  return (
    <div className={`
      fixed flex w-full top-0 px-16 py-10 justify-between text-lg overflow-hidden text-white
      ${isMobile ? 'px-8 py-6 text-base' : null}
    `}>
      <div className="ease luckiestGuy text-2xl">Minjae Jung</div>
      {isMobile && <a className="ease">Menu</a>}
      {!isMobile && (<div className="flex w-60 justify-between">
        <div className="ease">WORK</div>
        <div className="ease">ABOUT</div>
        <div className="ease">CONTACT</div>
      </div>)}
    </div>
  )
}

export default NavBar;
