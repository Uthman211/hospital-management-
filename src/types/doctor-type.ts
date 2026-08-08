export interface doctorType {
    _id?: string,
    firstName: string,
    lastName: string,
    gender?: "Male" | "Female" | "Others",
    dateOfBirth?: string,
    phone: string,
    email: string,
    address?: {
        street?: string,
        city?: string,
        state?: string,
        country?: string,
        postalCode?: string
    },
    department: string,
    specialization?: string,
    licenseNumber: string,
    yearsOfExperience?: number,
    qualification?: string[],
    employmentType?: "Full-Time" | "Part-Time" | "Consultant",
    employmentDate?: string,
    consultationFee?: number,
    salary?: number,
    availability?: {
        monday?: string,
        tuesday?: string,
        wednesday?: string,
        thursday?: string,
        friday?: string,
        saturday?: string,
        sunday?: string
    },
    roomNumber?: string,
    status?: "Available" | "On Leave" | "Inactive" | "Scheduled",
    emergencyContact?: {
        name?: string,
        relationship?: string,
        phone?: string
    },
    languages?: string[],
    profileImage?: string,
    createdAt?: string,
    updatedAt?: string
}