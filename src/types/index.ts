import { store } from '../services/store'
import { ThunkAction, ThunkDispatch} from 'redux-thunk';
import { Action, ActionCreator, Dispatch } from 'redux';
import { TAuthActions } from '../services/auth/actions';
import { TBurgerConstructorActions } from '../services/burger-constructor/actions';
import { TIngredientDetailsActions } from '../services/ingredient-details/actions';
import { TIngredientsActions } from '../services/ingredients/actions';
import { TOrderActions } from '../services/order/actions';

export type RootState = ReturnType<typeof store.getState>;

// Типизация всех экшенов приложения
type TApplicationActions = TAuthActions 
    | TBurgerConstructorActions
    | TIngredientDetailsActions
    | TIngredientsActions
    | TOrderActions;

export type AppThunkAction<ReturnType = void> = 
    ThunkAction<ReturnType, RootState, unknown, TApplicationActions>;

export type AppDispatch = ThunkDispatch<RootState, unknown, TApplicationActions>;;