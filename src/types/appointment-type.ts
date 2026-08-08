import type { patientType } from "./patient-type";
import type { doctorType } from "./doctor-type";

export interface appointmentType {
    _id?: string,
    patients: patientType | string,
    doctors: doctorType | string,
    appointmentDate: string,
    appointmentTime: string,
    appointmentType: string,
    amount?: number,
    status?: "Pending" | "Scheduled" | "In Progress" | "Completed" | "Cancelled",
    createdAt?: string,
    updatedAt?: string
}