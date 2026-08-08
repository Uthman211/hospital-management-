import DashboardLayout from "@/components/dashboardlayout";
import StaffTable from "@/components/staff-table";
import { BriefcaseMedical, Plus, SearchIcon } from "lucide-react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import CreateStaffModal from "@/components/create-staff-modal";
import { useQuery } from "@tanstack/react-query";
import { hospitalStaffServices } from "@/services/staffServices";
import type { staffType } from "@/types/staff-type";

export default function StaffPage() {
  const { data: staff } = useQuery<staffType[]>({
    queryKey: ["staff"],
    queryFn: () => hospitalStaffServices.getAllStaff()
  })

  return (
    <DashboardLayout>
      <section className="space-y-6">
        <div className="mx-auto mt-6 flex w-[90%] items-center justify-between rounded-2xl bg-white p-6 shadow-sm">
          <div className="flex items-center gap-4 text-black">
            <BriefcaseMedical className="h-7 w-7 text-blue-600" />
            <div>
              <h1 className="text-2xl font-bold">Staff Management</h1>
              <p className="text-sm text-gray-600">Manage clinical and support staff</p>
            </div>
          </div>

          <div className="flex items-center bg-blue-500 text-white py-1 px-4 rounded-md cursor-pointer">
            <Plus className="inline-block mr-2 text-white" />
            <CreateStaffModal />
          </div>
        </div>

        <div className="mx-auto w-[90%] text-black">
          <InputGroup className="w-full bg-white">
            <InputGroupInput placeholder="Search staff by name, role, or department..." />
            <InputGroupAddon>
              <SearchIcon />
            </InputGroupAddon>
          </InputGroup>
        </div>

        <div className="mx-auto w-[90%] rounded-2xl bg-gray-50 p-6 shadow-md">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-black">Staff List ({staff?.length ?? 0})</h2>
          </div>

          <StaffTable />
        </div>
      </section>
    </DashboardLayout>
  );
}