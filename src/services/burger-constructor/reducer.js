import { 
    ADD_BUN, 
    ADD_INGREDIENT, 
    MOVE_INGREDIENT,
    DELETE_INGREDIENT } from "./actions";

const initialState = {
    bun : null,
    ingredients: []
}

export const burgerConstructorReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_INGREDIENT:
            return {
                ...state,
                ingredients: [...state.ingredients, action.payload]
            };
        case ADD_BUN:
            return {
                ...state,
                bun: action.payload
            };
        case MOVE_INGREDIENT:
            const movedIngredients = [...state.ingredients];
            movedIngredients.splice(
                action.payload.toIndex, 
                0, 
                movedIngredients.splice(action.payload.fromIndex, 1)[0]
            );
            return {
                ...state,
                ingredients: movedIngredients
            };
        case DELETE_INGREDIENT:
            const remainingIngredients = [...state.ingredients];
            remainingIngredients.splice(action.payload, 1)
            return {
                ...state,
                ingredients: remainingIngredients
            }
        default:
            return state;
    }
}