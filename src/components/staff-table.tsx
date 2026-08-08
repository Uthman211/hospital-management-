import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { hospitalStaffServices } from "@/services/staffServices";
import type { staffType } from "@/types/staff-type";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Eye } from "lucide-react"
import { RiDeleteBin6Line } from "react-icons/ri";
import { Link } from "react-router-dom";
import EditStaffModal from "@/components/edit-staff-modal";
import { toast } from "sonner";

const statusStyles: Record<string, string> = {
  "Active": "bg-green-100 text-green-700",
  "Inactive": "bg-red-100 text-red-700",
  "On Leave": "bg-amber-100 text-amber-700",
}

export default function StaffTable() {
  const queryClient = useQueryClient();

  const { data: staff, error, isLoading } = useQuery<staffType[]>({
    queryKey: ["staff"],
    queryFn: () => hospitalStaffServices.getAllStaff()
  })

  const { mutate: removeStaff, isPending: isDeleting } = useMutation({
    mutationFn: (id: string) => hospitalStaffServices.deleteStaff(id),
    onSuccess: () => {
      toast.success("Staff member deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["staff"] });
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message ?? "Unable to delete staff member");
    }
  });

  const handleDelete = (id: string) => {
    const confirmed = window.confirm("Are you sure you want to delete this staff member?");
    if (confirmed) {
      removeStaff(id);
    }
  };

  if (isLoading) {
    return (
      <div>
        <h1>Staff Loading...</h1>
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
            <TableHead>Role</TableHead>
            <TableHead>Department</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {staff?.map((member) => (
            <TableRow key={member._id} className="text-black">
              <TableCell className="font-medium text-gray-900">{member.name}</TableCell>
              <TableCell>{member.role}</TableCell>
              <TableCell>{member.department}</TableCell>
              <TableCell>{member.phone}</TableCell>
              <TableCell>
                <span className={`rounded-sm px-3 py-1 text-xs font-medium ${statusStyles[member.status ?? ""] ?? "bg-slate-100 text-slate-700"}`}>
                  {member.status}
                </span>
              </TableCell>
              <TableCell>
                <div className="flex gap-4 items-center">
                  <Link to={`/staff/${member._id}`}>
                    <Eye className="text-blue-500 w-4" />
                  </Link>
                  <EditStaffModal staff={member} />
                  <button
                    onClick={() => handleDelete(member._id!)}
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