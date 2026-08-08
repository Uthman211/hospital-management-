import type {  UserType } from "@/types/user.types";
import { createContext, useContext, useState, useEffect, type ReactNode } from "react";

interface AuthUserContext {
    staffUser?: UserType
    isStaffAuthenticated: boolean
    logoutStaff: () => void
}

const AuthContext = createContext<AuthUserContext | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {

    const [staffUser, setStaffUser] = useState<UserType | undefined>(undefined)
    const [isStaffAuthenticated, setIsStaffAuthenticated] = useState(false)

    useEffect(() => {
        const token = localStorage.getItem("staffToken")
        const storedUser = localStorage.getItem("staffUser")

        if (token && storedUser) {
            setStaffUser(JSON.parse(storedUser))
            setIsStaffAuthenticated(true)
        }
    }, [])

    const logoutStaff = () => {
        localStorage.removeItem("staffToken")
        localStorage.removeItem("staffUser")
        setStaffUser(undefined)
        setIsStaffAuthenticated(false)
    }

    return (
        <AuthContext.Provider value={{ staffUser, isStaffAuthenticated, logoutStaff }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext)

    if (context === undefined) {
        throw new Error("UseAuth should be used within AuthContext")
    }
    return context
}