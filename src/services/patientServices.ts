import apiClient from "@/api/apiClient";
import type { patientType } from "@/types/patient-type";

export class hospitalPatientServices {

    static async getAllPatients(): Promise<patientType[]> {
        const { data } = await apiClient.get("/patients")
        return data.patients
    }

    static async getPatientById(id: string): Promise<patientType> {
        const { data } = await apiClient.get(`/patient/${id}`)
        return data.patient
    }

    static async createPatient(payload: Omit<patientType, "_id">) {
        const { data } = await apiClient.post("/create/patient", payload)
        return data
    }

    static async updatePatient(id: string, payload: Partial<patientType>) {
        const { data } = await apiClient.put(`/update/patient/${id}`, payload)
        return data
    }

    static async deletePatient(id: string) {
        const { data } = await apiClient.delete(`/delete/patient/${id}`)
        return data
    }

}