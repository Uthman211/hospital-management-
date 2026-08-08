import Modal from "@/components/modal";
import FormInput from "@/components/home/form-input";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { hospitalStaffServices } from "@/services/staffServices";
import type { staffType } from "@/types/staff-type";
import { useState } from "react";
import { toast } from "sonner";

const genderOptions = ["Male", "Female", "Others"];
const shiftOptions = ["Morning", "Afternoon", "Night"];
const statusOptions = ["Active", "Inactive", "On Leave"];

export default function CreateStaffModal() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const queryClient = useQueryClient();

    const { mutate: addStaff, isPending } = useMutation({
        mutationFn: (payload: Omit<staffType, "_id">) => hospitalStaffServices.createStaff(payload),
        onSuccess: () => {
            toast.success("Staff member added successfully");
            queryClient.invalidateQueries({ queryKey: ["staff"] });
            setIsModalOpen(false);
        },
        onError: (error: any) => {
            toast.error(error?.response?.data?.message ?? "Unable to add staff member");
        }
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        const payload: Omit<staffType, "_id"> = {
            name: (formData.get("name") as string)?.trim(),
            role: (formData.get("role") as string)?.trim(),
            department: (formData.get("department") as string)?.trim(),
            email: (formData.get("email") as string)?.trim() || undefined,
            phone: formData.get("phone") as string,
            gender: formData.get("gender") as staffType["gender"],
            shift: formData.get("shift") as staffType["shift"],
            status: formData.get("status") as staffType["status"],
        };

        addStaff(payload);
    };

    return (
        <Modal
            btnText="Add Staff"
            title="Add new Staff Member"
            description="Fill in the staff member's details below."
            open={isModalOpen}
            onOpenChange={setIsModalOpen}
        >
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">

                <FormInput
                    type="text"
                    name="name"
                    label="Full Name"
                    placeholder="Adaeze Okafor"
                />

                <div className="grid grid-cols-2 gap-4">
                    <FormInput
                        type="text"
                        name="role"
                        label="Role"
                        placeholder="e.g. Nurse, Receptionist"
                    />
                    <FormInput
                        type="text"
                        name="department"
                        label="Department"
                        placeholder="e.g. Cardiology"
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <FormInput
                        type="tel"
                        name="phone"
                        label="Phone"
                        placeholder="08012345678"
                    />
                    <FormInput
                        type="text"
                        name="email"
                        label="Email"
                        placeholder="adaeze@hospital.com"
                    />
                </div>

                <div className="grid grid-cols-3 gap-4">
                    <div className="flex flex-col gap-2">
                        <label htmlFor="gender" className="font-semibold">Gender</label>
                        <select
                            id="gender"
                            name="gender"
                            defaultValue=""
                            className="w-full h-10 outline-none border-[0.5px] rounded-md border-slate-200 px-2"
                        >
                            <option value="">Select gender</option>
                            {genderOptions.map((g) => (
                                <option value={g} key={g}>{g}</option>
                            ))}
                        </select>
                    </div>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="shift" className="font-semibold">Shift</label>
                        <select
                            id="shift"
                            name="shift"
                            defaultValue=""
                            className="w-full h-10 outline-none border-[0.5px] rounded-md border-slate-200 px-2"
                        >
                            <option value="">Select shift</option>
                            {shiftOptions.map((s) => (
                                <option value={s} key={s}>{s}</option>
                            ))}
                        </select>
                    </div>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="status" className="font-semibold">Status</label>
                        <select
                            id="status"
                            name="status"
                            defaultValue="Active"
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
                            {isPending ? "Adding..." : "Add Staff"}
                        </button>
                    </div>
                </div>

            </form>
        </Modal>
    );
}