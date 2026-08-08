import type { patientType } from "./patient-type";
import type { doctorType } from "./doctor-type";

export interface treatmentType {
    _id?: string,
    patients: patientType | string,
    doctors: doctorType | string,
    appointment?: string,
    diagnosis: string,
    treatment: string,
    testName?: string,
    result?: string,
    notes?: string,
    status?: "Pending" | "Normal" | "Critical" | "Resolved",
    date?: string,
    createdAt?: string,
    updatedAt?: string
}