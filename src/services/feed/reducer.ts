import { TOrder } from "../../utils/types"
import { TFeedActions, WS_CONNECTION_ERROR, WS_CONNECTION_SUCCESS, WS_GET_MESSAGE } from './actions'

//type TOrder

type TFeedState = {
    orders: TOrder[];
    total: number;
    totalToday: number;
    connectionError: string | null;
};

const initialState: TFeedState = {
    orders: [],
    total: 0,
    totalToday: 0,
    connectionError: null
}

export const feedReducer = (state = initialState, action: TFeedActions): TFeedState => {
  switch(action.type) {
    case WS_CONNECTION_SUCCESS: 
        return {
            ...state,
            connectionError: null
        }
    case WS_CONNECTION_ERROR:
        return {
            ...state,
            connectionError: action.payload
        };
    case WS_GET_MESSAGE: 
        return {
            ...state,
            orders: action.payload.orders,
            total: action.payload.total,
            totalToday: action.payload.totalToday,
            connectionError: null
        }
  }
}