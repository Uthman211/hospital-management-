import Footer from "@/components/home/footer";
import Navbar from "@/components/home/navbar";
import { User, Stethoscope, ShieldCheck, Clock, Search, CheckCircle2, Phone, ArrowRight, Calendar } from "lucide-react";

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
    return (
        <>
        <Navbar />
        <div className="bg-[#0a0e1a] text-white p-10">

            {/* Hero */}
            <div className="max-w-3xl mx-auto text-center px-6 pt-20 pb-16">
                <span className="inline-block text-xs font-semibold tracking-wider text-blue-400 bg-blue-500/10 border border-blue-500/20 rounded-full px-4 py-1.5 mb-6">
                    SCHEDULE VISIT
                </span>
                <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6">
                    Book Your <br />
                    <span className="text-blue-500">Consultation Online</span>
                </h1>
                <p className="text-gray-400 text-lg leading-relaxed">
                    Skip the queue and schedule your appointment in minutes. Our team of
                    specialists is ready to provide you with the best medical care.
                </p>
            </div>

            {/* Form + sidebar */}
            <div className="max-w-6xl mx-auto px-6 pb-24 grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

                {/* Reservation card */}
                <div className="lg:col-span-2 bg-[#131826] border border-white/5 rounded-3xl overflow-hidden">

                    {/* Gradient header */}
                    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-8">
                        <h2 className="text-2xl font-bold mb-1">Patient Reservation</h2>
                        <p className="text-blue-100 text-sm italic">Fill out the details below to secure your spot.</p>
                    </div>

                    <form className="flex flex-col gap-8 px-8 py-8">

                        {/* Personal details */}
                        <div>
                            <div className="flex items-center gap-3 mb-5">
                                <div className="w-9 h-9 rounded-lg bg-blue-500/10 flex items-center justify-center">
                                    <User className="w-4 h-4 text-blue-400" />
                                </div>
                                <h3 className="font-semibold">Personal Details</h3>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                                <div className="flex flex-col gap-2">
                                    <label className="text-xs font-semibold tracking-wide text-gray-400">FIRST NAME</label>
                                    <input
                                        type="text"
                                        placeholder="Jane"
                                        className="bg-[#0e1320] border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-500/50 placeholder:text-gray-600"
                                    />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="text-xs font-semibold tracking-wide text-gray-400">LAST NAME</label>
                                    <input
                                        type="text"
                                        placeholder="Doe"
                                        className="bg-[#0e1320] border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-500/50 placeholder:text-gray-600"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div className="flex flex-col gap-2">
                                    <label className="text-xs font-semibold tracking-wide text-gray-400">EMAIL ADDRESS</label>
                                    <input
                                        type="email"
                                        placeholder="jane@example.com"
                                        className="bg-[#0e1320] border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-500/50 placeholder:text-gray-600"
                                    />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="text-xs font-semibold tracking-wide text-gray-400">PHONE NUMBER</label>
                                    <input
                                        type="tel"
                                        placeholder="+1 (234) 567"
                                        className="bg-[#0e1320] border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-500/50 placeholder:text-gray-600"
                                    />
                                </div>
                            </div>
                        </div>

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
                                    <select className="bg-[#0e1320] border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-500/50 text-gray-500 appearance-none">
                                        <option>Select Department</option>
                                        <option>Cardiology</option>
                                        <option>Neurology</option>
                                        <option>Pediatrics</option>
                                        <option>Orthopedics</option>
                                    </select>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="text-xs font-semibold tracking-wide text-gray-400">DATE</label>
                                    <div className="relative">
                                        <input
                                            type="date"
                                            className="bg-[#0e1320] border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-500/50 text-gray-300 w-full [color-scheme:dark]"
                                        />
                                    </div>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="text-xs font-semibold tracking-wide text-gray-400">TIME</label>
                                    <select className="bg-[#0e1320] border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-500/50 text-gray-500 appearance-none">
                                        <option>Time</option>
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
                                    placeholder="Briefly describe your symptoms or concern..."
                                    rows={4}
                                    className="bg-[#0e1320] border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-500/50 placeholder:text-gray-600 resize-none"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 transition-colors rounded-xl py-4 text-sm font-semibold"
                        >
                            Complete Reservation
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

                    {/* Why book online */}
                    <div className="bg-[#131826] border border-white/5 rounded-2xl p-7">
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

                    {/* Need immediate help */}
                    <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-2xl p-7">
                        <h3 className="text-xl font-bold mb-3">Need Immediate Help?</h3>
                        <p className="text-sm text-indigo-100 leading-relaxed mb-6">
                            If you are experiencing severe symptoms, please don't wait for a reservation.
                        </p>
                        <button className="w-full flex items-center justify-center gap-2 bg-white text-indigo-700 hover:bg-indigo-50 transition-colors rounded-xl py-3.5 text-sm font-semibold">
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