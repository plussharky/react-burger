import { TIngredient } from "../../utils/types";

export const UPDATE_INGREDIENT_DETAILS = "UPDATE_INGREDIENT_DETAILS";

export type TUpdateIngredientDetailsAction = {
    readonly type: typeof UPDATE_INGREDIENT_DETAILS;
    ingredient: TIngredient | null;
}

export type TIngredientDetailsActions = TUpdateIngredientDetailsAction;

export const updateIngredientDetails = (ingredient: TIngredient | null): TUpdateIngredientDetailsAction => {
    return {
        type: UPDATE_INGREDIENT_DETAILS,
        ingredient
    }
}