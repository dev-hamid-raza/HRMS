import type { AuthContextType, AuthProviderProps } from "@/types/auth.types";
import { createContext, useContext, useState } from "react";

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider:React.FC<AuthProviderProps> = ({children}) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [loading, setLoading] = useState(false)

    return (
        <AuthContext.Provider
            value={{
                isAuthenticated,
                setIsAuthenticated,
                loading,
                setLoading
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