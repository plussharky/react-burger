import { TIngredientDetailsActions, UPDATE_INGREDIENT_DETAILS } from './actions';
import { TIngredient } from '../../utils/types'

type TIngredientDetailsState = {
    item: TIngredient | null
}

const initialState: TIngredientDetailsState = {
    item: null
};

export const ingredientDetailsReducer = (state = initialState, action: TIngredientDetailsActions) => {
    switch (action.type) {
        case UPDATE_INGREDIENT_DETAILS:
            return {
                item: action.ingredient
            }
        default:
            return state;
    }
}