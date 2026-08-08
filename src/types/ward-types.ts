export interface wardType {
    _id?: string,
    wardName: string,
    wardType: "General" | "ICU" | "Maternity" | "Pediatric" | "Surgical" | "Emergency" | "Isolation",
    floor?: string,
    department?: string,
    totalBeds: number,
    occupiedBeds?: number,
    nurseInCharge?: string,
    status?: "Active" | "Inactive" | "Under Maintenance",
    description?: string,
    createdAt?: string,
    updatedAt?: string
}