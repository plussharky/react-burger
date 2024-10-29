import { combineReducers } from '@reduxjs/toolkit';
import { ingredientsReducer } from "./ingredients/reducer";
import { orderReducer } from "./order/reducer";
import { burgerConstructorReducer } from './burger-constructor/reducer';
import { ingredientDetailsReducer } from './ingredient-details/reducer';
import { authReducer } from './auth/reducer'
import { feedReducer } from './feed/reducer';

export const rootReducer = combineReducers({
    ingredients: ingredientsReducer,
    order: orderReducer,
    burgerConstructor: burgerConstructorReducer,
    ingredientDetails: ingredientDetailsReducer,
    auth: authReducer,
    feed: feedReducer,
});