import { TWsOrderResponse } from "../../utils/types";

export const WS_CONNECTION_START: 'WS_CONNECTION_START' = 'WS_CONNECTION_START';
export const WS_CONNECTION_SUCCESS: 'WS_CONNECTION_SUCCESS' = 'WS_CONNECTION_SUCCESS';
export const WS_CONNECTION_ERROR: 'WS_CONNECTION_ERROR' = 'WS_CONNECTION_ERROR';
export const WS_CONNECTION_CLOSED: 'WS_CONNECTION_CLOSED' = 'WS_CONNECTION_CLOSED';
export const WS_GET_MESSAGE: 'WS_GET_MESSAGE' = 'WS_GET_MESSAGE';
export const WS_SEND_MESSAGE: 'WS_SEND_MESSAGE' = 'WS_SEND_MESSAGE';

export type TWsConnectionStartAction = {
    readonly type: typeof WS_CONNECTION_START;
}

export type TWsConnectionSuccessAction = {
    readonly type: typeof WS_CONNECTION_SUCCESS;
}

export type TWsConnectionErrorAction = {
    readonly type: typeof WS_CONNECTION_ERROR;
    readonly payload: string; // Можно добавить payload для ошибки
}

export type TWsConnectionClosedAction = {
    readonly type: typeof WS_CONNECTION_CLOSED;
}

export type TWsGetMessageAction = {
    readonly type: typeof WS_GET_MESSAGE;
    readonly payload: TWsOrderResponse; // Определите тип для сообщений, если это возможно
}

export type TWsSendMessageAction = {
    readonly type: typeof WS_SEND_MESSAGE;
    readonly payload: any; // Определите тип для сообщений, если это возможно
}

// Типизация для всех возможных действий feed
export type TFeedActions = 
    | TWsConnectionStartAction
    | TWsConnectionSuccessAction
    | TWsConnectionErrorAction
    | TWsConnectionClosedAction
    | TWsGetMessageAction
    | TWsSendMessageAction;
