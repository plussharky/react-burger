import { TUser } from '../../utils/types';
import { SET_AUTH_CHECKED, SET_USER, TAuthActions } from './actions';

export type TAuthReducerState = {
  user: TUser | null;
  isAuthChecked: boolean;
}

const initialState: TAuthReducerState = {
    user: null,
    isAuthChecked: false,
};

export const authReducer = (state = initialState, action: TAuthActions) => {
  switch (action.type) {
    case SET_AUTH_CHECKED:
      return {
        ...state,
        isAuthChecked: action.isAuthChecked
      }
    case SET_USER:
      return {
        ...state,
        user: action.user
      }
    default:
      return state;    
  }
};