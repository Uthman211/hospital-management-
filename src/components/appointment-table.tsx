import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { hospitalAppointmentServices } from "@/services/appointmentServices";
import type { appointmentType } from "@/types/appointment-type";
import type { patientType } from "@/types/patient-type";
import type { doctorType } from "@/types/doctor-type";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Eye } from "lucide-react"
import { RiDeleteBin6Line } from "react-icons/ri";
import { Link } from "react-router-dom";
import { toast } from "sonner";

const ScheduledStyle: Record<string, string> = {
    "Completed": "bg-green-500/10 border border-green-500/20 text-green-900",
    "Scheduled": "bg-blue-500/10 border border-gray-500/20 text-blue-900",
    "Pending": "bg-amber-500/10 text-amber-600",
    "In Progress": "bg-purple-500/10 text-purple-600",
    "Cancelled": "bg-red-500/10 border border-red-500/20 text-red-900",
}

export default function AppointmentTable() {
    const queryClient = useQueryClient();

    const { data: appointments, error, isLoading } = useQuery<appointmentType[]>({
        queryKey: ["appointments"],
        queryFn: () => hospitalAppointmentServices.getAllAppointments()
    })

    const { mutate: removeAppointment, isPending: isDeleting } = useMutation({
        mutationFn: (id: string) => hospitalAppointmentServices.deleteAppointment(id),
        onSuccess: () => {
            toast.success("Appointment deleted successfully");
            queryClient.invalidateQueries({ queryKey: ["appointments"] });
        },
        onError: (error: any) => {
            toast.error(error?.response?.data?.message ?? "Unable to delete appointment");
        }
    });

    const handleDelete = (appointment: appointmentType) => {
        const confirmed = window.confirm("Are you sure you want to delete this appointment? This cannot be undone.");
        if (confirmed) {
            removeAppointment(appointment._id!);
        }
    };

    if (isLoading) {
        return (
            <div>
                <h1>Appointments Loading...</h1>
            </div>
        )
    }

    if (error) {
        return (
            <div>
                <h1>{error.message}</h1>
            </div>
        )
    }

    return (
        <section>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Time</TableHead>
                        <TableHead>Patient</TableHead>
                        <TableHead>Doctor</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {appointments?.map((appointment) => {
                        const patient = appointment.patients as patientType
                        const doctor = appointment.doctors as doctorType

                        return (
                            <TableRow className="text-black" key={appointment._id}>
                                <TableCell>{new Date(appointment.appointmentDate).toLocaleDateString()}</TableCell>
                                <TableCell>{appointment.appointmentTime}</TableCell>
                                <TableCell>{patient?.firstName} {patient?.lastName}</TableCell>
                                <TableCell>{doctor?.firstName} {doctor?.lastName}</TableCell>
                                <TableCell>{appointment.appointmentType}</TableCell>
                                <TableCell>
                                    <span className={`px-3 py-1 rounded-sm ${ScheduledStyle[appointment.status ?? ""] ?? ""}`}>{appointment.status}</span>
                                </TableCell>
                                <TableCell>
                                    <div className="flex gap-4">
                                        <Link to={`/appointments/${appointment._id}`}>
                                            <Eye className="text-blue-500 w-4" />
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(appointment)}
                                            disabled={isDeleting}
                                            className="disabled:opacity-50"
                                        >
                                            <RiDeleteBin6Line className="text-red-500 flex flex-col text-[20px]" />
                                        </button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
        </section>
    )
}