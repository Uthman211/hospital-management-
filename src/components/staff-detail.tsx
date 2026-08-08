import { useParams, Link, useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/dashboardlayout";
import DetailRow from "@/components/detail-row";
import { ArrowLeft } from "lucide-react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { hospitalStaffServices } from "@/services/staffServices";
import EditStaffModal from "@/components/edit-staff-modal";
import { toast } from "sonner";

const statusStyles: Record<string, string> = {
  "Active": "bg-green-100 text-green-700",
  "Inactive": "bg-red-100 text-red-700",
  "On Leave": "bg-amber-100 text-amber-700",
};

export default function StaffDetailPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const { data: staff, isLoading, error } = useQuery({
        queryKey: ["staff", id],
        queryFn: () => hospitalStaffServices.getStaffById(id!),
        enabled: !!id,
    });

    const { mutate: removeStaff, isPending: isDeleting } = useMutation({
        mutationFn: () => hospitalStaffServices.deleteStaff(id!),
        onSuccess: () => {
            toast.success("Staff member deleted successfully");
            queryClient.invalidateQueries({ queryKey: ["staff"] });
            navigate("/staff");
        },
        onError: (error: any) => {
            toast.error(error?.response?.data?.message ?? "Unable to delete staff member");
        }
    });

    const handleDelete = () => {
        if (!staff) return;
        const confirmed = window.confirm(
            `Are you sure you want to delete ${staff.name}? This cannot be undone.`
        );
        if (confirmed) {
            removeStaff();
        }
    };

    if (isLoading) {
        return (
            <DashboardLayout>
                <section className="w-[90%] mx-auto mt-10 text-black">
                    <p>Loading staff member...</p>
                </section>
            </DashboardLayout>
        );
    }

    if (error || !staff) {
        return (
            <DashboardLayout>
                <section className="w-[90%] mx-auto mt-10 text-black">
                    <p>{error?.message}</p>
                    <Link to="/staff" className="text-blue-500">Back to Staff</Link>
                </section>
            </DashboardLayout>
        );
    }

    return (
        <DashboardLayout>
            <section className="w-[90%] mx-auto mt-10 mb-16 text-black">

                <Link to="/staff" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 mb-6">
                    <ArrowLeft className="w-4 h-4" />
                    Back to Staff
                </Link>

                {/* Header / identity card */}
                <div className="bg-gray-50 rounded-2xl p-8 shadow-md flex items-center justify-between mb-6">
                    <div className="flex items-center gap-4">
                        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-100 text-blue-700 text-xl font-semibold">
                            {staff.name?.charAt(0)}
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold">{staff.name}</h1>
                            <p className="text-sm text-gray-500">{staff.role} · {staff.department}</p>
                        </div>
                        <span className={`ml-4 rounded-sm px-3 py-1 text-xs font-medium ${statusStyles[staff.status ?? ""] ?? ""}`}>
                            {staff.status}
                        </span>
                    </div>
                    <div className="flex gap-3">
                        <EditStaffModal staff={staff} />
                        <button
                            onClick={handleDelete}
                            disabled={isDeleting}
                            className="flex items-center gap-2 border border-gray-300 rounded-md px-4 py-2 text-sm disabled:opacity-50"
                        >
                            <RiDeleteBin6Line className="w-4 h-4 text-red-500" />
                            {isDeleting ? "Deleting..." : "Delete"}
                        </button>
                    </div>
                </div>

                {/* Info grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-gray-50 rounded-2xl p-6 shadow-md">
                        <h2 className="font-semibold mb-3">Employment Info</h2>
                        <DetailRow label="Full Name" value={staff.name} />
                        <DetailRow label="Role" value={staff.role} />
                        <DetailRow label="Department" value={staff.department} />
                        <DetailRow label="Shift" value={staff.shift} />
                        <DetailRow label="Gender" value={staff.gender} />
                    </div>
                    <div className="bg-gray-50 rounded-2xl p-6 shadow-md">
                        <h2 className="font-semibold mb-3">Contact Info</h2>
                        <DetailRow label="Phone" value={staff.phone} />
                        <DetailRow label="Email" value={staff.email} />
                    </div>
                </div>

            </section>
        </DashboardLayout>
    )
}