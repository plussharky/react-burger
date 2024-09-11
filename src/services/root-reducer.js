import { combineReducers } from '@reduxjs/toolkit';
import { ingredientsReducer } from "./ingredients/reducer";
import { orderReducer } from "./order/reducer";
import { burgerConstructorReducer } from './burger-constructor/reducer';

export const rootReducer = combineReducers({
    ingredients: ingredientsReducer,
    order: orderReducer,
    burgerConstructor: burgerConstructorReducer,
});