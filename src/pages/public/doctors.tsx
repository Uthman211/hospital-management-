import { Search, Filter, Briefcase, Clock, GraduationCap, MapPin, Phone } from "lucide-react";
import Footer from "@/components/home/footer";
import SiteHeader from "@/components/home/site-header";
import { useQuery } from "@tanstack/react-query";
import { hospitalDoctorServices } from "@/services/doctorServices";
import type { doctorType } from "@/types/doctor-type";
import BookAppointmentModal from "@/components/bookappointmentmodel";


const statusStyles: Record<string, { dot: string; text: string }> = {
    "Available": { dot: "bg-green-500", text: "text-green-400" },
    "On Leave": { dot: "bg-amber-500", text: "text-amber-400" },
    "Inactive": { dot: "bg-gray-500", text: "text-gray-400" },
};

function getTodaySchedule(availability?: Record<string, string>) {
    if (!availability) return undefined;
    const days = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
    const today = days[new Date().getDay()];
    return availability[today];
}

const cardDelays = ["delay-1", "delay-2", "delay-3", "delay-4"];

export default function DoctorsSection() {

    const { data: doctors, isLoading, error } = useQuery<doctorType[]>({
        queryKey: ["doctors"],
        queryFn: () => hospitalDoctorServices.getAllDoctors()
    });

    const featuredDoctors = doctors?.slice(0, 4) ?? [];
    const departments = doctors ? [...new Set(doctors.map(d => d.department))] : [];

    return (
  <>
     <SiteHeader />

        <div className="bg-[#0a0e1a] text-white">

            {/* Hero */}
            <div className="max-w-3xl mx-auto text-center px-6 pt-30 pb-12">
                <span className="inline-block text-xs font-semibold tracking-wider text-blue-400 bg-blue-500/10 border border-blue-500/20 rounded-full px-4 py-1.5 mb-6 animate-fade-in-up delay-1">
                    THE MEDICAL TEAM
                </span>
                <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6 animate-fade-in-up delay-2">
                    Meet Our World-Class <br />
                    <span className="text-blue-500">Specialist Doctors</span>
                </h1>
                <p className="text-gray-400 text-lg leading-relaxed animate-fade-in-up delay-3">
                    Our specialists combine decades of clinical experience with a deep
                    commitment to patient well-being and revolutionary medical technology.
                </p>
            </div>

            {/* Search / filter bar */}
            <div className="max-w-4xl mx-auto px-6 mb-16 animate-fade-in-up delay-4">
                <div className="flex flex-col md:flex-row gap-3 bg-[#131826] border border-white/10 rounded-2xl p-3">
                    <div className="flex items-center gap-3 flex-1 px-3">
                        <Search className="w-4 h-4 text-gray-500 shrink-0" />
                        <input
                            type="text"
                            placeholder="Search by name or specialty..."
                            className="bg-transparent outline-none text-sm w-full placeholder:text-gray-600"
                        />
                    </div>
                    <div className="flex items-center gap-3 px-3 md:border-x border-white/10 py-2 md:py-0">
                        <Filter className="w-4 h-4 text-gray-500 shrink-0" />
                        <select className="bg-transparent outline-none text-sm text-gray-300 appearance-none pr-6">
                            <option>All Departments</option>
                            {departments.map((dept) => (
                                <option key={dept}>{dept}</option>
                            ))}
                        </select>
                    </div>
                    <button className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 transition-colors rounded-xl px-6 py-3 text-sm font-semibold shrink-0">
                        Find Specialist
                    </button>
                </div>
            </div>

            {/* Doctor cards */}
            <div className="max-w-6xl mx-auto px-6 pb-24">
                {isLoading && <p className="text-sm text-gray-400 mb-5">Loading specialists...</p>}
                {error && <p className="text-sm text-red-400 mb-5">Unable to load doctors.</p>}
                {!isLoading && !error && (
                    <p className="text-sm text-gray-400 mb-5">Showing {featuredDoctors.length} Specialists</p>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {featuredDoctors.map((doc, i) => {
                        const style = statusStyles[doc.status ?? ""] ?? statusStyles["Inactive"];
                        const todaySchedule = getTodaySchedule(doc.availability);
                        const isAvailableNow = doc.status === "Available" && todaySchedule && todaySchedule !== "Closed";

                        return (
                            <div
                                key={doc._id}
                                className={`flex bg-[#131826] border border-white/5 rounded-2xl overflow-hidden hover:border-blue-500/30 transition-colors animate-fade-in-up ${cardDelays[i]}`}
                            >
                                <div className="relative w-2/5 shrink-0 bg-gray-800">
                                    <img
                                        src={doc.profileImage}
                                        alt={`${doc.firstName} ${doc.lastName}`}
                                        className="w-full h-full object-cover"
                                    />
                                    <span className="absolute top-3 left-3 text-[10px] font-semibold bg-black/60 backdrop-blur-sm border border-white/10 rounded-full px-2.5 py-1">
                                        {doc.specialization}
                                    </span>
                                </div>

                                <div className="flex flex-col flex-1 p-6">
                                    <div className="flex items-start justify-between gap-3 mb-1">
                                        <h3 className="text-xl font-bold leading-snug">
                                            Dr. {doc.firstName} {doc.lastName}
                                        </h3>
                                        <span className={`flex items-center gap-1.5 text-xs font-medium rounded-full px-2.5 py-1 shrink-0 bg-white/5 ${style.text}`}>
                                            <span className={`w-1.5 h-1.5 rounded-full ${style.dot}`} />
                                            {doc.status}
                                        </span>
                                    </div>

                                    <span className="flex items-center gap-1.5 text-xs text-blue-400 mb-4">
                                        <Briefcase className="w-3 h-3" />
                                        {doc.department} Department
                                    </span>

                                    <p className="text-sm text-gray-400 leading-relaxed mb-5">
                                        {doc.qualification?.join(", ")} · {doc.yearsOfExperience} years specializing in {doc.specialization?.toLowerCase()}.
                                    </p>

                                    <div className="grid grid-cols-2 gap-y-3 gap-x-4 mb-6 text-xs">
                                        <div>
                                            <p className="text-[10px] font-semibold tracking-wide text-gray-500 mb-1">EXPERIENCE</p>
                                            <span className="flex items-center gap-1.5 text-gray-200">
                                                <Briefcase className="w-3 h-3 text-gray-500" />
                                                {doc.yearsOfExperience}+ years
                                            </span>
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-semibold tracking-wide text-gray-500 mb-1">TODAY</p>
                                            <span className={`flex items-center gap-1.5 font-medium ${isAvailableNow ? "text-green-400" : "text-gray-400"}`}>
                                                <Clock className="w-3 h-3" />
                                                {todaySchedule === "Closed" || !todaySchedule ? "Closed" : todaySchedule}
                                            </span>
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-semibold tracking-wide text-gray-500 mb-1">QUALIFICATION</p>
                                            <span className="flex items-center gap-1.5 text-gray-200">
                                                <GraduationCap className="w-3 h-3 text-gray-500" />
                                                {doc.qualification?.[0]}
                                            </span>
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-semibold tracking-wide text-gray-500 mb-1">ROOM</p>
                                            <span className="flex items-center gap-1.5 text-gray-200">
                                                <MapPin className="w-3 h-3 text-gray-500" />
                                                {doc.roomNumber}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3 mt-auto">
                                        {doc.status !== "Inactive" ? (
                                            <div className="flex-1">
                                                <BookAppointmentModal
                                                    doctorId={doc._id!}
                                                    doctorName={`${doc.firstName} ${doc.lastName}`}
                                                    department={doc.department}
                                                />
                                            </div>
                                        ) : (
                                            <button
                                                disabled
                                                className="flex-1 flex items-center justify-center gap-1.5 bg-gray-700 cursor-not-allowed transition-colors rounded-xl py-2.5 text-sm font-semibold"
                                            >
                                                Unavailable
                                            </button>
                                        )}
                                        <button className="flex items-center justify-center bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl w-10 h-10 shrink-0 transition-colors">
                                            <Phone className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Careers CTA */}
            <div className="max-w-6xl mx-auto px-6 pb-24">
                <div className="relative overflow-hidden rounded-3xl bg-linear-to-br from-blue-600 to-blue-700 px-10 py-16 animate-fade-in-up delay-1">
                    <div className="absolute right-10 top-1/2 -translate-y-1/2 hidden md:grid grid-cols-2 gap-4 opacity-40">
                        <div className="w-32 h-32 rounded-2xl bg-white/10 border border-white/20" />
                        <div className="w-32 h-32 rounded-2xl bg-white/10 border border-white/20" />
                        <div className="w-32 h-32 rounded-2xl bg-white/10 border border-white/20" />
                        <div className="w-32 h-32 rounded-2xl bg-white/10 border border-white/20" />
                    </div>
                    <div className="relative max-w-md">
                        <span className="inline-block text-xs font-semibold tracking-wider bg-white/15 rounded-full px-4 py-1.5 mb-6">
                            CAREERS
                        </span>
                        <h2 className="text-4xl font-extrabold leading-tight mb-5">
                            Join the Excellence Team
                        </h2>
                        <p className="text-blue-100 leading-relaxed mb-8">
                            We're always looking for passionate medical professionals to join
                            our network of world-class care providers.
                        </p>
                        <button className="flex items-center gap-2 bg-white text-blue-700 hover:bg-blue-50 transition-colors rounded-xl px-6 py-3.5 text-sm font-semibold">
                            Explore Career Openings
                        </button>
                    </div>
                </div>
            </div>

        </div>
<Footer />
         </>
    );
}