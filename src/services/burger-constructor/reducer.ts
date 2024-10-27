import { TIngredient } from "../../utils/types";
import { 
    ADD_BUN, 
    ADD_INGREDIENT, 
    MOVE_INGREDIENT,
    DELETE_INGREDIENT, 
    TBurgerConstructorActions} from "./actions";

type TBurgerConstructor = {
    bun: TIngredient | null;
    ingredients: TIngredient[];
};

const initialState: TBurgerConstructor = {
    bun : null,
    ingredients: []
}

export const burgerConstructorReducer = (state = initialState, action: TBurgerConstructorActions) => {
    switch (action.type) {
        case ADD_INGREDIENT:
            return {
                ...state,
                ingredients: [...state.ingredients, action.ingredient]
            };
        case ADD_BUN:
            return {
                ...state,
                bun: action.bun
            };
        case MOVE_INGREDIENT:
            const movedIngredients = [...state.ingredients];
            movedIngredients.splice(
                action.index.to, 
                0, 
                movedIngredients.splice(action.index.from, 1)[0]
            );
            return {
                ...state,
                ingredients: movedIngredients
            };
        case DELETE_INGREDIENT:
            const remainingIngredients = [...state.ingredients];
            remainingIngredients.splice(action.index, 1)
            return {
                ...state,
                ingredients: remainingIngredients
            }
        default:
            return state;
    }
}