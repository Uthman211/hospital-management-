import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import type { wardType } from "@/types/ward-types";
import { hospitalWardServices } from "@/services/ward-services";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Eye } from "lucide-react"
import { RiDeleteBin6Line } from "react-icons/ri";
import { Link } from "react-router-dom";
import { toast } from "sonner";

const statusStyles: Record<string, string> = {
  "Active": "bg-green-100 text-green-700",
  "Inactive": "bg-gray-100 text-gray-700",
  "Under Maintenance": "bg-amber-100 text-amber-700",
}

export default function WardTable() {
  const queryClient = useQueryClient();

  const { data: wards, error, isLoading } = useQuery<wardType[]>({
    queryKey: ["wards"],
    queryFn: () => hospitalWardServices.getAllWards()
  })

  const { mutate: removeWard, isPending: isDeleting } = useMutation({
    mutationFn: (id: string) => hospitalWardServices.deleteWard(id),
    onSuccess: () => {
      toast.success("Ward deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["wards"] });
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message ?? "Unable to delete ward");
    }
  });

  const handleDelete = (id: string) => {
    const confirmed = window.confirm("Are you sure you want to delete this ward?");
    if (confirmed) {
      removeWard(id);
    }
  };

  if (isLoading) {
    return (
      <div>
        <h1>Wards Loading...</h1>
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
            <TableHead>Ward Name</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Floor</TableHead>
            <TableHead>Beds</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {wards?.map((ward) => (
            <TableRow key={ward._id} className="text-black">
              <TableCell className="font-medium text-gray-900">{ward.wardName}</TableCell>
              <TableCell>{ward.wardType}</TableCell>
              <TableCell>{ward.floor ?? "—"}</TableCell>
              <TableCell>{ward.occupiedBeds ?? 0} / {ward.totalBeds}</TableCell>
              <TableCell>
                <span className={`rounded-sm px-3 py-1 text-xs font-medium ${statusStyles[ward.status ?? ""] ?? "bg-slate-100 text-slate-700"}`}>
                  {ward.status}
                </span>
              </TableCell>
              <TableCell>
                <div className="flex gap-4">
                  <Link to={`/wards/${ward._id}`}>
                    <Eye className="text-blue-500 w-4" />
                  </Link>
                  <button
                    onClick={() => handleDelete(ward._id!)}
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