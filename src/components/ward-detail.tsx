import { useParams, Link, useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/dashboardlayout";
import DetailRow from "@/components/detail-row";
import { ArrowLeft } from "lucide-react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { hospitalWardServices } from "@/services/ward-services";
import EditWardModal from "@/components/edit-ward-modal";
import { toast } from "sonner";

const statusStyles: Record<string, string> = {
  "Active": "bg-green-100 text-green-700",
  "Inactive": "bg-gray-100 text-gray-700",
  "Under Maintenance": "bg-amber-100 text-amber-700",
};

export default function WardDetailPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const { data: ward, isLoading, error } = useQuery({
        queryKey: ["ward", id],
        queryFn: () => hospitalWardServices.getWardById(id!),
        enabled: !!id,
    });

    const { mutate: removeWard, isPending: isDeleting } = useMutation({
        mutationFn: () => hospitalWardServices.deleteWard(id!),
        onSuccess: () => {
            toast.success("Ward deleted successfully");
            queryClient.invalidateQueries({ queryKey: ["wards"] });
            navigate("/wards");
        },
        onError: (error: any) => {
            toast.error(error?.response?.data?.message ?? "Unable to delete ward");
        }
    });

    const handleDelete = () => {
        if (!ward) return;
        const confirmed = window.confirm(
            `Are you sure you want to delete ${ward.wardName}? This cannot be undone.`
        );
        if (confirmed) {
            removeWard();
        }
    };

    if (isLoading) {
        return (
            <DashboardLayout>
                <section className="w-[90%] mx-auto mt-10 text-black">
                    <p>Loading ward...</p>
                </section>
            </DashboardLayout>
        );
    }

    if (error || !ward) {
        return (
            <DashboardLayout>
                <section className="w-[90%] mx-auto mt-10 text-black">
                    <p>{error?.message}</p>
                    <Link to="/wards" className="text-blue-500">Back to Wards</Link>
                </section>
            </DashboardLayout>
        );
    }

    const availableBeds = ward.totalBeds - (ward.occupiedBeds ?? 0);

    return (
        <DashboardLayout>
            <section className="w-[90%] mx-auto mt-10 mb-16 text-black">

                <Link to="/wards" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 mb-6">
                    <ArrowLeft className="w-4 h-4" />
                    Back to Wards
                </Link>

                {/* Header / identity card */}
                <div className="bg-gray-50 rounded-2xl p-8 shadow-md flex items-center justify-between mb-6">
                    <div>
                        <h1 className="text-2xl font-bold">{ward.wardName}</h1>
                        <p className="text-sm text-gray-500">{ward.wardType} · {ward.floor ?? "Floor N/A"}</p>
                        <span className={`inline-block mt-2 rounded-sm px-3 py-1 text-xs font-medium ${statusStyles[ward.status ?? ""] ?? ""}`}>
                            {ward.status}
                        </span>
                    </div>
                    <div className="flex gap-3">
                        <EditWardModal ward={ward} />
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="bg-gray-50 rounded-2xl p-6 shadow-md">
                        <h2 className="font-semibold mb-3">Ward Info</h2>
                        <DetailRow label="Ward Name" value={ward.wardName} />
                        <DetailRow label="Type" value={ward.wardType} />
                        <DetailRow label="Floor" value={ward.floor ?? "N/A"} />
                        <DetailRow label="Department" value={ward.department ?? "N/A"} />
                        <DetailRow label="Nurse In Charge" value={ward.nurseInCharge ?? "N/A"} />
                    </div>
                    <div className="bg-gray-50 rounded-2xl p-6 shadow-md">
                        <h2 className="font-semibold mb-3">Bed Capacity</h2>
                        <DetailRow label="Total Beds" value={String(ward.totalBeds)} />
                        <DetailRow label="Occupied Beds" value={String(ward.occupiedBeds ?? 0)} />
                        <DetailRow label="Available Beds" value={String(availableBeds)} />
                    </div>
                </div>

                {ward.description && (
                    <div className="bg-gray-50 rounded-2xl p-6 shadow-md">
                        <h2 className="font-semibold mb-3">Description</h2>
                        <p className="text-sm text-gray-600">{ward.description}</p>
                    </div>
                )}

            </section>
        </DashboardLayout>
    )
}