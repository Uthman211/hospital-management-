import DashboardLayout from "@/components/dashboardlayout";
import Modal from "@/components/modal";
import { Plus, SearchIcon, User } from "lucide-react";
import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
} from "@/components/ui/input-group"
import doctors from "@/mocks/doctor.json"
import DoctorTable from "@/components/doctor-table";

export default function DoctorsPage() {

    return (
        <DashboardLayout>

            <section className="">

                <div className="flex  justify-between items-center w-[90%] mx-auto mt-10">

                    <div className="flex items-center gap-4  text-black">

                        <User className="h-7 w-7 text-blue-600" />
                        <div className="flex flex-col gap-1">
                            <h1 className="text-black text-3xl font-bold">Doctors Management</h1>
                            <p>Manage medical staff and their information</p>
                        </div>

                    </div>

                    <div className="flex items-center  bg-blue-500 text-white py-1 px-4 rounded-md cursor-pointer">
                        <Plus className="inline-block mr-2 text-white" />

                        <Modal btnText="Add Doctor" title="Add new Doctor" description="Fill in the doctor details below to add them to the hospital roster.">
                            <form className="flex flex-col gap-4">
                                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                    <div className="flex flex-col gap-2">
                                        <label className="text-sm font-medium text-gray-700">Full Name</label>
                                        <input className="h-10 rounded-md border border-gray-300 px-3 outline-none" placeholder="Dr. Adebayo Johnson" />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label className="text-sm font-medium text-gray-700">Email</label>
                                        <input className="h-10 rounded-md border border-gray-300 px-3 outline-none" placeholder="doctor@hospital.com" />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                    <div className="flex flex-col gap-2">
                                        <label className="text-sm font-medium text-gray-700">Phone</label>
                                        <input className="h-10 rounded-md border border-gray-300 px-3 outline-none" placeholder="0803 000 0000" />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label className="text-sm font-medium text-gray-700">Specialization</label>
                                        <input className="h-10 rounded-md border border-gray-300 px-3 outline-none" placeholder="Cardiology" />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                    <div className="flex flex-col gap-2">
                                        <label className="text-sm font-medium text-gray-700">Department</label>
                                        <input className="h-10 rounded-md border border-gray-300 px-3 outline-none" placeholder="Medical Department" />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label className="text-sm font-medium text-gray-700">Qualifications</label>
                                        <input className="h-10 rounded-md border border-gray-300 px-3 outline-none" placeholder="e.g MBBS, OPTOMETRY, etc" />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                    <div className="flex flex-col gap-2">
                                        <label className="text-sm font-medium text-gray-700">Gender</label>
                                        <select className="h-10 rounded-md border border-gray-300 px-3 outline-none">
                                            <option>Male</option>
                                            <option>Female</option>
                                            <option>Other</option>
                                        </select>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label className="text-sm font-medium text-gray-700">Status</label>
                                        <select className="h-10 rounded-md border border-gray-300 px-3 outline-none">
                                            <option>Available</option>
                                            <option>On Leave</option>
                                            <option>Busy</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="flex flex-col gap-2">
                                    <label className="text-sm font-medium text-gray-700">Address</label>
                                    <textarea className="min-h-24 rounded-md border border-gray-300 px-3 py-2 outline-none" placeholder="Hospital address or office location" />
                                </div>

                                <div className="flex justify-end gap-3">
                                    <button type="button" className="h-10 rounded-md border border-gray-300 px-4 text-sm font-medium text-gray-700">
                                        Cancel
                                    </button>
                                    <button type="submit" className="h-10 rounded-md bg-blue-600 px-4 text-sm font-medium text-white">
                                        Add Doctor
                                    </button>
                                </div>
                            </form>
                        </Modal>
                    </div>

                </div>

                <div className="w-[90%] mx-auto mt-10 text-black">
                    <InputGroup className="bg-white w-full">
                        <InputGroupInput placeholder="Search doctors by name, ID, or address..." />
                        <InputGroupAddon>
                            <SearchIcon />
                        </InputGroupAddon>
                    </InputGroup>

                </div>

                <div>


                    <div className="mt-7 w-[90%] mx-auto bg-gray-50 rounded-2xl p-10 shadow-md">

                        <div className="mb-5">
                            <h1 className="text-black">Medical Staffs({doctors.length})</h1>

                        </div>
                        <DoctorTable />

                    </div>
                </div>

            </section>

        </DashboardLayout>

    )
}