import { orderReducer, initialState } from './reducer';
import {
    ORDER_CREATE_LOADING,
    ORDER_CREATE_ERROR,
    ORDER_CREATE_SUCCESS,
    TOrderActions,
    orderCreateLoading,
    orderCreateError,
    orderCreateSuccess
} from './actions';
import { TOrder } from '../../utils/types';

describe('order reducer', () => {

    it('should return the initial state', () => {
        expect(orderReducer(undefined, {} as TOrderActions))
            .toEqual(initialState);
    });

    it('should handle ORDER_CREATE_LOADING', () => {
        const expectedState = {
            ...initialState,
            loading: true,
            error: null
        };

        expect(orderReducer(initialState, orderCreateLoading()))
            .toEqual(expectedState);
    });

    it('should handle ORDER_CREATE_ERROR', () => {
        const errorMessage = 'Order creation failed';
        const expectedState = {
            ...initialState,
            loading: false,
            error: errorMessage
        };

        expect(orderReducer(initialState, orderCreateError(errorMessage)))
            .toEqual(expectedState);
    });

    it('should handle ORDER_CREATE_SUCCESS', () => {
        const testOrder: TOrder = {
            number: 12345,
            ingredients: ['ingredient1', 'ingredient2'],
            name: 'Test Order',
            _id: 'orderId123',
            status: 'done',
            createdAt: new Date('2022-01-01T00:00:00Z'),
            updatedAt: new Date('2022-01-01T01:00:00Z')
        };

        const expectedState = {
            ...initialState,
            loading: false,
            error: null,
            number: testOrder.number,
            name: testOrder.name
        };

        expect(orderReducer(initialState, orderCreateSuccess({
            order: testOrder,
            name: testOrder.name
        })))
            .toEqual(expectedState);
    });
});
