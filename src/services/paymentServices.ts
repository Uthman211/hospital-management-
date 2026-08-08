import apiClient from "@/api/apiClient";
import type { paymentType } from "@/types/payment-types";


export class hospitalPaymentServices {

    static async getAllPayments(): Promise<paymentType[]> {
        const { data } = await apiClient.get("/payments")
        return data.payments
    }

    static async getPaymentById(id: string): Promise<paymentType> {
        const { data } = await apiClient.get(`/payment/${id}`)
        return data.payment
    }

    static async createPayment(payload: Omit<paymentType, "_id">) {
        const { data } = await apiClient.post("/create/payment", payload)
        return data
    }

    static async updatePayment(id: string, payload: Partial<paymentType>) {
        const { data } = await apiClient.put(`/update/payment/${id}`, payload)
        return data
    }

    static async deletePayment(id: string) {
        const { data } = await apiClient.delete(`/delete/payment/${id}`)
        return data
    }

    static async getRevenueSummary(): Promise<{ totalRevenue: number, count: number }> {
        const { data } = await apiClient.get("/payments/summary/revenue")
        return data.summary
    }
}