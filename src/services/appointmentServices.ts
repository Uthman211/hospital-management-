import apiClient from "@/api/apiClient";
import type { appointmentType } from "@/types/appointment-type";

export class hospitalAppointmentServices {

    static async getAllAppointments(): Promise<appointmentType[]> {
        const { data } = await apiClient.get("/appointments")
        return data.appointments
    }

    static async getAppointmentById(id: string): Promise<appointmentType> {
        const { data } = await apiClient.get(`/appointment/${id}`)
        return data.appointment
    }

    static async createAppointment(payload: { patients: string, doctors: string, appointmentDate: string, appointmentTime: string, appointmentType: string }) {
        const { data } = await apiClient.post("/create/appointment", payload)
        return data
    }

    static async updateAppointment(id: string, payload: Partial<appointmentType>) {
        const { data } = await apiClient.put(`/update/appointment/${id}`, payload)
        return data
    }

    static async deleteAppointment(id: string) {
        const { data } = await apiClient.delete(`/delete/appointment/${id}`)
        return data
    }
}