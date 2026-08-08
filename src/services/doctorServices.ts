import apiClient from "@/api/apiClient";
import type { doctorType } from "@/types/doctor-type";



export class hospitalDoctorServices{

    static async getAllDoctors(): Promise<doctorType[]>{
        const {data} = await apiClient.get("/doctors")
        return data.doctors
    }

    static async getDoctorById(id: string): Promise<doctorType> {
    const { data } = await apiClient.get(`/doctor/${id}`) 
    return data.doctor
}

    static async createDoctor(payload: any) {
        const { data } = await apiClient.post("/create/doctor", payload)
        return data
    }

    static async updateDoctor(id: string, payload: Partial<doctorType>) {
        const { data } = await apiClient.put(`/update/doctor/${id}`, payload)
        return data
    }

    static async deleteDoctor(id: string) {
        const { data } = await apiClient.delete(`/delete/doctor/${id}`)
        return data
    }
}