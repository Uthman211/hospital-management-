import DashboardLayout from "@/components/dashboardlayout";
import patients from "@/mocks/patient.json";
import appointments from "@/mocks/appointment.json";
import payments from "@/mocks/payment.json";
import diagnoses from "@/mocks/treatment.json";
import vitals from "@/mocks/vitals.json";
import DetailRow from "@/components/detail-row";
import VitalCard from "@/components/vital-card";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Edit, Heart, AlertTriangle, Pill } from "lucide-react";
import { RiDeleteBin6Line } from "react-icons/ri";

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

const PaidStyle: Record<string, string> = {
    "Paid": "bg-green-500/10 text-green-900",
    "Pending": "bg-yellow-500/10 text-yellow-900"
};

export default function PatientDetailPage() {
    const { id } = useParams();
    const patient = patients.find(p => p.id === id);

    if (!patient) {
        return (
            <DashboardLayout>
                <section className="w-[90%] mx-auto mt-10 text-black">
                    <p>Patient not found.</p>
                    <Link to="/patients" className="text-blue-500">Back to Patients</Link>
                </section>
            </DashboardLayout>
        );
    }

    const fullName = `${patient.firstName} ${patient.lastName}`;

    const patientAppointments = appointments.filter(a => a.patientName === fullName);
    const patientPayments = payments.filter(p => p.patientName === fullName);
    const patientDiagnoses = diagnoses.filter(d => d.patientName === fullName);

    const patientVitals = vitals
        .filter(v => v.patientId === patient.id)
        .sort((a, b) => new Date(b.recordedDate).getTime() - new Date(a.recordedDate).getTime());
    const latestVitals = patientVitals[0];

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
                            <p className="text-sm text-gray-500">{patient.gender} · {patient.age} yrs · {patient.bloodGroup}</p>
                        </div>
                        <span className={`ml-4 rounded-sm px-3 py-1 text-xs font-medium ${activeStyle[patient.status] ?? ""}`}>
                            {patient.status}
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
                        <h2 className="font-semibold mb-3">Personal Info</h2>
                        <DetailRow label="Full Name" value={fullName} />
                        <DetailRow label="Date of Birth" value={patient.dateOfBirth} />
                        <DetailRow label="Age" value={patient.age} />
                        <DetailRow label="Gender" value={patient.gender} />
                        <DetailRow label="Blood Group" value={patient.bloodGroup} />
                    </div>
                    <div className="bg-gray-50 rounded-2xl p-6 shadow-md">
                        <h2 className="font-semibold mb-3">Contact Info</h2>
                        <DetailRow label="Phone" value={patient.phone} />
                        <DetailRow label="Email" value={patient.email} />
                        <DetailRow
                            label="Address"
                            value={`${patient.address.street}, ${patient.address.city}, ${patient.address.state}`}
                        />
                    </div>
                </div>

                {/* Emergency Contact + Medical Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="bg-gray-50 rounded-2xl p-6 shadow-md">
                        <h2 className="font-semibold mb-3">Emergency Contact</h2>
                        <DetailRow label="Name" value={patient.emergencyContact.name} />
                        <DetailRow label="Relationship" value={patient.emergencyContact.relationship} />
                        <DetailRow label="Phone" value={patient.emergencyContact.phone} />
                    </div>
                    <div className="bg-gray-50 rounded-2xl p-6 shadow-md">
                        <h2 className="font-semibold mb-3 flex items-center gap-2">
                            <AlertTriangle className="w-4 h-4 text-amber-500" />
                            Medical History & Allergies
                        </h2>
                        <div className="mb-3">
                            <p className="text-sm text-gray-500 mb-1">Medical History</p>
                            {patient.medicalHistory.length === 0 ? (
                                <p className="text-sm text-gray-400">None recorded</p>
                            ) : (
                                <div className="flex flex-wrap gap-2">
                                    {patient.medicalHistory.map((h, i) => (
                                        <span key={i} className="rounded-sm bg-slate-100 px-2 py-1 text-xs text-slate-700">{h}</span>
                                    ))}
                                </div>
                            )}
                        </div>
                        <div className="mb-3">
                            <p className="text-sm text-gray-500 mb-1">Allergies</p>
                            {patient.allergies.length === 0 ? (
                                <p className="text-sm text-gray-400">None recorded</p>
                            ) : (
                                <div className="flex flex-wrap gap-2">
                                    {patient.allergies.map((a, i) => (
                                        <span key={i} className="rounded-sm bg-red-100 px-2 py-1 text-xs text-red-700">{a}</span>
                                    ))}
                                </div>
                            )}
                        </div>
                        <div>
                            <p className="text-sm text-gray-500 mb-1 flex items-center gap-1">
                                <Pill className="w-3 h-3" /> Current Medications
                            </p>
                            {patient.currentMedications.length === 0 ? (
                                <p className="text-sm text-gray-400">None recorded</p>
                            ) : (
                                <div className="flex flex-wrap gap-2">
                                    {patient.currentMedications.map((m, i) => (
                                        <span key={i} className="rounded-sm bg-blue-100 px-2 py-1 text-xs text-blue-700">{m}</span>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Vitals */}
                <div className="bg-gray-50 rounded-2xl p-6 shadow-md mb-6">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="font-semibold flex items-center gap-2">
                            <Heart className="w-4 h-4 text-red-500" />
                            Vitals
                        </h2>
                        {latestVitals && (
                            <span className="text-xs text-gray-500">Last recorded: {latestVitals.recordedDate}</span>
                        )}
                    </div>

                    {!latestVitals ? (
                        <p className="text-sm text-gray-500">No vitals recorded.</p>
                    ) : (
                        <>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                                <VitalCard label="Blood Pressure" value={latestVitals.bloodPressure} unit="mmHg" />
                                <VitalCard label="Heart Rate" value={latestVitals.heartRate} unit="bpm" />
                                <VitalCard label="Temperature" value={latestVitals.temperature} unit="°C" />
                                <VitalCard label="O₂ Saturation" value={latestVitals.oxygenSaturation} unit="%" />
                                <VitalCard label="Respiratory Rate" value={latestVitals.respiratoryRate} unit="/min" />
                                <VitalCard label="Weight" value={latestVitals.weight} unit="kg" />
                                <VitalCard label="Height" value={latestVitals.height} unit="cm" />
                                <VitalCard label="Blood Group" value={latestVitals.bloodGroup} unit="" />
                            </div>

                            {patientVitals.length > 1 && (
                                <div className="border-t border-gray-200 pt-4">
                                    <h3 className="text-sm font-medium text-gray-600 mb-2">History</h3>
                                    <div className="space-y-2">
                                        {patientVitals.slice(1).map((v) => (
                                            <div key={v.id} className="flex items-center justify-between border-b border-gray-100 py-2 last:border-0 text-sm">
                                                <span className="text-gray-500">{v.recordedDate}</span>
                                                <span>BP {v.bloodPressure} · HR {v.heartRate}bpm · Temp {v.temperature}°C</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </>
                    )}
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

                {/* Payments */}
                <div className="bg-gray-50 rounded-2xl p-6 shadow-md mb-6">
                    <h2 className="font-semibold mb-4">Payments ({patientPayments.length})</h2>
                    {patientPayments.length === 0 ? (
                        <p className="text-sm text-gray-500">No payment records.</p>
                    ) : (
                        <div className="space-y-2">
                            {patientPayments.map((p, i) => (
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