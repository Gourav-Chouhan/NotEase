import { notes } from "../assets/dummyData";
const savedData = localStorage.getItem("notes");
const initialState = savedData
  ? JSON.parse(savedData).filter(
      (e) => Object.hasOwn(savedData, "date") && e.title && e.body
    )
  : [];

export const notesReducer = (state = initialState, action) => {
  let updatedNotes;
  switch (action.type) {
    case "UPDATE_NOTE":
      const data = action.payload;

      updatedNotes = state
        .map((note) =>
          note.id === parseInt(data.id)
            ? { ...note, ...data, id: parseInt(data.id) }
            : note
        )
        .filter((e) => Object.hasOwn(savedData, "date") && e.title && e.body)
        .slice()
        .sort((b, a) => a.timestamp - b.timestamp);
      localStorage.setItem("notes", JSON.stringify(updatedNotes));
      return updatedNotes;

    case "DELETE_NOTE":
      const { id } = action.payload;
      updatedNotes = state
        .filter((note) => note.id !== parseInt(id))
        .slice()
        .sort((b, a) => a.timestamp - b.timestamp);
      localStorage.setItem("notes", JSON.stringify(updatedNotes));
      return updatedNotes;

    case "ADD_NEW_NOTE":
      const { newIndex } = action.payload;
      updatedNotes = [{ title: "", body: "", id: newIndex }, ...state];
      localStorage.setItem("notes", JSON.stringify(updatedNotes));
      return updatedNotes.slice();

    case "DELETE_ALL":
      localStorage.setItem("notes", JSON.stringify([]));
      return [];

    case "LOAD_SAMPLE":
      localStorage.setItem("notes", JSON.stringify(notes));
      return notes;

    default:
      return state;
  }
};
