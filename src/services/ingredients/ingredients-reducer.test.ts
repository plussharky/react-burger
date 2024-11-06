import { ingredientsReducer } from './reducer';
import {
    TIngredientsActions,
    ingredientsLoading,
    ingredientError,
    ingredientsLoadSuccess
} from './actions';
import { TIngredient } from '../../utils/types';
import { testIngredient, testSauce } from '../../utils/constants';

describe('ingredients reducer', () => {
    const initialState = {
        ingredients: [],
        loading: false,
        error: null
    };

    it('should return the initial state', () => {
        expect(ingredientsReducer(undefined, {} as TIngredientsActions))
            .toEqual(initialState);
    });

    it('should handle INGREDIENTS_LOADING', () => {
        const expectedState = {
            ...initialState,
            loading: true,
            error: null
        };

        expect(ingredientsReducer(initialState, ingredientsLoading()))
            .toEqual(expectedState);
    });

    it('should handle INGREDIENTS_ERROR', () => {
        const errorMessage = 'Failed to load ingredients';
        const expectedState = {
            ...initialState,
            loading: false,
            error: errorMessage
        };

        expect(ingredientsReducer(initialState, ingredientError(errorMessage)))
            .toEqual(expectedState);
    });

    it('should handle INGREDIENTS_LOAD_SUCCESS', () => {
        const ingredients: TIngredient[] = [ testIngredient, testSauce ];

        const expectedState = {
            ...initialState,
            loading: false,
            error: null,
            ingredients
        };

        expect(ingredientsReducer(initialState, ingredientsLoadSuccess(ingredients)))
            .toEqual(expectedState);
    });
});
