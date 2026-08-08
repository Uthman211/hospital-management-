import { Link } from "react-router-dom";

export default function Booking() {
  return (
    <section className="bg-blue-700 rounded-[30px] sm:rounded-[40px] md:rounded-[60px] px-6 py-16 sm:px-12 sm:py-20 md:px-20 md:py-28 lg:px-32 lg:py-32 mt-12 md:mt-20 w-[95%] sm:w-[98%] mx-auto">
      <div className="flex flex-col items-center justify-center gap-6 sm:gap-8 md:gap-10">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-center leading-tight text-white">
          Your Health Transformation Begins Today
        </h1>

        <p className="text-center text-base sm:text-lg md:text-2xl text-gray-300 max-w-2xl">
          Join our community of over 50,000 patients who have found
          excellence and peace of mind with our healthcare services.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 w-full sm:w-auto items-center">
          <Link to={"appointment"}><button className="bg-white border-none text-blue-500 px-6 py-3 sm:px-7 sm:py-4 font-bold text-base sm:text-xl cursor-pointer rounded-3xl w-full sm:w-auto">
            Book Now
          </button></Link>

          <button className="bg-gray-900 border-none text-white px-6 py-3 sm:px-7 sm:py-4 font-bold text-base sm:text-xl cursor-pointer rounded-3xl w-full sm:w-auto">
            Contact Info
          </button>
        </div>
      </div>
    </section>
  );
}