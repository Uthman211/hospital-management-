export default function Story() {
    return (
        <section className="flex flex-col items-center min-h-[60vh] sm:h-[80vh] justify-center text-center px-5 py-16 sm:py-0">
            <button className="text-blue-400 font-bold text-sm sm:text-md border-gray-700 bg-gray-900 cursor-pointer border px-3 py-1 rounded-xl animate-fade-in-up delay-1">
                OUR STORY
            </button>

            <div>
                <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold my-5 leading-tight animate-fade-in-up delay-2">
                    Dedicated to Your <br className="hidden sm:block" />
                    <span className="text-blue-600 italic">Health and Well-being</span>
                </h1>
                <p className="text-gray-400 text-base sm:text-xl text-center max-w-3xl mx-auto animate-fade-in-up delay-3">
                    For over 35 years, HealthCare Plus has been at the forefront of medical innovation, providing
                    compassionate care and advanced treatments to thousands of families.
                </p>
            </div>
        </section>
    )
}