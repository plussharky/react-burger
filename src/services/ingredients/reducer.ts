import { 
    INGREDIENTS_LOAD_SUCCESS, 
    INGREDIENTS_LOADING, 
    INGREDIENTS_ERROR, 
    TIngredientsActions} from "./actions";
import { TIngredient } from '../../utils/types'

type TIngredientsState = {
    ingredients: TIngredient[];
    loading: boolean;
    error: string | null;
}

const initialState: TIngredientsState = {
    ingredients: [],
    loading: false,
    error: null
}

export const ingredientsReducer = (state = initialState, action: TIngredientsActions) => {
    switch (action.type) {
        case INGREDIENTS_LOADING:
            return {
                ...state,
                loading: true,
                error: null,
            }
        case INGREDIENTS_ERROR:
            return {
                ...state,
                loading: false,
                error: action.error,
            }
        case INGREDIENTS_LOAD_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                ingredients: action.ingredients,
            };
        default:
            return state;
    }
}