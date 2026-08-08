import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { hospitalTreatmentServices } from "@/services/treatmentServices";
import type { treatmentType } from "@/types/treatment-type";
import type { patientType } from "@/types/patient-type";
import type { doctorType } from "@/types/doctor-type";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Eye } from "lucide-react"
import { RiDeleteBin6Line } from "react-icons/ri";
import { Link } from "react-router-dom";
import { toast } from "sonner";

const statusStyles: Record<string, string> = {
  Critical: "bg-red-100 text-red-700",
  Pending: "bg-amber-100 text-amber-700",
  Normal: "bg-green-100 text-green-700",
  Resolved: "bg-blue-100 text-blue-700",
}

export default function DiagnosisTable() {
  const queryClient = useQueryClient();

  const { data: treatments, error, isLoading } = useQuery<treatmentType[]>({
    queryKey: ["treatments"],
    queryFn: () => hospitalTreatmentServices.getAllTreatments()
  })

  const { mutate: removeTreatment, isPending: isDeleting } = useMutation({
    mutationFn: (id: string) => hospitalTreatmentServices.deleteTreatment(id),
    onSuccess: () => {
      toast.success("Treatment deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["treatments"] });
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message ?? "Unable to delete treatment");
    }
  });

  const handleDelete = (id: string) => {
    const confirmed = window.confirm("Are you sure you want to delete this treatment record?");
    if (confirmed) {
      removeTreatment(id);
    }
  };

  if (isLoading) {
    return (
      <div>
        <h1>Diagnoses Loading...</h1>
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
            <TableHead>Patient</TableHead>
            <TableHead>Test</TableHead>
            <TableHead>Doctor</TableHead>
            <TableHead>Result</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {treatments?.map((item) => {
            const patient = item.patients as patientType
            const doctor = item.doctors as doctorType

            return (
              <TableRow key={item._id} className="text-black">
                <TableCell className="font-medium text-gray-900">{patient?.firstName} {patient?.lastName}</TableCell>
                <TableCell>{item.testName ?? item.diagnosis}</TableCell>
                <TableCell>{doctor?.firstName} {doctor?.lastName}</TableCell>
                <TableCell>{item.result ?? "—"}</TableCell>
                <TableCell>
                  <span className={`rounded-sm px-3 py-1 text-xs font-medium ${statusStyles[item.status ?? ""] ?? "bg-slate-100 text-slate-700"}`}>
                    {item.status}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex gap-4">
                    <Link to={`/treatment/${item._id}`}>
                      <Eye className="text-blue-500 w-4" />
                    </Link>
                    <button
                      onClick={() => handleDelete(item._id!)}
                      disabled={isDeleting}
                      className="disabled:opacity-50"
                    >
                      <RiDeleteBin6Line className="text-red-500 flex flex-col text-[20px]" />
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </section>
  )
}