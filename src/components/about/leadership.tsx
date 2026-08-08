import { HiOutlineAcademicCap } from "react-icons/hi";
import doctors from "@/mocks/doctor.json";

export default function Leadership() {

    const featuredDoctors = doctors.slice(0, 4);

    return (
        <section className="bg-[#020617] text-white py-16 sm:py-20 px-5">
            <div className="max-w-6xl mx-auto">

                <div className="text-center mb-12 sm:mb-16 pt-20">
                    <button className="text-blue-400 border-white/20 border px-4 py-1 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wide w-max mx-auto flex justify-center mb-5">
                        The Team
                    </button>
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
                        Meet Our <span className="text-blue-500">Medical Team</span>
                    </h1>
                    <p className="text-gray-400 text-sm sm:text-base max-w-2xl mx-auto">
                        Decades of combined expertise guiding our hospital's mission of
                        compassionate, world-class care.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-5">
                    {featuredDoctors.map((doc) => (
                        <div key={doc.doctorId} className="group">
                            <div className="rounded-3xl overflow-hidden border border-white/10 aspect-[3/4] bg-[#0e1320]">
                                <img
                                    src={doc.profileImage}
                                    alt={`Dr. ${doc.firstName} ${doc.lastName}`}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="mt-4">
                                <h2 className="text-lg sm:text-xl font-bold">
                                    Dr. {doc.firstName} {doc.lastName}
                                </h2>
                                <p className="text-blue-400 text-xs sm:text-sm font-semibold uppercase tracking-wide mt-1">
                                    {doc.specialization}
                                </p>
                                <p className="flex items-center gap-2 text-gray-400 text-xs sm:text-sm mt-2">
                                    <HiOutlineAcademicCap className="text-amber-400 shrink-0" />
                                    {doc.yearsOfExperience}+ Years Experience
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}