import { BASE_URL } from './api-config'
import { getResponse } from "./fetchUtils";

const orderApiConfig = {
    baseUrl: BASE_URL + "/orders",
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
}

export const postOrder = (ingredients) => {
    return fetch(orderApiConfig.baseUrl, {
        method: orderApiConfig.method,
        headers: orderApiConfig.headers,
        body: JSON.stringify({ingredients})
    })
    .then(getResponse);
};