import { configureStore } from '@reduxjs/toolkit'
import { rootReducer } from './root-reducer';
import { socketMiddleware } from './middleware/socket-middleware';
import { TWsOrderResponse } from '../utils/types';
import { wsClose, wsConnect, wsConnecting, wsDisconnect, wsError, wsGetMessage, wsOpen } from './feed/actions';

const wsMiddleware = socketMiddleware<unknown, TWsOrderResponse>({
    connect: wsConnect,
    disconnect: wsDisconnect,
    onConnecting: wsConnecting,
    onOpen: wsOpen,
    onClose: wsClose,
    onError: wsError,
    onMessage: wsGetMessage
});

export const store = configureStore({
    reducer: rootReducer,
    devTools: process.env.NODE_ENV !== 'production',
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware().concat(wsMiddleware),
}); 