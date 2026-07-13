import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import doctors from "@/mocks/doctor.json"
import { Edit, Eye } from "lucide-react"
import { RiDeleteBin6Line } from "react-icons/ri";
import { Link } from "react-router-dom";

const availableStyle: Record<string, string> = {
    "Available": "bg-green-500/10 border border-green-500/20 text-green-900",
    "Inactive": "bg-red-500/10 border border-red-500/20 text-red-900",
    "On Leave": "bg-amber-100 border text-amber-700"
}

export default function DoctorTable() {
  return (
    <section>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Speciality</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {doctors.map((doctor, i) => (
            <TableRow className="text-black" key={i}>
              <TableCell>{doctor.firstName} {doctor.lastName}</TableCell>
              <TableCell>{doctor.department}</TableCell>
              <TableCell>{doctor.phone}</TableCell>
              <TableCell>
                <span className={`px-3 py-1 rounded-sm ${availableStyle[doctor.status] ?? ""}`}>{doctor.status}</span>
              </TableCell>
              <TableCell>
                <div className="flex gap-4">
                  <Link to={`/doctors/${i}`}>
                    <Eye className="text-blue-500 w-4" />
                  </Link>
                  <Edit className="text-blue-500 w-4"/>
                  <RiDeleteBin6Line className="text-red-500 flex flex-col text-[20px]" />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </section>
  )
}