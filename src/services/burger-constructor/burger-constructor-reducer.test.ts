import { TIngredient } from "../../utils/types";
import { addBun, addIngredient, clearBurgerConstructor, deleteIngredient, moveIngredient } from "./actions";
import { burgerConstructorReducer } from "./reducer";

const initialState = {
    bun: null,
    ingredients: []
};

const testIngredient: TIngredient = {
    _id: "12345",
    name: "Beef Patty",
    type: "main",
    proteins: 20,
    fat: 15,
    carbohydrates: 5,
    calories: 250,
    price: 100,
    image: "https://example.com/images/beef-patty.png",
    image_mobile: "https://example.com/images/beef-patty-mobile.png",
    image_large: "https://example.com/images/beef-patty-large.png",
    __v: 0,
    uniqueId: "unique-12345"
};

const testBun: TIngredient = {
    _id: "67890",
    name: "Sesame Bun",
    type: "bun",
    proteins: 8,
    fat: 3,
    carbohydrates: 30,
    calories: 150,
    price: 50,
    image: "https://example.com/images/sesame-bun.png",
    image_mobile: "https://example.com/images/sesame-bun-mobile.png",
    image_large: "https://example.com/images/sesame-bun-large.png",
    __v: 0,
    uniqueId: "unique-67890"
};

const testSauce: TIngredient = {
    _id: "11223",
    name: "Spicy Sauce",
    type: "sauce",
    proteins: 1,
    fat: 2,
    carbohydrates: 10,
    calories: 50,
    price: 20,
    image: "https://example.com/images/spicy-sauce.png",
    image_mobile: "https://example.com/images/spicy-sauce-mobile.png",
    image_large: "https://example.com/images/spicy-sauce-large.png",
    __v: 0,
    uniqueId: "unique-11223"
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