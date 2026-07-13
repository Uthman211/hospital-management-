import { useParams, Link } from "react-router-dom";
import DashboardLayout from "@/components/dashboardlayout";
import doctors from "@/mocks/doctor.json";
import appointments from "@/mocks/appointment.json";
import diagnoses from "@/mocks/treatment.json";
import DetailRow from "@/components/detail-row";
import { ArrowLeft, Edit } from "lucide-react";
import { RiDeleteBin6Line } from "react-icons/ri";

const availableStyle: Record<string, string> = {
    "Available": "bg-green-500/10 border border-green-500/20 text-green-900",
    "Inactive": "bg-red-500/10 border border-red-500/20 text-red-900",
    "On Leave": "bg-amber-100 border text-amber-700"
};

const ScheduledStyle: Record<string, string> = {
    "Completed": "bg-green-500/10 text-green-900",
    "Scheduled": "bg-blue-500/10 text-blue-900",
    "Pending": "bg-amber-500/10 text-amber-600",
    "In Progress": "bg-purple-500/10 text-purple-600"
};

export default function DoctorDetailPage() {
    const { id } = useParams();
    const index = Number(id);
    const doctor = doctors[index];

    if (!doctor) {
        return (
            <DashboardLayout>
                <section className="w-[90%] mx-auto mt-10 text-black">
                    <p>Doctor not found.</p>
                    <Link to="/doctors" className="text-blue-500">Back to Doctors</Link>
                </section>
            </DashboardLayout>
        );
    }

    const fullName = `${doctor.firstName} ${doctor.lastName}`;
    const doctorAppointments = appointments.filter(
  a => a.doctorName?.trim().toLowerCase().includes(fullName.trim().toLowerCase())
);
const doctorDiagnoses = diagnoses.filter(
  d => d.doctorName?.trim().toLowerCase().includes(fullName.trim().toLowerCase())
);

    return (
        <DashboardLayout>
            <section className="w-[90%] mx-auto mt-10 mb-16 text-black">

                <Link to="/doctors" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 mb-6">
                    <ArrowLeft className="w-4 h-4" />
                    Back to Doctors
                </Link>

                {/* Header / identity card */}
                <div className="bg-gray-50 rounded-2xl p-8 shadow-md flex items-center justify-between mb-6">
                    <div className="flex items-center gap-4">
                        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-100 text-blue-700 text-xl font-semibold">
                            {doctor.firstName.charAt(0)}{doctor.lastName.charAt(0)}
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold">{fullName}</h1>
                            <p className="text-sm text-gray-500">{doctor.specialization} · {doctor.department}</p>
                        </div>
                        <span className={`ml-4 rounded-sm px-3 py-1 text-xs font-medium ${availableStyle[doctor.status] ?? ""}`}>
                            {doctor.status}
                        </span>
                    </div>
                    <div className="flex gap-3">
                        <button className="flex items-center gap-2 border border-gray-300 rounded-md px-4 py-2 text-sm">
                            <Edit className="w-4 h-4 text-green-600" /> Edit
                        </button>
                        <button className="flex items-center gap-2 border border-gray-300 rounded-md px-4 py-2 text-sm">
                            <RiDeleteBin6Line className="w-4 h-4 text-red-500" /> Delete
                        </button>
                    </div>
                </div>

                {/* Info grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="bg-gray-50 rounded-2xl p-6 shadow-md">
                        <h2 className="font-semibold mb-3">Professional Info</h2>
                        <DetailRow label="Full Name" value={fullName} />
                        <DetailRow label="Specialization" value={doctor.specialization} />
                        <DetailRow label="Department" value={doctor.department} />
                        <DetailRow label="Qualifications" value={doctor.qualification[0]} />
                        <DetailRow label="Gender" value={doctor.gender} />
                    </div>
                    <div className="bg-gray-50 rounded-2xl p-6 shadow-md">
                        <h2 className="font-semibold mb-3">Contact Info</h2>
                        <DetailRow label="Email" value={doctor.email} />
                        <DetailRow label="Phone" value={doctor.phone} />
                        <DetailRow label="Address" value={doctor.address.street} />
                    </div>
                </div>

                {/* Appointments */}
                <div className="bg-gray-50 rounded-2xl p-6 shadow-md mb-6">
                    <h2 className="font-semibold mb-4">Appointments ({doctorAppointments.length})</h2>
                    {doctorAppointments.length === 0 ? (
                        <p className="text-sm text-gray-500">No appointments on record.</p>
                    ) : (
                        <div className="space-y-2">
                            {doctorAppointments.map((a, i) => (
                                <div key={i} className="flex items-center justify-between border-b border-gray-100 py-2 last:border-0">
                                    <div>
                                        <p className="text-sm font-medium">{a.patientName}</p>
                                        <p className="text-xs text-gray-500">{a.appointmentDate} · {a.appointmentType}</p>
                                    </div>
                                    <span className={`rounded-sm px-3 py-1 text-xs font-medium ${ScheduledStyle[a.status] ?? ""}`}>
                                        {a.status}
                                    </span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Diagnoses / Treatments handled */}
                <div className="bg-gray-50 rounded-2xl p-6 shadow-md">
                    <h2 className="font-semibold mb-4">Diagnoses Handled ({doctorDiagnoses.length})</h2>
                    {doctorDiagnoses.length === 0 ? (
                        <p className="text-sm text-gray-500">No diagnosis records.</p>
                    ) : (
                        <div className="space-y-2">
                            {doctorDiagnoses.map((d, i) => (
                                <div key={i} className="flex items-center justify-between border-b border-gray-100 py-2 last:border-0">
                                    <div>
                                        <p className="text-sm font-medium">{d.patientName}</p>
                                        <p className="text-xs text-gray-500">{d.treatment} · {d.diagnosis}</p>
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