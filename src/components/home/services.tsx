import { MdOutlineShowChart, MdNavigateNext } from "react-icons/md";
import { CiHeart } from "react-icons/ci";
import { LuBaby, LuMicroscope } from "react-icons/lu";

const services = [
    {
        icon: MdOutlineShowChart,
        iconColor: "text-red-400",
        iconBg: "bg-[#2E232D]",
        title: "Emergency Care",
        description: "Round-the-clock emergency medical services with immediate response teams and advanced life support.",
    },
    {
        icon: CiHeart,
        iconColor: "text-[#283CFA]",
        iconBg: "bg-[#14283C]",
        title: "Cardiology",
        description: "Expert heart care including diagnostics, surgery, and rehabilitation by world-class cardiologists.",
    },
    {
        icon: LuBaby,
        iconColor: "text-green-400",
        iconBg: "bg-gray-800",
        title: "Pediatrics",
        description: "Specialized and compassionate medical care for infants, children, and adolescents in a kid-friendly environment.",
    },
    {
        icon: LuMicroscope,
        iconColor: "text-[#c084fc]",
        iconBg: "bg-[#1e1a2e]",
        title: "Diagnostics",
        description: "State-of-the-art laboratory and imaging services for accurate and timely medical diagnoses.",
    },
];

function Services() {
    return (
        <section className="w-full py-40 sm:py-20 px-5 sm:px-8 ">
            <button className="text-blue-600 border-gray-500 cursor-pointer border px-3 py-1 rounded-xl">
                Services
            </button>

            <div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold my-5 leading-tight">
                    Our Departments and <br className="hidden sm:block" />
                    <span className="text-blue-600">Medical Specialties</span>
                </h1>
                <p className="text-gray-500 text-sm sm:text-base max-w-2xl">
                    We provide a wide range of specialized medical services with the latest
                    diagnostic and treatment technologies available in the industry.
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-10">
                {services.map(({ icon: Icon, iconColor, iconBg, title, description }) => (
                    <div
                        key={title}
                        className="bg-gray-900 px-6 sm:px-7 pt-7 pb-9 rounded-2xl h-auto min-h-[300px] leading-normal cursor-pointer"
                    >
                        <Icon className={`${iconColor} ${iconBg} w-14 h-14 p-3 rounded-2xl my-4`} />
                        <h1 className="text-xl sm:text-2xl my-2">{title}</h1>
                        <p className="text-gray-400 text-sm sm:text-base">{description}</p>
                        <a href="services" className="text-blue-600 flex items-center my-5 cursor-pointer">
                            Learn More <MdNavigateNext />
                        </a>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default Services;