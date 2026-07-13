export interface UserType{
    username: string
    email: string
    password?: string
    mobile: string
    role: ROLE
}

export interface AdminType{
    username: string
    email: string
    password: string
    role: ROLE
} 

type ROLE = "user" | "admin" | "superAdmin"

