import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Eye } from "lucide-react";

type appointments = {
    patientName: string;
    doctorName: string;
    department: string;
    doctorSpecialization: string;
    appointmentDate: string;
    appointmentType: string;
    status: string;
};

interface AppointmentViewProps {
    appointment: appointments;
}

export default function AppointmentView({ appointment }: AppointmentViewProps) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Eye className="text-blue-500 w-4 cursor-pointer" />
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Appointment details: {appointment.patientName}
                    </DialogTitle>
                    <DialogDescription asChild>
                        <div className="text-left space-y-1 mt-2">
                            <p><span className="font-medium">Doctor:</span> {appointment.doctorName}</p>
                            <p><span className="font-medium">Department:</span> {appointment.department}</p>
                            <p><span className="font-medium">Specialization:</span> {appointment.doctorSpecialization}</p>
                            <p><span className="font-medium">Date:</span> {appointment.appointmentDate}</p>
                            <p><span className="font-medium">Type:</span> {appointment.appointmentType}</p>
                            <p><span className="font-medium">Status:</span> {appointment.status}</p>
                        </div>
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}