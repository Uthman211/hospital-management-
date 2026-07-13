import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Eye } from "lucide-react";
import DetailRow from "./detail-row";

const activeStyle: Record<string, string> = {
    "Active": "bg-green-500/10 border border-green-500/20 text-green-900",
    "Inactive": "bg-gray-500/10 border border-gray-500/20 text-gray-900"
};

type Patient = {
    firstName: string;
    lastName: string;
    address: { street: string; [key: string]: any };
    phone: string;
    age: number;
    gender: string;
    status: string;
};

interface PatientViewProps {
    patient: Patient;
}

export default function PatientView({ patient }: PatientViewProps) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Eye className="text-blue-500 w-4 cursor-pointer" />
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader className="border-b pb-3">
                    <DialogTitle className="text-lg font-semibold text-gray-900">
                        Patient details
                    </DialogTitle>
                </DialogHeader>

                <div className="space-y-1 pt-2">
                    <DetailRow label="Name" value={`${patient.firstName} ${patient.lastName}`} />
                    <DetailRow label="Address" value={patient.address.street} />
                    <DetailRow label="Phone" value={patient.phone} />
                    <DetailRow label="Age" value={patient.age} />
                    <DetailRow label="Gender" value={patient.gender} />
                    <div className="flex items-center justify-between py-2">
                        <span className="text-sm text-gray-500">Status</span>
                        <span className={`rounded-sm px-3 py-1 text-xs font-medium ${activeStyle[patient.status] ?? ""}`}>
                            {patient.status}
                        </span>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}