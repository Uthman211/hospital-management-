import type { FormInputProps } from "../../types/form.types";



export default function FormInput({label, type, placeholder, className}: FormInputProps) {
    return (
<div className="flex flex-col gap-2 w-full">
    <label className="font-semibold" htmlFor="">{label}</label>
    <input type={type} placeholder={placeholder} className={`h-10 rounded-md outline-none border-[0.5px] px-2 ${className}`} />
</div>
    )
}