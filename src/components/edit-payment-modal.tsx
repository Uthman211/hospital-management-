import Modal from "@/components/modal";
import FormInput from "@/components/home/form-input";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { hospitalPaymentServices } from "@/services/paymentServices";
import { hospitalPatientServices } from "@/services/patientServices";
import type { patientType } from "@/types/patient-type";

import { useState } from "react";
import { toast } from "sonner";
import { Edit } from "lucide-react";
import type { paymentType } from "@/types/payment-types";

const paymentMethodOptions = ["Cash", "Card", "Bank Transfer", "POS", "Insurance"];
const paymentStatusOptions = ["Paid", "Pending", "Failed", "Refunded"];

interface EditPaymentModalProps {
    payment: paymentType;
}

export default function EditPaymentModal({ payment }: EditPaymentModalProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const queryClient = useQueryClient();

    const currentPatient = payment.patient as patientType;

    const { data: patients } = useQuery<patientType[]>({
        queryKey: ["patients"],
        queryFn: () => hospitalPatientServices.getAllPatients()
    });

    const { mutate: editPayment, isPending } = useMutation({
        mutationFn: (payload: Partial<paymentType>) =>
            hospitalPaymentServices.updatePayment(payment._id!, payload),
        onSuccess: () => {
            toast.success("Payment updated successfully");
            queryClient.invalidateQueries({ queryKey: ["payments"] });
            setIsModalOpen(false);
        },
        onError: (error: any) => {
            toast.error(error?.response?.data?.message ?? "Unable to update payment");
        }
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        const payload: Partial<paymentType> = {
            patient: formData.get("patient") as string,
            description: (formData.get("description") as string)?.trim(),
            amount: Number(formData.get("amount")),
            paymentMethod: formData.get("paymentMethod") as paymentType["paymentMethod"],
            paymentStatus: formData.get("paymentStatus") as paymentType["paymentStatus"],
        };

        editPayment(payload);
    };

    return (
        <Modal
            title="Edit Payment"
            description="Update the payment details below."
            open={isModalOpen}
            onOpenChange={setIsModalOpen}
            trigger={
                <button className="flex items-center gap-2 text-green-500 cursor-pointer">
                    <Edit className="w-4 h-4" />
                </button>
            }
        >
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">

                <div className="flex flex-col gap-2">
                    <label className="font-semibold text-gray-500">Invoice Number</label>
                    <p className="h-10 flex items-center px-2 rounded-md bg-gray-100 text-gray-600 text-sm">
                        {payment.invoiceNumber}
                    </p>
                </div>

                <div className="flex flex-col gap-2">
                    <label htmlFor="patient" className="font-semibold">Patient</label>
                    <select
                        id="patient"
                        name="patient"
                        defaultValue={currentPatient?._id}
                        required
                        className="w-full h-10 outline-none border-[0.5px] rounded-md border-slate-200 px-2"
                    >
                        {patients?.map((p) => (
                            <option value={p._id} key={p._id}>{p.firstName} {p.lastName}</option>
                        ))}
                    </select>
                </div>

                <FormInput
                    type="text"
                    name="description"
                    label="Description"
                    defaultValue={payment.description}
                />

                <FormInput
                    type="number"
                    name="amount"
                    label="Amount (₦)"
                    defaultValue={String(payment.amount)}
                />

                <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-2">
                        <label htmlFor="paymentMethod" className="font-semibold">Payment Method</label>
                        <select
                            id="paymentMethod"
                            name="paymentMethod"
                            defaultValue={payment.paymentMethod}
                            required
                            className="w-full h-10 outline-none border-[0.5px] rounded-md border-slate-200 px-2"
                        >
                            {paymentMethodOptions.map((m) => (
                                <option value={m} key={m}>{m}</option>
                            ))}
                        </select>
                    </div>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="paymentStatus" className="font-semibold">Status</label>
                        <select
                            id="paymentStatus"
                            name="paymentStatus"
                            defaultValue={payment.paymentStatus}
                            className="w-full h-10 outline-none border-[0.5px] rounded-md border-slate-200 px-2"
                        >
                            {paymentStatusOptions.map((s) => (
                                <option value={s} key={s}>{s}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="flex justify-end">
                    <div className="grid grid-cols-2 gap-4">
                        <button
                            type="button"
                            onClick={() => setIsModalOpen(false)}
                            className="bg-white w-full h-10 rounded-md text-black cursor-pointer border border-gray-400"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            disabled={isPending}
                            className="bg-black w-full h-10 rounded-md text-white cursor-pointer disabled:opacity-50"
                        >
                            {isPending ? "Saving..." : "Save Changes"}
                        </button>
                    </div>
                </div>

            </form>
        </Modal>
    );
}