import { configureStore } from '@reduxjs/toolkit'
import { rootReducer } from './root-reducer';

const preloadedState = {
    ingredients: [],
    burgerConstructor: {
        bun: null,
        ingredients: []
    },
    viewedIngredient: null,
    order: null
}

export const store = configureStore({
    reducer: rootReducer,
    devTools: process.env.NODE_ENV !== 'production',
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
}); 