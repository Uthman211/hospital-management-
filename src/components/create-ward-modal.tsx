import Modal from "@/components/modal";
import FormInput from "@/components/home/form-input";
import { useMutation, useQueryClient } from "@tanstack/react-query";


import { useState } from "react";
import { toast } from "sonner";
import type { wardType } from "@/types/ward-types";
import { hospitalWardServices } from "@/services/ward-services";

const wardTypeOptions = ["General", "ICU", "Maternity", "Pediatric", "Surgical", "Emergency", "Isolation"];
const statusOptions = ["Active", "Inactive", "Under Maintenance"];

export default function CreateWardModal() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const queryClient = useQueryClient();

    const { mutate: addWard, isPending } = useMutation({
        mutationFn: (payload: Omit<wardType, "_id">) => hospitalWardServices.createWard(payload),
        onSuccess: () => {
            toast.success("Ward created successfully");
            queryClient.invalidateQueries({ queryKey: ["wards"] });
            setIsModalOpen(false);
        },
        onError: (error: any) => {
            toast.error(error?.response?.data?.message ?? "Unable to create ward");
        }
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        const payload: Omit<wardType, "_id"> = {
            wardName: (formData.get("wardName") as string)?.trim(),
            wardType: formData.get("wardType") as wardType["wardType"],
            floor: (formData.get("floor") as string)?.trim() || undefined,
            department: (formData.get("department") as string)?.trim() || undefined,
            totalBeds: Number(formData.get("totalBeds")),
            occupiedBeds: Number(formData.get("occupiedBeds")) || 0,
            nurseInCharge: (formData.get("nurseInCharge") as string)?.trim() || undefined,
            status: formData.get("status") as wardType["status"],
            description: (formData.get("description") as string)?.trim() || undefined,
        };

        addWard(payload);
    };

    return (
        <Modal
            btnText="Add Ward"
            title="Add new Ward"
            description="Fill in the ward details below."
            open={isModalOpen}
            onOpenChange={setIsModalOpen}
        >
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">

                <div className="grid grid-cols-2 gap-4">
                    <FormInput
                        type="text"
                        name="wardName"
                        label="Ward Name"
                        placeholder="e.g. Ward 3B"
                    />
                    <div className="flex flex-col gap-2">
                        <label htmlFor="wardType" className="font-semibold">Ward Type</label>
                        <select
                            id="wardType"
                            name="wardType"
                            defaultValue=""
                            required
                            className="w-full h-10 outline-none border-[0.5px] rounded-md border-slate-200 px-2"
                        >
                            <option value="" disabled>Select type</option>
                            {wardTypeOptions.map((t) => (
                                <option value={t} key={t}>{t}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <FormInput
                        type="text"
                        name="floor"
                        label="Floor"
                        placeholder="e.g. 3rd Floor"
                    />
                    <FormInput
                        type="text"
                        name="department"
                        label="Department"
                        placeholder="e.g. Cardiology"
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <FormInput
                        type="number"
                        name="totalBeds"
                        label="Total Beds"
                        placeholder="20"
                    />
                    <FormInput
                        type="number"
                        name="occupiedBeds"
                        label="Occupied Beds"
                        placeholder="0"
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <FormInput
                        type="text"
                        name="nurseInCharge"
                        label="Nurse In Charge"
                        placeholder="e.g. Grace Adamu"
                    />
                    <div className="flex flex-col gap-2">
                        <label htmlFor="status" className="font-semibold">Status</label>
                        <select
                            id="status"
                            name="status"
                            defaultValue="Active"
                            className="w-full h-10 outline-none border-[0.5px] rounded-md border-slate-200 px-2"
                        >
                            {statusOptions.map((s) => (
                                <option value={s} key={s}>{s}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="flex flex-col gap-2">
                    <label htmlFor="description" className="font-semibold">Description</label>
                    <textarea
                        id="description"
                        name="description"
                        rows={3}
                        placeholder="Additional notes about this ward..."
                        className="rounded-md outline-none border-[0.5px] border-slate-200 px-2 py-2 resize-none"
                    />
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
                            {isPending ? "Adding..." : "Add Ward"}
                        </button>
                    </div>
                </div>

            </form>
        </Modal>
    );
}