import type { AuthContextType, AuthProviderProps, IUser } from "@/types/auth.types";
import { createContext, useContext, useState } from "react";

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider:React.FC<AuthProviderProps> = ({children}) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [loading, setLoading] = useState(false)
    const [user, setUser] = useState<IUser>({
        firstName: '',
        lastName: '',
        email: '',
        username: ''
    })

    return (
        <AuthContext.Provider
            value={{
                isAuthenticated,
                setIsAuthenticated,
                loading,
                setLoading,
                user,
                setUser
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext)
    if(context === undefined) {
        throw new Error("useAuth must be within an authProvider")
    }
    return context
}