import apiClient from "@/api/apiClient";
import type { wardType } from "@/types/ward-types";


export class hospitalWardServices {

    static async getAllWards(): Promise<wardType[]> {
        const { data } = await apiClient.get("/wards")
        return data.wards
    }

    static async getWardById(id: string): Promise<wardType> {
        const { data } = await apiClient.get(`/ward/${id}`)
        return data.ward
    }

    static async createWard(payload: Omit<wardType, "_id">) {
        const { data } = await apiClient.post("/create/ward", payload)
        return data
    }

    static async updateWard(id: string, payload: Partial<wardType>) {
        const { data } = await apiClient.put(`/update/ward/${id}`, payload)
        return data
    }

    static async deleteWard(id: string) {
        const { data } = await apiClient.delete(`/delete/ward/${id}`)
        return data
    }
}