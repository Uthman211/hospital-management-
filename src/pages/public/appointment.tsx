
import Footer from "@/components/home/footer";
import SiteHeader from "@/components/home/site-header";
import {  Stethoscope, ShieldCheck, Clock, Search, CheckCircle2, Phone, ArrowRight,  AlertCircle } from "lucide-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { hospitalAppointmentServices } from "@/services/appointmentServices";
import { hospitalDoctorServices } from "@/services/doctorServices";
import type { doctorType } from "@/types/doctor-type";
import { toast } from "sonner";

const whyBookReasons = [
    {
        icon: Clock,
        title: "Priority Queue",
        description: "Online bookings are prioritized by our triage team.",
    },
    {
        icon: Search,
        title: "Digital History",
        description: "Your visit info is automatically synced to your records.",
    },
    {
        icon: CheckCircle2,
        title: "Instant Receipt",
        description: "Receive a confirmation via SMS and Email immediately.",
    },
];

export default function AppointmentsSection() {
    const queryClient = useQueryClient();
    const [searchParams] = useSearchParams();
    const preselectedDepartment = searchParams.get("specialty") ?? "";

    const { data: doctors } = useQuery<doctorType[]>({
        queryKey: ["doctors"],
        queryFn: () => hospitalDoctorServices.getAllDoctors()
    });

    const departments = doctors ? [...new Set(doctors.map(d => d.department))] : [];

    const { mutate: bookAppointment, isPending } = useMutation({
        mutationFn: (payload: any) =>
            hospitalAppointmentServices.createAppointment(payload),
        onSuccess: () => {
            toast.success("Appointment booked successfully");
            queryClient.invalidateQueries({ queryKey: ["appointments"] });
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
        const selectedDepartment = formData.get("department") as string;
        const reason = (formData.get("reason") as string) || "Consultation";

        const matchedDoctor = doctors?.find(
            (d) => d.department === selectedDepartment && d.status !== "Inactive"
        );

        if (!matchedDoctor) {
            toast.error("No available doctor in this department right now");
            return;
        }

        bookAppointment({
            patients: patient._id,
            doctors: matchedDoctor._id!,
            appointmentDate: formData.get("appointmentDate") as string,
            appointmentTime: formData.get("appointmentTime") as string,
            appointmentType: reason,
            reasonForVisit: reason,
            status: "Pending",
        }, {
            onSuccess: () => {
                e.currentTarget.reset();
            }
        });
    };

    return (
        <>
        <SiteHeader />
        <div className="bg-[#0a0e1a] text-white p-10">

            {/* Hero */}
            <div className="max-w-3xl mx-auto text-center px-6 pt-20 pb-16">
                <span className="inline-block text-xs font-semibold tracking-wider text-blue-400 bg-blue-500/10 border border-blue-500/20 rounded-full px-4 py-1.5 mb-6 animate-fade-in-up delay-1">
                    SCHEDULE VISIT
                </span>
                <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6 animate-fade-in-up delay-2">
                    Book Your <br />
                    <span className="text-blue-500">Consultation Online</span>
                </h1>
                <p className="text-gray-400 text-lg leading-relaxed animate-fade-in-up delay-3">
                    Skip the queue and schedule your appointment in minutes. Our team of
                    specialists is ready to provide you with the best medical care.
                </p>
            </div>

            {/* Form + sidebar */}
            <div className="max-w-6xl mx-auto px-6 pb-24 grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

                {/* Reservation card */}
                <div className="lg:col-span-2 bg-[#131826] border border-white/5 rounded-3xl overflow-hidden animate-fade-in-up delay-4">

                    {/* Gradient header */}
                    <div className="bg-linear-to-r from-blue-600 to-indigo-600 px-8 py-8">
                        <h2 className="text-2xl font-bold mb-1">Patient Reservation</h2>
                        <p className="text-blue-100 text-sm italic">Fill out the details below to secure your spot.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-8 px-8 py-8">

                        {/* Consultation details */}
                        <div>
                            <div className="flex items-center gap-3 mb-5">
                                <div className="w-9 h-9 rounded-lg bg-blue-500/10 flex items-center justify-center">
                                    <Stethoscope className="w-4 h-4 text-blue-400" />
                                </div>
                                <h3 className="font-semibold">Consultation Details</h3>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-5">
                                <div className="flex flex-col gap-2">
                                    <label className="text-xs font-semibold tracking-wide text-gray-400">DEPARTMENT</label>
                                    <select
                                        name="department"
                                        required
                                        defaultValue={preselectedDepartment}
                                        className="bg-[#0e1320] border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-500/50 text-gray-300 appearance-none"
                                    >
                                        <option value="" disabled>Select Department</option>
                                        {departments.map((dept) => (
                                            <option key={dept} value={dept}>{dept}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="text-xs font-semibold tracking-wide text-gray-400">DATE</label>
                                    <input
                                        type="date"
                                        name="appointmentDate"
                                        required
                                        className="bg-[#0e1320] border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-500/50 text-gray-300 w-full scheme-dark"
                                    />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="text-xs font-semibold tracking-wide text-gray-400">TIME</label>
                                    <select
                                        name="appointmentTime"
                                        required
                                        defaultValue=""
                                        className="bg-[#0e1320] border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-500/50 text-gray-300 appearance-none"
                                    >
                                        <option value="" disabled>Select Time</option>
                                        <option>9:00 AM</option>
                                        <option>10:00 AM</option>
                                        <option>11:00 AM</option>
                                        <option>2:00 PM</option>
                                        <option>3:00 PM</option>
                                    </select>
                                </div>
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="text-xs font-semibold tracking-wide text-gray-400">REASON FOR VISIT</label>
                                <textarea
                                    name="reason"
                                    required
                                    placeholder="Briefly describe your symptoms or concern..."
                                    rows={4}
                                    className="bg-[#0e1320] border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-500/50 placeholder:text-gray-600 resize-none"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isPending}
                            className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 transition-colors rounded-xl py-4 text-sm font-semibold disabled:opacity-50"
                        >
                            {isPending ? "Booking..." : "Complete Reservation"}
                            <ArrowRight className="w-4 h-4" />
                        </button>

                        <p className="flex items-center justify-center gap-1.5 text-xs text-gray-500">
                            <ShieldCheck className="w-3.5 h-3.5 text-green-500" />
                            Your data is encrypted and secure
                        </p>
                    </form>
                </div>

                {/* Sidebar */}
                <div className="flex flex-col gap-6">

                    <div className="bg-[#131826] border border-white/5 rounded-2xl p-7 animate-fade-in-up delay-1">
                        <h3 className="text-lg font-semibold mb-6">Why Book Online?</h3>
                        <div className="flex flex-col gap-5">
                            {whyBookReasons.map(({ icon: Icon, title, description }) => (
                                <div key={title} className="flex items-start gap-4">
                                    <div className="w-9 h-9 rounded-lg bg-blue-500/10 flex items-center justify-center shrink-0">
                                        <Icon className="w-4 h-4 text-blue-400" />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-sm mb-0.5">{title}</p>
                                        <p className="text-sm text-gray-500 leading-relaxed">{description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-[#131826] border border-red-500/20 rounded-2xl p-7 animate-fade-in-up delay-2">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-xl bg-red-500/15 flex items-center justify-center shrink-0">
                                <AlertCircle className="w-5 h-5 text-red-500" />
                            </div>
                            <h3 className="text-xl font-bold">Need Immediate Help?</h3>
                        </div>
                        <p className="text-sm text-gray-400 leading-relaxed mb-6">
                            If you are experiencing severe symptoms, please don't wait for a reservation.
                        </p>
                        <button className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-500 transition-colors rounded-xl py-3.5 text-sm font-semibold">
                            <Phone className="w-4 h-4" />
                            Call: 911
                        </button>
                    </div>

                </div>
            </div>
        </div>
        <Footer />
        </>
    );
}