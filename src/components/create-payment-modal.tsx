import Modal from "@/components/modal";
import FormInput from "@/components/home/form-input";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { hospitalPaymentServices } from "@/services/paymentServices";
import { hospitalPatientServices } from "@/services/patientServices";
import type { patientType } from "@/types/patient-type";

import { useState } from "react";
import { toast } from "sonner";
import type { paymentType } from "@/types/payment-types";

const paymentMethodOptions = ["Cash", "Card", "Bank Transfer", "POS", "Insurance"];
const paymentStatusOptions = ["Paid", "Pending", "Failed", "Refunded"];

function generateInvoiceNumber() {
    const timestamp = Date.now().toString(36).toUpperCase();
    const random = Math.random().toString(36).slice(2, 6).toUpperCase();
    return `INV-${timestamp}-${random}`;
}

export default function CreatePaymentModal() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const queryClient = useQueryClient();

    const { data: patients } = useQuery<patientType[]>({
        queryKey: ["patients"],
        queryFn: () => hospitalPatientServices.getAllPatients()
    });

    const { mutate: addPayment, isPending } = useMutation({
        mutationFn: (payload: Omit<paymentType, "_id">) => hospitalPaymentServices.createPayment(payload),
        onSuccess: () => {
            toast.success("Payment recorded successfully");
            queryClient.invalidateQueries({ queryKey: ["payments"] });
            setIsModalOpen(false);
        },
        onError: (error: any) => {
            toast.error(error?.response?.data?.message ?? "Unable to record payment");
        }
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        const payload: Omit<paymentType, "_id"> = {
            patient: formData.get("patient") as string,
            description: (formData.get("description") as string)?.trim(),
            amount: Number(formData.get("amount")),
            paymentMethod: formData.get("paymentMethod") as paymentType["paymentMethod"],
            paymentStatus: formData.get("paymentStatus") as paymentType["paymentStatus"],
            invoiceNumber: generateInvoiceNumber(),
        };

        addPayment(payload);
    };

    return (
        <Modal
            btnText="Record Payment"
            title="Record new Payment"
            description="Fill in the payment details below."
            open={isModalOpen}
            onOpenChange={setIsModalOpen}
        >
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">

                <div className="flex flex-col gap-2">
                    <label htmlFor="patient" className="font-semibold">Patient</label>
                    <select
                        id="patient"
                        name="patient"
                        defaultValue=""
                        required
                        className="w-full h-10 outline-none border-[0.5px] rounded-md border-slate-200 px-2"
                    >
                        <option value="" disabled>Select patient</option>
                        {patients?.map((p) => (
                            <option value={p._id} key={p._id}>{p.firstName} {p.lastName}</option>
                        ))}
                    </select>
                </div>

                <FormInput
                    type="text"
                    name="description"
                    label="Description"
                    placeholder="e.g. Consultation fee"
                />

                <FormInput
                    type="number"
                    name="amount"
                    label="Amount (₦)"
                    placeholder="5000"
                />

                <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-2">
                        <label htmlFor="paymentMethod" className="font-semibold">Payment Method</label>
                        <select
                            id="paymentMethod"
                            name="paymentMethod"
                            defaultValue=""
                            required
                            className="w-full h-10 outline-none border-[0.5px] rounded-md border-slate-200 px-2"
                        >
                            <option value="" disabled>Select method</option>
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
                            defaultValue="Pending"
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
                            {isPending ? "Recording..." : "Record Payment"}
                        </button>
                    </div>
                </div>

            </form>
        </Modal>
    );
}