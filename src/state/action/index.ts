export type Action = {
    type: String,
    value: String
}

export enum ActionType {
    SEND_ACTION = 'SEND_ACTION'
}

export const sendAction = (value:String): Action => {
    return {
        type: ActionType.SEND_ACTION,
        value: `${value}`
    };
}

