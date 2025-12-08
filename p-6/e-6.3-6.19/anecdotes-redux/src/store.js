import { configureStore } from '@reduxjs/toolkit'
import aReducer from './reducers/anecdoteReducer'
import fReducer from './reducers/filterReducer'
import nReducer from './reducers/notificationReducer'

const store = configureStore({
    reducer: {
        anecdotes: aReducer,
        filter: fReducer,
        notification: nReducer
    }
});

export default store;