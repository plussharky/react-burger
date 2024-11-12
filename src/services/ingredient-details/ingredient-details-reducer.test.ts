import { ingredientDetailsReducer, initialState } from './reducer';
import { UPDATE_INGREDIENT_DETAILS, TIngredientDetailsActions } from './actions';
import { testIngredient } from '../../utils/constants';

describe('ingredient details Reducer', () => {

    it('should return the initial state', () => {
        expect(ingredientDetailsReducer(undefined, {} as TIngredientDetailsActions))
            .toEqual(initialState);
    });

    it('should handle UPDATE_INGREDIENT_DETAILS', () => {
        const action: TIngredientDetailsActions = {
            type: UPDATE_INGREDIENT_DETAILS,
            ingredient: testIngredient
        };

        const expectedState = {
            item: testIngredient
        };

        expect(ingredientDetailsReducer(initialState, action))
            .toEqual(expectedState);
    });
});
