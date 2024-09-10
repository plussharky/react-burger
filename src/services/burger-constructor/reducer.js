import { ADD_BUN, ADD_INGREDIENT } from "./actions";

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
        default:
            return state;
    }
}