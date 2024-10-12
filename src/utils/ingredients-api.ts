import { BASE_URL } from "./api-config";
import { getResponse } from "./fetchUtils";
import { TIngredient } from "./types";

const ingredientsBaseUrl = BASE_URL + "/ingredients";

type TGetIngredients = {
    success: boolean;
    data: TIngredient[];
}

export const getIngredients = (): Promise<TIngredient[]> => {
    return fetch(ingredientsBaseUrl)
        .then(getResponse<TGetIngredients>)
        .then((response: TGetIngredients) => response.data);
}