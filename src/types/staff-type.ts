export interface staffType {
    _id?: string,
    name: string,
    role: string,
    department: string,
    email?: string,
    phone: string,
    gender?: "Male" | "Female" | "Others",
    shift?: "Morning" | "Afternoon" | "Night",
    status?: "Active" | "Inactive" | "On Leave",
    createdAt?: string,
    updatedAt?: string
}