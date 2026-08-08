// import { HiArrowRight } from "react-icons/hi";
// import {
//     Avatar,
//     AvatarFallback,
//     AvatarGroup,
//     AvatarGroupCount,
//     AvatarImage,
// } from "@/components/ui/avatar"
// import { FaStar } from "react-icons/fa";


// function Herosection() {

//     return (

//         <section className="">

//             <div className="grid grid-cols-2 g-16 h-screen  items-center justify-center align-center mx-auto">

//                 <div className="w-full h-screen flex flex-col justify-center items-start gap-5 ml-3">
//                     <h1 className="text-6xl font-bold my-8 ">Modern Healthcare <span className="text-blue-600 "> Tailored for you</span> </h1>
//                     <p className="text-xl text-gray-500 ">Experience the next generation of medical care. We combine <br /> advanced technology with compassionate specialists to <br /> ensure your health is always in safe hands.</p>
//                     <div className="flex gap-5 mt-5 px-18px">
//                         <button className=" text-white px-4.5 py-2 border-none rounded-md bg-blue-600 flex items-center gap-2 cursor-pointer"><span>Make an Appointment</span> <HiArrowRight /></button>
//                         <button className=" text-white px-4.5 py-2 border border-gray-700 cursor-pointer rounded-md">Our Departments</button>

//                     </div>

//                     <div className="flex flex-row flex-wrap items-center justify-center align-center gap-10 mt-10">



//                         <AvatarGroup className="text-black">
//                             <Avatar>
//                                 <AvatarImage src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="@shadcn" />
//                                 <AvatarFallback>CN</AvatarFallback>
//                             </Avatar>
//                             <Avatar>
//                                 <AvatarImage
//                                     src="https://images.unsplash.com/photo-1619895862022-09114b41f16f?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
//                                     alt="@maxleiter"
//                                 />
//                                 <AvatarFallback>LR</AvatarFallback>
//                             </Avatar>
//                             <Avatar>
//                                 <AvatarImage
//                                     src="https://plus.unsplash.com/premium_photo-1689568126014-06fea9d5d341?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
//                                     alt="@evilrabbit"
//                                 />
//                                 <AvatarFallback></AvatarFallback>
//                             </Avatar>

//                             <Avatar>
//                                 <AvatarImage
//                                     src="https://images.unsplash.com/photo-1654110455429-cf322b40a906?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
//                                     alt="@evilrabbit"
//                                 />
//                                 <AvatarFallback>ER</AvatarFallback>
//                             </Avatar>
//                             <AvatarGroupCount className="bg-black text-white">+2k</AvatarGroupCount>
//                         </AvatarGroup>
//                         <div>
//                             <div className="flex text-orange-300"><FaStar /><FaStar /><FaStar /><FaStar /><FaStar /></div>
//                             <p className="text-gray-500 text-sm">10,000+ Happy Patients</p>
//                         </div>

//                     </div>

//                 </div>

//                 <div className="w-full mt-10  ">

//                     <img src="/assets/hospital-cover-picture.jpg" alt="" className=" rounded-[35px]  border border-gray-600 h-screen object-cover relative  w-[725px] mt-25"/>

//                     <div className="absolute bottom-0 right-30 top-180">
//                         <h2 className="text-[1rem] font-medium">"The medical team provided exceptional care when I needed it most."</h2>
//                         <p className="text-sm text-gray-200">— Sarah Johnson, Patient</p>
//                     </div>

//                 </div>

//             </div>

//         </section>

//     )
// }

// export default Herosection

import { HiArrowRight } from "react-icons/hi";
import {
    Avatar,
    AvatarFallback,
    AvatarGroup,
    AvatarGroupCount,
    AvatarImage,
} from "@/components/ui/avatar"
import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";

function Herosection() {
    return (
        <section>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 min-h-screen items-center px-20 lg:px-3 pt-32 pb-16 lg:pt-40 lg:pb-10">

                {/* Left: text content */}
                <div className="w-full flex flex-col justify-center items-start gap-5">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold my-4 lg:my-8 animate-fade-in-up delay-1">
                        Modern Healthcare <span className="text-blue-600">Tailored for you</span>
                    </h1>

                    <p className="text-lg md:text-xl text-gray-500 animate-fade-in-up delay-2">
                        Experience the next generation of medical care. We combine advanced
                        technology with compassionate specialists to ensure your health is
                        always in safe hands.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 mt-5 w-full sm:w-auto animate-fade-in-up delay-3">
                      <Link to={"appointment"}>   <button className="text-white px-5 py-2.5 border-none rounded-md bg-blue-600 hover:bg-blue-700 transition-colors duration-300 flex items-center justify-center gap-2 cursor-pointer">
                           <span>Make an Appointment</span> <HiArrowRight />
                        </button> </Link>
                        <Link to={"services"}>  <button className="text-white px-5 py-2.5 border border-gray-700 hover:border-gray-400 transition-colors duration-300 cursor-pointer rounded-md">
                            Our Departments
                        </button> </Link>
                    </div>

                    <div className="flex flex-wrap items-center gap-6 sm:gap-10 mt-10 animate-fade-in-up delay-4">
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
                            <div className="flex text-orange-300">
                                <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
                            </div>
                            <p className="text-gray-500 text-sm">10,000+ Happy Patients</p>
                        </div>
                    </div>
                </div>

                {/* Right: image with testimonial overlay */}
                <div className="relative w-full h-[300px] sm:h-[420px] lg:h-[85vh] animate-fade-in delay-2">
                    <img
                        src="/assets/hospital-cover-picture.jpg"
                        alt="Hospital"
                        className="rounded-[35px] border border-gray-600 h-full w-full object-cover"
                    />

                    <div className="absolute bottom-6 left-6 right-6 sm:left-auto sm:right-8 sm:max-w-xs bg-black/40 backdrop-blur-sm rounded-2xl p-4">
                        <h2 className="text-sm sm:text-[1rem] font-medium text-white">
                            "The medical team provided exceptional care when I needed it most."
                        </h2>
                        <p className="text-xs sm:text-sm text-gray-200 mt-1">— John Faith, Patient</p>
                    </div>
                </div>

            </div>
        </section>
    );
}

export default Herosection;