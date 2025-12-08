import { createSlice } from '@reduxjs/toolkit'

const defaultFilterState = '';

const reducerSlice = createSlice({
    name: 'filter',
    initialState: defaultFilterState,
    reducers: {
        setFilter(state, action) {
            state = action.payload;
            return state;
        }
    }
});

// const reducer = (state = defaultFilterState, action) => {
//     console.log('state now: ', state);
//     console.log('action', action);

//     switch (action.type) {
//         case 'SET_FILTER':
//             return action.payload;
//         default:
//             return state;
//     }
// };

// export const setFilter = (value) => {
//     return {
//         type: 'SET_FILTER',
//         payload: value
//     };
// };

export const { setFilter } = reducerSlice.actions;
export default reducerSlice.reducer;