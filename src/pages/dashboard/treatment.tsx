import DashboardLayout from "@/components/dashboardlayout";
import FormInput from "@/components/home/form-input";

import Modal from "@/components/modal";
import statuses from "@/mocks/blog-post.json"
import gender from "@/mocks/blog-post.json"
import { Plus, SearchIcon, Stethoscope } from "lucide-react";

import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
} from "@/components/ui/input-group"
import TreatmentTable from "@/components/treatment-table";
import treatments from "@/mocks/doctor.json"
export default function TreatmentPage() {


    return (
        <DashboardLayout>

            <section className="">

                <div className="flex  justify-between items-center w-[90%] mx-auto mt-10">

                    <div className="flex items-center gap-4  text-black">

                        <Stethoscope className="h-7 w-7 text-blue-600" />
                        <div className="flex flex-col gap-1">
                            <h1 className="text-black text-3xl font-bold">Treatment Management</h1>
                            <p>Track and manage patient treatments</p>
                        </div>

                    </div>

                    <div className="flex items-center  bg-blue-500 text-white py-1 px-4 rounded-md cursor-pointer">
                        <Plus className="inline-block mr-2 text-white" />

                        <Modal btnText="Record Treatment" title="" description="">



                            <form action="" className="flex flex-col gap-4">


                                <div className="grid grid-cols-2 gap-4">

                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="">Category</label>
                                        <div className="w-max">
                                            <h1 className="text-gray-600">P04</h1>
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="">Status</label>
                                        <select name="" id="" className="w-full h-10 outline-none border-[0.5px] rounded-md border-slate-200">
                                            {
                                                statuses.map((status) => (
                                                    <option value={status.status} key={status.status}> {status.status}
                                                    </option>
                                                ))
                                            }
                                        </select>
                                    </div>
                                </div>
                                <FormInput
                                    type="text"
                                    label="Full Name"
                                    placeholder=""
                                    className=""

                                />

                                <FormInput
                                    type="text"
                                    label="Address"
                                    placeholder=""
                                    className=""

                                />

                                <FormInput
                                    type="text"
                                    label="Contact"
                                    placeholder=""
                                    className=""
                                />

                                <div className="grid grid-cols-2 gap-4">
                                    <FormInput
                                        type="text"
                                        label="Contact"
                                        placeholder=""
                                        className=""
                                    />
                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="">Gender</label>
                                        <select name="" id="" className="w-full h-10 outline-none border-[0.5px] rounded-md border-slate-200">
                                            {
                                                gender.map((gender) => (
                                                    <option value={gender.gender} key={gender.gender}> {gender.gender}
                                                    </option>
                                                ))
                                            }
                                        </select>
                                    </div>


                                </div>

                                <div className="flex justify-end">
                                    <div></div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <input type="submit" value={'Cancel'} className="bg-white w-full h-10 rounded-md text-black cursor-pointer border border-gray-400" />

                                        <input type="submit" value={'Add Patient'} className="bg-black w-25 h-10 rounded-md text-white cursor-pointer" />
                                    </div>
                                </div>

                            </form>




                        </Modal>
                    </div>



                </div>
                <div className="w-[90%] mx-auto mt-10 text-black">
                    <InputGroup className="bg-white w-full">
                        <InputGroupInput placeholder="Search treatment by patient, diagnosis, or date..." />
                        <InputGroupAddon>
                            <SearchIcon />
                        </InputGroupAddon>
                    </InputGroup>

                </div>


                <div>


                    <div className="mt-7 w-[90%] mx-auto bg-gray-50 rounded-2xl p-10 shadow-md">

                        <div className="mb-5">
                            <h1 className="text-black">Treatment Record({treatments.length})</h1>

                        </div>
                        <TreatmentTable />

                    </div>
                </div>


            </section>

        </DashboardLayout>

    )
}