import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaPlusCircle } from "react-icons/fa";

const bodySize = 60;
function Homepage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const notes = useSelector((state) => state.notes);
  const sortedNotes = notes.slice().sort((b, a) => a.timestamp - b.timestamp);

  const addNewNote = () => {
    const newIndex = notes.length === 0 ? 0 : notes[notes.length - 1].id + 1;
    console.log(newIndex);
    dispatch({ type: "ADD_NEW_NOTE", payload: { newIndex } });
    navigate(`/notes/${newIndex}`);
  };

  return (
    <div className="text-white  max-h-[90svh] overflow-auto grid grid-cols-2 gap-4 p-4 relative lg:w-3/4 mx-auto lg:grid-cols-3 lg:custom-scrollbar z-10">
      {sortedNotes.map(({ id, title, body, timestamp }) => {
        const date = new Date(timestamp);
        const options = { month: "long", day: "numeric", year: "numeric" };
        const formattedDate = date.toLocaleDateString("en-US", options);
        return (
          <div
            key={id}
            className="bg-zinc-800 p-5 rounded-2xl  cursor-pointer h-fit min-h-40 "
            onClick={() => navigate(`/notes/${id}`)}
          >
            <h1 className="text-xl mb-2">{title}</h1>
            <p className="text-lg text-zinc-300 break-all">
              {body.length > bodySize ? body.substr(0, bodySize) + "..." : body}
            </p>
            <p className="text-sm mt-4 text-zinc-400">{formattedDate}</p>
          </div>
        );
      })}

      <div
        className="text-6xl text-amber-400 fixed	bg-zinc-800 rounded-full right-10 bottom-10 lg:right-64"
        onClick={() => addNewNote()}
      >
        <FaPlusCircle />
      </div>
    </div>
  );
}

export default Homepage;
