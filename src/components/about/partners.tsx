import { CiGlobe, CiStethoscope } from "react-icons/ci";
import { PiMedalLight } from "react-icons/pi";

export default function Partners(){
return(
    <section className="w-[95%] mx-auto  h-full  mt-70">
                <div className="flex gap-10 items-center justify-center flex-wrap my-5 bg-gray-900 p-8 rounded-[35px]">
                    <div className="flex flex-col gap-2 w-[20%] text-center"> 
                        <h1 className="text-2xl font-bold text-gray-500">Our Accreditations</h1>
                        <p className="text-gray-400 font-bold">Global Partners</p>
                    </div>
                    <div className="w-px h-22 bg-gray-600" />
                    <div className="flex flex-col gap-2 w-[20%] text-center">
                        <CiGlobe className="text-blue-600 w-60 h-7" />
                        
                        <p className="text-gray-500">JCI CERTIFIED</p>
                    </div>
                    <div className="w-px h-22 bg-gray-600" />
                    <div className="flex flex-col gap-2 w-[20%] text-center">
                        <PiMedalLight  className="text-blue-600 w-60 h-7" />
                       
                        <p className="text-gray-500">WHO STANDARD</p>
                    </div>
                    <div className="w-px h-22 bg-gray-600" />
                    <div className="flex flex-col gap-2 w-[20%] text-center">
                        <CiStethoscope className="text-blue-600 w-60 h-7" />
                        <p className="text-gray-500">ISO 9001:2015</p>
                    </div>
                </div>
    
                
    
            </section>
)

}