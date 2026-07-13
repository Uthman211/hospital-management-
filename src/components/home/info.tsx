import { FiUsers } from "react-icons/fi";
import { FaStethoscope } from "react-icons/fa6";
import { FiAward } from "react-icons/fi";
import { FaRegHeart } from "react-icons/fa";

export default function Info() {
    return (
        <section className="w-[95%] mx-auto  h-full  mt-70">
            <div className="flex gap-10 items-center justify-center flex-wrap my-5 bg-gray-900 p-8 rounded-[35px]">
                <div className="flex flex-col gap-2 w-[20%] text-center">
                    <FiUsers className="text-blue-600 w-60 h-7"/>  
                    <h1 className="text-3xl font-bold">25K+</h1>
                    <p className="text-gray-500">Satisfied Patients</p>
                </div>
                <div className="w-px h-22 bg-gray-600" />
                <div className="flex flex-col gap-2 w-[20%] text-center">
                    <FaStethoscope className="text-blue-600 w-60 h-7" />
                    <h1 className="text-3xl font-bold">150+</h1>
                    <p className="text-gray-500">Expert Doctors</p>
                </div>
                <div className="w-px h-22 bg-gray-600" />
                <div className="flex flex-col gap-2 w-[20%] text-center">
                    <FiAward className="text-blue-600 w-60 h-7" />
                    <h1 className="text-3xl font-bold">35+</h1>
                    <p className="text-gray-500">Years Experience</p>
                </div>
                <div className="w-px h-22 bg-gray-600" />
                <div className="flex flex-col gap-2 w-[20%] text-center">
                    <FaRegHeart className="text-blue-600 w-60 h-7" />
                    <h1 className="text-3xl font-bold">98.5%</h1>
                    <p className="text-gray-500">Recoveries</p>
                </div>
            </div>

            

        </section>
    )
}
