import { BlogAction, BlogActionType } from "../action/BlogAction";
import { combineReducers } from "redux";

export interface stringState {
    value: String;
}

export const initState:stringState = {
    value:"0"
}

export const blogReducer = (state:stringState = initState,action:BlogAction) => {
  if(action.type === BlogActionType.SET_BLOG_ID){
      return {
          ...state,
          value:action.value
      }
    }
    
    return {
      ...state,
      value:""
  }
};
