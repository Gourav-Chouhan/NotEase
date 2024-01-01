import React, { useState } from "react";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";
import { RiDeleteBin5Line } from "react-icons/ri";
import { IoDownloadOutline } from "react-icons/io5";

function Navbar() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="flex items-center justify-between flex-wrap p-6 text-white h-[10svh] lg:px-64 relative z-50 ">
      <div
        className="flex items-center flex-shrink-0 text-white mr-6 lg:mr-72 "
        onClick={() => {
          navigate("/");
        }}
      >
        <img src={logo} className="w-100 h-10 mr-2 invert" alt="Logo" />
        NoteEase
      </div>
      <Hamburger isOpen={isOpen} setIsOpen={setIsOpen} />
      <div
        className={`w-full ml-auto  block flex-grow lg:flex lg:items-center lg:justify-end lg:w-auto ${
          isOpen ? "block" : "hidden"
        }`}
      >
        <div className="text-sm lg:flex-grow bg-zinc-900 p-5 gap-6 rounded-lg lg:flex lg:items-center lg:justify-end">
          <div className="flex items-center gap-1 cursor-pointer hover:outline px-4 py-2 rounded-lg">
            <RiDeleteBin5Line />
            Delete All
          </div>

          <div className="flex items-center gap-1 cursor-pointer hover:outline px-4 py-2 rounded-lg">
            <IoDownloadOutline />
            Load sample Data
          </div>
        </div>
      </div>
    </nav>
  );
}
export default Navbar;

// hamburger component
const Hamburger = ({ isOpen, setIsOpen }) => {
  return (
    <div className="block lg:hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center px-3 py-2 rounded text-black-500 hover:text-black-400"
      >
        <svg
          className={`fill-current h-3 w-3 ${isOpen ? "hidden" : "block"}`}
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
        </svg>
        <svg
          className={`fill-current h-3 w-3 ${isOpen ? "block" : "hidden"}`}
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z" />
        </svg>
      </button>
    </div>
  );
};
