import { useState } from "react";
import Modal from "@/components/modal";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { hospitalAppointmentServices } from "@/services/appointmentServices";
import { toast } from "sonner";

interface BookAppointmentModalProps {
    doctorId: string;
    doctorName: string;
    department: string;
}

export default function BookAppointmentModal({ doctorId, doctorName, department }: BookAppointmentModalProps) {
    const [isOpen, setIsOpen] = useState(false);
    const queryClient = useQueryClient();

    const { mutate: bookAppointment, isPending } = useMutation({
        mutationFn: (payload: any) => hospitalAppointmentServices.createAppointment(payload),
        onSuccess: () => {
            toast.success("Appointment booked successfully");
            queryClient.invalidateQueries({ queryKey: ["appointments"] });
            setIsOpen(false);
        },
        onError: (error: any) => {
            toast.error(error?.response?.data?.message ?? "Unable to book appointment");
        }
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const patientRaw = localStorage.getItem("patient");
        if (!patientRaw) {
            toast.error("Please log in to book an appointment");
            return;
        }
        const patient = JSON.parse(patientRaw);

        const formData = new FormData(e.currentTarget);
        const reason = formData.get("reasonForVisit") as string;

        bookAppointment({
            patients: patient._id,
            doctors: doctorId,
            appointmentDate: formData.get("appointmentDate") as string,
            appointmentTime: formData.get("appointmentTime") as string,
            appointmentType: reason,
            reasonForVisit: reason,
            status: "Pending",
        });
    };

    return (
        <Modal
            btnText="Book Consultation"
            title={`Book with Dr. ${doctorName}`}
            description={department}
            open={isOpen}
            onOpenChange={setIsOpen}
        >
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                    <label className="font-semibold text-sm">Date</label>
                    <input
                        type="date"
                        name="appointmentDate"
                        required
                        className="h-10 rounded-md border-[0.5px] border-slate-200 px-3 outline-none"
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <label className="font-semibold text-sm">Time</label>
                    <select
                        name="appointmentTime"
                        required
                        defaultValue=""
                        className="h-10 rounded-md border-[0.5px] border-slate-200 px-3 outline-none"
                    >
                        <option value="" disabled>Select time</option>
                        <option>9:00 AM</option>
                        <option>10:00 AM</option>
                        <option>11:00 AM</option>
                        <option>2:00 PM</option>
                        <option>3:00 PM</option>
                        <option>4:00 PM</option>
                    </select>
                </div>

                <div className="flex flex-col gap-2">
                    <label className="font-semibold text-sm">Reason for Visit</label>
                    <select
                        name="reasonForVisit"
                        required
                        defaultValue=""
                        className="h-10 rounded-md border-[0.5px] border-slate-200 px-3 outline-none"
                    >
                        <option value="" disabled>Select type</option>
                        <option>Consultation</option>
                        <option>Follow-up</option>
                        <option>Routine Checkup</option>
                        <option>Emergency</option>
                    </select>
                </div>

                <div className="grid grid-cols-2 gap-3 mt-2">
                    <button
                        type="button"
                        onClick={() => setIsOpen(false)}
                        className="h-10 rounded-md border border-gray-300 text-sm font-medium"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={isPending}
                        className="h-10 rounded-md bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold disabled:opacity-50"
                    >
                        {isPending ? "Booking..." : "Confirm Booking"}
                    </button>
                </div>
            </form>
        </Modal>
    );
}