import { BASE_URL } from './api-config'
import { getResponse } from "./fetchUtils";
import { TIngredient, TOrderData } from './types'

const orderApiConfig = {
    baseUrl: BASE_URL + "/orders",
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
}

export const postOrder = (ingredients: TIngredient[], token: string): Promise<TOrderData> => {
    return fetch(orderApiConfig.baseUrl, {
        method: orderApiConfig.method,
        headers: {
            ...orderApiConfig.headers,
            authorization: token,
        },
        body: JSON.stringify({ingredients})
    })
    .then(getResponse<TOrderData>);
};