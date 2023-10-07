import { createContext, useEffect, useState } from "react"
import { signIn } from "./auth";

export const AuthContext = createContext({});
export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(null)

    useEffect(() => {
        const token = localStorage.getItem('token')
        
    }, [])

    const signIn = async (username, password) => {
        const loginToken = await signIn(username, password)
        localStorage.setItem('token', loginToken.token)
        setToken(token)

        window.location.href = '/cloud'
    }

    const signUp = () => {

    }

    return(
        <AuthContext.Provider value={{ 
            token,
            signIn,
            signUp,
            installed: true //verifica se o sistema esta instalado
        }}>
            { children }
        </AuthContext.Provider>
    )
}