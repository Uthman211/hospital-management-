import DashboardLayout from "@/components/dashboardlayout";
import FormInput from "@/components/home/form-input";
import Modal from "@/components/modal";
import { Calendar, Plus, SearchIcon } from "lucide-react";
import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
} from "@/components/ui/input-group"
import AppointmentTable from "@/components/appointment-table";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { hospitalAppointmentServices } from "@/services/appointmentServices";
import { hospitalPatientServices } from "@/services/patientServices";
import { hospitalDoctorServices } from "@/services/doctorServices";
import type { appointmentType } from "@/types/appointment-type";
import type { patientType } from "@/types/patient-type";
import type { doctorType } from "@/types/doctor-type";
import { useState } from "react";
import { toast } from "sonner";

const timeOptions = ["9:00 AM", "10:00 AM", "11:00 AM", "2:00 PM", "3:00 PM"];

export default function AppointmentsPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const queryClient = useQueryClient();

    const { data: appointments } = useQuery<appointmentType[]>({
        queryKey: ["appointments"],
        queryFn: () => hospitalAppointmentServices.getAllAppointments()
    })

    const { data: patients } = useQuery<patientType[]>({
        queryKey: ["patients"],
        queryFn: () => hospitalPatientServices.getAllPatients()
    })

    const { data: doctors } = useQuery<doctorType[]>({
        queryKey: ["doctors"],
        queryFn: () => hospitalDoctorServices.getAllDoctors()
    })

    const { mutate: addAppointment, isPending } = useMutation({
        mutationFn: (payload: any) => hospitalAppointmentServices.createAppointment(payload),
        onSuccess: () => {
            toast.success("Appointment scheduled successfully");
            queryClient.invalidateQueries({ queryKey: ["appointments"] });
            setIsModalOpen(false);
        },
        onError: (error: any) => {
            toast.error(error?.response?.data?.message ?? "Unable to schedule appointment");
        }
    })

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        const reason = (formData.get("reasonForVisit") as string)?.trim();

        const payload = {
            patients: formData.get("patients") as string,
            doctors: formData.get("doctors") as string,
            appointmentDate: formData.get("appointmentDate") as string,
            appointmentTime: formData.get("appointmentTime") as string,
            appointmentType: (formData.get("appointmentType") as string)?.trim() || reason,
            reasonForVisit: reason,
            status: "Pending",
        };

        addAppointment(payload);
    }

    return (
        <DashboardLayout>

            <section className="">

                <div className="flex justify-between items-center w-[90%] mx-auto mt-10">

                    <div className="flex items-center gap-4 text-black">
                        <Calendar className="h-7 w-7 text-blue-600" />
                        <div className="flex flex-col gap-1">
                            <h1 className="text-black text-3xl font-bold">Appointments Management</h1>
                            <p>Schedule and manage patient appointments</p>
                        </div>
                    </div>

                    <div className="flex items-center bg-blue-500 text-white py-1 px-4 rounded-md cursor-pointer">
                        <Plus className="inline-block mr-2 text-white" />

                        <Modal
                            btnText="Schedule Appointment"
                            title="Schedule new Appointment"
                            description="Fill in the appointment details below."
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

                                <div className="grid grid-cols-2 gap-4">
                                    <FormInput
                                        type="date"
                                        name="appointmentDate"
                                        label="Date"
                                    />
                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="appointmentTime" className="font-semibold">Time</label>
                                        <select
                                            id="appointmentTime"
                                            name="appointmentTime"
                                            defaultValue=""
                                            required
                                            className="w-full h-10 outline-none border-[0.5px] rounded-md border-slate-200 px-2"
                                        >
                                            <option value="" disabled>Select time</option>
                                            {timeOptions.map((t) => (
                                                <option value={t} key={t}>{t}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <FormInput
                                    type="text"
                                    name="appointmentType"
                                    label="Appointment Type"
                                    placeholder="e.g. Consultation, Follow-up"
                                />

                                <div className="flex flex-col gap-2">
                                    <label htmlFor="reasonForVisit" className="font-semibold">Reason for Visit</label>
                                    <textarea
                                        id="reasonForVisit"
                                        name="reasonForVisit"
                                        rows={3}
                                        required
                                        placeholder="Briefly describe the reason for this appointment..."
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
                                            {isPending ? "Scheduling..." : "Schedule Appointment"}
                                        </button>
                                    </div>
                                </div>

                            </form>
                        </Modal>
                    </div>

                </div>

                <div className="w-[90%] mx-auto mt-10 text-black">
                    <InputGroup className="bg-white w-full">
                        <InputGroupInput placeholder="Search appointments by patient, doctor, or date..." />
                        <InputGroupAddon>
                            <SearchIcon />
                        </InputGroupAddon>
                    </InputGroup>
                </div>

                <div>
                    <div className="mt-7 w-[90%] mx-auto bg-gray-50 rounded-2xl p-10 shadow-md">
                        <div className="mb-5">
                            <h1 className="text-black">Scheduled Appointments({appointments?.length ?? 0})</h1>
                        </div>
                        <AppointmentTable />
                    </div>
                </div>

            </section>

        </DashboardLayout>
    )
}