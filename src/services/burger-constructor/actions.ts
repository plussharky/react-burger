import { v4 as uuidv4 } from 'uuid';
import { TIngredient } from '../../utils/types'

export const ADD_INGREDIENT = "ADD_INGREDIENT";
export const ADD_BUN = "ADD_BUN";
export const MOVE_INGREDIENT = "MOVE_INGREDIENT";
export const DELETE_INGREDIENT = "DELETE_INGREDIENT";

export type TAddIngredientAction = {
    readonly type: typeof ADD_INGREDIENT;
    readonly ingredient: TIngredient;
};

export type TAddBunAction = { 
    readonly type: typeof ADD_BUN;
    readonly bun: TIngredient;
};

export type TMoveIngredientAction = {
    readonly type: typeof MOVE_INGREDIENT;
    readonly index: {
        from: number;
        to: number;
    };
};

export type TDeleteIngredientAction = {
    readonly type: typeof DELETE_INGREDIENT;
    readonly index: number;
};

export type TBurgerConstructorActions = TAddIngredientAction 
    | TAddBunAction 
    | TMoveIngredientAction 
    | TDeleteIngredientAction;

export const addIngredient = (item: TIngredient): TAddIngredientAction => {
    return { 
        type: ADD_INGREDIENT,
        ingredient: {
            ...item,
            uniqueId: uuidv4()
        }
    }
}

export const addBun = (item: TIngredient): TAddBunAction => {
    return { 
        type: ADD_BUN,
        bun: {
            ...item,
            uniqueId: uuidv4()
        }
    }
}

export const moveIngredient = (from: number, to: number): TMoveIngredientAction => {
    return {
        type: MOVE_INGREDIENT,
        index: { from, to }
    }
}

export const deleteIngredient = (index: number): TDeleteIngredientAction => {
    return {
        type: DELETE_INGREDIENT,
        index
    }
}