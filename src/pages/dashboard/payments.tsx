import DashboardLayout from "@/components/dashboardlayout";
import { Plus, SearchIcon, Wallet } from "lucide-react";
import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
} from "@/components/ui/input-group"
import PaymentTable from "@/components/payment-table";
import CreatePaymentModal from "@/components/create-payment-modal";
import { useQuery } from "@tanstack/react-query";
import { hospitalPaymentServices } from "@/services/paymentServices";
import type { paymentType } from "@/types/payment-types";


export default function PaymentsPage() {

    const { data: payments } = useQuery<paymentType[]>({
        queryKey: ["payments"],
        queryFn: () => hospitalPaymentServices.getAllPayments()
    })

    return (
        <DashboardLayout>

            <section className="">

                <div className="flex justify-between items-center w-[90%] mx-auto mt-10">

                    <div className="flex items-center gap-4 text-black">
                        <Wallet className="h-7 w-7 text-blue-600" />
                        <div className="flex flex-col gap-1">
                            <h1 className="text-black text-3xl font-bold">Payments Management</h1>
                            <p>Track and manage patient payments in Naira ₦</p>
                        </div>
                    </div>

                    <div className="flex items-center bg-blue-500 text-white py-1 px-4 rounded-md cursor-pointer">
                        <Plus className="inline-block mr-2 text-white" />
                        <CreatePaymentModal />
                    </div>

                </div>

                <div className="w-[90%] mx-auto mt-10 text-black">
                    <InputGroup className="bg-white w-full">
                        <InputGroupInput placeholder="Search payments by patient, invoice, or description..." />
                        <InputGroupAddon>
                            <SearchIcon />
                        </InputGroupAddon>
                    </InputGroup>
                </div>

                <div>
                    <div className="mt-7 w-[90%] mx-auto bg-gray-50 rounded-2xl p-10 shadow-md">
                        <div className="mb-5">
                            <h1 className="text-black">Payment Records({payments?.length ?? 0})</h1>
                        </div>
                        <PaymentTable />
                    </div>
                </div>

            </section>

        </DashboardLayout>
    )
}