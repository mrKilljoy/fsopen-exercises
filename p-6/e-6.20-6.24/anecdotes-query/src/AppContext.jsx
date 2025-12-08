import { createContext, useReducer } from 'react'

const AppContext = createContext();
const notificationReducer = (state, action) => {
    console.log('n-red', action)
    switch (action.type) {
        case 'SET':
            return action.payload;
        case 'CLEAR':
            return '';
        default:
            return state;
    }
};

export const AppContextProvider = (props) => {
    const [notification, dispatch] = useReducer(notificationReducer, '');

    return (
        <AppContext.Provider value={{ notification, dispatch }}>
            {props.children}
        </AppContext.Provider>
    );
};

export default AppContext;