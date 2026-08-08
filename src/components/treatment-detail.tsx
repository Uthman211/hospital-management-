import { useParams, Link, useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/dashboardlayout";
import DetailRow from "@/components/detail-row";
import { ArrowLeft } from "lucide-react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { hospitalTreatmentServices } from "@/services/treatmentServices";
import type { patientType } from "@/types/patient-type";
import type { doctorType } from "@/types/doctor-type";
import EditTreatmentModal from "@/components/edit-treatment-modal";
import { toast } from "sonner";

const statusStyles: Record<string, string> = {
  Critical: "bg-red-100 text-red-700",
  Pending: "bg-amber-100 text-amber-700",
  Normal: "bg-green-100 text-green-700",
  Resolved: "bg-blue-100 text-blue-700",
};

export default function TreatmentDetailPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const { data: treatment, isLoading, error } = useQuery({
        queryKey: ["treatment", id],
        queryFn: () => hospitalTreatmentServices.getTreatmentById(id!),
        enabled: !!id,
    });

    const { mutate: removeTreatment, isPending: isDeleting } = useMutation({
        mutationFn: () => hospitalTreatmentServices.deleteTreatment(id!),
        onSuccess: () => {
            toast.success("Treatment deleted successfully");
            queryClient.invalidateQueries({ queryKey: ["treatments"] });
            navigate("/treatment");
        },
        onError: (error: any) => {
            toast.error(error?.response?.data?.message ?? "Unable to delete treatment");
        }
    });

    const handleDelete = () => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this treatment record? This cannot be undone."
        );
        if (confirmed) {
            removeTreatment();
        }
    };

    if (isLoading) {
        return (
            <DashboardLayout>
                <section className="w-[90%] mx-auto mt-10 text-black">
                    <p>Loading treatment...</p>
                </section>
            </DashboardLayout>
        );
    }

    if (error || !treatment) {
        return (
            <DashboardLayout>
                <section className="w-[90%] mx-auto mt-10 text-black">
                    <p>{error?.message}</p>
                    <Link to="/treatment" className="text-blue-500">Back to Treatment</Link>
                </section>
            </DashboardLayout>
        );
    }

    const patient = treatment.patients as patientType
    const doctor = treatment.doctors as doctorType

    return (
        <DashboardLayout>
            <section className="w-[90%] mx-auto mt-10 mb-16 text-black">

                <Link to="/treatment" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 mb-6">
                    <ArrowLeft className="w-4 h-4" />
                    Back to Treatment
                </Link>

                {/* Header / identity card */}
                <div className="bg-gray-50 rounded-2xl p-8 shadow-md flex items-center justify-between mb-6">
                    <div>
                        <h1 className="text-2xl font-bold">{treatment.diagnosis}</h1>
                        <p className="text-sm text-gray-500">
                            {patient?.firstName} {patient?.lastName} · {treatment.date ? new Date(treatment.date).toLocaleDateString() : ""}
                        </p>
                        <span className={`inline-block mt-2 rounded-sm px-3 py-1 text-xs font-medium ${statusStyles[treatment.status ?? ""] ?? ""}`}>
                            {treatment.status}
                        </span>
                    </div>
                    <div className="flex gap-3">
                        <EditTreatmentModal treatment={treatment} />
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

                {/* Patient & Doctor */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="bg-gray-50 rounded-2xl p-6 shadow-md">
                        <div className="flex items-center justify-between mb-3">
                            <h2 className="font-semibold">Patient</h2>
                            {patient?._id && (
                                <Link to={`/patients/${patient._id}`} className="text-xs text-blue-600 hover:underline">
                                    View patient
                                </Link>
                            )}
                        </div>
                        <DetailRow label="Name" value={`${patient?.firstName ?? ""} ${patient?.lastName ?? ""}`} />
                        <DetailRow label="Phone" value={patient?.phone} />
                    </div>
                    <div className="bg-gray-50 rounded-2xl p-6 shadow-md">
                        <div className="flex items-center justify-between mb-3">
                            <h2 className="font-semibold">Doctor</h2>
                            {doctor?._id && (
                                <Link to={`/doctors/${doctor._id}`} className="text-xs text-blue-600 hover:underline">
                                    View doctor
                                </Link>
                            )}
                        </div>
                        <DetailRow label="Name" value={`${doctor?.firstName ?? ""} ${doctor?.lastName ?? ""}`} />
                        <DetailRow label="Department" value={doctor?.department} />
                    </div>
                </div>

                {/* Treatment details */}
                <div className="bg-gray-50 rounded-2xl p-6 shadow-md">
                    <h2 className="font-semibold mb-3">Treatment Details</h2>
                    <DetailRow label="Diagnosis" value={treatment.diagnosis} />
                    <DetailRow label="Treatment" value={treatment.treatment} />
                    <DetailRow label="Test Name" value={treatment.testName ?? "N/A"} />
                    <DetailRow label="Result" value={treatment.result ?? "N/A"} />
                    <DetailRow label="Notes" value={treatment.notes ?? "N/A"} />
                    <DetailRow label="Date" value={treatment.date ? new Date(treatment.date).toLocaleDateString() : "N/A"} />
                </div>

            </section>
        </DashboardLayout>
    )
}