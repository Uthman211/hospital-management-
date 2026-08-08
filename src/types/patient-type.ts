export interface patientType {
    _id?: string,
    firstName: string,
    lastName: string,
    gender: "Male" | "Female" | "Others",
    dateOfBirth: string,
    bloodGroup?: string,
    assignedDepartment?: string,
    phone: string,
    email?: string,
    address?: {
        street?: string,
        city?: string,
        state?: string,
        country?: string
    },
    emergencyContact?: {
        name?: string,
        relationship?: string,
        phone?: string
    },
    medicalHistory?: string[],
    allergies?: string[],
    currentMedications?: string[],
    status?: "Active" | "Inactive",
    createdAt?: string,
    updatedAt?: string
}