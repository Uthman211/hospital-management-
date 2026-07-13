import { FaStar } from "react-icons/fa";

export default function Doctor() {

    return (

        <section className="flex  flex-col items-center h-full mt-17">
            <button className="text-blue-600 border-gray-500 cursor-pointer border px-3 py-1 rounded-xl items ">The team</button>

            <div>
                <h1 className="text-5xl font-bold my-5">Expert Specialist Doctors</h1>
                <p className="text-gray-500 text-center">Meet our world-class team of dedicated professionals committed to <br /> your health.</p>
            </div>

            <div className="grid grid-cols-4 gap-5 mt-10 ">

                <div className="leading-relaxed">
                    <img src="/harry.jpg" alt="" className=" rounded-4xl h-103" />
                    <div className="text-center">
                        <h1 className="text-2xl font-bold mt-10">Dr. Harry Mitchell</h1>
                        <p className="text-blue-400 uppercase text-md">Senior Cardiologist</p>
                        <p className="flex justify-center gap-2 items-center"><FaStar className="text-orange-300" />4.9 <span className="text-gray-500">(124 Reviews)</span></p>

                    </div>

                </div>
                <div className="leading-relaxed">
                    <img src="/jame.jpg" alt="" className=" rounded-4xl h-103" />
                    <div className="text-center">
                        <h1 className="text-2xl font-bold mt-10">Dr. James Wilson</h1>
                        <p className="text-blue-400 uppercase text-md">Orthopedic Surgeon</p>
                        <p className="flex justify-center gap-2 items-center"><FaStar className="text-orange-300" />4.8 <span className="text-gray-500">(98 Reviews)</span></p>

                    </div>

                </div>
                <div className="leading-relaxed">
                    <img src="/elena.jpg" alt="" className=" rounded-4xl h-103" />
                    <div className="text-center">
                        <h1 className="text-2xl font-bold mt-10">Dr. Elena Rodriguez</h1>
                        <p className="text-blue-400 uppercase text-md">Pediatric Specialist</p>
                        <p className="flex justify-center gap-2 items-center"><FaStar className="text-orange-300" />5 <span className="text-gray-500">(156 Reviews)</span></p>

                    </div>

                </div>
                <div className="leading-relaxed">
                    <img src="/micheal.jpg" alt="" className=" rounded-4xl h-103" />
                    <div className="text-center">
                        <h1 className="text-2xl font-bold mt-10">Dr. Michael Chen</h1>
                        <p className="text-blue-400 uppercase text-md">Neurologist</p>
                        <p className="flex justify-center gap-2 items-center"><FaStar className="text-orange-300" />4.9 <span className="text-gray-500">(112 Reviews)</span></p>

                    </div>

                </div>




                {/* <div className="text-center">
                    <img src="/jame.jpg" alt="" className=" rounded-4xl h-103 w-80" />
                    <h1>Dr. James Wilson</h1>
                    <p>Senior Cardiologist</p>
                    <p className="flex justify-center gap-2 items-center"><FaStar />4.9 (124 Reviews)</p>
                </div>
                <div className="text-center">
                    <img src="/elena.jpg" alt="" className=" rounded-4xl h-103 w-80" />
                    <h1>Dr. Elena Rodriguez</h1>
                    <p>Senior Cardiologist</p>
                    <p className="flex justify-center gap-2 items-center"><FaStar />4.9 (124 Reviews)</p>
                </div>
                <div className="text-center">
                    <img src="/micheal.jpg" alt="" className=" rounded-4xl h-103" />
                    <h1>Dr. Michael Chen</h1>
                    <p>Senior Cardiologist</p>
                    <p className="flex justify-center gap-2 items-center"><FaStar />4.9 (124 Reviews)</p>
                </div>
 */}

            </div>
            <button className="text-white border-gray-700 cursor-pointer border px-6 py-2 rounded-xl text-md font-bold mt-10 flex flex-col justify-center">View all Specialist</button>



        </section>
    )

}