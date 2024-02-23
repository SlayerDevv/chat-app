import { useAuthContext } from "./UseAuthContext"



export const useLogOut = () => {
    const dispatch = useAuthContext()
    const logout = () => {
        localStorage.removeItem('user')
        dispatch.dispatch({
            type: 'LOGOUT',
            payload: undefined
        })
    }

    return {logout}
}