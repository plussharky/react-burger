import { v4 as uuidv4 } from 'uuid';

export const ADD_INGREDIENT = "ADD_INGREDIENT";
export const ADD_BUN = "ADD_BUN";
export const MOVE_INGREDIENT = "MOVE_INGREDIENT";
export const DELETE_INGREDIENT = "DELETE_INGREDIENT";

export const addIngredient = (item) => {
    return { 
        type: ADD_INGREDIENT,
        payload: {
            ...item,
            uniqueId: uuidv4()
        }
    }
}

export const addBun = (item) => {
    return { 
        type: ADD_BUN,
        payload: {
            ...item,
            uniqueId: uuidv4()
        }
    }
}