import { ADD_BUN, ADD_INGREDIENT, MOVE_INGREDIENT } from "./actions";

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
            const ingredients = [...state.ingredients];
            ingredients.splice(
                action.payload.toIndex, 
                0, 
                ingredients.splice(action.payload.fromIndex, 1)[0]
            );
            return {
                ...state,
                ingredients: ingredients
            };
        default:
            return state;
    }
}