import { MdOutlineShowChart } from "react-icons/md";
import { MdNavigateNext } from "react-icons/md";
import { CiHeart } from "react-icons/ci";
import { LuBaby } from "react-icons/lu";
import { LuMicroscope } from "react-icons/lu";


function Services() {

    return (

        <section className="h-screen w-full py-10">
            <button className="text-blue-600 border-gray-500 cursor-pointer border px-3 py-1 rounded-xl ">Services</button>

            <div>
                <h1 className="text-5xl font-bold my-5">Our Departments and <br /> <span className="text-blue-600">Medical Specialties</span></h1>
                <p className="text-gray-500">We provide a wide range of specialized medical services with the latest <br /> diagnostic and treatment technologies available in the industry.</p>
            </div>



            <div className="grid grid-cols-4 gap-5 mx-5 mt-10 ">


                <div className="bg-gray-900 px-7 pt-7 pb-9 rounded-2xl h-80 leading-normal cursor-pointer">
                    <MdOutlineShowChart className="text-red-400 bg-[#2E232D] w-15 h-15 px-3 rounded-2xl my-4" />
                    <h1 className="text-2xl my-2">Emergency Care</h1>
                    <p className="text-gray-400">Round-the-clock emergency medical services with immediate response teams and advanced life support.</p>
                    <a href="" className="text-blue-600 flex items-center my-5 cursor-pointer"> Learn More <MdNavigateNext /></a>

                </div>

                <div className="bg-gray-900 px-7 pt-7 pb-9 rounded-2xl h-80 leading-normal cursor-pointer">
                    <CiHeart className="text-[#283CFA] bg-[#14283C] w-15 h-15 px-3 rounded-2xl my-4" />
                    <h1 className="text-2xl my-2">Cardiology</h1>
                    <p className="text-gray-400">Expert heart care including diagnostics, surgery, and rehabilitation by world-class cardiologists.</p>
                    <a href="" className="text-blue-600 flex items-center my-5 cursor-pointer"> Learn More <MdNavigateNext /></a>

                </div>

                <div className="bg-gray-900 px-7 pt-7 pb-9 rounded-2xl h-80 leading-normal cursor-pointer">
                    <LuBaby className="text-green-400 bg-gray-800 w-15 h-15 px-3 rounded-2xl my-4" />
                    <h1 className="text-2xl my-2">Pediatrics</h1>
                    <p className="text-gray-400">Specialized and compassionate medical care for infants, children, and adolescents in a kid-friendly environment.</p>
                    <a href="" className="text-blue-600 flex items-center my-5 cursor-pointer"> Learn More <MdNavigateNext /></a>

                </div>

                <div className="bg-gray-900 px-7 pt-7 pb-9 rounded-2xl h-80 leading-normal cursor-pointer">
                    <LuMicroscope className="text-[#c084fc] bg-[#1e1a2e] w-15 h-15 px-3 rounded-2xl my-4" />
                    <h1 className="text-2xl my-2">Diagnostics</h1>
                    <p className="text-gray-400">State-of-the-art laboratory and imaging services for accurate and timely medical diagnoses.</p>
                    <a href="" className="text-blue-600 flex items-center my-5"> Learn More <MdNavigateNext /></a>

                </div>
                


            </div>









        </section>



    )
}

export default Services