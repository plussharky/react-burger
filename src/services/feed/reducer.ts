import { TOrder } from "../../utils/types"
import { TFeedActions, WS_ERROR, WS_CONNECT, WS_GET_MESSAGE, WS_OPEN, WS_DISCONNECT, WS_CLOSE } from './actions'

type TFeedState = {
    orders: TOrder[];
    total: number;
    totalToday: number;
    connectionError: string | null;
    isConnected: boolean;
};

const initialState: TFeedState = {
    orders: [],
    total: 0,
    totalToday: 0,
    connectionError: null,
    isConnected: false
}

export const feedReducer = (state = initialState, action: TFeedActions): TFeedState => {
  switch(action.type) {
    case WS_OPEN:
        return {
            ...state,
            connectionError: null,
            isConnected: true,
        };
    case WS_DISCONNECT: 
        return {
            ...state,
            connectionError: null,
            isConnected: false
        };
    case WS_CLOSE: 
        return {
            ...state,
            connectionError: null,
            isConnected: false
        }
    case WS_GET_MESSAGE: 
        return {
            ...state,
            orders: action.payload.orders,
            total: action.payload.total,
            totalToday: action.payload.totalToday,
            connectionError: null
        };
    default: 
        return state;
  }
}