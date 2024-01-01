import React from "react";
import { GiCheckMark } from "react-icons/gi";
import { RxCross2 } from "react-icons/rx";

function Modal({ text, handleChange }) {
  return (
    <div className="fixed top-0 left-0 z-50 flex justify-center items-center w-full h-full  bg-zinc-900 bg-opacity-80">
      <div className="border p-5 rounded-lg bg-zinc-900 w-[90%] md:w-fit">
        <p>{text}</p>

        <div className="flex justify-center items-center gap-4 mt-5">
          <div
            className="cursor-pointer text-xl"
            onClick={() => handleChange(false)}
          >
            <RxCross2 />
          </div>
          <div className="cursor-pointer" onClick={() => handleChange(true)}>
            <GiCheckMark />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
