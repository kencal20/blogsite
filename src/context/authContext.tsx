import { createContext, useContext } from "react"
import type { componentProps } from "../constants/path"


type AuthContextType = {
    user: componentProps['userProps'] | null
    setUser: React.Dispatch<React.SetStateAction<componentProps['userProps'] | null>>
    users: componentProps['userProps'][]
    setUsers: React.Dispatch<React.SetStateAction<componentProps['userProps'][]>>
    isAuthenticated: boolean
    setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
}

type Props = {
    children: React.ReactNode
    value: AuthContextType
}



const AuthContext = createContext<AuthContextType | undefined>(undefined)
export default function AuthProvider({ children, value }: Props) {
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const auth = useContext(AuthContext)
    if (!auth) {
        throw new Error("Auth Causing Error")
    }
    return auth
}