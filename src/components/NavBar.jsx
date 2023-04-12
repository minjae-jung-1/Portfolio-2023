function NavBar({ isMobile }) {
  
  return (
    <div className={`
      fixed flex w-full h-20 top-0 px-4 md:px-16 pt-4 py-6 text-base justify-between text-lg overflow-hidden text-white items-center
    `}>
      <div className="ease cooper text-xl mt-2">MINJAE JUNG</div>
      <a className="ease cooper text-md mt-2">Menu</a>
    </div>
  )
}

export default NavBar;
