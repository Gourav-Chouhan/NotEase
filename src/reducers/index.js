import { combineReducers } from "redux";
import { notesReducer } from "./notes";
const allReducers = combineReducers({
  notes: notesReducer,
});

export default allReducers;
