import type { FormInputProps } from "../../types/form.types";

export default function FormInput({ label, type, placeholder, className, name, defaultValue }: FormInputProps) {
    return (
        <div className="flex flex-col gap-2 w-full">
            <label className="font-semibold" htmlFor={name}>{label}</label>
            <input
                id={name}
                name={name}
                type={type}
                placeholder={placeholder}
                defaultValue={defaultValue}
                className={`h-10 rounded-md outline-none border-[0.5px] px-2 ${className}`}
            />
        </div>
    )
}