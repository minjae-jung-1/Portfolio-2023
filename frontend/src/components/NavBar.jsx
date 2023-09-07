function NavBar({ isMobile }) {
  
  return (
    <div className={`
      fixed flex w-full h-16 top-0 px-4 md:px-8 lg:px-16 pt-4 py-6 text-base justify-between text-lg overflow-hidden text-white items-center border-b
    `}>
      <div className="ease cooper text-xl mt-3 font-bold">MINJAE JUNG</div>
      <a className="ease cooper text-md mt-3">Menu</a>
    </div>
  )
}

export default NavBar;
