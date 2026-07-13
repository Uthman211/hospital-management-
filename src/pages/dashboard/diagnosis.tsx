import DashboardLayout from "@/components/dashboardlayout";
import DiagnosisTable from "@/components/diagnosis-table";
import { Activity, SearchIcon } from "lucide-react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";

const diagnoses = [
  {
    id: "DX-001",
    patientName: "Adaeze Okafor",
    testName: "CBC",
    doctorName: "Dr. Ifeoma Nnamdi",
    result: "Within normal range",
    status: "Normal",
  },
  {
    id: "DX-002",
    patientName: "Chinedu Eze",
    testName: "MRI Scan",
    doctorName: "Dr. Kelechi Obi",
    result: "Minor inflammation detected",
    status: "Pending",
  },
  {
    id: "DX-003",
    patientName: "Fatima Bello",
    testName: "Blood Glucose",
    doctorName: "Dr. Bayo Ogunleye",
    result: "High reading requires review",
    status: "Critical",
  },
];

export default function DiagnosisPage() {
  return (
    <DashboardLayout>
      <section className="space-y-6">
        <div className="mx-auto mt-6 flex w-[90%] items-center rounded-2xl bg-white p-6 shadow-sm">
          <div className="flex items-center gap-4 text-black">
            <Activity className="h-7 w-7 text-blue-600" />
            <div>
              <h1 className="text-2xl font-bold">Diagnosis Records</h1>
              <p className="text-sm text-gray-600">Track patient test results and medical findings</p>
            </div>
          </div>
        </div>

        <div className="mx-auto w-[90%] text-black">
          <InputGroup className="w-full bg-white">
            <InputGroupInput placeholder="Search diagnosis by patient, test, or doctor..." />
            <InputGroupAddon>
              <SearchIcon />
            </InputGroupAddon>
          </InputGroup>
        </div>

        <div className="mx-auto w-[90%] rounded-2xl bg-gray-50 p-6 shadow-md">
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-black">Lab Results</h2>
          </div>

          <DiagnosisTable data={diagnoses} />
        </div>
      </section>
    </DashboardLayout>
  );
}
