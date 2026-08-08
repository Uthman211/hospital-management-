import { CiGlobe, CiStethoscope } from "react-icons/ci";
import { PiMedalLight } from "react-icons/pi";

const accreditations = [
    { icon: CiGlobe, label: "JCI CERTIFIED" },
    { icon: PiMedalLight, label: "WHO STANDARD" },
    { icon: CiStethoscope, label: "ISO 9001:2015" },
];

export default function Partners() {
    return (
        <section className="w-[95%] mx-auto h-full mt-24 md:mt-40 lg:mt-70">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-y-8 gap-x-4 sm:gap-x-6 bg-gray-900 p-6 sm:p-8 rounded-[35px]">

                <div className="flex flex-col gap-2 items-center text-center px-2 col-span-2 sm:col-span-1">
                    <h1 className="text-xl sm:text-2xl font-bold text-gray-500">Our Accreditations</h1>
                    <p className="text-gray-400 font-bold text-sm sm:text-base">Global Partners</p>
                </div>

                {accreditations.map(({ icon: Icon, label }) => (
                    <div
                        key={label}
                        className="flex flex-col items-center gap-2 text-center px-2 sm:border-l sm:border-gray-600"
                    >
                        <Icon className="text-blue-600 w-6 h-6 sm:w-7 sm:h-7" />
                        <p className="text-gray-500 text-sm sm:text-base">{label}</p>
                    </div>
                ))}

            </div>
        </section>
    );
}