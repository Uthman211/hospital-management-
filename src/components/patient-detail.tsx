import { useParams, Link, useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/dashboardlayout";
import appointments from "@/mocks/appointment.json";
import diagnoses from "@/mocks/treatment.json";
import DetailRow from "@/components/detail-row";
import { ArrowLeft } from "lucide-react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { hospitalPatientServices } from "@/services/patientServices";

import { toast } from "sonner";
import EditPatientModal from "./edit-patient-model";

const activeStyle: Record<string, string> = {
    "Active": "bg-green-500/10 border border-green-500/20 text-green-900",
    "Inactive": "bg-gray-500/10 border border-gray-500/20 text-gray-900"
};

const ScheduledStyle: Record<string, string> = {
    "Completed": "bg-green-500/10 text-green-900",
    "Scheduled": "bg-blue-500/10 text-blue-900",
    "Pending": "bg-amber-500/10 text-amber-600",
    "In Progress": "bg-purple-500/10 text-purple-600"
};

export default function PatientDetailPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const { data: patient, isLoading, error } = useQuery({
        queryKey: ["patient", id],
        queryFn: () => hospitalPatientServices.getPatientById(id!),
        enabled: !!id,
    });

    const { mutate: removePatient, isPending: isDeleting } = useMutation({
        mutationFn: () => hospitalPatientServices.deletePatient(id!),
        onSuccess: () => {
            toast.success("Patient deleted successfully");
            queryClient.invalidateQueries({ queryKey: ["patients"] });
            navigate("/patients");
        },
        onError: (error: any) => {
            toast.error(error?.response?.data?.message ?? "Unable to delete patient");
        }
    });

    const handleDelete = () => {
        if (!patient) return;
        const confirmed = window.confirm(
            `Are you sure you want to delete ${patient.firstName} ${patient.lastName}? This cannot be undone.`
        );
        if (confirmed) {
            removePatient();
        }
    };

    if (isLoading) {
        return (
            <DashboardLayout>
                <section className="w-[90%] mx-auto mt-10 text-black">
                    <p>Loading patient...</p>
                </section>
            </DashboardLayout>
        );
    }

    if (error || !patient) {
        return (
            <DashboardLayout>
                <section className="w-[90%] mx-auto mt-10 text-black">
                    <p>{error?.message}</p>
                    {/* <Link to="/patients" className="text-blue-500">Back to Patients</Link> */}
                </section>
            </DashboardLayout>
        );
    }

    const fullName = `${patient.firstName} ${patient.lastName}`;
    const patientAppointments = appointments.filter(
        a => a.patientName?.trim().toLowerCase().includes(fullName.trim().toLowerCase())
    );
    const patientDiagnoses = diagnoses.filter(
        d => d.patientName?.trim().toLowerCase().includes(fullName.trim().toLowerCase())
    );

    return (
        <DashboardLayout>
            <section className="w-[90%] mx-auto mt-10 mb-16 text-black">

                <Link to="/patients" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 mb-6">
                    <ArrowLeft className="w-4 h-4" />
                    Back to Patients
                </Link>

                {/* Header / identity card */}
                <div className="bg-gray-50 rounded-2xl p-8 shadow-md flex items-center justify-between mb-6">
                    <div className="flex items-center gap-4">
                        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-100 text-blue-700 text-xl font-semibold">
                            {patient.firstName.charAt(0)}{patient.lastName.charAt(0)}
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold">{fullName}</h1>
                            <p className="text-sm text-gray-500">{patient.gender} · {patient.bloodGroup}</p>
                        </div>
                        <span className={`ml-4 rounded-sm px-3 py-1 text-xs font-medium ${activeStyle[patient.status ?? ""] ?? ""}`}>
                            {patient.status}
                        </span>
                    </div>
                    <div className="flex gap-3">
                        <EditPatientModal patient={patient} />
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

                {/* Info grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="bg-gray-50 rounded-2xl p-6 shadow-md">
                        <h2 className="font-semibold mb-3">Personal Info</h2>
                        <DetailRow label="Full Name" value={fullName} />
                        <DetailRow label="Date of Birth" value={patient.dateOfBirth} />
                        <DetailRow label="Gender" value={patient.gender} />
                        <DetailRow label="Blood Group" value={patient.bloodGroup} />
                        <DetailRow label="Assigned Department" value={patient.assignedDepartment || "None"} />
                    </div>
                    <div className="bg-gray-50 rounded-2xl p-6 shadow-md">
                        <h2 className="font-semibold mb-3">Contact Info</h2>
                        <DetailRow label="Phone" value={patient.phone} />
                        <DetailRow label="Email" value={patient.email} />
                        <DetailRow label="Address" value={patient.address?.street} />
                    </div>
                </div>

                {/* Emergency Contact + Medical Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="bg-gray-50 rounded-2xl p-6 shadow-md">
                        <h2 className="font-semibold mb-3">Emergency Contact</h2>
                        <DetailRow label="Name" value={patient.emergencyContact?.name} />
                        <DetailRow label="Relationship" value={patient.emergencyContact?.relationship} />
                        <DetailRow label="Phone" value={patient.emergencyContact?.phone} />
                    </div>
                    <div className="bg-gray-50 rounded-2xl p-6 shadow-md">
                        <h2 className="font-semibold mb-3">Medical History & Allergies</h2>
                        <div className="mb-3">
                            <p className="text-sm text-gray-500 mb-1">Medical History</p>
                            {!patient.medicalHistory || patient.medicalHistory.length === 0 ? (
                                <p className="text-sm text-gray-400">None recorded</p>
                            ) : (
                                <div className="flex flex-wrap gap-2">
                                    {patient.medicalHistory.map((h, i) => (
                                        <span key={i} className="rounded-sm bg-slate-100 px-2 py-1 text-xs text-slate-700">{h}</span>
                                    ))}
                                </div>
                            )}
                        </div>
                        <div>
                            <p className="text-sm text-gray-500 mb-1">Allergies</p>
                            {!patient.allergies || patient.allergies.length === 0 ? (
                                <p className="text-sm text-gray-400">None recorded</p>
                            ) : (
                                <div className="flex flex-wrap gap-2">
                                    {patient.allergies.map((a, i) => (
                                        <span key={i} className="rounded-sm bg-red-100 px-2 py-1 text-xs text-red-700">{a}</span>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Appointments */}
                <div className="bg-gray-50 rounded-2xl p-6 shadow-md mb-6">
                    <h2 className="font-semibold mb-4">Appointments ({patientAppointments.length})</h2>
                    {patientAppointments.length === 0 ? (
                        <p className="text-sm text-gray-500">No appointments on record.</p>
                    ) : (
                        <div className="space-y-2">
                            {patientAppointments.map((a, i) => (
                                <div key={i} className="flex items-center justify-between border-b border-gray-100 py-2 last:border-0">
                                    <div>
                                        <p className="text-sm font-medium">{a.appointmentType}</p>
                                        <p className="text-xs text-gray-500">{a.appointmentDate} · {a.doctorName}</p>
                                    </div>
                                    <span className={`rounded-sm px-3 py-1 text-xs font-medium ${ScheduledStyle[a.status] ?? ""}`}>
                                        {a.status}
                                    </span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Diagnoses */}
                <div className="bg-gray-50 rounded-2xl p-6 shadow-md">
                    <h2 className="font-semibold mb-4">Diagnoses ({patientDiagnoses.length})</h2>
                    {patientDiagnoses.length === 0 ? (
                        <p className="text-sm text-gray-500">No diagnosis records.</p>
                    ) : (
                        <div className="space-y-2">
                            {patientDiagnoses.map((d, i) => (
                                <div key={i} className="flex items-center justify-between border-b border-gray-100 py-2 last:border-0">
                                    <div>
                                        <p className="text-sm font-medium">{d.treatment}</p>
                                        <p className="text-xs text-gray-500">{d.doctorName} · {d.diagnosis}</p>
                                    </div>
                                    <span className={`rounded-sm px-3 py-1 text-xs font-medium ${
                                        d.status === "Critical" ? "bg-red-100 text-red-700" :
                                        d.status === "Pending" ? "bg-amber-100 text-amber-700" :
                                        "bg-green-100 text-green-700"
                                    }`}>
                                        {d.status}
                                    </span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

            </section>
        </DashboardLayout>
    )
}