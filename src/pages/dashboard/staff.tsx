import DashboardLayout from "@/components/dashboardlayout";
import StaffTable from "@/components/staff-table";
import { BriefcaseMedical, Plus, SearchIcon } from "lucide-react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import staffMembers from "@/mocks/staff.json"

export default function StaffPage() {
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
          <button className="flex items-center rounded-md bg-blue-600 px-4 py-2 text-white">
            <Plus className="mr-2 h-4 w-4" />
            Add Staff
          </button>
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
            <h2 className="text-lg font-semibold text-black">Staff List</h2>
          </div>

          <StaffTable data={staffMembers} />
        </div>
      </section>
    </DashboardLayout>
  );
}
