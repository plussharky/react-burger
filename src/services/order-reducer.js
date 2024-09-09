import { postOrder } from '../utils/order-api'

export const ORDER_CREATE_LOADING = "ORDER_CREATE_LOADING";
export const ORDER_CREATE_SUCCESS = "ORDER_CREATE_SUCCESS";
export const ORDER_CREATE_ERROR = "ORDER_CREATE_ERROR";

export const createOrder = (ingredients) => (dispatch) => {
    dispatch({ type: ORDER_CREATE_LOADING });

    return postOrder()
    .then((data) => {
        dispatch({ 
            type: ORDER_CREATE_SUCCESS,
            payload: data, 
        });
    })
    .catch((error) => {
        dispatch({
            type: ORDER_CREATE_ERROR,
            payload: error,
        });
    });
};

const initialState = {
    ingredients: [],
    number: null,
    name: null,
    loading: false,
    error: null
}

export const orderReducer = (state = initialState, action) => {
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
                error: action.payload,
            }
        case ORDER_CREATE_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                number: action.payload.order.number,
                name: action.payload.name, 
            };
        default:
            return state;
    }
}