import { MdOutlineShield, MdAccessTime } from "react-icons/md";
import { CiHeart } from "react-icons/ci";
import { IoCheckmarkCircleOutline } from "react-icons/io5";

const emergencyFeatures = [
    "Personalized Plans",
    "Holistic Recovery",
    "Support Groups",
    "Nutritional Advice",
];

export default function Advertisement() {
    return (
        <section className="h-full w-[95%] my-auto mt-7 mx-auto">
            <div className="text-center px-2">
                <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-5">Why Patients Choose Us</h1>
                <p className="text-gray-400 text-sm sm:text-base">
                    Our commitment to excellence and innovation separates us from other <br className="hidden sm:block" />
                    healthcare providers.
                </p>
            </div>

            {/* Main layout */}
            <div className="flex flex-col lg:flex-row gap-5 mt-10">

                {/* Left column */}
                <div className="flex flex-col flex-1 gap-5">

                    {/* Two small cards */}
                    <div className="flex flex-col sm:flex-row gap-5">
                        <div className="flex-1 bg-blue-600 px-6 sm:px-7 pt-7 pb-9 rounded-2xl min-h-[280px] leading-normal cursor-pointer">
                            <MdOutlineShield className="text-white bg-blue-500 backdrop-blur-sm w-14 h-14 p-3 rounded-2xl my-4" />
                            <h1 className="text-xl sm:text-2xl my-2">Patient Security</h1>
                            <p className="text-gray-200 text-sm sm:text-base">
                                Your data and health records are always protected with our advanced secure digital systems.
                            </p>
                        </div>

                        <div className="flex-1 bg-gray-900 px-6 sm:px-7 pt-7 pb-9 rounded-2xl min-h-[280px] leading-normal cursor-pointer">
                            <MdAccessTime className="text-[#283CFA] bg-[#5d636972] w-14 h-14 p-3 rounded-2xl my-4" />
                            <h1 className="text-xl sm:text-2xl my-2">24/7 Availability</h1>
                            <p className="text-gray-400 text-sm sm:text-base">
                                Fast response times and immediate care whenever you need it most, day or night.
                            </p>
                        </div>
                    </div>

                    {/* Long div */}
                    <div className="bg-blue-950 px-6 sm:px-8 pt-7 pb-9 rounded-2xl leading-normal cursor-pointer mt-0 flex flex-col md:flex-row justify-between items-center gap-8">
                        <div>
                            <h1 className="text-2xl sm:text-3xl lg:text-4xl my-2 leading-tight">
                                Latest Bio-Tech <br className="hidden sm:block" /> Facilities
                            </h1>
                            <p className="text-gray-400 text-sm sm:text-[17px] leading-relaxed">
                                We invest in the future of healthcare. Our diagnostic and surgery
                                suites are equipped with the most advanced AI and robotic tools.
                            </p>
                            <button className="bg-gray-900 border-none text-white w-full sm:w-60 h-12 sm:h-15 font-bold mt-5 cursor-pointer rounded-3xl">
                                Discover Facilities
                            </button>
                        </div>

                        <img
                            src="/longdivsec.jpg"
                            alt="Bio-tech facility"
                            className="w-full max-w-[22rem] md:w-90 h-56 sm:h-70 border-none rounded-4xl object-cover shrink-0"
                        />
                    </div>
                </div>

                {/* Vertical long card */}
                <div className="bg-gray-900 px-6 sm:px-7 pt-7 pb-9 rounded-2xl h-auto lg:h-[44rem] lg:w-96 leading-normal cursor-pointer">
                    <CiHeart className="text-green-400 bg-gray-800 w-14 h-14 p-3 rounded-2xl my-4" />

                    <div className="flex flex-col justify-between lg:h-[85%] gap-8 lg:gap-0">
                        <div>
                            <h1 className="text-xl sm:text-2xl my-2">Emergency Care</h1>
                            <p className="text-gray-400 text-sm sm:text-base">
                                Round-the-clock emergency medical services with immediate response teams and advanced life support.
                            </p>
                        </div>

                        <div className="flex flex-col gap-4">
                            {emergencyFeatures.map((feature) => (
                                <p key={feature} className="flex items-center gap-2 text-sm sm:text-base">
                                    <IoCheckmarkCircleOutline className="text-green-500 shrink-0" />
                                    {feature}
                                </p>
                            ))}
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}