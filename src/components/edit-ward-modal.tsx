import Modal from "@/components/modal";
import FormInput from "@/components/home/form-input";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { wardType } from "@/types/ward-types";
import { hospitalWardServices } from "@/services/ward-services";
import { useState } from "react";
import { toast } from "sonner";
import { Edit } from "lucide-react";

const wardTypeOptions = ["General", "ICU", "Maternity", "Pediatric", "Surgical", "Emergency", "Isolation"];
const statusOptions = ["Active", "Inactive", "Under Maintenance"];

interface EditWardModalProps {
    ward: wardType;
}

export default function EditWardModal({ ward }: EditWardModalProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const queryClient = useQueryClient();

    const { mutate: editWard, isPending } = useMutation({
        mutationFn: (payload: Partial<wardType>) =>
            hospitalWardServices.updateWard(ward._id!, payload),
        onSuccess: () => {
            toast.success("Ward updated successfully");
            queryClient.invalidateQueries({ queryKey: ["wards"] });
            queryClient.invalidateQueries({ queryKey: ["ward", ward._id] });
            setIsModalOpen(false);
        },
        onError: (error: any) => {
            toast.error(error?.response?.data?.message ?? "Unable to update ward");
        }
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        const payload: Partial<wardType> = {
            wardName: (formData.get("wardName") as string)?.trim(),
            wardType: formData.get("wardType") as wardType["wardType"],
            floor: (formData.get("floor") as string)?.trim() || undefined,
            department: (formData.get("department") as string)?.trim() || undefined,
            totalBeds: Number(formData.get("totalBeds")),
            occupiedBeds: Number(formData.get("occupiedBeds")),
            nurseInCharge: (formData.get("nurseInCharge") as string)?.trim() || undefined,
            status: formData.get("status") as wardType["status"],
            description: (formData.get("description") as string)?.trim() || undefined,
        };

        editWard(payload);
    };

    return (
        <Modal
            title="Edit Ward"
            description="Update the ward details below."
            open={isModalOpen}
            onOpenChange={setIsModalOpen}
            trigger={
                <button className="flex items-center gap-2 border border-gray-300 rounded-md px-4 py-2 text-sm cursor-pointer">
                    <Edit className="w-4 h-4 text-green-600" /> Edit
                </button>
            }
        >
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">

                <div className="grid grid-cols-2 gap-4">
                    <FormInput
                        type="text"
                        name="wardName"
                        label="Ward Name"
                        defaultValue={ward.wardName}
                    />
                    <div className="flex flex-col gap-2">
                        <label htmlFor="wardType" className="font-semibold">Ward Type</label>
                        <select
                            id="wardType"
                            name="wardType"
                            defaultValue={ward.wardType}
                            required
                            className="w-full h-10 outline-none border-[0.5px] rounded-md border-slate-200 px-2"
                        >
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
                        defaultValue={ward.floor}
                    />
                    <FormInput
                        type="text"
                        name="department"
                        label="Department"
                        defaultValue={ward.department}
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <FormInput
                        type="number"
                        name="totalBeds"
                        label="Total Beds"
                        defaultValue={String(ward.totalBeds)}
                    />
                    <FormInput
                        type="number"
                        name="occupiedBeds"
                        label="Occupied Beds"
                        defaultValue={String(ward.occupiedBeds ?? 0)}
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <FormInput
                        type="text"
                        name="nurseInCharge"
                        label="Nurse In Charge"
                        defaultValue={ward.nurseInCharge}
                    />
                    <div className="flex flex-col gap-2">
                        <label htmlFor="status" className="font-semibold">Status</label>
                        <select
                            id="status"
                            name="status"
                            defaultValue={ward.status}
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
                        defaultValue={ward.description}
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
                            {isPending ? "Saving..." : "Save Changes"}
                        </button>
                    </div>
                </div>

            </form>
        </Modal>
    );
}