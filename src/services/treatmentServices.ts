import apiClient from "@/api/apiClient";
import type { treatmentType } from "@/types/treatment-type";

export class hospitalTreatmentServices {

    static async getAllTreatments(): Promise<treatmentType[]> {
        const { data } = await apiClient.get("/treatments")
        return data.treatments
    }

    static async getTreatmentById(id: string): Promise<treatmentType> {
        const { data } = await apiClient.get(`/treatment/${id}`)
        return data.treatment
    }

    static async createTreatment(payload: { patients: string, doctors: string, diagnosis: string, treatment: string, testName?: string, result?: string, notes?: string }) {
        const { data } = await apiClient.post("/create/treatment", payload)
        return data
    }

    static async updateTreatment(id: string, payload: Partial<treatmentType>) {
        const { data } = await apiClient.put(`/update/treatment/${id}`, payload)
        return data
    }

    static async deleteTreatment(id: string) {
        const { data } = await apiClient.delete(`/delete/treatment/${id}`)
        return data
    }
}