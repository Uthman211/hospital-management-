import Footer from "@/components/home/footer";
import Navbar from "@/components/home/navbar";
import {
    Heart, Brain, Smile, Bone, Stethoscope, ShieldPlus,
    HeartPulse, Car, Zap, Activity, Phone, ArrowRight,
    Users, Check, Award, ShieldCheck, TrendingUp
} from "lucide-react";

const specialties = [
    {
        icon: Heart,
        iconBg: "bg-red-500/10",
        iconColor: "text-red-500",
        badge: "24/7 SUPPORT",
        title: "Cardiology",
        description: "World-class care for your heart with advanced diagnostics and life-saving treatments.",
        services: ["Advanced Echocardiography", "Heart Bypass Surgery", "Rhythm Management", "Cardiac Rehabilitation"],
        specialists: 8,
    },
    {
        icon: Brain,
        iconBg: "bg-purple-500/10",
        iconColor: "text-purple-400",
        badge: "BY APPOINTMENT",
        title: "Neurology",
        description: "Expert analysis and treatment for delicate brain and nervous system conditions.",
        services: ["Neuro-oncology", "Stroke Management", "Epilepsy Treatment", "Sleep Disorders"],
        specialists: 6,
    },
    {
        icon: Smile,
        iconBg: "bg-green-500/10",
        iconColor: "text-green-400",
        badge: "24/7 EMERGENCY",
        title: "Pediatrics",
        description: "Caring for the next generation with gentle, specialized medical attention.",
        services: ["Growth Monitoring", "Vaccination Programs", "Childhood Nutrition", "Pediatric Surgery"],
        specialists: 10,
    },
    {
        icon: Bone,
        iconBg: "bg-blue-500/10",
        iconColor: "text-blue-400",
        badge: "MON – SAT",
        title: "Orthopedics",
        description: "Restoring mobility and strength through innovative bone and joint care.",
        services: ["Joint Replacement", "Sports Injuries", "Spine Surgery", "Physical Therapy"],
        specialists: 7,
    },
    {
        icon: Stethoscope,
        iconBg: "bg-purple-500/10",
        iconColor: "text-purple-400",
        badge: "DAILY 8AM – 8PM",
        title: "Internal Medicine",
        description: "Comprehensive adult healthcare focused on prevention and long-term wellness.",
        services: ["Chronic Care", "Health Assessments", "Diagnostic Screening", "Infectious Diseases"],
        specialists: 12,
    },
    {
        icon: ShieldPlus,
        iconBg: "bg-rose-500/10",
        iconColor: "text-rose-400",
        badge: "MON – FRI",
        title: "Oncology",
        description: "Advanced cancer treatments delivered with hope and revolutionary technology.",
        services: ["Precision Chemotherapy", "Radiation Therapy", "Immunotherapy", "Clinical Trials"],
        specialists: 6,
    },
];

const emergencyServices = [
    { icon: HeartPulse, label: "Cardiac Emergency" },
    { icon: Car, label: "Accident & Trauma" },
    { icon: Zap, label: "Stroke Intervention" },
    { icon: Activity, label: "Pediatric ER" },
];

const diagnostics = [
    { icon: Zap, title: "Digital MRI/CT", description: "High-resolution imaging with 50% less radiation exposure." },
    { icon: Users, title: "Robot-Assisted", description: "Precision surgery guided by advanced AI systems." },
    { icon: Phone, title: "Tele-Health", description: "Consult our specialists from the comfort of your home." },
    { icon: Award, title: "Awards", description: "Nationally recognized for innovation in diagnostic tech." },
];

const trustBadges = [
    { icon: Award, label: "ABC Health Awards 2024" },
    { icon: ShieldCheck, label: "ISO 27001 Secured" },
    { icon: TrendingUp, label: "Hospital of the Year" },
];

