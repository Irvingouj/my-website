import { Dispatch } from "redux";
import { Action, ActionType } from "../action";
export const changeString = (str:String) => {
    return (dispatch:Dispatch<Action>) => {
        dispatch({
            type: ActionType.SEND_ACTION,
            value: str
        })
    }
}