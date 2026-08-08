import { useParams, Link, useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/dashboardlayout";
import DetailRow from "@/components/detail-row";
import { ArrowLeft } from "lucide-react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { hospitalAppointmentServices } from "@/services/appointmentServices";
import type { patientType } from "@/types/patient-type";
import type { doctorType } from "@/types/doctor-type";
import EditAppointmentModal from "@/components/edit-appointment-modal";
import { toast } from "sonner";

const ScheduledStyle: Record<string, string> = {
    "Completed": "bg-green-500/10 text-green-900",
    "Scheduled": "bg-blue-500/10 text-blue-900",
    "Pending": "bg-amber-500/10 text-amber-600",
    "In Progress": "bg-purple-500/10 text-purple-600",
    "Cancelled": "bg-red-500/10 text-red-900",
};

export default function AppointmentDetailPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const { data: appointment, isLoading, error } = useQuery({
        queryKey: ["appointment", id],
        queryFn: () => hospitalAppointmentServices.getAppointmentById(id!),
        enabled: !!id,
    });

    const { mutate: removeAppointment, isPending: isDeleting } = useMutation({
        mutationFn: () => hospitalAppointmentServices.deleteAppointment(id!),
        onSuccess: () => {
            toast.success("Appointment deleted successfully");
            queryClient.invalidateQueries({ queryKey: ["appointments"] });
            navigate("/appointments");
        },
        onError: (error: any) => {
            toast.error(error?.response?.data?.message ?? "Unable to delete appointment");
        }
    });

    const handleDelete = () => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this appointment? This cannot be undone."
        );
        if (confirmed) {
            removeAppointment();
        }
    };

    if (isLoading) {
        return (
            <DashboardLayout>
                <section className="w-[90%] mx-auto mt-10 text-black">
                    <p>Loading appointment...</p>
                </section>
            </DashboardLayout>
        );
    }

    if (error || !appointment) {
        return (
            <DashboardLayout>
                <section className="w-[90%] mx-auto mt-10 text-black">
                    <p>{error?.message}</p>
                    <Link to="/appointments" className="text-blue-500">Back to Appointments</Link>
                </section>
            </DashboardLayout>
        );
    }

    const patient = appointment.patients as patientType
    const doctor = appointment.doctors as doctorType

    return (
        <DashboardLayout>
            <section className="w-[90%] mx-auto mt-10 mb-16 text-black">

                <Link to="/appointments" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 mb-6">
                    <ArrowLeft className="w-4 h-4" />
                    Back to Appointments
                </Link>

                {/* Header / identity card */}
                <div className="bg-gray-50 rounded-2xl p-8 shadow-md flex items-center justify-between mb-6">
                    <div>
                        <h1 className="text-2xl font-bold">{appointment.appointmentType}</h1>
                        <p className="text-sm text-gray-500">
                            {new Date(appointment.appointmentDate).toLocaleDateString()} · {appointment.appointmentTime}
                        </p>
                        <span className={`inline-block mt-2 rounded-sm px-3 py-1 text-xs font-medium ${ScheduledStyle[appointment.status ?? ""] ?? ""}`}>
                            {appointment.status}
                        </span>
                    </div>
                    <div className="flex gap-3">
                        <EditAppointmentModal appointment={appointment} />
                        <button
                            onClick={handleDelete}
                            disabled={isDeleting}
                            className="flex items-center gap-2 border border-gray-300 rounded-md px-4 py-2 text-sm disabled:opacity-50"
                        >
                            <RiDeleteBin6Line className="w-4 h-4 text-red-500" />
                            {isDeleting ? "Deleting..." : "Delete"}
                        </button>
                    </div>
                </div>

                {/* Patient & Doctor */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="bg-gray-50 rounded-2xl p-6 shadow-md">
                        <div className="flex items-center justify-between mb-3">
                            <h2 className="font-semibold">Patient</h2>
                            {patient?._id && (
                                <Link to={`/patients/${patient._id}`} className="text-xs text-blue-600 hover:underline">
                                    View patient
                                </Link>
                            )}
                        </div>
                        <DetailRow label="Name" value={`${patient?.firstName ?? ""} ${patient?.lastName ?? ""}`} />
                        <DetailRow label="Phone" value={patient?.phone} />
                        <DetailRow label="Gender" value={patient?.gender} />
                    </div>
                    <div className="bg-gray-50 rounded-2xl p-6 shadow-md">
                        <div className="flex items-center justify-between mb-3">
                            <h2 className="font-semibold">Doctor</h2>
                            {doctor?._id && (
                                <Link to={`/doctors/${doctor._id}`} className="text-xs text-blue-600 hover:underline">
                                    View doctor
                                </Link>
                            )}
                        </div>
                        <DetailRow label="Name" value={`${doctor?.firstName ?? ""} ${doctor?.lastName ?? ""}`} />
                        <DetailRow label="Department" value={doctor?.department} />
                        <DetailRow label="Specialization" value={doctor?.specialization} />
                    </div>
                </div>

                {/* Appointment details */}
                <div className="bg-gray-50 rounded-2xl p-6 shadow-md">
                    <h2 className="font-semibold mb-3">Appointment Details</h2>
                    <DetailRow label="Date" value={new Date(appointment.appointmentDate).toLocaleDateString()} />
                    <DetailRow label="Time" value={appointment.appointmentTime} />
                    <DetailRow label="Type" value={appointment.appointmentType} />
                    <DetailRow label="Amount" value={appointment.amount ? `₦${appointment.amount}` : "N/A"} />
                    <div className="flex items-center justify-between py-2">
                        <span className="text-sm text-gray-500">Status</span>
                        <span className={`rounded-sm px-3 py-1 text-xs font-medium ${ScheduledStyle[appointment.status ?? ""] ?? ""}`}>
                            {appointment.status}
                        </span>
                    </div>
                </div>

            </section>
        </DashboardLayout>
    )
}