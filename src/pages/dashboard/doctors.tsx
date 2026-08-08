import DashboardLayout from "@/components/dashboardlayout";
import Modal from "@/components/modal";
import { Plus, SearchIcon, User } from "lucide-react";
import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
} from "@/components/ui/input-group"

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import DoctorTable from "@/components/doctor-table";
import type { doctorType } from "@/types/doctor-type";
import { hospitalDoctorServices } from "@/services/doctorServices";
import { useState } from "react";
import { toast } from "sonner";

const genderOptions = ["Male", "Female", "Others"];
const statusOptions = ["Available", "On Leave", "Inactive"];

export default function DoctorsPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const queryClient = useQueryClient();

    const { data: doctors } = useQuery<doctorType[]>({
        queryKey: ["doctors"],
        queryFn: () => hospitalDoctorServices.getAllDoctors()
    })

    const { mutate: addDoctor, isPending } = useMutation({
        mutationFn: (payload: any) => hospitalDoctorServices.createDoctor(payload),
        onSuccess: () => {
            toast.success("Doctor added successfully");
            queryClient.invalidateQueries({ queryKey: ["doctors"] });
            setIsModalOpen(false);
        },
        onError: (error: any) => {
            toast.error(error?.response?.data?.message ?? "Unable to add doctor");
        }
    })

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        const payload = {
            firstName: (formData.get("firstName") as string)?.trim(),
            lastName: (formData.get("lastName") as string)?.trim(),
            email: formData.get("email") as string,
            phone: formData.get("phone") as string,
            specialization: formData.get("specialization") as string,
            department: formData.get("department") as string,
            qualification: [(formData.get("qualification") as string)?.trim()],
            gender: formData.get("gender") as string,
            status: formData.get("status") as string,
            licenseNumber: `MDCN-${Math.floor(100000 + Math.random() * 900000)}`,
            address: {
                street: formData.get("address") as string,
            },
        };

        addDoctor(payload);
    };

    return (
        <DashboardLayout>

            <section className="">

                <div className="flex  justify-between items-center w-[90%] mx-auto mt-10">

                    <div className="flex items-center gap-4  text-black">

                        <User className="h-7 w-7 text-blue-600" />
                        <div className="flex flex-col gap-1">
                            <h1 className="text-black text-3xl font-bold">Doctors Management</h1>
                            <p>Manage medical staff and their information</p>
                        </div>

                    </div>

                    <div className="flex items-center  bg-blue-500 text-white py-1 px-4 rounded-md cursor-pointer">
                        <Plus className="inline-block mr-2 text-white" />

                        <Modal
                            btnText="Add Doctor"
                            title="Add new Doctor"
                            description="Fill in the doctor details below to add them to the hospital roster."
                            open={isModalOpen}
                            onOpenChange={setIsModalOpen}
                        >
                            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                    <div className="flex flex-col gap-2">
                                        <label className="text-sm font-medium text-gray-700">First Name</label>
                                        <input name="firstName" required className="h-10 rounded-md border border-gray-300 px-3 outline-none" placeholder="Adebayo" />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label className="text-sm font-medium text-gray-700">Last Name</label>
                                        <input name="lastName" required className="h-10 rounded-md border border-gray-300 px-3 outline-none" placeholder="Johnson" />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                    <div className="flex flex-col gap-2">
                                        <label className="text-sm font-medium text-gray-700">Email</label>
                                        <input name="email" type="email" required className="h-10 rounded-md border border-gray-300 px-3 outline-none" placeholder="doctor@hospital.com" />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label className="text-sm font-medium text-gray-700">Phone</label>
                                        <input name="phone" required className="h-10 rounded-md border border-gray-300 px-3 outline-none" placeholder="0803 000 0000" />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                    <div className="flex flex-col gap-2">
                                        <label className="text-sm font-medium text-gray-700">Department</label>
                                        <input name="department" required className="h-10 rounded-md border border-gray-300 px-3 outline-none" placeholder="Cardiology" />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label className="text-sm font-medium text-gray-700">Specialization</label>
                                        <input name="specialization" className="h-10 rounded-md border border-gray-300 px-3 outline-none" placeholder="Interventional Cardiology" />
                                    </div>
                                </div>

                                <div className="flex flex-col gap-2">
                                    <label className="text-sm font-medium text-gray-700">Qualification</label>
                                    <input name="qualification" className="h-10 rounded-md border border-gray-300 px-3 outline-none" placeholder="MBBS" />
                                </div>

                                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                    <div className="flex flex-col gap-2">
                                        <label className="text-sm font-medium text-gray-700">Gender</label>
                                        <select name="gender" required defaultValue="" className="h-10 rounded-md border border-gray-300 px-3 outline-none">
                                            <option value="" disabled>Select gender</option>
                                            {genderOptions.map((g) => <option key={g} value={g}>{g}</option>)}
                                        </select>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label className="text-sm font-medium text-gray-700">Status</label>
                                        <select name="status" defaultValue="Available" className="h-10 rounded-md border border-gray-300 px-3 outline-none">
                                            {statusOptions.map((s) => <option key={s} value={s}>{s}</option>)}
                                        </select>
                                    </div>
                                </div>

                                <div className="flex flex-col gap-2">
                                    <label className="text-sm font-medium text-gray-700">Address</label>
                                    <textarea name="address" className="min-h-24 rounded-md border border-gray-300 px-3 py-2 outline-none" placeholder="Hospital address or office location" />
                                </div>

                                <div className="flex justify-end gap-3">
                                    <button type="button" onClick={() => setIsModalOpen(false)} className="h-10 rounded-md border border-gray-300 px-4 text-sm font-medium text-gray-700">
                                        Cancel
                                    </button>
                                    <button type="submit" disabled={isPending} className="h-10 rounded-md bg-blue-600 px-4 text-sm font-medium text-white disabled:opacity-50">
                                        {isPending ? "Adding..." : "Add Doctor"}
                                    </button>
                                </div>
                            </form>
                        </Modal>
                    </div>

                </div>

                <div className="w-[90%] mx-auto mt-10 text-black">
                    <InputGroup className="bg-white w-full">
                        <InputGroupInput placeholder="Search doctors by name, ID, or address..." />
                        <InputGroupAddon>
                            <SearchIcon />
                        </InputGroupAddon>
                    </InputGroup>
                </div>

                <div>
                    <div className="mt-7 w-[90%] mx-auto bg-gray-50 rounded-2xl p-10 shadow-md">
                        <div className="mb-5">
                            <h1 className="text-black">Medical Staffs({doctors?.length ?? 0})</h1>
                        </div>
                        <DoctorTable />
                    </div>
                </div>

            </section>

        </DashboardLayout>
    )
}