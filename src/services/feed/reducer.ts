import { TOrder } from "../../utils/types"
import { TFeedActions, WS_ERROR, WS_CONNECT, WS_GET_MESSAGE } from './actions'

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