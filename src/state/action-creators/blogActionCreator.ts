import { Dispatch } from "redux";
import { BlogAction, BlogActionType } from "../action/BlogAction";


export const setBlog = (id:String) => {
    return (dispatch:Dispatch<BlogAction>) => {
        dispatch({
            type: BlogActionType.SET_BLOG_ID,
            value: id
        })
    }
}

export const removeBlog = () => {
    return (dispatch:Dispatch<BlogAction>) => {
        dispatch({
            type: BlogActionType.REMOVE_BLOG_ID,
            value: ""
        })
    }
}