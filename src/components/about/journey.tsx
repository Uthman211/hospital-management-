const milestones = [
    { year: "1985", event: "HealthCare Plus founded with a focus on community wellness." },
    { year: "1995", event: "Expanded to 200 beds and added advanced ICU facilities." },
    { year: "2005", event: "Launched our first state-of-the-art diagnostic center." },
    { year: "2012", event: "Achieved international JCI accreditation for excellence." },
    { year: "2018", event: "Introduced AI-powered surgical assistance and diagnostics." },
    { year: "2023", event: "Ranked #1 for patient satisfaction in the region." },
];

export default function Journey() {
    return (
        <section className="h-auto py-16 sm:py-20 px-5">
            <div className="flex flex-col text-center justify-center items-center gap-4 sm:gap-6 mb-10 sm:mb-16">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold">Our Journey Through Time</h1>
                <p className="text-base sm:text-xl lg:text-2xl text-gray-400">Key milestones that defined our excellence.</p>
            </div>

            <div className="flex w-full sm:w-[85%] lg:w-[80%] mx-auto">
                <div className="w-0.5 self-stretch border border-blue-600 bg-blue-600 shrink-0"></div>

                <div className="flex flex-col gap-10 sm:gap-12 lg:gap-15 py-2 pl-6 sm:pl-10 w-full">
                    {milestones.map(({ year, event }) => (
                        <div key={year} className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-10">
                            <div className="flex gap-2 items-center">
                                <div className="w-6 h-6 sm:w-7 sm:h-6 rounded-full border-2 border-blue-600 bg-black flex justify-center items-center shrink-0 -ml-9 sm:-ml-[3.25rem]">
                                    <div className="w-2 h-2 rounded-full bg-blue-600"></div>
                                </div>
                                <h1 className="text-2xl sm:text-3xl lg:text-4xl italic font-bold text-blue-500 sm:text-blue-950">
                                    {year}
                                </h1>
                            </div>

                            <p className="text-base sm:text-xl lg:text-2xl font-bold">{event}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}