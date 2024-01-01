import { notes } from "../assets/dummyData";
const initialState = [...notes];

export const notesReducer = (state = initialState, action) => {
  switch (action.type) {
    case "UPDATE_NOTE":
      const data = action.payload;

      const updatedNotes = state.map((note) =>
        note.id === parseInt(data.id)
          ? { ...note, ...data, id: parseInt(data.id) }
          : note
      );
      return updatedNotes;

    case "DELETE_NOTE":
      const { id } = action.payload;
      return state.filter((note) => note.id !== parseInt(id));

    case "ADD_NEW_NOTE":
      const { newIndex } = action.payload;
      return [...state, { title: "", body: "", id: newIndex }];

    default:
      return state;
  }
};
