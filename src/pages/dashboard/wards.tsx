import DashboardLayout from "@/components/dashboardlayout";
import WardTable from "@/components/ward-table";
import { BedDouble, SearchIcon } from "lucide-react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";


const wards = [
  {
    id: "W-001",
    name: "Ward A1",
    type: "General",
    capacity: 12,
    occupied: 8,
    nurse: "Martha Ibekwe",
    status: "Available",
  },
  {
    id: "W-002",
    name: "Ward B2",
    type: "ICU",
    capacity: 6,
    occupied: 6,
    nurse: "Daniel Okafor",
    status: "Occupied",
  },
  {
    id: "W-003",
    name: "Ward C3",
    type: "Pediatrics",
    capacity: 10,
    occupied: 2,
    nurse: "Hannah Musa",
    status: "Maintenance",
  },
];

export default function WardsPage() {
  return (
    <DashboardLayout>
      <section className="space-y-6">
        <div className="mx-auto mt-6 flex w-[90%] items-center rounded-2xl bg-white p-6 shadow-sm">
          <div className="flex items-center gap-4 text-black">
            <BedDouble className="h-7 w-7 text-blue-600" />
            <div>
              <h1 className="text-2xl font-bold">Ward Management</h1>
              <p className="text-sm text-gray-600">Monitor room occupancy and ward availability</p>
            </div>
          </div>
        </div>

        <div className="mx-auto w-[90%] text-black">
          <InputGroup className="w-full bg-white">
            <InputGroupInput placeholder="Search wards by name, type, or nurse..." />
            <InputGroupAddon>
              <SearchIcon />
            </InputGroupAddon>
          </InputGroup>
        </div>

        <div className="mx-auto w-[90%] rounded-2xl bg-gray-50 p-6 shadow-md">
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-black">Ward Overview</h2>
          </div>

          <WardTable data={wards} />
        </div>
      </section>
    </DashboardLayout>
  );
}
