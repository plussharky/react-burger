import { TWsOrderResponse } from "../../utils/types";
import { createAction } from '@reduxjs/toolkit';

export const WS_CONNECT: "WS_CONNECT" = "WS_CONNECT";
export const WS_DISCONNECT: "WS_DISCONNECT" = "WS_DISCONNECT";
export const WS_CONNECTING: "WS_CONNECTING" = "WS_CONNECTING";
export const WS_OPEN: "WS_OPEN" = "WS_OPEN";
export const WS_CLOSE: "WS_CLOSE" = "WS_CLOSE";
export const WS_ERROR: "WS_ERROR" = "WS_ERROR";
export const WS_GET_MESSAGE: "WS_GET_MESSAGE" = "WS_GET_MESSAGE";
export const WS_SEND_MESSAGE: "WS_SEND_MESSAGE" = "WS_SEND_MESSAGE";

export type TWsConnectAction = {
    readonly type: typeof WS_CONNECT;
    readonly payload: string; 
};

export type TWsConnectingAction = {
    readonly type: typeof WS_CONNECTING;
};

export type TWsOpenAction = {
    readonly type: typeof WS_OPEN;
};

export type TWsCloseAction = {
    readonly type: typeof WS_CLOSE;
};

export type TWsErrorAction = {
    readonly type: typeof WS_ERROR;
    readonly payload: string; 
};

export type TWsGetMessageAction = {
    readonly type: typeof WS_GET_MESSAGE;
    readonly payload: TWsOrderResponse;
};

export type TWsSendMessageAction = {
    readonly type: typeof WS_SEND_MESSAGE;
    readonly payload: any;
};

export type TWsDisconnectAction = {
    readonly type: typeof WS_DISCONNECT;
};

export type TFeedActions = 
    | TWsConnectAction
    | TWsConnectingAction
    | TWsOpenAction
    | TWsCloseAction
    | TWsErrorAction
    | TWsGetMessageAction
    | TWsSendMessageAction
    | TWsDisconnectAction;

export const wsConnect = createAction<string, "WS_CONNECT">(WS_CONNECT);
export const wsDisconnect = createAction(WS_DISCONNECT);
export const wsConnecting = createAction(WS_CONNECTING);
export const wsOpen = createAction(WS_OPEN);
export const wsClose = createAction(WS_CLOSE);
export const wsError = createAction<string>(WS_ERROR);
export const wsGetMessage = createAction<TWsOrderResponse>(WS_GET_MESSAGE);