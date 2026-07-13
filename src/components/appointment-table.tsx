import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import appointments from "@/mocks/appointment.json"
import { Edit, Eye } from "lucide-react"
import { RiDeleteBin6Line } from "react-icons/ri";
import { Link } from "react-router-dom";

const ScheduledStyle: Record<string, string> = {
    "Completed": "bg-green-500/10 border border-green-500/20 text-green-900",
    "Scheduled": "bg-blue-500/10 border border-gray-500/20 text-blue-900",
    "Pending": "bg-amber-500/10 text-amber-600",
    "In Progress": "bg-purple-500/10 text-purple-600"
}

export default function AppointmentTable() {
    return (
        <section>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Time</TableHead>
                        <TableHead>Patient</TableHead>
                        <TableHead>Doctor</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {appointments.map((appointment, i) => (
                        <TableRow className="text-black" key={i}>
                            <TableCell>{appointment.appointmentDate}</TableCell>
                            <TableCell>{appointment.appointmentTime}</TableCell>
                            <TableCell>{appointment.patientName}</TableCell>
                            <TableCell>{appointment.doctorName}</TableCell>
                            <TableCell>{appointment.appointmentType}</TableCell>
                            <TableCell>
                                <span className={`px-3 py-1 rounded-sm ${ScheduledStyle[appointment.status] ?? ""}`}>{appointment.status}</span>
                            </TableCell>
                            <TableCell>
                                <div className="flex gap-4">
                                    <Link to={`/appointments/${i}`}>
                                        <Eye className="text-blue-500 w-4" />
                                    </Link>
                                    <Edit className="text-green-500 w-4" />
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