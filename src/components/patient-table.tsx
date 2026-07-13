import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import patients from "@/mocks/patient.json"
import { Eye } from "lucide-react"
import { RiDeleteBin6Line } from "react-icons/ri";
import { Link } from "react-router-dom";

const activeStyle: Record<string, string> = {
  "Active": "bg-green-500/10 border border-green-500/20 text-green-900",
  "Inactive": "bg-gray-500/10 border border-gray-500/20 text-gray-900"
}

export default function PatientTable() {
  return (
    <section>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Address</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Age</TableHead>
            <TableHead>Gender</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {patients.map((patient, i) => (
            <TableRow className="text-black" key={i}>
              <TableCell>{patient.firstName} {patient.lastName}</TableCell>
              <TableCell>{patient.address.street}</TableCell>
              <TableCell>{patient.phone}</TableCell>
              <TableCell>{patient.age}</TableCell>
              <TableCell>{patient.gender}</TableCell>
              <TableCell>
                <span className={`px-3 py-1 rounded-sm ${activeStyle[patient.status] ?? ""}`}>{patient.status}</span>
              </TableCell>
              <TableCell>
                <div className="flex gap-4">
                  <Link to={`/patients/${patient.id}`}>
                    <Eye className="text-blue-500 w-4" />
                  </Link>
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