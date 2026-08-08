export default function Experience() {

    return (
        <section className="bg-blue-700 h-full rounded-[40px] sm:rounded-[60px] px-6 sm:px-16 lg:px-32 xl:px-50 py-16 sm:py-24 lg:py-32 xl:py-50 mt-20 w-[95%] sm:w-[98%] mx-auto">

            <div className="flex flex-col items-center justify-center gap-6 sm:gap-8 lg:gap-10">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-center leading-tight">
                    Ready to Experience <br className="hidden sm:block" />
                    World-Class Care?
                </h1>

                <p className="text-center text-base sm:text-xl lg:text-2xl text-gray-300">
                    Join thousands of patients who trust us with their life and health every single
                    day.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 w-full sm:w-auto">
                    <button className="bg-white border-none text-blue-500 px-6 sm:px-7 py-3 sm:py-4 font-bold text-base sm:text-xl cursor-pointer rounded-3xl w-full sm:w-auto">
                        Book Appointment Now
                    </button>

                    <button className="bg-gray-900 border-none text-white px-6 sm:px-7 py-3 sm:py-4 font-bold text-base sm:text-xl cursor-pointer rounded-3xl w-full sm:w-auto">
                        Get in touch
                    </button>
                </div>
            </div>

        </section>
    )
}