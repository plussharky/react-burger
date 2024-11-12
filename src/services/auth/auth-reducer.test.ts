import { TUser } from '../../utils/types';
import { setAuthChecked, setUser } from './actions';
import { authReducer } from './reducer';
import { TAuthReducerState } from './reducer';

describe('auth reducer', () => {
    const initialState: TAuthReducerState = {
        user: null,
        isAuthChecked: false,
    };

    it('should return the initial state', () => {
        expect(authReducer(undefined, { type: 'UNKNOWN_ACTION' } as unknown as any))
            .toEqual(initialState);
    })

    it('should set isAuthChecked=true when handle SET_AUTH_CHECKED', () => {
        const action = setAuthChecked(true);
    
        const expectedState = {
          ...initialState,
          isAuthChecked: true,
        };
    
        expect(authReducer(initialState, action))
            .toEqual(expectedState);
    });

    it('should set user when handle SET_USER', () => {
        const user: TUser = {
          name: 'Test User',
          email: 'test@example.com',
        };
    
        const action = setUser(user);
    
        const expectedState = {
          ...initialState,
          user,
        };
    
        expect(authReducer(initialState, action))
            .toEqual(expectedState);
    });

    it('should update state correctly for action sequences', () => {
        const user: TUser = {
          name: 'Another User',
          email: 'another@example.com',
        };
    
        let state = authReducer(initialState, setAuthChecked(true));
        expect(state).toEqual({ ...initialState, isAuthChecked: true });
    
        state = authReducer(state, setUser(user));
        expect(state).toEqual({ ...initialState, isAuthChecked: true, user });
      });
})