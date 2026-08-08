import type { patientType } from "./patient-type";

export interface paymentType {
    _id?: string,
    patient: patientType | string,
    appointment?: string,
    description: string,
    amount: number,
    paymentMethod: "Cash" | "Card" | "Bank Transfer" | "POS" | "Insurance",
    paymentStatus?: "Paid" | "Pending" | "Failed" | "Refunded",
    paymentDate?: string,
    invoiceNumber: string,
    createdAt?: string,
    updatedAt?: string
}