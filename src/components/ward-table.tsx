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


interface WardItem {
  id: string;
  name: string;
  type: string;
  capacity: number;
  occupied: number;
  nurse: string;
  status: string;
}

interface WardTableProps {
  data: WardItem[];
}

const statusStyle: Record<string, string> = {
  Available: "bg-green-500/10 text-green-900",
  Occupied: "bg-amber-500/10 text-amber-900",
  Maintenance: "bg-slate-500/10 text-slate-700",
};

export default function WardTable({ data }: WardTableProps) {
  return (
    <section>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Ward</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Occupancy</TableHead>
            <TableHead>Assigned Nurse</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((ward) => (
            <TableRow key={ward.id} className="text-black">
              <TableCell className="font-medium text-gray-900">{ward.name}</TableCell>
              <TableCell>{ward.type}</TableCell>
              <TableCell>{ward.occupied}/{ward.capacity}</TableCell>
              <TableCell>{ward.nurse}</TableCell>
              <TableCell>
                <span className={`rounded-sm px-3 py-1 text-xs font-medium ${statusStyle[ward.status] ?? "bg-slate-100 text-slate-700"}`}>
                  {ward.status}
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