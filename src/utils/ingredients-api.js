import { BASE_URL } from "./api-config";
import { getResponse } from "./fetchUtils";

const ingredientsApiConfig = {
    baseUrl: BASE_URL + "/ingredients",
}

export const getIngredients = () => {
    return fetch(ingredientsApiConfig.baseUrl)
        .then(getResponse)
        .then((response) => response.data);
}