import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Edit } from "lucide-react";
import { RiDeleteBin6Line } from "react-icons/ri";


interface DiagnosisItem {
  id: string;
  patientName: string;
  testName: string;
  doctorName: string;
  result: string;
  status: string;
}

interface DiagnosisTableProps {
  data: DiagnosisItem[];
}

const statusStyles: Record<string, string> = {
  Critical: "bg-red-100 text-red-700",
  Pending: "bg-amber-100 text-amber-700",
  Normal: "bg-green-100 text-green-700",
};

export default function DiagnosisTable({ data }: DiagnosisTableProps) {
  return (
    <section>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Patient</TableHead>
            <TableHead>Test</TableHead>
            <TableHead>Doctor</TableHead>
            <TableHead>Result</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item) => (
            <TableRow key={item.id} className="text-black">
              <TableCell className="font-medium text-gray-900">{item.patientName}</TableCell>
              <TableCell>{item.testName}</TableCell>
              <TableCell>{item.doctorName}</TableCell>
              <TableCell>{item.result}</TableCell>
              <TableCell>
                <span className={`rounded-sm px-3 py-1 text-xs font-medium ${statusStyles[item.status] ?? "bg-slate-100 text-slate-700"}`}>
                  {item.status}
                </span>
              </TableCell>
              <TableCell>
                <div className="flex gap-4">
                  <Edit className="text-blue-500 w-4"/>
                  <RiDeleteBin6Line className="text-red-500 flex flex-col text-[20px]" />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </section>
  );
}