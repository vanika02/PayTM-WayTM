import React, { useState } from "react";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  return (
    <nav className="bg-zinc-800 px-3 py-6 shadow-md flex items-center justify-between">
      {/* logo */}
      <div className=" text-white text-xl font-bold">PayTM WayTM</div>

      {/* links will be presented here */}
      <div className="hidden md:flex space-x-4">
        <a href="/dashboard" className="text-white hover:text-blue-800">Home</a>
        <a href="/update" className="text-white hover:text-blue-800">Update Information</a>
        <a href="/signin" className="text-white hover:text-blue-800">Logout</a>
      </div>
      {/* mobile menu button */}
      <button className="md:hidden block" onClick={() => setOpen((prev) => !prev)} aria-label="Toggle-menu">
        <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16"></path>
      </svg>
      </button>
        {open && (
          <div className="absolute top-15 left-0 w-full  bg-white shadow-md flex flex-col items-center space-y-2 md:hidden z-50">
            <a href="/dashboard" className="text-grey-800 font-bold hover:text-blue-800">Home</a>
            <a href="/update" className="text-grey-800 font-bold hover:text-blue-800">Update Information</a>
            <a href="/signin" className="text-grey-800 font-bold hover:text-blue-800">Logout</a>
            </ div>
        )}
    </nav>
  )
}

export default Navbar;