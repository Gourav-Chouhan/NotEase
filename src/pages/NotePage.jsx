import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Modal from "../components/Modal";

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
  const note = index !== -1 ? notes[index] : {};
  const [title, setTitle] = useState(note.title);
  const [body, setBody] = useState(note.body);
  const [modalOpen, setModalOpen] = useState(false);

  const handleSave = () => {
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

  const handleModalChange = (confirm) => {
    if (confirm) {
      dispatch({ type: "DELETE_NOTE", payload: { id } });
      navigate("/");
    }
    setModalOpen(false);
  };
  const handleDelete = () => {
    setModalOpen(true);
  };

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
  return (
    <div className="text-white p-5 mx-auto lg:w-2/3 flex flex-col  min-h-[85svh]">
      <textarea
        rows={1}
        className="text-3xl font-bold bg-transparent w-full resize-none outline-none my-4 lg:custom-scrollbar"
        placeholder="Enter the title of the note..."
        value={title}
        onChange={(e) => {
          const val = e.target.value;
          if (val.length <= 30) setTitle(val);
        }}
      >
        {title}
      </textarea>
      <textarea
        rows={24}
        className="bg-transparent w-full resize-none outline-none lg:custom-scrollbar"
        placeholder="Start noting..."
        value={body}
        onChange={(e) => setBody(e.target.value)}
      >
        {body}
      </textarea>
      <div className="w-full mt-auto flex items-center justify-end gap-8 text-2xl select-none pr-7 p-4 bg-zinc-900 fixed bottom-5 right-4 md:bottom-10 md:right-20 lg:bottom-20 lg:right-60">
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
      {modalOpen && (
        <Modal
          text="Are you sure you want to delete all the notes"
          handleChange={handleModalChange}
        />
      )}
    </div>
  );
}

export default NotePage;
