import DashboardLayout from "@/components/dashboardlayout";
import WardTable from "@/components/ward-table";
import CreateWardModal from "@/components/create-ward-modal";
import { BedDouble, Plus, SearchIcon } from "lucide-react";
import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
} from "@/components/ui/input-group"
import { useQuery } from "@tanstack/react-query";
import type { wardType } from "@/types/ward-types";
import { hospitalWardServices } from "@/services/ward-services";

export default function WardsPage() {
    const { data: wards } = useQuery<wardType[]>({
        queryKey: ["wards"],
        queryFn: () => hospitalWardServices.getAllWards()
    })

    return (
        <DashboardLayout>
            <section className="">

                <div className="flex justify-between items-center w-[90%] mx-auto mt-10">

                    <div className="flex items-center gap-4 text-black">
                        <BedDouble className="h-7 w-7 text-blue-600" />
                        <div className="flex flex-col gap-1">
                            <h1 className="text-black text-3xl font-bold">Ward Management</h1>
                            <p>Manage hospital wards and bed capacity</p>
                        </div>
                    </div>

                    <div className="flex items-center bg-blue-500 text-white py-1 px-4 rounded-md cursor-pointer">
                        <Plus className="inline-block mr-2 text-white" />
                        <CreateWardModal />
                    </div>

                </div>

                <div className="w-[90%] mx-auto mt-10 text-black">
                    <InputGroup className="bg-white w-full">
                        <InputGroupInput placeholder="Search wards by name, type, or floor..." />
                        <InputGroupAddon>
                            <SearchIcon />
                        </InputGroupAddon>
                    </InputGroup>
                </div>

                <div>
                    <div className="mt-7 w-[90%] mx-auto bg-gray-50 rounded-2xl p-10 shadow-md">
                        <div className="mb-5">
                            <h1 className="text-black">Ward Records({wards?.length ?? 0})</h1>
                        </div>
                        <WardTable />
                    </div>
                </div>

            </section>
        </DashboardLayout>
    )
}