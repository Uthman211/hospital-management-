import { FiUsers } from "react-icons/fi";
import { FaStethoscope } from "react-icons/fa6";
import { FiAward } from "react-icons/fi";
import { FaRegHeart } from "react-icons/fa";

const stats = [
    { icon: FiUsers, value: "25K+", label: "Satisfied Patients" },
    { icon: FaStethoscope, value: "150+", label: "Expert Doctors" },
    { icon: FiAward, value: "35+", label: "Years Experience" },
    { icon: FaRegHeart, value: "98.5%", label: "Recoveries" },
];

export default function Info() {
    return (
        <section className="w-[95%] mx-auto h-full mt-24 md:mt-40 lg:mt-70">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-y-8 gap-x-4 sm:gap-x-6 bg-gray-900 p-6 sm:p-8 rounded-[35px]">
                {stats.map(({ icon: Icon, value, label }, i) => (
                    <div
                        key={label}
                        className={`flex flex-col items-center gap-2 text-center px-2 ${
                            i !== 0 ? "sm:border-l sm:border-gray-600" : ""
                        }`}
                    >
                        <Icon className="text-blue-600 w-6 h-6 sm:w-7 sm:h-7" />
                        <h1 className="text-2xl sm:text-3xl font-bold">{value}</h1>
                        <p className="text-gray-500 text-sm sm:text-base">{label}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}