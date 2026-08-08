import DashboardLayout from "@/components/dashboardlayout";
import FormInput from "@/components/home/form-input";
import Modal from "@/components/modal";
import { Plus, SearchIcon, Stethoscope } from "lucide-react";
import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
} from "@/components/ui/input-group"
import TreatmentTable from "@/components/treatment-table";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { treatmentType } from "@/types/treatment-type";
import type { patientType } from "@/types/patient-type";
import type { doctorType } from "@/types/doctor-type";
import { hospitalTreatmentServices } from "@/services/treatmentServices";
import { hospitalPatientServices } from "@/services/patientServices";
import { hospitalDoctorServices } from "@/services/doctorServices";
import { useState } from "react";
import { toast } from "sonner";

export default function TreatmentPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const queryClient = useQueryClient();

    const { data: treatments } = useQuery<treatmentType[]>({
        queryKey: ["treatments"],
        queryFn: () => hospitalTreatmentServices.getAllTreatments()
    })

    const { data: patients } = useQuery<patientType[]>({
        queryKey: ["patients"],
        queryFn: () => hospitalPatientServices.getAllPatients()
    })

    const { data: doctors } = useQuery<doctorType[]>({
        queryKey: ["doctors"],
        queryFn: () => hospitalDoctorServices.getAllDoctors()
    })

    const { mutate: addTreatment, isPending } = useMutation({
        mutationFn: (payload: { patients: string, doctors: string, diagnosis: string, treatment: string, testName?: string, result?: string, notes?: string }) =>
            hospitalTreatmentServices.createTreatment(payload),
        onSuccess: () => {
            toast.success("Treatment added successfully");
            queryClient.invalidateQueries({ queryKey: ["treatments"] });
            setIsModalOpen(false);
        },
        onError: (error: any) => {
            toast.error(error?.response?.data?.message ?? "Unable to add treatment");
        }
    })

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        const payload = {
            patients: formData.get("patients") as string,
            doctors: formData.get("doctors") as string,
            diagnosis: (formData.get("diagnosis") as string)?.trim(),
            treatment: (formData.get("treatment") as string)?.trim(),
            testName: (formData.get("testName") as string)?.trim() || undefined,
            result: (formData.get("result") as string)?.trim() || undefined,
            notes: (formData.get("notes") as string)?.trim() || undefined,
        };

        addTreatment(payload);
    }

    return (
        <DashboardLayout>
            <section className="">

                <div className="flex justify-between items-center w-[90%] mx-auto mt-10">

                    <div className="flex items-center gap-4 text-black">
                        <Stethoscope className="h-7 w-7 text-blue-600" />
                        <div className="flex flex-col gap-1">
                            <h1 className="text-black text-3xl font-bold">Treatment Management</h1>
                            <p>Manage patient diagnoses and treatment records</p>
                        </div>
                    </div>

                    <div className="flex items-center bg-blue-500 text-white py-1 px-4 rounded-md cursor-pointer">
                        <Plus className="inline-block mr-2 text-white" />

                        <Modal
                            btnText="Add Treatment"
                            title="Add new Treatment"
                            description="Fill in the treatment/diagnosis details below."
                            open={isModalOpen}
                            onOpenChange={setIsModalOpen}
                        >
                            <form onSubmit={handleSubmit} className="flex flex-col gap-4">

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="patients" className="font-semibold">Patient</label>
                                        <select
                                            id="patients"
                                            name="patients"
                                            defaultValue=""
                                            required
                                            className="w-full h-10 outline-none border-[0.5px] rounded-md border-slate-200 px-2"
                                        >
                                            <option value="" disabled>Select patient</option>
                                            {patients?.map((p) => (
                                                <option value={p._id} key={p._id}>{p.firstName} {p.lastName}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="doctors" className="font-semibold">Doctor</label>
                                        <select
                                            id="doctors"
                                            name="doctors"
                                            defaultValue=""
                                            required
                                            className="w-full h-10 outline-none border-[0.5px] rounded-md border-slate-200 px-2"
                                        >
                                            <option value="" disabled>Select doctor</option>
                                            {doctors?.map((d) => (
                                                <option value={d._id} key={d._id}>{d.firstName} {d.lastName}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <FormInput
                                    type="text"
                                    name="diagnosis"
                                    label="Diagnosis"
                                    placeholder="e.g. Type 2 Diabetes"
                                />

                                <FormInput
                                    type="text"
                                    name="treatment"
                                    label="Treatment"
                                    placeholder="e.g. Metformin 500mg twice daily"
                                />

                                <div className="grid grid-cols-2 gap-4">
                                    <FormInput
                                        type="text"
                                        name="testName"
                                        label="Test Name"
                                        placeholder="e.g. Blood Glucose Test"
                                    />
                                    <FormInput
                                        type="text"
                                        name="result"
                                        label="Result"
                                        placeholder="e.g. 140 mg/dL"
                                    />
                                </div>

                                <div className="flex flex-col gap-2">
                                    <label htmlFor="notes" className="font-semibold">Notes</label>
                                    <textarea
                                        id="notes"
                                        name="notes"
                                        rows={3}
                                        placeholder="Additional notes..."
                                        className="rounded-md outline-none border-[0.5px] border-slate-200 px-2 py-2 resize-none"
                                    />
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
                                            {isPending ? "Adding..." : "Add Treatment"}
                                        </button>
                                    </div>
                                </div>

                            </form>
                        </Modal>
                    </div>

                </div>

                <div className="w-[90%] mx-auto mt-10 text-black">
                    <InputGroup className="bg-white w-full">
                        <InputGroupInput placeholder="Search treatments by patient, diagnosis, or doctor..." />
                        <InputGroupAddon>
                            <SearchIcon />
                        </InputGroupAddon>
                    </InputGroup>
                </div>

                <div>
                    <div className="mt-7 w-[90%] mx-auto bg-gray-50 rounded-2xl p-10 shadow-md">
                        <div className="mb-5">
                            <h1 className="text-black">Treatment Records({treatments?.length ?? 0})</h1>
                        </div>
                        <TreatmentTable />
                    </div>
                </div>

            </section>
        </DashboardLayout>
    )
}