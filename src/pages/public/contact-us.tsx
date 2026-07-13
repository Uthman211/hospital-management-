import Footer from "@/components/home/footer";
import Navbar from "@/components/home/navbar";
import { Phone, Mail, MapPin, AlertCircle, ArrowRight, ChevronRight, Bus } from "lucide-react";

const supportHours = [
    { label: "Emergency", hours: "24 Hours / 7 Days", dotColor: "bg-green-500" },
    { label: "Outpatient Clinic", hours: "Mon–Fri: 8AM – 8PM", dotColor: "bg-gray-500" },
    { label: "Pharmacy", hours: "Daily: 7AM – 11PM", dotColor: "bg-gray-500" },
    { label: "Visiting Hours", hours: "Daily: 10AM – 6PM", dotColor: "bg-gray-500" },
];

const contactCards = [
    {
        icon: Phone,
        title: "Call Us",
        subtitle: "Speak with our dedicated staff",
        value: "+1 (234) 567-8900",
        linkLabel: "Call Now",
    },
    {
        icon: Mail,
        title: "Email Us",
        subtitle: "We respond within 24 hours",
        value: "info@healthcareplus.com",
        linkLabel: "Send Email",
    },
    {
        icon: MapPin,
        title: "Visit Us",
        subtitle: "123 Healthcare Avenue",
        value: "Medical City, MC 12345",
        linkLabel: "Get Directions",
    },
];

export default function ContactSection() {
    return (

        <>
        <Navbar/>
        <div className="bg-[#0a0e1a] text-white px-6 py-20 pt-30">

            {/* Hero */}
            <div className="max-w-3xl mx-auto text-center mb-16">
                <span className="inline-block text-xs font-semibold tracking-wider text-blue-400 bg-blue-500/10 border border-blue-500/20 rounded-full px-4 py-1.5 mb-6">
                    GET IN TOUCH
                </span>
                <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6">
                    We're Here To <br />
                    <span className="text-blue-500 italic">Help You Heal</span>
                </h1>
                <p className="text-gray-400 text-lg leading-relaxed">
                    Have a question or need to schedule a consultation? Reach out to our team today
                    and experience personalized medical support.
                </p>
            </div>

            {/* Contact cards */}
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
                {contactCards.map(({ icon: Icon, title, subtitle, value, linkLabel }) => (
                    <div
                        key={title}
                        className="bg-[#131826] border border-white/5 rounded-2xl p-8 hover:border-blue-500/30 transition-colors"
                    >
                        <div className="w-11 h-11 rounded-xl bg-blue-500/10 flex items-center justify-center mb-6">
                            <Icon className="w-5 h-5 text-blue-400" />
                        </div>
                        <h3 className="text-lg font-semibold mb-1">{title}</h3>
                        <p className="text-sm text-gray-500 mb-4">{subtitle}</p>
                        <p className="font-semibold mb-4">{value}</p>
                        <a href="#" className="inline-flex items-center gap-1 text-sm text-blue-400 hover:text-blue-300">
                            {linkLabel}
                            <ChevronRight className="w-3.5 h-3.5" />
                        </a>
                    </div>
                ))}
            </div>

            {/* Form + sidebar */}
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Send a message form */}
                <div className="lg:col-span-2">
                    <h2 className="text-3xl font-bold mb-2">Send a Message</h2>
                    <p className="text-gray-500 mb-8">
                        Fill out the form below and a member of our team will reach out shortly.
                    </p>

                    <form className="flex flex-col gap-5">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div className="flex flex-col gap-2">
                                <label className="text-xs font-semibold tracking-wide text-gray-400">
                                    FULL NAME
                                </label>
                                <input
                                    type="text"
                                    placeholder="John Doe"
                                    className="bg-[#131826] border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-500/50 placeholder:text-gray-600"
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-xs font-semibold tracking-wide text-gray-400">
                                    EMAIL ADDRESS
                                </label>
                                <input
                                    type="email"
                                    placeholder="john@example.com"
                                    className="bg-[#131826] border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-500/50 placeholder:text-gray-600"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div className="flex flex-col gap-2">
                                <label className="text-xs font-semibold tracking-wide text-gray-400">
                                    PHONE NUMBER
                                </label>
                                <input
                                    type="tel"
                                    placeholder="+1 (234) 000-0000"
                                    className="bg-[#131826] border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-500/50 placeholder:text-gray-600"
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-xs font-semibold tracking-wide text-gray-400">
                                    DEPARTMENT
                                </label>
                                <select className="bg-[#131826] border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-500/50 text-gray-500 appearance-none">
                                    <option>Select Department</option>
                                    <option>Cardiology</option>
                                    <option>Pediatrics</option>
                                    <option>Orthopedics</option>
                                    <option>Emergency Care</option>
                                </select>
                            </div>
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-xs font-semibold tracking-wide text-gray-400">
                                MESSAGE
                            </label>
                            <textarea
                                placeholder="How can we help you?"
                                rows={5}
                                className="bg-[#131826] border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-500/50 placeholder:text-gray-600 resize-none"
                            />
                        </div>

                        <button
                            type="submit"
                            className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 transition-colors rounded-xl py-4 text-sm font-semibold mt-2"
                        >
                            Send Message Now
                            <ArrowRight className="w-4 h-4" />
                        </button>
                    </form>
                </div>

                {/* Sidebar: emergency + support hours */}
                <div className="flex flex-col gap-6">

                    {/* Emergency center */}
                    <div className="bg-[#131826] border border-red-500/20 rounded-2xl p-7">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-xl bg-red-500/15 flex items-center justify-center shrink-0">
                                <AlertCircle className="w-5 h-5 text-red-500" />
                            </div>
                            <h3 className="text-lg font-semibold">Emergency Center</h3>
                        </div>
                        <p className="text-sm text-gray-400 leading-relaxed mb-6">
                            Our emergency department is open 24/7. For life-threatening emergencies,
                            please call the priority line immediately.
                        </p>
                        <button className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-500 transition-colors rounded-xl py-3.5 text-sm font-semibold">
                            <Phone className="w-4 h-4" />
                            Call Priority: 911
                        </button>
                    </div>

                    {/* Patient support hours */}
                    <div className="bg-[#131826] border border-white/5 rounded-2xl p-7">
                        <h3 className="text-lg font-semibold mb-5">Patient Support Hours</h3>
                        <div className="flex flex-col">
                            {supportHours.map(({ label, hours, dotColor }, i) => (
                                <div
                                    key={label}
                                    className={`flex items-center justify-between py-3 text-sm ${i !== supportHours.length - 1 ? "border-b border-white/5" : ""
                                        }`}
                                >
                                    <span className="flex items-center gap-2 text-gray-300">
                                        <span className={`w-1.5 h-1.5 rounded-full ${dotColor}`} />
                                        {label}
                                    </span>
                                    <span className="text-gray-500">{hours}</span>
                                </div>
                            ))}
                        </div>

                        <div className="flex items-start gap-3 mt-5 pt-5 border-t border-white/5">
                            <div className="w-9 h-9 rounded-lg bg-blue-500/10 flex items-center justify-center shrink-0">
                                <Bus className="w-4 h-4 text-blue-400" />
                            </div>
                            <div>
                                <p className="text-[10px] font-semibold tracking-wide text-gray-500 mb-0.5">
                                    PUBLIC TRANSIT
                                </p>
                                <p className="text-sm text-gray-300">
                                    Routes 15, 22 stop directly in front
                                </p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
        <Footer/>
        </>
    );
}