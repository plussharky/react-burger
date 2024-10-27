import { AppDispatch } from "../../types";
import { getIngredients } from "../../utils/ingredients-api";
import { TIngredient } from "../../utils/types";

export const INGREDIENTS_LOADING = "INGREDIENTS_LOADING";
export const INGREDIENTS_LOAD_SUCCESS = "INGREDIENTS_LOAD_SUCCESS";
export const INGREDIENTS_ERROR = "INGREDIENTS_ERROR";

export type TIngredientsLoadingAction = {
    readonly type: typeof INGREDIENTS_LOADING;
};

export type TIngredientsLoadSuccessAction = {
    readonly type: typeof INGREDIENTS_LOAD_SUCCESS;
    readonly ingredients: TIngredient[];
};

export type TIngredientsErrorAction = {
    readonly type: typeof INGREDIENTS_ERROR;
    readonly error: string;
}

export type TIngredientsActions = TIngredientsLoadingAction
    | TIngredientsLoadSuccessAction
    | TIngredientsErrorAction;

export const ingredientsLoading = (): TIngredientsLoadingAction => {
    return { 
        type: INGREDIENTS_LOADING 
    };
}

export const ingredientsLoadSuccess = (ingredients: TIngredient[]): TIngredientsLoadSuccessAction => {
    return {
        type: INGREDIENTS_LOAD_SUCCESS,
        ingredients
    };
}

export const ingredientError = (error: string): TIngredientsErrorAction => {
    return {
        type: INGREDIENTS_ERROR,
        error
    };
}

export const loadIngredients = () => (dispatch: AppDispatch) => {
    dispatch(ingredientsLoading());

    return getIngredients()
        .then(res => dispatch(ingredientsLoadSuccess(res)))
        .catch(err => dispatch(ingredientError(err)))
}