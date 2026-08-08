import Modal from "@/components/modal";
import FormInput from "@/components/home/form-input";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { hospitalTreatmentServices } from "@/services/treatmentServices";
import { hospitalPatientServices } from "@/services/patientServices";
import { hospitalDoctorServices } from "@/services/doctorServices";
import type { treatmentType } from "@/types/treatment-type";
import type { patientType } from "@/types/patient-type";
import type { doctorType } from "@/types/doctor-type";
import { useState } from "react";
import { toast } from "sonner";
import { Edit } from "lucide-react";

const statusOptions = ["Pending", "Normal", "Critical", "Resolved"];

interface EditTreatmentModalProps {
    treatment: treatmentType;
}

export default function EditTreatmentModal({ treatment }: EditTreatmentModalProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const queryClient = useQueryClient();

    const currentPatient = treatment.patients as patientType;
    const currentDoctor = treatment.doctors as doctorType;

    const { data: patients } = useQuery<patientType[]>({
        queryKey: ["patients"],
        queryFn: () => hospitalPatientServices.getAllPatients()
    });

    const { data: doctors } = useQuery<doctorType[]>({
        queryKey: ["doctors"],
        queryFn: () => hospitalDoctorServices.getAllDoctors()
    });

    const { mutate: editTreatment, isPending } = useMutation({
        mutationFn: (payload: Partial<treatmentType>) =>
            hospitalTreatmentServices.updateTreatment(treatment._id!, payload),
        onSuccess: () => {
            toast.success("Treatment updated successfully");
            queryClient.invalidateQueries({ queryKey: ["treatments"] });
            queryClient.invalidateQueries({ queryKey: ["treatment", treatment._id] });
            setIsModalOpen(false);
        },
        onError: (error: any) => {
            toast.error(error?.response?.data?.message ?? "Unable to update treatment");
        }
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        const payload: Partial<treatmentType> = {
            patients: formData.get("patients") as string,
            doctors: formData.get("doctors") as string,
            diagnosis: (formData.get("diagnosis") as string)?.trim(),
            treatment: (formData.get("treatment") as string)?.trim(),
            testName: (formData.get("testName") as string)?.trim() || undefined,
            result: (formData.get("result") as string)?.trim() || undefined,
            notes: (formData.get("notes") as string)?.trim() || undefined,
            status: formData.get("status") as treatmentType["status"],
        };

        editTreatment(payload);
    };

    return (
        <Modal
            title="Edit Treatment"
            description="Update the treatment/diagnosis details below."
            open={isModalOpen}
            onOpenChange={setIsModalOpen}
            trigger={
                <button className="flex items-center gap-2 border border-gray-300 rounded-md px-4 py-2 text-sm cursor-pointer">
                    <Edit className="w-4 h-4 text-green-600" /> Edit
                </button>
            }
        >
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">

                <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-2">
                        <label htmlFor="patients" className="font-semibold">Patient</label>
                        <select
                            id="patients"
                            name="patients"
                            defaultValue={currentPatient?._id}
                            required
                            className="w-full h-10 outline-none border-[0.5px] rounded-md border-slate-200 px-2"
                        >
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
                            defaultValue={currentDoctor?._id}
                            required
                            className="w-full h-10 outline-none border-[0.5px] rounded-md border-slate-200 px-2"
                        >
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
                    defaultValue={treatment.diagnosis}
                />

                <FormInput
                    type="text"
                    name="treatment"
                    label="Treatment"
                    defaultValue={treatment.treatment}
                />

                <div className="grid grid-cols-2 gap-4">
                    <FormInput
                        type="text"
                        name="testName"
                        label="Test Name"
                        defaultValue={treatment.testName}
                    />
                    <FormInput
                        type="text"
                        name="result"
                        label="Result"
                        defaultValue={treatment.result}
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <label htmlFor="status" className="font-semibold">Status</label>
                    <select
                        id="status"
                        name="status"
                        defaultValue={treatment.status}
                        className="w-full h-10 outline-none border-[0.5px] rounded-md border-slate-200 px-2"
                    >
                        {statusOptions.map((s) => (
                            <option value={s} key={s}>{s}</option>
                        ))}
                    </select>
                </div>

                <div className="flex flex-col gap-2">
                    <label htmlFor="notes" className="font-semibold">Notes</label>
                    <textarea
                        id="notes"
                        name="notes"
                        rows={3}
                        defaultValue={treatment.notes}
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
                            {isPending ? "Saving..." : "Save Changes"}
                        </button>
                    </div>
                </div>

            </form>
        </Modal>
    );
}