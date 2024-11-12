import {
    ORDER_CREATE_LOADING, 
    ORDER_CREATE_ERROR, 
    ORDER_CREATE_SUCCESS, 
    TOrderActions} from './actions'

type TOrderState = {
    number: number | null,
    name: string | null,
    loading: boolean,
    error: string | null
}

export const initialState: TOrderState = {
    number: null,
    name: null,
    loading: false,
    error: null
}

export const orderReducer = (state = initialState, action: TOrderActions): TOrderState => {
    switch (action.type) {
        case ORDER_CREATE_LOADING:
            return {
                ...state,
                loading: true,
                error: null,
            }
        case ORDER_CREATE_ERROR:
            return {
                ...state,
                loading: false,
                error: action.error,
            }
        case ORDER_CREATE_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                number: action.data.order.number,
                name: action.data.name, 
            };
        default:
            return state;
    }
}