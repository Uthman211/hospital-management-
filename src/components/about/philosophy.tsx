import { CiHeart } from "react-icons/ci";
import { FiTarget } from "react-icons/fi";
import { IoEyeOutline, IoShieldOutline } from "react-icons/io5";

export default function Philosophy() {

    return (
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 px-5 lg:pl-5 lg:pr-0 py-12 lg:py-0">
            <div>
                <img
                    src="/assets/hospital-cover-picture.jpg"
                    alt="Hospital"
                    className="h-64 sm:h-96 lg:h-[80vh] w-full object-cover rounded-[2rem] lg:rounded-[5rem]"
                />
            </div>

            <div className="flex flex-col gap-6 justify-center">

                <h1 className="text-2xl sm:text-3xl font-bold">
                    Our Core Philosophy
                </h1>
                <p className="text-gray-400 text-sm sm:text-base">
                    We believe that healthcare is a basic human right. Our approach combines the
                    latest clinical research with deep empathy, ensuring that every patient receives
                    personalized attention and world-class care.
                </p>

                <div className="flex flex-col gap-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-5">
                        <div className="flex gap-4 sm:gap-5">
                            <FiTarget className="text-blue-400 bg-[#14283C] w-12 h-12 p-3 rounded-xl shrink-0" />
                            <div>
                                <h1 className="font-semibold">Our Mission</h1>
                                <p className="text-sm">To provide accessible, high-quality care that improves community health.</p>
                            </div>
                        </div>

                        <div className="flex gap-4 sm:gap-5">
                            <IoEyeOutline className="text-blue-400 bg-[#14283C] w-12 h-12 p-3 rounded-xl shrink-0" />
                            <div>
                                <h1 className="font-semibold">Our Vision</h1>
                                <p className="text-sm">To be the most trusted healthcare partner globally.</p>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-5">
                        <div className="flex gap-4 sm:gap-5">
                            <CiHeart className="text-blue-400 bg-[#14283C] w-12 h-12 p-3 rounded-xl shrink-0" />
                            <div>
                                <h1 className="font-semibold">Compassion</h1>
                                <p className="text-sm">Treating every soul with the respect and care they deserve.</p>
                            </div>
                        </div>

                        <div className="flex gap-4 sm:gap-5">
                            <IoShieldOutline className="text-blue-400 bg-[#14283C] w-12 h-12 p-3 rounded-xl shrink-0" />
                            <div>
                                <h1 className="font-semibold">Excellence</h1>
                                <p className="text-sm">Maintaining clinical standards that surpass global benchmarks.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </section>
    )
}