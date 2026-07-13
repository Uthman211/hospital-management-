import Footer from "@/components/home/footer";
import Navbar from "@/components/home/navbar";
import { Search, Filter, Star, Briefcase, Clock, GraduationCap, MapPin, Phone, ArrowRight, ChevronRight } from "lucide-react";

const doctors = [
    {
        name: "Dr. Harry Mitchell",
        badge: "Senior Cardiologist",
        department: "Cardiology Department",
        rating: 4.9,
        bio: "Specialized in interventional cardiology and heart disease...",
        experience: "15+ years",
        availability: "Available Today",
        availabilityColor: "text-green-400",
        education: "MD",
        location: "Block A",
        image: "harry.jpg",
    },
    {
        name: "Dr. Michael Chen",
        badge: "Neurologist",
        department: "Neurology Department",
        rating: 4.8,
        bio: "Expert in complex neurological disorders, stroke recovery, and...",
        experience: "12+ years",
        availability: "Mon, Wed, Fri",
        availabilityColor: "text-gray-300",
        education: "MD",
        location: "Block C",
        image: "micheal.jpg",
    },
    {
        name: "Dr. Elena Rodriguez",
        badge: "Pediatric Specialist",
        department: "Pediatrics Department",
        rating: 5.0,
        bio: "Passionate about child wellness and preventative care from infancy...",
        experience: "10+ years",
        availability: "Available Today",
        availabilityColor: "text-green-400",
        education: "MD",
        location: "Block B",
        image: "elena.jpg",
    },
    {
        name: "Dr. James Wilson",
        badge: "Orthopedic Surgeon",
        department: "Orthopedics Department",
        rating: 4.8,
        bio: "Specializes in minimally invasive joint replacement and sports medicine...",
        experience: "18+ years",
        availability: "Tue, Thu, Sat",
        availabilityColor: "text-gray-300",
        education: "MD",
        location: "Orthopedics Wing",
        image: "jame.jpg",
    },
];

export default function DoctorsSection() {
    return (

        <>
            <Navbar />
            <div className="bg-[#0a0e1a] text-white pt-10">

                {/* Hero */}
                <div className="max-w-3xl mx-auto text-center px-6 pt-20 pb-12">
                    <span className="inline-block text-xs font-semibold tracking-wider text-blue-400 bg-blue-500/10 border border-blue-500/20 rounded-full px-4 py-1.5 mb-6">
                        THE MEDICAL TEAM
                    </span>
                    <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6">
                        Meet Our World-Class <br />
                        <span className="text-blue-500">Specialist Doctors</span>
                    </h1>
                    <p className="text-gray-400 text-lg leading-relaxed">
                        Our specialists combine decades of clinical experience with a deep
                        commitment to patient well-being and revolutionary medical technology.
                    </p>
                </div>

                {/* Search / filter bar */}
                <div className="max-w-4xl mx-auto px-6 mb-16">
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
                                <option>Cardiology</option>
                                <option>Neurology</option>
                                <option>Pediatrics</option>
                                <option>Orthopedics</option>
                            </select>
                        </div>
                        <button className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 transition-colors rounded-xl px-6 py-3 text-sm font-semibold shrink-0">
                            Find Specialist
                        </button>
                    </div>
                </div>

                {/* Doctor cards */}
                <div className="max-w-6xl mx-auto px-6 pb-24">
                    <p className="text-sm text-gray-400 mb-5">Showing {doctors.length} Specialists</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {doctors.map((doc) => (
                            <div
                                key={doc.name}
                                className="flex bg-[#131826] border border-white/5 rounded-2xl overflow-hidden hover:border-blue-500/30 transition-colors"
                            >
                                {/* Photo */}
                                <div className="relative w-2/5 shrink-0">
                                    <img
                                        src={doc.image}
                                        alt={doc.name}
                                        className="w-full h-full object-cover"
                                    />
                                    <span className="absolute top-3 left-3 text-[10px] font-semibold bg-black/60 backdrop-blur-sm border border-white/10 rounded-full px-2.5 py-1">
                                        {doc.badge}
                                    </span>
                                </div>

                                {/* Info */}
                                <div className="flex flex-col flex-1 p-6">
                                    <div className="flex items-start justify-between gap-3 mb-1">
                                        <h3 className="text-xl font-bold leading-snug">{doc.name}</h3>
                                        <span className="flex items-center gap-1 text-xs font-semibold bg-amber-400/10 text-amber-400 rounded-full px-2.5 py-1 shrink-0">
                                            <Star className="w-3 h-3 fill-amber-400" />
                                            {doc.rating}
                                        </span>
                                    </div>

                                    <span className="flex items-center gap-1.5 text-xs text-blue-400 mb-4">
                                        <Briefcase className="w-3 h-3" />
                                        {doc.department}
                                    </span>

                                    <p className="text-sm text-gray-400 leading-relaxed mb-5">
                                        {doc.bio}
                                    </p>

                                    <div className="grid grid-cols-2 gap-y-3 gap-x-4 mb-6 text-xs">
                                        <div>
                                            <p className="text-[10px] font-semibold tracking-wide text-gray-500 mb-1">EXPERIENCE</p>
                                            <span className="flex items-center gap-1.5 text-gray-200">
                                                <Briefcase className="w-3 h-3 text-gray-500" />
                                                {doc.experience}
                                            </span>
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-semibold tracking-wide text-gray-500 mb-1">AVAILABILITY</p>
                                            <span className={`flex items-center gap-1.5 font-medium ${doc.availabilityColor}`}>
                                                <Clock className="w-3 h-3" />
                                                {doc.availability}
                                            </span>
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-semibold tracking-wide text-gray-500 mb-1">EDUCATION</p>
                                            <span className="flex items-center gap-1.5 text-gray-200">
                                                <GraduationCap className="w-3 h-3 text-gray-500" />
                                                {doc.education}
                                            </span>
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-semibold tracking-wide text-gray-500 mb-1">LOCATION</p>
                                            <span className="flex items-center gap-1.5 text-gray-200">
                                                <MapPin className="w-3 h-3 text-gray-500" />
                                                {doc.location}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3 mt-auto">
                                        <button className="flex-1 flex items-center justify-center gap-1.5 bg-blue-600 hover:bg-blue-500 transition-colors rounded-xl py-2.5 text-sm font-semibold">
                                            Book Consultation
                                            <ChevronRight className="w-3.5 h-3.5" />
                                        </button>
                                        <button className="flex items-center justify-center bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl w-10 h-10 shrink-0 transition-colors">
                                            <Phone className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Careers CTA */}
                <div className="max-w-6xl mx-auto px-6 pb-24">
                    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 to-blue-700 px-10 py-16">

                        {/* decorative grid squares */}
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
                                <ArrowRight className="w-4 h-4" />
                            </button>
                        </div>

                    </div>
                </div>

            </div>
            <Footer />
        </>
    );
}