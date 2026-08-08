import apiClient from "@/api/apiClient";
import type { patientType } from "@/types/patient-type";

interface RegisterPayload {
    firstName: string
    lastName: string
    gender: patientType["gender"]
    dateOfBirth: string
    phone: string
    email: string
    password: string
    confirmPassword: string
}

interface LoginPayload {
    identifier: string
    password: string
}

export class hospitalPatientAuthServices {

    static async registerPatient(payload: RegisterPayload) {
        const { data } = await apiClient.post("/patient-auth/register", payload)
        return data
    }

    static async loginPatient(payload: LoginPayload) {
        const { data } = await apiClient.post("/patient-auth/login", payload)
        return data
    }
}