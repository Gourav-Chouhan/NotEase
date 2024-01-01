import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { GiCheckMark } from "react-icons/gi";
import { AiOutlineReload } from "react-icons/ai";
import { RiDeleteBin5Line } from "react-icons/ri";

function NotePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const notes = useSelector((state) => state.notes);
  const index = notes.findIndex((note) => {
    return note.id === parseInt(id);
  });
  if (index === -1) {
    return (
      <div className="flex flex-col items-center mt-32">
        <div className="text-white p-5 text-center">
          The note you are looking for does not exist or has been deleted!!!
        </div>
        <button
          className="text-white border px-5 py-2 cursor-pointer"
          onClick={() => navigate("/")}
        >
          Home
        </button>
      </div>
    );
  }
  const note = notes[index];
  const [title, setTitle] = useState(note.title);
  const [body, setBody] = useState(note.body);

  const handleSave = () => {
    const currentDate = new Date(Date.now());
    const monthName = new Intl.DateTimeFormat("en-US", {
      month: "long",
    }).format(currentDate);
    const formattedDate = `${monthName} ${currentDate.getDate()}, ${currentDate.getFullYear()}`;

    dispatch({
      type: "UPDATE_NOTE",
      payload: {
        id,
        title,
        body,
        timestamp: Date.now(),
      },
    });
    navigate("/");
  };
  const handleReset = () => {
    setTitle(note.title);
    setBody(note.body);
  };
  const handleDelete = () => {
    dispatch({ type: "DELETE_NOTE", payload: { id } });
    navigate("/");
  };
  return (
    <div className="text-white p-5 mx-auto lg:w-2/3 flex flex-col  min-h-[85svh]">
      <textarea
        rows={1}
        className="text-3xl font-bold bg-transparent w-full resize-none outline-none my-4"
        placeholder="Enter the title of the note..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      >
        {title}
      </textarea>
      <textarea
        rows={24}
        className="bg-transparent w-full resize-none outline-none "
        placeholder="Start noting..."
        value={body}
        onChange={(e) => setBody(e.target.value)}
      >
        {body}
      </textarea>
      <div className="w-full mt-auto flex items-center justify-end gap-8 text-2xl select-none pr-7">
        <div className="cursor-pointer" onClick={handleDelete}>
          <RiDeleteBin5Line />
        </div>
        <div className="cursor-pointer" onClick={handleReset}>
          <AiOutlineReload />
        </div>
        <div className="cursor-pointer" onClick={handleSave}>
          <GiCheckMark />
        </div>
      </div>
    </div>
  );
}

export default NotePage;
