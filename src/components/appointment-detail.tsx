import { useParams, Link } from "react-router-dom";
import DashboardLayout from "@/components/dashboardlayout";
import appointments from "@/mocks/appointment.json";
import payments from "@/mocks/payment.json";
import diagnoses from "@/mocks/treatment.json";
import patients from "@/mocks/patient.json";
import doctors from "@/mocks/doctor.json";
import DetailRow from "@/components/detail-row";
import { ArrowLeft, Edit, ChevronRight } from "lucide-react";
import { RiDeleteBin6Line } from "react-icons/ri";

const ScheduledStyle: Record<string, string> = {
    "Completed": "bg-green-500/10 border border-green-500/20 text-green-900",
    "Scheduled": "bg-blue-500/10 border border-gray-500/20 text-blue-900",
    "Pending": "bg-amber-500/10 text-amber-600",
    "In Progress": "bg-purple-500/10 text-purple-600"
};

const PaidStyle: Record<string, string> = {
    "Paid": "bg-green-500/10 text-green-900",
    "Pending": "bg-yellow-500/10 text-yellow-900"
};

export default function AppointmentDetailPage() {
    const { id } = useParams();
    const index = Number(id);
    const appointment = appointments[index];

    if (!appointment) {
        return (
            <DashboardLayout>
                <section className="w-[90%] mx-auto mt-10 text-black">
                    <p>Appointment not found.</p>
                    <Link to="/appointments" className="text-blue-500">Back to Appointments</Link>
                </section>
            </DashboardLayout>
        );
    }

    // Find related patient & doctor index so we can link to their 360 pages
    const patientIndex = patients.findIndex(
        p => `${p.firstName} ${p.lastName}`.trim().toLowerCase() === appointment.patientName?.trim().toLowerCase()
    );
    const doctorIndex = doctors.findIndex(
        d => `${d.firstName} ${d.lastName}`.trim().toLowerCase() === appointment.doctorName?.trim().toLowerCase()
    );

    // Related payment(s) and diagnosis for this patient (best-effort — no direct appointmentId link in mock data)
    const relatedPayments = payments.filter(
        p => p.patientName?.trim().toLowerCase() === appointment.patientName?.trim().toLowerCase()
    );
    const relatedDiagnoses = diagnoses.filter(
        d => d.patientName?.trim().toLowerCase() === appointment.patientName?.trim().toLowerCase()
             && d.doctorName?.trim().toLowerCase() === appointment.doctorName?.trim().toLowerCase()
    );

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
                            {appointment.appointmentDate} · {appointment.appointmentTime}
                        </p>
                        <span className={`inline-block mt-2 rounded-sm px-3 py-1 text-xs font-medium ${ScheduledStyle[appointment.status] ?? ""}`}>
                            {appointment.status}
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

                {/* Info grid: patient & doctor, with links to their 360 pages */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="bg-gray-50 rounded-2xl p-6 shadow-md">
                        <div className="flex items-center justify-between mb-3">
                            <h2 className="font-semibold">Patient</h2>
                            {patientIndex !== -1 && (
                                <Link to={`/patients/${patientIndex}`} className="flex items-center text-xs text-blue-600 hover:underline">
                                    View patient <ChevronRight className="w-3 h-3" />
                                </Link>
                            )}
                        </div>
                        <DetailRow label="Name" value={appointment.patientName} />
                    </div>
                    <div className="bg-gray-50 rounded-2xl p-6 shadow-md">
                        <div className="flex items-center justify-between mb-3">
                            <h2 className="font-semibold">Doctor</h2>
                            {doctorIndex !== -1 && (
                                <Link to={`/doctors/${doctorIndex}`} className="flex items-center text-xs text-blue-600 hover:underline">
                                    View doctor <ChevronRight className="w-3 h-3" />
                                </Link>
                            )}
                        </div>
                        <DetailRow label="Name" value={appointment.doctorName} />
                        <DetailRow label="Department" value={appointment.department} />
                        <DetailRow label="Specialization" value={appointment.doctorSpecialization} />
                    </div>
                </div>

                {/* Appointment details */}
                <div className="bg-gray-50 rounded-2xl p-6 shadow-md mb-6">
                    <h2 className="font-semibold mb-3">Appointment Details</h2>
                    <DetailRow label="Date" value={appointment.appointmentDate} />
                    <DetailRow label="Time" value={appointment.appointmentTime} />
                    <DetailRow label="Type" value={appointment.appointmentType} />
                    <div className="flex items-center justify-between py-2">
                        <span className="text-sm text-gray-500">Status</span>
                        <span className={`rounded-sm px-3 py-1 text-xs font-medium ${ScheduledStyle[appointment.status] ?? ""}`}>
                            {appointment.status}
                        </span>
                    </div>
                </div>

                {/* Related payment */}
                <div className="bg-gray-50 rounded-2xl p-6 shadow-md mb-6">
                    <h2 className="font-semibold mb-4">Related Payments ({relatedPayments.length})</h2>
                    {relatedPayments.length === 0 ? (
                        <p className="text-sm text-gray-500">No payment records for this patient.</p>
                    ) : (
                        <div className="space-y-2">
                            {relatedPayments.map((p, i) => (
                                <div key={i} className="flex items-center justify-between border-b border-gray-100 py-2 last:border-0">
                                    <div>
                                        <p className="text-sm font-medium">{p.description}</p>
                                        <p className="text-xs text-gray-500">{p.paymentDate} · Invoice {p.invoiceNumber}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm font-medium">₦{Intl.NumberFormat().format(Number(p.amount))}</p>
                                        <span className={`rounded-sm px-2 py-0.5 text-xs font-medium ${PaidStyle[p.paymentStatus] ?? ""}`}>
                                            {p.paymentStatus}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Related diagnosis */}
                <div className="bg-gray-50 rounded-2xl p-6 shadow-md">
                    <h2 className="font-semibold mb-4">Related Diagnosis ({relatedDiagnoses.length})</h2>
                    {relatedDiagnoses.length === 0 ? (
                        <p className="text-sm text-gray-500">No diagnosis linked to this appointment.</p>
                    ) : (
                        <div className="space-y-2">
                            {relatedDiagnoses.map((d, i) => (
                                <div key={i} className="flex items-center justify-between border-b border-gray-100 py-2 last:border-0">
                                    <div>
                                        <p className="text-sm font-medium">{d.treatment}</p>
                                        <p className="text-xs text-gray-500">{d.diagnosis}</p>
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