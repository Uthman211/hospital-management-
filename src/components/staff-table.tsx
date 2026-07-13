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


interface StaffMember {
  name: string;
    role: string;
    department: string;
    email: string;
    phone: string;
    gender: string;
    status: string;
    shift: string;
    treatmentId: string
}

interface StaffTableProps {
  data: StaffMember[];
}

const statusStyles: Record<string, string> = {
  "Active": "bg-green-100 text-green-700",
  "Inactive": "bg-red-100 text-red-700",
  "On Leave": "bg-amber-100 text-amber-700",
};

export default function StaffTable({ data }: StaffTableProps) {
  return (
    <section>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Department</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Status</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.slice(0, 5).map((staff) => (
            <TableRow key={staff.treatmentId} className="text-black">
              <TableCell className="font-medium text-gray-900">{staff.name}</TableCell>
              <TableCell>{staff.role}</TableCell>
              <TableCell>{staff.department}</TableCell>
              <TableCell>{staff.phone}</TableCell>
              <TableCell>
                <span className={`rounded-sm px-3 py-1 text-xs font-medium ${statusStyles[staff.status] ?? "bg-slate-100 text-slate-700"}`}>
                  {staff.status}
                </span>
              </TableCell>
              <TableCell>
              <div className="flex gap-4">
                <Edit className="text-blue-500 w-4" />
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
