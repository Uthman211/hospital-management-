import { MdOutlineShield } from "react-icons/md";
import { MdAccessTime } from "react-icons/md";
import { CiHeart } from "react-icons/ci";
import { IoCheckmarkCircleOutline } from "react-icons/io5";

export default function Advertisement() {

    return (
        <section className=" h-full w-[95%] my-auto mt-7 mx-auto">
            <div className="text-center">
                <h1 className="text-3xl font-bold mb-5">Why Patients Choose Us</h1>
                <p>Our commitment to excellence and innovation separates us from other <br /> healthcare providers.</p>
            </div>

            {/* Main DIV */}
            <div className="flex gap-5 mt-10 ">


                {/* FLEX AND H.LONG DIV */}
                <div className="">


                    {/* TWO FLEXXED DIV */}
                    <div className="flex gap-5">

                        <div className="bg-blue-600 px-7 pt-7 pb-9 rounded-2xl h-80 leading-normal cursor-pointer">
                            <MdOutlineShield className="text-white bg-blue-500 backdrop-blur-sm w-15 h-15 px-3 rounded-2xl my-4" />
                            <h1 className="text-2xl my-2">Patient Security</h1>
                            <p className="text-gray-400">Your data and health records are always protected with our advanced secure digital systems.</p>


                        </div>

                        <div className="bg-gray-900 px-7 pt-7 pb-9 rounded-2xl h-80 leading-normal cursor-pointer">
                            <MdAccessTime className="text-[#283CFA] bg-[#5d636972] w-15 h-15 px-3 rounded-2xl my-4" />
                            <h1 className="text-2xl my-2">24/7 Availability</h1>
                            <p className="text-gray-400">Fast response times and immediate care whenever you need it most, day or night.</p>


                        </div>


                    </div>

                    {/* LAST LONG DIV */}
                    <div className="bg-blue-950  pt-7 pb-9 rounded-2xl leading-normal cursor-pointer mt-10  flex justify-evenly items-center align-center">
                        <div>
                            <h1 className="text-4xl my-2 flex ">Latest Bio-Tech <br /> Facilities</h1>
                            <p className="text-gray-400 flex text-[17px]">We invest in the future of healthcare. Our <br /> diagnostic and surgery suites are equipped with <br /> the most advanced AI and robotic tools.</p>
                            <button className="bg-gray-900 border-none text-white w-60 h-15 font-bold mt-5 mr-17 cursor-pointer rounded-3xl">Discover Facilities</button>
                        </div>

                        <img src="/longdivsec.jpg" alt="" className="w-90 h-70 border-none  rounded-4xl" />
                    </div>



                </div>


                {/* V.LONG DIV */}
                <div className="bg-gray-900 px-7 pt-7 pb-9 rounded-2xl h-[44rem] leading-normal cursor-pointer ">
                    <CiHeart className="text-green-400 bg-gray-800 w-15 h-15 px-3 rounded-2xl my-4" />

                    <div className="flex flex-col justify-between h-[85%] ">
                        <div>
                            <h1 className="text-2xl my-2">Emergency Care</h1>
                            <p className="text-gray-400">Round-the-clock emergency medical services with immediate response teams and advanced life support.</p>
                        </div>

                        <div className="flex flex-col gap-4">
                            <p className="flex items-center gap-2"><IoCheckmarkCircleOutline  className="text-green-500"/> Personalized Plans</p>
                            <p className="flex items-center gap-2"><IoCheckmarkCircleOutline  className="text-green-500"/> Holistic Recovery</p>
                            <p className="flex items-center gap-2"><IoCheckmarkCircleOutline  className="text-green-500"/> Support Groups</p>
                            <p className="flex items-center gap-2"><IoCheckmarkCircleOutline  className="text-green-500"/> Nutritional Advice</p>

                        </div>
                    </div>


                </div>





            </div>




        </section>


    )


}