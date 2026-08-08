import Modal from "@/components/modal";
import FormInput from "@/components/home/form-input";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { hospitalDoctorServices } from "@/services/doctorServices";
import type { doctorType } from "@/types/doctor-type";
import { useState } from "react";
import { toast } from "sonner";
import { Edit } from "lucide-react";

const genderOptions = ["Male", "Female", "Others"];
const statusOptions = ["Available", "Inactive", "On Leave", "Scheduled"];

interface EditDoctorModalProps {
    doctor: doctorType;
}

export default function EditDoctorModal({ doctor }: EditDoctorModalProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const queryClient = useQueryClient();

    const { mutate: editDoctor, isPending } = useMutation({
        mutationFn: (payload: Partial<doctorType>) =>
            hospitalDoctorServices.updateDoctor(doctor._id!, payload),
        onSuccess: () => {
            toast.success("Doctor updated successfully");
            queryClient.invalidateQueries({ queryKey: ["doctors"] });
            queryClient.invalidateQueries({ queryKey: ["doctor", doctor._id] });
            setIsModalOpen(false);
        },
        onError: (error: any) => {
            toast.error(error?.response?.data?.message ?? "Unable to update doctor");
        }
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        const payload: Partial<doctorType> = {
            firstName: (formData.get("firstName") as string)?.trim(),
            lastName: (formData.get("lastName") as string)?.trim(),
            gender: formData.get("gender") as doctorType["gender"],
            phone: formData.get("phone") as string,
            email: (formData.get("email") as string)?.trim(),
            department: (formData.get("department") as string)?.trim(),
            specialization: (formData.get("specialization") as string)?.trim(),
            status: formData.get("status") as doctorType["status"],
            address: {
                street: formData.get("street") as string,
            },
        };

        editDoctor(payload);
    };

    return (
        <Modal
            title="Edit Doctor"
            description="Update the doctor's details below."
            open={isModalOpen}
            onOpenChange={setIsModalOpen}
            trigger={
                <button className="flex items-center gap-2 text-blue-500 cursor-pointer">
                    <Edit className="w-4 h-4" />
                </button>
            }
        >
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">

                <div className="grid grid-cols-2 gap-4">
                    <FormInput
                        type="text"
                        name="firstName"
                        label="First Name"
                        defaultValue={doctor.firstName}
                    />
                    <FormInput
                        type="text"
                        name="lastName"
                        label="Last Name"
                        defaultValue={doctor.lastName}
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <FormInput
                        type="text"
                        name="department"
                        label="Department"
                        defaultValue={doctor.department}
                    />
                    <FormInput
                        type="text"
                        name="specialization"
                        label="Specialization"
                        defaultValue={doctor.specialization}
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <FormInput
                        type="tel"
                        name="phone"
                        label="Phone"
                        defaultValue={doctor.phone}
                    />
                    <FormInput
                        type="text"
                        name="email"
                        label="Email"
                        defaultValue={doctor.email}
                    />
                </div>

                <FormInput
                    type="text"
                    name="street"
                    label="Address"
                    defaultValue={doctor.address?.street}
                />

                <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-2">
                        <label htmlFor="gender" className="font-semibold">Gender</label>
                        <select
                            id="gender"
                            name="gender"
                            defaultValue={doctor.gender}
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
                            defaultValue={doctor.status}
                            className="w-full h-10 outline-none border-[0.5px] rounded-md border-slate-200 px-2"
                        >
                            {statusOptions.map((s) => (
                                <option value={s} key={s}>{s}</option>
                            ))}
                        </select>
                    </div>
                </div>

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