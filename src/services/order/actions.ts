import { postOrder } from '../../utils/order-api'
import { TOrderData } from '../../utils/types';
import { AppDispatch } from '../../types';
import { clearBurgerConstructor } from '../burger-constructor/actions';

export const ORDER_CREATE_LOADING = "ORDER_CREATE_LOADING";
export const ORDER_CREATE_SUCCESS = "ORDER_CREATE_SUCCESS";
export const ORDER_CREATE_ERROR = "ORDER_CREATE_ERROR";

export type TOrderCreateLoadingAction = {
    readonly type: typeof ORDER_CREATE_LOADING;
}

export type TOrderCreateSuccessAction = {
    readonly type: typeof ORDER_CREATE_SUCCESS;
    data: TOrderData
}

export type TOrderCreateErrorAction = {
    readonly type: typeof ORDER_CREATE_ERROR;
    error: string;
}

export type TOrderActions = TOrderCreateLoadingAction 
    | TOrderCreateSuccessAction
    | TOrderCreateErrorAction;

export const orderCreateLoading = (): TOrderCreateLoadingAction => {
    return { 
        type: ORDER_CREATE_LOADING
    };
}

export const orderCreateSuccess = (data: TOrderData): TOrderCreateSuccessAction => {
    return { 
        type: ORDER_CREATE_SUCCESS,
        data
    };
}

export const orderCreateError = (error: string): TOrderCreateErrorAction => {
    return {
        type: ORDER_CREATE_ERROR,
        error
    };
}

export const createOrder = (ingredients: string[], token: string) => 
    (dispatch: AppDispatch) => {
        dispatch(orderCreateLoading());

        return postOrder(ingredients, token)
        .then((data) => {
            dispatch(orderCreateSuccess(data));
            dispatch(clearBurgerConstructor());
        })
        .catch((error) => dispatch(orderCreateError(error)));
    };