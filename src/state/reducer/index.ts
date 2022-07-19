import { combineReducers } from "redux";
import { blogReducer } from "./BlogActionReducer";

export const reducers = combineReducers(
    {
      blog: blogReducer
    }
  )
  
export default reducers;