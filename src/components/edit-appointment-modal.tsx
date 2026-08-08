import Modal from "@/components/modal";
import FormInput from "@/components/home/form-input";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { hospitalAppointmentServices } from "@/services/appointmentServices";
import { hospitalPatientServices } from "@/services/patientServices";
import { hospitalDoctorServices } from "@/services/doctorServices";
import type { appointmentType } from "@/types/appointment-type";
import type { patientType } from "@/types/patient-type";
import type { doctorType } from "@/types/doctor-type";
import { useState } from "react";
import { toast } from "sonner";
import { Edit } from "lucide-react";

const statusOptions = ["Pending", "Scheduled", "In Progress", "Completed", "Cancelled"];
const timeOptions = ["9:00 AM", "10:00 AM", "11:00 AM", "2:00 PM", "3:00 PM"];

interface EditAppointmentModalProps {
    appointment: appointmentType;
}

export default function EditAppointmentModal({ appointment }: EditAppointmentModalProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const queryClient = useQueryClient();

    const currentPatient = appointment.patients as patientType;
    const currentDoctor = appointment.doctors as doctorType;

    const { data: patients } = useQuery<patientType[]>({
        queryKey: ["patients"],
        queryFn: () => hospitalPatientServices.getAllPatients()
    });

    const { data: doctors } = useQuery<doctorType[]>({
        queryKey: ["doctors"],
        queryFn: () => hospitalDoctorServices.getAllDoctors()
    });

    const { mutate: editAppointment, isPending } = useMutation({
        mutationFn: (payload: Partial<appointmentType>) =>
            hospitalAppointmentServices.updateAppointment(appointment._id!, payload),
        onSuccess: () => {
            toast.success("Appointment updated successfully");
            queryClient.invalidateQueries({ queryKey: ["appointments"] });
            queryClient.invalidateQueries({ queryKey: ["appointment", appointment._id] });
            setIsModalOpen(false);
        },
        onError: (error: any) => {
            toast.error(error?.response?.data?.message ?? "Unable to update appointment");
        }
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        const payload: Partial<appointmentType> = {
            patients: formData.get("patients") as string,
            doctors: formData.get("doctors") as string,
            appointmentDate: formData.get("appointmentDate") as string,
            appointmentTime: formData.get("appointmentTime") as string,
            appointmentType: (formData.get("appointmentType") as string)?.trim(),
            status: formData.get("status") as appointmentType["status"],
        };

        editAppointment(payload);
    };

    return (
        <Modal
            title="Edit Appointment"
            description="Update the appointment details below."
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

                <div className="grid grid-cols-2 gap-4">
                    <FormInput
                        type="date"
                        name="appointmentDate"
                        label="Date"
                        defaultValue={appointment.appointmentDate?.slice(0, 10)}
                    />
                    <div className="flex flex-col gap-2">
                        <label htmlFor="appointmentTime" className="font-semibold">Time</label>
                        <select
                            id="appointmentTime"
                            name="appointmentTime"
                            defaultValue={appointment.appointmentTime}
                            required
                            className="w-full h-10 outline-none border-[0.5px] rounded-md border-slate-200 px-2"
                        >
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
                    defaultValue={appointment.appointmentType}
                />

                <div className="flex flex-col gap-2">
                    <label htmlFor="status" className="font-semibold">Status</label>
                    <select
                        id="status"
                        name="status"
                        defaultValue={appointment.status}
                        className="w-full h-10 outline-none border-[0.5px] rounded-md border-slate-200 px-2"
                    >
                        {statusOptions.map((s) => (
                            <option value={s} key={s}>{s}</option>
                        ))}
                    </select>
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