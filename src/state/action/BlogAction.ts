export interface SetBlogAction{
    type:BlogActionType.SET_BLOG_ID;
    value:String;
}

export interface RemoveBlogAction{
    type:BlogActionType.REMOVE_BLOG_ID;
    value:String;
}

export type BlogAction = SetBlogAction | RemoveBlogAction;

export enum BlogActionType {
    SET_BLOG_ID = 'SET_BLOG_ID',
    REMOVE_BLOG_ID = 'REMOVE_BLOG_ID'
}

export const setBlogId = (id:String): BlogAction => {
    return {
        type: BlogActionType.SET_BLOG_ID,
        value: `${id}`
    };
}

