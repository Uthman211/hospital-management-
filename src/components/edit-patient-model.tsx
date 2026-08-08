import Modal from "@/components/modal";
import FormInput from "@/components/home/form-input";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { hospitalPatientServices } from "@/services/patientServices";
import type { patientType } from "@/types/patient-type";
import { useState } from "react";
import { toast } from "sonner";
import { Edit } from "lucide-react";

const statusOptions = ["Active", "Inactive"];
const genderOptions = ["Male", "Female", "Others"];

interface EditPatientModalProps {
    patient: patientType;
}

export default function EditPatientModal({ patient }: EditPatientModalProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const queryClient = useQueryClient();

    const { mutate: editPatient, isPending } = useMutation({
        mutationFn: (payload: Partial<patientType>) =>
            hospitalPatientServices.updatePatient(patient._id, payload),
        onSuccess: () => {
            toast.success("Patient updated successfully");
            queryClient.invalidateQueries({ queryKey: ["patients"] });
            queryClient.invalidateQueries({ queryKey: ["patient", patient._id] });
            setIsModalOpen(false);
        },
        onError: (error: any) => {
            toast.error(error?.response?.data?.message ?? "Unable to update patient");
        }
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        const payload: Partial<patientType> = {
            firstName: (formData.get("firstName") as string)?.trim(),
            lastName: (formData.get("lastName") as string)?.trim(),
            phone: formData.get("phone") as string,
            email: (formData.get("email") as string)?.trim() || undefined,
            bloodGroup: (formData.get("bloodGroup") as string) || undefined,
            dateOfBirth: formData.get("dateOfBirth") as string,
            gender: formData.get("gender") as patientType["gender"],
            status: formData.get("status") as patientType["status"],
            address: {
                street: formData.get("street") as string,
            },
            emergencyContact: {
                name: formData.get("emergencyName") as string,
                relationship: formData.get("emergencyRelationship") as string,
                phone: formData.get("emergencyPhone") as string,
            },
            medicalHistory: (formData.get("medicalHistory") as string)
                ?.split(",").map(s => s.trim()).filter(Boolean) ?? [],
            allergies: (formData.get("allergies") as string)
                ?.split(",").map(s => s.trim()).filter(Boolean) ?? [],
        };

        editPatient(payload);
    };

    return (
        <Modal
            title="Edit Patient"
            description="Update the patient's details below."
            open={isModalOpen}
            onOpenChange={setIsModalOpen}
            trigger={
                <button className="flex items-center gap-2 border border-gray-300 rounded-md px-4 py-2 text-sm cursor-pointer">
                    <Edit className="w-4 h-4 text-green-600" /> Edit
                </button>
            }
        
        >
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 ">

                <div className="grid grid-cols-2 gap-4">
                    <FormInput
                        type="text"
                        name="firstName"
                        label="First Name"
                        defaultValue={patient.firstName}
                    />
                    <FormInput
                        type="text"
                        name="lastName"
                        label="Last Name"
                        defaultValue={patient.lastName}
                    />
                </div>

                <FormInput
                    type="text"
                    name="street"
                    label="Address"
                    defaultValue={patient.address?.street}
                />

                <div className="grid grid-cols-2 gap-4">
                    <FormInput
                        type="tel"
                        name="phone"
                        label="Contact"
                        defaultValue={patient.phone}
                    />
                    <FormInput
                        type="text"
                        name="email"
                        label="Email"
                        defaultValue={patient.email}
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <FormInput
                        type="date"
                        name="dateOfBirth"
                        label="Date of Birth"
                        defaultValue={patient.dateOfBirth?.slice(0, 10)}
                    />
                    <FormInput
                        type="text"
                        name="bloodGroup"
                        label="Blood Group"
                        defaultValue={patient.bloodGroup}
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-2">
                        <label htmlFor="gender" className="font-semibold">Gender</label>
                        <select
                            id="gender"
                            name="gender"
                            defaultValue={patient.gender}
                            required
                            className="w-full h-10 outline-none border-[0.5px] rounded-md border-slate-200 px-2"
                        >
                            {genderOptions.map((g) => (
                                <option value={g} key={g}>{g}</option>
                            ))}
                        </select>
                    </div>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="status" className="font-semibold">Status</label>
                        <select
                            id="status"
                            name="status"
                            defaultValue={patient.status}
                            className="w-full h-10 outline-none border-[0.5px] rounded-md border-slate-200 px-2"
                        >
                            {statusOptions.map((s) => (
                                <option value={s} key={s}>{s}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <FormInput
                        type="text"
                        name="emergencyName"
                        label="Emergency Contact Name"
                        defaultValue={patient.emergencyContact?.name}
                    />
                    <FormInput
                        type="text"
                        name="emergencyRelationship"
                        label="Relationship"
                        defaultValue={patient.emergencyContact?.relationship}
                    />
                </div>

                <FormInput
                    type="tel"
                    name="emergencyPhone"
                    label="Emergency Contact Phone"
                    defaultValue={patient.emergencyContact?.phone}
                />

                <FormInput
                    type="text"
                    name="allergies"
                    label="Allergies (comma-separated)"
                    defaultValue={patient.allergies?.join(", ")}
                />

                <FormInput
                    type="text"
                    name="medicalHistory"
                    label="Medical History (comma-separated)"
                    defaultValue={patient.medicalHistory?.join(", ")}
                />

                <div className="flex justify-end">
                    <div className="grid grid-cols-2 gap-4">
                        <button
                            type="button"
                            onClick={() => setIsModalOpen(false)}
                            className="bg-white w-full h-10 rounded-md text-black cursor-pointer border border-gray-400"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            disabled={isPending}
                            className="bg-black w-full h-10 rounded-md text-white cursor-pointer disabled:opacity-50"
                        >
                            {isPending ? "Saving..." : "Save Changes"}
                        </button>
                    </div>
                </div>

            </form>
        </Modal>
    );
}