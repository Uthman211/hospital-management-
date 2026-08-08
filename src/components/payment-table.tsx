import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { hospitalPaymentServices } from "@/services/paymentServices";

import type { patientType } from "@/types/patient-type";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { RiDeleteBin6Line } from "react-icons/ri";
import EditPaymentModal from "@/components/edit-payment-modal";
import { toast } from "sonner";
import type { paymentType } from "@/types/payment-types";

const PaidStyle: Record<string, string> = {
    "Paid": "bg-green-500/10 border border-green-500/20 text-green-900",
    "Pending": "bg-yellow-500/10 border border-yellow-500/20 text-yellow-900",
    "Failed": "bg-red-500/10 border border-red-500/20 text-red-900",
    "Refunded": "bg-slate-500/10 border border-slate-500/20 text-slate-900",
}

export default function PaymentTable() {
    const queryClient = useQueryClient();

    const { data: payments, error, isLoading } = useQuery<paymentType[]>({
        queryKey: ["payments"],
        queryFn: () => hospitalPaymentServices.getAllPayments()
    })

    const { mutate: removePayment, isPending: isDeleting } = useMutation({
        mutationFn: (id: string) => hospitalPaymentServices.deletePayment(id),
        onSuccess: () => {
            toast.success("Payment deleted successfully");
            queryClient.invalidateQueries({ queryKey: ["payments"] });
        },
        onError: (error: any) => {
            toast.error(error?.response?.data?.message ?? "Unable to delete payment");
        }
    });

    const handleDelete = (id: string) => {
        const confirmed = window.confirm("Are you sure you want to delete this payment record?");
        if (confirmed) {
            removePayment(id);
        }
    };

    if (isLoading) {
        return (
            <div>
                <h1>Payments Loading...</h1>
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
                        <TableHead>Date</TableHead>
                        <TableHead>Patient</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {payments?.map((payment) => {
                        const patient = payment.patient as patientType;

                        return (
                            <TableRow className="text-black" key={payment._id}>
                                <TableCell>{payment.paymentDate ? new Date(payment.paymentDate).toLocaleDateString() : "—"}</TableCell>
                                <TableCell>{patient?.firstName} {patient?.lastName}</TableCell>
                                <TableCell>₦{Intl.NumberFormat().format(payment.amount)}</TableCell>
                                <TableCell>{payment.description}</TableCell>
                                <TableCell>
                                    <span className={`px-3 py-1 rounded-sm ${PaidStyle[payment.paymentStatus ?? ""] ?? ""}`}>{payment.paymentStatus}</span>
                                </TableCell>
                                <TableCell>
                                    <div className="flex gap-4 items-center">
                                        <EditPaymentModal payment={payment} />
                                        <button
                                            onClick={() => handleDelete(payment._id!)}
                                            disabled={isDeleting}
                                            className="disabled:opacity-50"
                                        >
                                            <RiDeleteBin6Line className="text-red-500 w-4" />
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