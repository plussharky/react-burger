import { addBun, addIngredient, clearBurgerConstructor, deleteIngredient, moveIngredient } from "./actions";
import { burgerConstructorReducer } from "./reducer";
import { testBun, testIngredient, testSauce } from "../../utils/constants";

const initialState = {
    bun: null,
    ingredients: []
};

describe('burgerConstructor reducer', () => {


    it('should return the initial state', () => {
        expect(burgerConstructorReducer(undefined, {} as any))
            .toEqual(initialState);
    });

    it('should handle ADD_INGREDIENT', () => {
        const expectedState = {
            ...initialState,
            ingredients: [testIngredient]
        };

        expect(burgerConstructorReducer(initialState, addIngredient(testIngredient)))
            .toEqual(expectedState);
    });

    it('should handle ADD_BUN', () => {
        const expectedState = {
            ...initialState,
            bun: testBun
        };

        expect(burgerConstructorReducer(initialState, addBun(testBun)))
            .toEqual(expectedState);
    });

    it('should handle MOVE_INGREDIENT', () => {
        const initialStateWithIngredients = {
            ...initialState,
            ingredients: [
                testIngredient,
                testSauce,
                testSauce
            ]
        };

        const expectedState = {
            ...initialState,
            ingredients: [
                testSauce,
                testSauce,
                testIngredient
            ]
        };

        expect(burgerConstructorReducer(initialStateWithIngredients, moveIngredient(0, 2)))
            .toEqual(expectedState);
    });

    it('should handle DELETE_INGREDIENT', () => {
        const initialStateWithIngredients = {
            ...initialState,
            ingredients: [
                testSauce,
                testIngredient,
                testSauce
            ]
        };

        const expectedState = {
            ...initialState,
            ingredients: [
                testSauce,
                testSauce
            ]
        };

        expect(burgerConstructorReducer(initialStateWithIngredients, deleteIngredient(1)))
            .toEqual(expectedState);
    });

    it('should handle CLEAR_BURGER_CONSTRUCTOR', () => {
        const modifiedState = {
            bun: testBun,
            ingredients: [testIngredient, testSauce, testIngredient]
        };

        expect(burgerConstructorReducer(modifiedState, clearBurgerConstructor()))
            .toEqual(initialState);
    });
});