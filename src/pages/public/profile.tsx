import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import SiteHeader from "@/components/home/site-header";
import Footer from "@/components/home/footer";
import { User, Mail, Phone, Calendar, Droplet, Edit, ClipboardList, CalendarClock } from "lucide-react";
import type { patientType } from "@/types/patient-type";
import type { appointmentType } from "@/types/appointment-type";
import type { doctorType } from "@/types/doctor-type";
import { hospitalAppointmentServices } from "@/services/appointmentServices";

const statusStyles: Record<string, string> = {
    "Completed": "bg-green-500/10 text-green-400 border border-green-500/20",
    "Scheduled": "bg-blue-500/10 text-blue-400 border border-blue-500/20",
    "Pending": "bg-amber-500/10 text-amber-400 border border-amber-500/20",
    "In Progress": "bg-purple-500/10 text-purple-400 border border-purple-500/20",
    "Cancelled": "bg-red-500/10 text-red-400 border border-red-500/20",
};

export default function ProfilePage() {
    const navigate = useNavigate();
    const [patient, setPatient] = useState<patientType | null>(null);

    useEffect(() => {
        const stored = localStorage.getItem("patient");
        if (!stored) {
            navigate("/login");
            return;
        }
        setPatient(JSON.parse(stored));
    }, [navigate]);

    const { data: allAppointments } = useQuery<appointmentType[]>({
        queryKey: ["appointments"],
        queryFn: () => hospitalAppointmentServices.getAllAppointments(),
        enabled: !!patient,
    });

    const myAppointments = allAppointments?.filter((a) => {
        const p = a.patients as patientType;
        const patientId = typeof a.patients === "string" ? a.patients : p?._id;
        return patientId === patient?._id;
    }).sort((a, b) => new Date(b.appointmentDate).getTime() - new Date(a.appointmentDate).getTime());

    if (!patient) return null;

    return (
        <>
            <SiteHeader />
            <div className="bg-[#0a0e1a] text-white min-h-screen px-6 pt-32 pb-20">
                <div className="max-w-3xl mx-auto">

                    {/* Header card */}
                    <div className="bg-[#131826] border border-white/5 rounded-3xl p-8 flex items-center justify-between mb-6">
                        <div className="flex items-center gap-4">
                            <div className="w-16 h-16 rounded-full bg-blue-600 flex items-center justify-center text-xl font-bold">
                                {patient.firstName?.charAt(0).toUpperCase()}
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold">
                                    {patient.firstName} {patient.lastName}
                                </h1>
                                <p className="text-gray-400 text-sm">{patient.email}</p>
                            </div>
                        </div>
                        <button className="flex items-center gap-2 border border-white/10 hover:bg-white/5 rounded-xl px-4 py-2 text-sm font-semibold transition-colors">
                            <Edit className="w-4 h-4" />
                            Edit Profile
                        </button>
                    </div>

                    {/* Info grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                        <div className="bg-[#131826] border border-white/5 rounded-2xl p-6">
                            <h2 className="font-semibold mb-4">Personal Info</h2>
                            <div className="flex flex-col gap-3 text-sm">
                                <div className="flex items-center gap-3">
                                    <User className="w-4 h-4 text-blue-400 shrink-0" />
                                    <span className="text-gray-400">Gender:</span>
                                    <span>{patient.gender}</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Calendar className="w-4 h-4 text-blue-400 shrink-0" />
                                    <span className="text-gray-400">Date of Birth:</span>
                                    <span>{patient.dateOfBirth ? new Date(patient.dateOfBirth).toLocaleDateString() : "N/A"}</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Droplet className="w-4 h-4 text-blue-400 shrink-0" />
                                    <span className="text-gray-400">Blood Group:</span>
                                    <span>{patient.bloodGroup || "N/A"}</span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-[#131826] border border-white/5 rounded-2xl p-6">
                            <h2 className="font-semibold mb-4">Contact Info</h2>
                            <div className="flex flex-col gap-3 text-sm">
                                <div className="flex items-center gap-3">
                                    <Phone className="w-4 h-4 text-blue-400 shrink-0" />
                                    <span className="text-gray-400">Phone:</span>
                                    <span>{patient.phone}</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Mail className="w-4 h-4 text-blue-400 shrink-0" />
                                    <span className="text-gray-400">Email:</span>
                                    <span>{patient.email || "N/A"}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Medical History & Allergies */}
                    <div className="bg-[#131826] border border-white/5 rounded-2xl p-6 mb-6">
                        <div className="flex items-center gap-3 mb-4">
                            <ClipboardList className="w-5 h-5 text-blue-400" />
                            <h2 className="font-semibold">Medical History & Allergies</h2>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div>
                                <p className="text-sm text-gray-400 mb-2">Medical History</p>
                                {!patient.medicalHistory || patient.medicalHistory.length === 0 ? (
                                    <p className="text-sm text-gray-500">None recorded</p>
                                ) : (
                                    <div className="flex flex-wrap gap-2">
                                        {patient.medicalHistory.map((h, i) => (
                                            <span key={i} className="rounded-md bg-blue-500/10 border border-blue-500/20 px-3 py-1 text-xs text-blue-300">
                                                {h}
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <div>
                                <p className="text-sm text-gray-400 mb-2">Allergies</p>
                                {!patient.allergies || patient.allergies.length === 0 ? (
                                    <p className="text-sm text-gray-500">None recorded</p>
                                ) : (
                                    <div className="flex flex-wrap gap-2">
                                        {patient.allergies.map((a, i) => (
                                            <span key={i} className="rounded-md bg-red-500/10 border border-red-500/20 px-3 py-1 text-xs text-red-300">
                                                {a}
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Appointment History */}
                    <div className="bg-[#131826] border border-white/5 rounded-2xl p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <CalendarClock className="w-5 h-5 text-blue-400" />
                            <h2 className="font-semibold">Appointment History ({myAppointments?.length ?? 0})</h2>
                        </div>

                        {!myAppointments || myAppointments.length === 0 ? (
                            <p className="text-sm text-gray-500">No appointments on record.</p>
                        ) : (
                            <div className="flex flex-col gap-2">
                                {myAppointments.map((a) => {
                                    const doctor = a.doctors as doctorType;
                                    return (
                                        <div
                                            key={a._id}
                                            className="flex items-center justify-between border-b border-white/5 py-3 last:border-0"
                                        >
                                            <div>
                                                <p className="text-sm font-medium">{a.appointmentType}</p>
                                                <p className="text-xs text-gray-500">
                                                    {new Date(a.appointmentDate).toLocaleDateString()} · {a.appointmentTime}
                                                    {doctor?.firstName ? ` · Dr. ${doctor.firstName} ${doctor.lastName}` : ""}
                                                </p>
                                            </div>
                                            <span className={`rounded-md px-3 py-1 text-xs font-medium ${statusStyles[a.status ?? ""] ?? "bg-gray-500/10 text-gray-400"}`}>
                                                {a.status}
                                            </span>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>

                </div>
            </div>
            <Footer />
        </>
    );
}