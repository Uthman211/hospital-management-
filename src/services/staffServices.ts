import apiClient from "@/api/apiClient";
import type { staffType } from "@/types/staff-type";


export class hospitalStaffServices {

    static async getAllStaff(): Promise<staffType[]> {
        const { data } = await apiClient.get("/staffs")
        return data.staff
    }

    static async getStaffById(id: string): Promise<staffType> {
        const { data } = await apiClient.get(`/staff/${id}`)
        return data.staff
    }

    static async createStaff(payload: staffType) {
        const { data } = await apiClient.post("/create/staff", payload)
        return data
    }

    static async updateStaff(id: string, payload: Partial<staffType>) {
        const { data } = await apiClient.put(`/update/staff/${id}`, payload)
        return data
    }

    static async deleteStaff(id: string) {
        const { data } = await apiClient.delete(`/delete/staff/${id}`)
        return data
    }
}