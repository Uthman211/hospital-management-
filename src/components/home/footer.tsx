import { FiMapPin, FiPhone, FiMail } from "react-icons/fi";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

export default function Footer() {
    return (
        <section className="bg-[#020617] text-white pt-16 pb-8 mt-15">
            <div className="max-w-7xl mx-auto px-6 md:px-10">
                <div className="grid gap-10 md:grid-cols-4">
                    <div className="space-y-6">
                        <div className="flex gap-2 items-center">
                            <div className="flex rounded-xl bg-blue-600 px-3 item py-1 text-xl font-bold">
                                BC+
                            </div>
                            <h2 className="text-3xl font-bold">Blue Co</h2>
                        </div>
                        <p className="text-gray-400 leading-relaxed">
                            Providing world-class healthcare with a human touch. Our team of specialists is dedicated to your well-being 24/7.
                        </p>
                        <div className="space-y-3">
                            <p className="font-semibold">Subscribe to our newsletter</p>
                            <div className="flex flex-col gap-3 sm:flex-row">
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="w-full rounded-xl border border-white/10 bg-black px-4 py-3 text-white outline-none placeholder:text-gray-500"
                                />
                                <button className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-500">
                                    Subscribe
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-5">
                        <h3 className="text-xl font-bold uppercase  text-white/90">Hospital</h3>
                        <ul className="space-y-3 text-gray-400">
                            <li className="cursor-pointer">About Us</li>
                            <li className="cursor-pointer">Our Doctors</li>
                            <li className="cursor-pointer">Services</li>
                            <li className="cursor-pointer">Contact Us</li>
                        </ul>
                    </div>

                    <div className="space-y-5">
                        <h3 className="text-xl font-bold uppercase tracking-[0.24em] text-white/90">Services</h3>
                        <ul className="space-y-3 text-gray-400">
                            <li className="cursor-pointer">Emergency Care</li>
                            <li className="cursor-pointer">Cardiology</li>
                            <li className="cursor-pointer">Pediatrics</li>
                            <li className="cursor-pointer">Orthopedics</li>
                        </ul>
                    </div>

                    <div className="space-y-5">
                        <h3 className="text-xl font-bold uppercase tracking-[0.24em] text-white/90">Get in touch</h3>
                        <div className="space-y-4 text-gray-400">
                            <div className="flex items-start gap-3">
                                <span className="mt-1 rounded-full bg-white/5 p-2 text-blue-400">
                                    <FiMapPin />
                                </span>
                                <div>
                                    <p>123 Healthcare Ave, Medical City, MC 54321</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <span className="mt-1 rounded-full bg-white/5 p-2 text-blue-400">
                                    <FiPhone />
                                </span>
                                <div>
                                    <p>+1 (234) 567-8900</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <span className="mt-1 rounded-full bg-white/5 p-2 text-blue-400">
                                    <FiMail />
                                </span>
                                <div>
                                    <p>contact@blueco.com</p>
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-3 pt-2">
                            <a href="#" className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/5 text-white transition hover:bg-blue-600">
                                <FaFacebookF />
                            </a>
                            <a href="#" className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/5 text-white transition hover:bg-blue-600">
                                <FaTwitter />
                            </a>
                            <a href="#" className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/5 text-white transition hover:bg-blue-600">
                                <FaInstagram />
                            </a>
                            <a href="" className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/5 text-white transition hover:bg-blue-600">
                                <FaLinkedinIn />
                            </a>
                        </div>
                    </div>
                </div>

                <div className="mt-12 border-t border-white/10 pt-6 text-sm text-gray-500 sm:flex sm:items-center sm:justify-between">
                    <p>© 2026 Blue Co. All rights reserved.</p>
                    <div className="mt-4 flex flex-wrap items-center gap-4 sm:mt-0">
                        <span className="cursor-pointer">Privacy Policy</span>
                        <span className="cursor-pointer">Terms of Service</span>
                        <span className="cursor-pointer">Cookie Policy</span>
                    </div>
                </div>
            </div>
        </section>
    );
}
