import { HiArrowRight } from "react-icons/hi";
import {
    Avatar,
    AvatarFallback,
    AvatarGroup,
    AvatarGroupCount,
    AvatarImage,
} from "@/components/ui/avatar"
import { FaStar } from "react-icons/fa";


function Herosection() {

    return (
        //     <section className="flex items-center justify-center text-center h-[90vh] ">
        //         <div className="hero-content-container">
        //   <img src="/blueco_hospital_icon_v3.svg" alt="" className="w-200 h-70 mx-auto "/>
        //             <h1 className="text-5xl font-bold mb-4 playfair text-white">A great place for your health</h1>
        //             <p className="text-2xl mb-4 mt-5 leading-relaxed font-light playfair text-white">Your health is our priority.<br />  Experience compassionate care and advanced medical services at BlueCo Hospital. </p>


        //             <button className="bg-white/10 text-white  px-6 py-3 rounded-full cursor-pointer playfair">Book an Appointment</button>
        //         </div>
        //     </section>

        <section className="">

            <div className="grid grid-cols-2 g-16 h-screen  items-center justify-center align-center mx-auto">

                <div className="w-full h-screen flex flex-col justify-center items-start gap-5 ml-3">
                    <h1 className="text-6xl font-bold my-8 ">Modern Healthcare <span className="text-blue-600 "> Tailored for you</span> </h1>
                    <p className="text-xl text-gray-500 ">Experience the next generation of medical care. We combine <br /> advanced technology with compassionate specialists to <br /> ensure your health is always in safe hands.</p>
                    <div className="flex gap-5 mt-5 px-18px">
                        <button className=" text-white px-4.5 py-2 border-none rounded-md bg-blue-600 flex items-center gap-2 cursor-pointer"><span>Make an Appointment</span> <HiArrowRight /></button>
                        <button className=" text-white px-4.5 py-2 border border-gray-700 cursor-pointer rounded-md">Our Departments</button>

                    </div>

                    <div className="flex flex-row flex-wrap items-center justify-center align-center gap-10 mt-10">



                        <AvatarGroup className="text-black">
                            <Avatar>
                                <AvatarImage src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="@shadcn" />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                            <Avatar>
                                <AvatarImage
                                    src="https://images.unsplash.com/photo-1619895862022-09114b41f16f?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                    alt="@maxleiter"
                                />
                                <AvatarFallback>LR</AvatarFallback>
                            </Avatar>
                            <Avatar>
                                <AvatarImage
                                    src="https://plus.unsplash.com/premium_photo-1689568126014-06fea9d5d341?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                    alt="@evilrabbit"
                                />
                                <AvatarFallback></AvatarFallback>
                            </Avatar>

                            <Avatar>
                                <AvatarImage
                                    src="https://images.unsplash.com/photo-1654110455429-cf322b40a906?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                    alt="@evilrabbit"
                                />
                                <AvatarFallback>ER</AvatarFallback>
                            </Avatar>
                            <AvatarGroupCount className="bg-black text-white">+2k</AvatarGroupCount>
                        </AvatarGroup>
                        <div>
                            <div className="flex text-orange-300"><FaStar /><FaStar /><FaStar /><FaStar /><FaStar /></div>
                            <p className="text-gray-500 text-sm">10,000+ Happy Patients</p>
                        </div>

                    </div>

                </div>

                <div className="w-full mt-10  ">

                    <img src="/assets/hospital-cover-picture.jpg" alt="" className=" rounded-[35px]  border border-gray-600 h-screen object-cover relative  w-[725px] mt-25"/>

                    <div className="absolute bottom-0 right-30 top-180">
                        <h2 className="text-[1rem] font-medium">"The medical team provided exceptional care when I needed it most."</h2>
                        <p className="text-sm text-gray-200">— Sarah Johnson, Patient</p>
                    </div>

                </div>

            </div>

        </section>

    )
}

export default Herosection