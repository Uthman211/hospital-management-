import { FiMapPin, FiPhone, FiMail } from "react-icons/fi";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

export default function Footer() {
    return (
        <section className="bg-[#020617] text-white pt-12 sm:pt-16 pb-8 mt-15">
            <div className="max-w-7xl mx-auto px-5 sm:px-6 md:px-10">
                <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
                    <div className="space-y-6 sm:col-span-2 lg:col-span-1">
                        <div className="flex gap-2 items-center">
                            <div className="flex items-center rounded-xl bg-blue-600 px-3 py-1 text-xl font-bold">
                                BC+
                            </div>
                            <h2 className="text-2xl sm:text-3xl font-bold">Blue Co</h2>
                        </div>
                        <p className="text-gray-400 leading-relaxed text-sm sm:text-base">
                            Providing world-class healthcare with a human touch. Our team of specialists is dedicated to your well-being 24/7.
                        </p>
                        <div className="space-y-3">
                            <p className="font-semibold text-sm sm:text-base">Subscribe to our newsletter</p>
                            <div className="flex flex-col gap-3 sm:flex-row">
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="w-full rounded-xl border border-white/10 bg-black px-4 py-3 text-white outline-none placeholder:text-gray-500 text-sm sm:text-base"
                                />
                                <button className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-500 text-sm sm:text-base shrink-0">
                                    Subscribe
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-5">
                        <h3 className="text-lg sm:text-xl font-bold uppercase tracking-[0.24em] text-white/90">Hospital</h3>
                        <ul className="space-y-3 text-gray-400 text-sm sm:text-base">
                            <li className="cursor-pointer hover:text-white transition">About Us</li>
                            <li className="cursor-pointer hover:text-white transition">Our Doctors</li>
                            <li className="cursor-pointer hover:text-white transition">Services</li>
                            <li className="cursor-pointer hover:text-white transition">Contact Us</li>
                        </ul>
                    </div>

                    <div className="space-y-5">
                        <h3 className="text-lg sm:text-xl font-bold uppercase tracking-[0.24em] text-white/90">Services</h3>
                        <ul className="space-y-3 text-gray-400 text-sm sm:text-base">
                            <li className="cursor-pointer hover:text-white transition">Emergency Care</li>
                            <li className="cursor-pointer hover:text-white transition">Cardiology</li>
                            <li className="cursor-pointer hover:text-white transition">Pediatrics</li>
                            <li className="cursor-pointer hover:text-white transition">Orthopedics</li>
                        </ul>
                    </div>

                    <div className="space-y-5">
                        <h3 className="text-lg sm:text-xl font-bold uppercase tracking-[0.24em] text-white/90">Get in touch</h3>
                        <div className="space-y-4 text-gray-400 text-sm sm:text-base">
                            <div className="flex items-start gap-3">
                                <span className="mt-1 rounded-full bg-white/5 p-2 text-blue-400 shrink-0">
                                    <FiMapPin />
                                </span>
                                <p>123 Healthcare Ave, Medical City, MC 54321</p>
                            </div>
                            <div className="flex items-start gap-3">
                                <span className="mt-1 rounded-full bg-white/5 p-2 text-blue-400 shrink-0">
                                    <FiPhone />
                                </span>
                                <p>+1 (234) 567-8900</p>
                            </div>
                            <div className="flex items-start gap-3">
                                <span className="mt-1 rounded-full bg-white/5 p-2 text-blue-400 shrink-0">
                                    <FiMail />
                                </span>
                                <p>contact@blueco.com</p>
                            </div>
                        </div>
                        <div className="flex gap-3 pt-2">
                            <a href="#" className="inline-flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-full bg-white/5 text-white transition hover:bg-blue-600">
                                <FaFacebookF />
                            </a>
                            <a href="#" className="inline-flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-full bg-white/5 text-white transition hover:bg-blue-600">
                                <FaTwitter />
                            </a>
                            <a href="#" className="inline-flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-full bg-white/5 text-white transition hover:bg-blue-600">
                                <FaInstagram />
                            </a>
                            <a href="#" className="inline-flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-full bg-white/5 text-white transition hover:bg-blue-600">
                                <FaLinkedinIn />
                            </a>
                        </div>
                    </div>
                </div>

                <div className="mt-12 border-t border-white/10 pt-6 text-xs sm:text-sm text-gray-500 sm:flex sm:items-center sm:justify-between">
                    <p>© 2026 Blue Co. All rights reserved.</p>
                    <div className="mt-4 flex flex-wrap items-center gap-4 sm:mt-0">
                        <span className="cursor-pointer hover:text-white transition">Privacy Policy</span>
                        <span className="cursor-pointer hover:text-white transition">Terms of Service</span>
                        <span className="cursor-pointer hover:text-white transition">Cookie Policy</span>
                    </div>
                </div>
            </div>
        </section>
    );
}