import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { hospitalPatientServices } from "@/services/patientServices";
import type { patientType } from "@/types/patient-type";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Eye } from "lucide-react"
import { RiDeleteBin6Line } from "react-icons/ri";
import { Link } from "react-router-dom";
import { toast } from "sonner";

const activeStyle: Record<string, string> = {
  "Active": "bg-green-500/10 border border-green-500/20 text-green-900",
  "Inactive": "bg-gray-500/10 border border-gray-500/20 text-gray-900"
}

export default function PatientTable() {
  const queryClient = useQueryClient();

  const { data: patients, error, isLoading } = useQuery<patientType[]>({
    queryKey: ["patients"],
    queryFn: () => hospitalPatientServices.getAllPatients()
  })

  const { mutate: removePatient, isPending: isDeleting } = useMutation({
    mutationFn: (id: string) => hospitalPatientServices.deletePatient(id),
    onSuccess: () => {
      toast.success("Patient deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["patients"] });
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message ?? "Unable to delete patient");
    }
  });

  const handleDelete = (patient: patientType) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete ${patient.firstName} ${patient.lastName}? This cannot be undone.`
    );
    if (confirmed) {
      removePatient(patient._id!);
    }
  };

  if (isLoading) {
    return (
      <div>
        <h1>Patients Loading...</h1>
      </div>
    )
  }

  if (error) {
    return (
      <div>
        <h1>{error.message}</h1>
      </div>
    )
  }

  return (
    <section>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Address</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Gender</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {patients?.map((patient) => (
            <TableRow className="text-black" key={patient._id}>
              <TableCell>{patient.firstName} {patient.lastName}</TableCell>
              <TableCell>{patient.address?.street}</TableCell>
              <TableCell>{patient.phone}</TableCell>
              <TableCell>{patient.gender}</TableCell>
              <TableCell>
                <span className={`px-3 py-1 rounded-sm ${activeStyle[patient.status ?? ""] ?? ""}`}>{patient.status}</span>
              </TableCell>
              <TableCell>
                <div className="flex gap-4">
                  <Link to={`/patients/${patient._id}`}>
                    <Eye className="text-blue-500 w-4" />
                  </Link>
                  <button
                    onClick={() => handleDelete(patient)}
                    disabled={isDeleting}
                    className="disabled:opacity-50"
                  >
                    <RiDeleteBin6Line className="text-red-500 flex flex-col text-[20px]" />
                  </button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </section>
  )
}