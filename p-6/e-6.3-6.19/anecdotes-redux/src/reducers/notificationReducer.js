import { createSlice } from '@reduxjs/toolkit'

// slice
const filterSlice = createSlice({
    name: 'notification',
    initialState: '',
    reducers: {
        set(state, action) {
            state = action.payload;
            return state;
        },
        clean(state, _) {
            state = '';
            return state;
        }
    }
});

// actions
const { set, clean } = filterSlice.actions;

export const setNotification = (message, durationSeconds) => {
    return async dispatch => {
        dispatch(set(message));

        setTimeout(() => {
            dispatch(clean());
        }, durationSeconds * 1000);
    };
};

export default filterSlice.reducer;