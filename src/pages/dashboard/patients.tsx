import DashboardLayout from "@/components/dashboardlayout";
import FormInput from "@/components/home/form-input";
import Modal from "@/components/modal";
import { Plus, SearchIcon, Users } from "lucide-react";
import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
} from "@/components/ui/input-group"
import PatientTable from "@/components/patient-table";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { patientType } from "@/types/patient-type";
import { hospitalPatientServices } from "@/services/patientServices";
import { hospitalDoctorServices } from "@/services/doctorServices";
import type { doctorType } from "@/types/doctor-type";
import { useState } from "react";
import { toast } from "sonner";

const statusOptions = ["Active", "Inactive"];
const genderOptions = ["Male", "Female", "Others"];

export default function PatientsPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const queryClient = useQueryClient();

    const { data: patients } = useQuery<patientType[]>({
        queryKey: ["patients"],
        queryFn: () => hospitalPatientServices.getAllPatients()
    })

    const { data: doctors } = useQuery<doctorType[]>({
        queryKey: ["doctors"],
        queryFn: () => hospitalDoctorServices.getAllDoctors()
    })

    const departments = doctors ? [...new Set(doctors.map(d => d.department))] : [];

    const { mutate: addPatient, isPending } = useMutation({
        mutationFn: (payload: patientType) => hospitalPatientServices.createPatient(payload),
        onSuccess: () => {
            toast.success("Patient added successfully");
            queryClient.invalidateQueries({ queryKey: ["patients"] });
            setIsModalOpen(false);
        },
        onError: (error: any) => {
            toast.error(error?.response?.data?.message ?? "Unable to add patient");
        }
    })

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        const payload: patientType = {
            firstName: (formData.get("firstName") as string)?.trim(),
            lastName: (formData.get("lastName") as string)?.trim(),
            phone: formData.get("phone") as string,
            dateOfBirth: formData.get("dateOfBirth") as string,
            gender: formData.get("gender") as patientType["gender"],
            status: formData.get("status") as patientType["status"],
            assignedDepartment: (formData.get("assignedDepartment") as string) || undefined,
            address: {
                street: formData.get("street") as string,
            },
        };

        addPatient(payload);
    }

    return (
        <DashboardLayout>
            <section className="">

                <div className="flex justify-between items-center w-[90%] mx-auto mt-10">

                    <div className="flex items-center gap-4 text-black">
                        <Users className="h-7 w-7 text-blue-600" />
                        <div className="flex flex-col gap-1">
                            <h1 className="text-black text-3xl font-bold">Patients Management</h1>
                            <p>Manage patient records and information</p>
                        </div>
                    </div>

                    <div className="flex items-center bg-blue-500 text-white py-1 px-4 rounded-md cursor-pointer">
                        <Plus className="inline-block mr-2 text-white" />

                        <Modal
                            btnText="Add Patients"
                            title="Add new Patient"
                            description="Fill in the patient details below."
                            open={isModalOpen}
                            onOpenChange={setIsModalOpen}
                        >
                            <form onSubmit={handleSubmit} className="flex flex-col gap-4">

                                <div className="grid grid-cols-2 gap-4">
                                    <FormInput
                                        type="text"
                                        name="firstName"
                                        label="First Name"
                                        placeholder="John"
                                    />
                                    <FormInput
                                        type="text"
                                        name="lastName"
                                        label="Last Name"
                                        placeholder="Faith"
                                    />
                                </div>

                                <FormInput
                                    type="text"
                                    name="street"
                                    label="Address"
                                    placeholder="12 Adekunle Street"
                                />

                                <FormInput
                                    type="tel"
                                    name="phone"
                                    label="Contact"
                                    placeholder="08012345678"
                                />

                                <div className="grid grid-cols-2 gap-4">
                                    <FormInput
                                        type="date"
                                        name="dateOfBirth"
                                        label="Date of Birth"
                                    />
                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="gender" className="font-semibold">Gender</label>
                                        <select
                                            id="gender"
                                            name="gender"
                                            defaultValue=""
                                            required
                                            className="w-full h-10 outline-none border-[0.5px] rounded-md border-slate-200 px-2"
                                        >
                                            <option value="" disabled>Select gender</option>
                                            {genderOptions.map((g) => (
                                                <option value={g} key={g}>{g}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
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
                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="assignedDepartment" className="font-semibold">Assigned Department</label>
                                        <select
                                            id="assignedDepartment"
                                            name="assignedDepartment"
                                            defaultValue=""
                                            className="w-full h-10 outline-none border-[0.5px] rounded-md border-slate-200 px-2"
                                        >
                                            <option value="">None</option>
                                            {departments.map((dept) => (
                                                <option key={dept} value={dept}>{dept}</option>
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
                                            {isPending ? "Adding..." : "Add Patient"}
                                        </button>
                                    </div>
                                </div>

                            </form>
                        </Modal>
                    </div>

                </div>

                <div className="w-[90%] mx-auto mt-10 text-black">
                    <InputGroup className="bg-white w-full">
                        <InputGroupInput placeholder="Search patients by name, ID, or address..." />
                        <InputGroupAddon>
                            <SearchIcon />
                        </InputGroupAddon>
                    </InputGroup>
                </div>

                <div>
                    <div className="mt-7 w-[90%] mx-auto bg-gray-50 rounded-2xl p-10 shadow-md">
                        <div className="mb-5">
                            <h1 className="text-black">Patients Record({patients?.length ?? 0})</h1>
                        </div>
                        <PatientTable />
                    </div>
                </div>

            </section>
        </DashboardLayout>
    )
}