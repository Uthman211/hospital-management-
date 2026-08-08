import { FaStar } from "react-icons/fa";
import doctors from "@/mocks/doctor.json";
import { Link } from "react-router-dom";

export default function Doctor() {

    const featuredDoctors = doctors.slice(0, 4);

    return (
        <section className="flex flex-col items-center h-full mt-12 sm:mt-17 px-5">
            <button className="text-blue-600 border-gray-500 cursor-pointer border px-3 py-1 rounded-xl">
                The team
            </button>

            <div className="text-center px-2">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold my-4 sm:my-5">
                    Expert Specialist Doctors
                </h1>
                <p className="text-gray-500 text-sm sm:text-base">
                    Meet our world-class team of dedicated professionals committed to <br className="hidden sm:block" />
                    your health.
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-5 mt-10 w-full max-w-6xl">
                {featuredDoctors.map((doc) => (
                    <div key={doc.doctorId} className="leading-relaxed">
                        <img
                            src={doc.profileImage}
                            alt={`Dr. ${doc.firstName} ${doc.lastName}`}
                            className="rounded-4xl h-72 sm:h-80 lg:h-103 w-full object-cover"
                        />
                        <div className="text-center">
                            <h1 className="text-xl sm:text-2xl font-bold mt-6 sm:mt-10">
                                Dr. {doc.firstName} {doc.lastName}
                            </h1>
                            <p className="text-blue-400 uppercase text-sm sm:text-md">{doc.specialization}</p>
                            <p className="flex justify-center gap-2 items-center text-sm sm:text-base">
                                <FaStar className="text-orange-300" />
                                {doc.yearsOfExperience}+ yrs <span className="text-gray-500">· {doc.department}</span>
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            <Link to={"doctor"}><button className="text-white border-gray-700 cursor-pointer border px-6 py-2 rounded-xl text-md font-bold mt-10 flex flex-col justify-center">
                View all Specialist
            </button></Link>
        </section>
    )
}