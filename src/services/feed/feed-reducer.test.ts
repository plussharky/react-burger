import { feedReducer } from './reducer';
import {
    WS_ERROR,
    WS_GET_MESSAGE,
    wsOpen,
    wsDisconnect,
    wsClose
} from './actions';
import { TOrder } from '../../utils/types';

const initialState = {
    orders: [],
    total: 0,
    totalToday: 0,
    connectionError: null,
    isConnected: false
};

describe('feed reducer', () => {
    it('should return the initial state', () => {
        expect(feedReducer(undefined, {} as any))
            .toEqual(initialState);
    });

    it('should handle WS_OPEN', () => {
        const expectedState = {
            ...initialState,
            connectionError: null,
            isConnected: true
        };

        expect(feedReducer(initialState, wsOpen()))
            .toEqual(expectedState);
    });

    it('should handle WS_DISCONNECT', () => {
        const modifiedState = { ...initialState, isConnected: true };
        const expectedState = {
            ...initialState,
            isConnected: false,
            connectionError: null
        };

        expect(feedReducer(modifiedState, wsDisconnect()))
            .toEqual(expectedState);
    });

    it('should handle WS_CLOSE', () => {
        const modifiedState = { ...initialState, isConnected: true };
        const expectedState = {
            ...initialState,
            isConnected: false,
            connectionError: null
        };

        expect(feedReducer(modifiedState, wsClose()))
            .toEqual(expectedState);
    });

    it('should handle WS_ERROR', () => {
        const errorMessage = 'Connection error';
        const action = { type: WS_ERROR, payload: errorMessage };
        const expectedState = {
            ...initialState,
            connectionError: errorMessage
        };

        expect(feedReducer(initialState, action))
            .toEqual(expectedState);
    });

    it('should handle WS_GET_MESSAGE', () => {
        const orders: TOrder[] = [
            { _id: '1', ingredients: ['ingredient1', 'ingredient2'], status: 'done', name: 'Burger 1', createdAt: new Date('2022-01-03'), updatedAt: new Date('2022-01-02'), number: 1 },
            { _id: '2', ingredients: ['ingredient3', 'ingredient4'], status: 'pending', name: 'Burger 2', createdAt: new Date('2022-01-03'), updatedAt: new Date('2022-01-04'), number: 2 }
        ];
        const total = 100;
        const totalToday = 10;
        const action = {
            type: WS_GET_MESSAGE,
            payload: {
                orders,
                total,
                totalToday
            }
        };

        const expectedState = {
            ...initialState,
            orders,
            total,
            totalToday,
            connectionError: null
        };

        expect(feedReducer(initialState, action as any))
            .toEqual(expectedState);
    });
});