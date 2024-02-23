"use client"
import { createContext, useReducer, Dispatch, useEffect } from 'react'

interface IAction {
    type: any;
    payload: any;
}

interface IState {
    isAuthenticated: boolean;
    user: any;
}

const initialState: IState = {
    isAuthenticated: false,
    user: null,
};

interface IAuthContext {
    state: IState;
    dispatch: Dispatch<IAction>;
}

export const AuthContext = createContext<IAuthContext>({
    state: initialState,
    dispatch: () => null,
});

export const authReducer = (state: IState, action: IAction) => {
    switch (action.type) {
        case 'LOGIN':
            return {user: action.payload, isAuthenticated: true }

        case 'LOGOUT':
            return { user: null, isAuthenticated: false }
        default:
            return state;
    }
}

export const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [state, dispatch] = useReducer(authReducer, initialState);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user') as string)
    
        if (user) {
          dispatch({ type: 'LOGIN', payload: user }) 
        }
      }, [])
    
      console.log('AuthContext state:', state)

    return (
        <AuthContext.Provider value={{state, dispatch }}>{children}</AuthContext.Provider>
    )
}