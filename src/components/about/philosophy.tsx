import { CiHeart } from "react-icons/ci";
import { FiTarget } from "react-icons/fi";
import { IoEyeOutline, IoShieldOutline } from "react-icons/io5";



export default function Philosophy() {

    return (
        <section className="grid grid-cols-2 gap-10 ml-5">
            <div>
                <img src="/assets/hospital-cover-picture.jpg" alt="" className="h-[80vh] rounded-[5rem]" />
            </div>

            <div className="flex flex-col gap-6 justify-center">

                <h1 className="text-3xl font-bold">
                    Our Core Philosophy
                </h1>
                <p className="text-gray-400">We believe that healthcare is a basic human right. Our approach combines the <br />latest clinical research with deep empathy, ensuring that every patient receives <br />personalized attention and world-class care.</p>


                <div className="flex flex-col gap-6">
                    <div className="flex gap-5">
                        <div className="flex flex-col gap-3">
                            <div className="flex gap-5">
                                <FiTarget className="text-blue-400 bg-[#14283C] w-12 h-12 px-3 rounded-xl " />
                                <div>
                                    <h1>Our Mission</h1>
                                    <p className="text-[15px]">To provide accessible, high-quality care <br />that improves community health.</p>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col gap-3">
                            <div className="flex gap-5">
                                <IoEyeOutline  className="text-blue-400 bg-[#14283C] w-12 h-12 px-3 rounded-xl " />
                                <div>

                                    <h1>Our Vision</h1>
                                    <p className="text-[15px]">To be the most trusted healthcare <br />partner globally.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-5">
                        <div className="flex flex-col gap-3">
                            <div className="flex gap-5">
                                <CiHeart className="text-blue-400 bg-[#14283C] w-12 h-12 px-3 rounded-xl " />
                                <div>
                                    <h1>Compassion</h1>
                                    <p className="text-[15px]">Treating every soul with the respect and <br />care they deserve.</p>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col gap-3">
                            <div className="flex gap-5">
                                <IoShieldOutline className="text-blue-400 bg-[#14283C] w-12 h-12 px-3 rounded-xl " />
                                <div>
                                    <h1>Excellence</h1>
                                    <p className="text-[15px]">Maintaining clinical standards that <br />surpass global benchmarks.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>




        </section>


    )

}