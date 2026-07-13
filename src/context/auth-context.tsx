
import type { AdminType, UserType } from "@/types/user.types";
import { createContext, useContext, useState, type ReactNode } from "react";

interface AuthUserContext{
    user?: UserType
    admin?: AdminType
}

const AuthContext = createContext<AuthUserContext | undefined>(undefined)

export const AuthProvider = ({children} : {children: ReactNode})=>{

    const [user] = useState<UserType>()
    const [admin] = useState<AdminType>()

    return (
        <AuthContext.Provider value={{user, admin}}>

            {children}


        </AuthContext.Provider>
    )

}

// CUSTOM HOOKS

export const useAuth = ()=>{
    const context = useContext(AuthContext)

    if(context === undefined){
        throw new Error("UseAuth should be used within AuthContext")
        }
        return context
}
