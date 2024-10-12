export const UPDATE_INGREDIENT_DETAILS = "UPDATE_INGREDIENT_DETAILS";

export const updateIngredientDetails = (item) => {
    return {
        type: UPDATE_INGREDIENT_DETAILS,
        payload: item
    }
}