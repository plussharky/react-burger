import {
    UPDATE_INGREDIENT_DETAILS } from './actions'

const initialState = {
    item: null
};

export const ingredientDetailsReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_INGREDIENT_DETAILS:
            return {
                item: action.payload
            }
        default:
            return state;
    }
}