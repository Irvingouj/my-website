import { Action } from "../action";
import { combineReducers } from "redux";

export interface stringState {
    value: String;
}

export const initState:stringState = {
    value:"value"
}

const stringReducer = (state:stringState = initState,action:Action):stringState => {
  return {
    value:action.value
  };
};

const reducers = combineReducers(
  {
    string: stringReducer
  }
)

export default reducers;