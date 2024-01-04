import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaPlusCircle } from "react-icons/fa";

const bodySize = 80;
const getColumns = () => {
  const width = window.innerWidth;
  if (width < 1024) return 2;
  else if (width < 1280) return 3;
  return 4;
};

function Homepage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const notes = useSelector((state) => state.notes);

  const addNewNote = () => {
    const newIndex = notes.length === 0 ? 0 : notes[notes.length - 1].id + 1;
    dispatch({ type: "ADD_NEW_NOTE", payload: { newIndex } });
    navigate(`/notes/${newIndex}`);
  };

  const [colCount, setColCount] = useState(getColumns);

  useEffect(() => {
    const handleResize = () => {
      setColCount(getColumns);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const [noteColumns, setNoteColumns] = useState([[]]);
  useEffect(() => {
    let tempNoteColumns = Array(colCount)
      .fill()
      .map(() => []);

    notes.forEach((e, index) => {
      tempNoteColumns[index % colCount].push(e);
    });
    setNoteColumns(tempNoteColumns);
  }, [colCount, notes]);
  return (
    <div className="text-white  max-h-[90svh] overflow-auto grid grid-cols-2 gap-4 p-4 relative lg:w-3/4 mx-auto lg:grid-cols-3 lg:custom-scrollbar z-10 xl:grid-cols-4">
      {noteColumns.map((colArray, colArrayIndex) => {
        return (
          <div key={colArrayIndex}>
            {colArray.map(({ id, title, body, timestamp }) => {
              const date = new Date(timestamp);
              const options = {
                month: "long",
                day: "numeric",
                year: "numeric",
              };
              const formattedDate = date.toLocaleDateString("en-US", options);
              return (
                <div
                  key={id}
                  className="bg-zinc-800 p-5 rounded-2xl  cursor-pointer mb-4 "
                  onClick={() => navigate(`/notes/${id}`)}
                >
                  <h1 className="text-xl mb-2">{title}</h1>
                  <p className="text-lg text-zinc-300 break-all">
                    {body.length > bodySize
                      ? body.substr(0, bodySize) + "..."
                      : body}
                  </p>
                  <p className="text-sm mt-4 text-zinc-400">{formattedDate}</p>
                </div>
              );
            })}
          </div>
        );
      })}

      {/* if no notes is present */}
      {notes.length === 0 && (
        <div className="text-center absolute w-full mt-1">
          Click on plus icon to add a new note
        </div>
      )}
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
