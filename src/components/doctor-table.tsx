import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { hospitalDoctorServices } from "@/services/doctorServices";
import type { doctorType } from "@/types/doctor-type";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Eye } from "lucide-react"
import { RiDeleteBin6Line } from "react-icons/ri";
import { Link } from "react-router-dom";
import EditDoctorModal from "@/components/edit-doctor-modal";
import { toast } from "sonner";

const availableStyle: Record<string, string> = {
    "Available": "bg-green-500/10 border border-green-500/20 text-green-900",
    "Inactive": "bg-red-500/10 border border-red-500/20 text-red-900",
    "On Leave": "bg-amber-100 border text-amber-700",
    "Scheduled": "bg-blue-500/10 border border-blue-500/20 text-blue-900",
}

export default function DoctorTable() {
  const queryClient = useQueryClient();

  const { data: doctors, error, isLoading } = useQuery<doctorType[]>({
        queryKey: ["doctors"],
        queryFn: () => hospitalDoctorServices.getAllDoctors()
    })

  const { mutate: removeDoctor, isPending: isDeleting } = useMutation({
    mutationFn: (id: string) => hospitalDoctorServices.deleteDoctor(id),
    onSuccess: () => {
      toast.success("Doctor deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["doctors"] });
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message ?? "Unable to delete doctor");
    }
  });

  const handleDelete = (doctor: doctorType) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete Dr. ${doctor.firstName} ${doctor.lastName}? This cannot be undone.`
    );
    if (confirmed) {
      removeDoctor(doctor._id!);
    }
  };

    if (isLoading) {
        return (
            <div>
                <h1>doctors Loading...</h1>
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
            <TableHead>Speciality</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {doctors?.map((doctor) => (
            <TableRow className="text-black" key={doctor._id}>
              <TableCell>{doctor.firstName} {doctor.lastName}</TableCell>
              <TableCell>{doctor.department}</TableCell>
              <TableCell>{doctor.phone}</TableCell>
              <TableCell>
                <span className={`px-3 py-1 rounded-sm ${availableStyle[doctor.status ?? ""] ?? ""}`}>{doctor.status}</span>
              </TableCell>
              <TableCell>
                <div className="flex gap-4 items-center">
                  <Link to={`/doctors/${doctor._id}`}>
                    <Eye className="text-blue-500 w-4" />
                  </Link>
                  <EditDoctorModal doctor={doctor} />
                  <button
                    onClick={() => handleDelete(doctor)}
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