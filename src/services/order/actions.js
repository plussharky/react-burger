import { postOrder } from '../../utils/order-api'

export const ORDER_CREATE_LOADING = "ORDER_CREATE_LOADING";
export const ORDER_CREATE_SUCCESS = "ORDER_CREATE_SUCCESS";
export const ORDER_CREATE_ERROR = "ORDER_CREATE_ERROR";

export const createOrder = (ingredients, token) => (dispatch) => {
    console.log(token);
    dispatch({ type: ORDER_CREATE_LOADING });

    return postOrder(ingredients, token)
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