export default function ServicesSection() {
    return (
        <>
        <Navbar />
      
        <div className="bg-[#0a0e1a] text-white pt-10">

            {/* Hero */}
            <div className="max-w-3xl mx-auto text-center px-6 pt-20 pb-16">
                <span className="inline-block text-xs font-semibold tracking-wider text-blue-400 bg-blue-500/10 border border-blue-500/20 rounded-full px-4 py-1.5 mb-6">
                    OUR EXPERTISE
                </span>
                <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6">
                    Medical Specialties <br />
                    <span className="text-blue-500">Built On Excellence</span>
                </h1>
                <p className="text-gray-400 text-lg leading-relaxed">
                    Explore our wide range of specialized medical services designed to provide
                    you with the best outcomes through innovation and care.
                </p>
            </div>

            {/* Specialty cards */}
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 px-6 pb-24">
                {specialties.map(({ icon: Icon, iconBg, iconColor, badge, title, description, services, specialists }) => (
                    <div
                        key={title}
                        className="flex flex-col bg-[#131826] border border-white/5 rounded-2xl p-7 hover:border-blue-500/30 transition-colors"
                    >
                        <div className="flex items-start justify-between mb-5">
                            <div className={`w-11 h-11 rounded-xl ${iconBg} flex items-center justify-center`}>
                                <Icon className={`w-5 h-5 ${iconColor}`} />
                            </div>
                            <span className="text-[10px] font-semibold tracking-wide text-gray-500 mt-2">
                                {badge}
                            </span>
                        </div>

                        <h3 className="text-xl font-bold mb-2">{title}</h3>
                        <p className="text-sm text-gray-400 leading-relaxed mb-5">{description}</p>

                        <ul className="flex flex-col gap-2 mb-6 flex-1">
                            {services.map((s) => (
                                <li key={s} className="flex items-center gap-2 text-sm text-gray-300">
                                    <Check className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                                    {s}
                                </li>
                            ))}
                        </ul>

                        <div className="flex items-center justify-between pt-5 border-t border-white/5">
                            <span className="flex items-center gap-1.5 text-xs text-gray-500">
                                <Users className="w-3.5 h-3.5" />
                                {specialists} Specialists
                            </span>
                            <button className="flex items-center gap-1 bg-blue-600 hover:bg-blue-500 transition-colors rounded-full pl-4 pr-3 py-1.5 text-xs font-semibold">
                                Book Now
                                <ArrowRight className="w-3.5 h-3.5" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Emergency section */}
            <div className="relative overflow-hidden px-6 py-20">
                <div className="absolute inset-0 bg-gradient-to-br from-red-950/30 via-transparent to-transparent pointer-events-none" />
                <div className="relative max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                    <div>
                        <span className="inline-block text-xs font-bold tracking-wider text-white bg-red-600 rounded-md px-3 py-1.5 mb-6">
                            EMERGENCY
                        </span>
                        <h2 className="text-4xl md:text-5xl font-extrabold leading-tight mb-6">
                            Immediate Care <br />
                            When Every <br />
                            <span className="text-red-500">Second</span> Counts
                        </h2>
                        <p className="text-gray-400 leading-relaxed mb-8 max-w-md">
                            Our 24/7 Trauma Center is equipped with the latest life-support
                            systems and staffed by rapid-response specialists. We're ready
                            for any situation, any time.
                        </p>

                        <div className="grid grid-cols-2 gap-3 mb-8 max-w-md">
                            {emergencyServices.map(({ icon: Icon, label }) => (
                                <div
                                    key={label}
                                    className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-4 py-3"
                                >
                                    <Icon className="w-4 h-4 text-red-500 shrink-0" />
                                    <span className="text-sm">{label}</span>
                                </div>
                            ))}
                        </div>

                        <div className="flex items-center gap-6">
                            <button className="flex items-center gap-2 bg-red-600 hover:bg-red-500 transition-colors rounded-xl px-6 py-3.5 text-sm font-semibold">
                                <Phone className="w-4 h-4" />
                                Emergency: 911
                            </button>
                            <div className="flex items-center gap-2 text-sm text-gray-400">
                                <TrendingUp className="w-4 h-4 text-gray-500" />
                                <div>
                                    <p className="text-[10px] font-semibold tracking-wide text-gray-500">AVG. WAIT TIME</p>
                                    <p className="font-mono font-semibold text-white">08:14 MIN</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="aspect-square rounded-2xl border border-white/10 bg-gradient-to-br from-red-950/40 to-transparent" />

                </div>
            </div>

            {/* Advanced diagnostics */}
            <div className="max-w-6xl mx-auto px-6 py-20">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold mb-3">Advanced Diagnostics</h2>
                    <p className="text-gray-400">Precision medicine starts with precision imaging and laboratory analysis.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                    <div
                        className="relative rounded-2xl overflow-hidden min-h-[340px] bg-cover bg-center flex items-end p-8"
                        style={{ backgroundImage: "url('/molecular-lab.jpg')" }}
                    >
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                        <div className="relative">
                            <h3 className="text-2xl font-bold mb-1">Molecular Laboratory</h3>
                            <p className="text-sm text-gray-300">DNA mapping and genetic screening at molecular level.</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                        {diagnostics.map(({ icon: Icon, title, description }) => (
                            <div
                                key={title}
                                className="bg-[#131826] border border-white/5 rounded-2xl p-6 flex flex-col"
                            >
                                <div className="w-9 h-9 rounded-lg bg-blue-500/10 flex items-center justify-center mb-4">
                                    <Icon className="w-4 h-4 text-blue-400" />
                                </div>
                                <h4 className="font-semibold mb-1.5">{title}</h4>
                                <p className="text-sm text-gray-500 leading-relaxed">{description}</p>
                            </div>
                        ))}
                    </div>

                </div>
            </div>

            {/* Trust badges */}
            <div className="border-t border-white/5 px-6 py-10">
                <div className="max-w-6xl mx-auto flex flex-wrap justify-center gap-x-16 gap-y-4">
                    {trustBadges.map(({ icon: Icon, label }) => (
                        <div key={label} className="flex items-center gap-2 text-sm text-gray-500">
                            <Icon className="w-4 h-4" />
                            <span className="tracking-wide">{label}</span>
                        </div>
                    ))}
                </div>
            </div>

        </div>
        <Footer />
          </>
    );
}