import { Link, useNavigate } from "react-router-dom"
import { formOptions, useForm } from "@tanstack/react-form"
import { useState } from "react"
import { toast } from "sonner"
import { hospitalPatientAuthServices } from "@/services/patientAuthServices"
import type { patientType } from "@/types/patient-type"

interface RegisterProps {
    firstName: string
    lastName: string
    gender: patientType["gender"]
    dateOfBirth: string
    phone: string
    email: string
    password: string
    confirmPassword: string
}

const fieldClass = (hasError: boolean) =>
    `bg-transparent border-b ${hasError ? 'border-red-500' : 'border-gray-700'} focus:border-blue-600 text-white placeholder:text-gray-600 outline-none py-2 text-sm transition-colors w-full`

function Register() {

    const [loading, setLoading] = useState<boolean>(false)
    const [agreedToTerms, setAgreedToTerms] = useState(false)
    const navigate = useNavigate()

    const defaultFormData: RegisterProps = {
        firstName: "",
        lastName: "",
        gender: "" as patientType["gender"],
        dateOfBirth: "",
        phone: "",
        email: "",
        password: "",
        confirmPassword: "",
    }

    const formOpt = formOptions({
        defaultValues: defaultFormData
    })

    const Form = useForm({
        ...formOpt,
        onSubmit: async ({ value }) => {
            if (!agreedToTerms) {
                toast.error('You must agree to the Terms of Service to continue')
                return
            }

            setLoading(true)
            try {
                const res = await hospitalPatientAuthServices.registerPatient({
                    firstName: value.firstName,
                    lastName: value.lastName,
                    gender: value.gender,
                    dateOfBirth: value.dateOfBirth,
                    phone: value.phone,
                    email: value.email,
                    password: value.password,
                    confirmPassword: value.confirmPassword,
                })

                if (res.success) {
                    toast.success('Account created successfully')
                    setTimeout(() => navigate("/login"), 1500)
                } else {
                    toast.error(res.message || 'Registration failed')
                }
            } catch (error: any) {
                toast.error(error.response?.data?.message || 'Something went wrong. Please try again.')
            } finally {
                setLoading(false)
            }
        }
    })

    return (
        <section className="h-screen bg-black flex flex-col overflow-hidden">

            <div className="px-8 py-4">
                <Link to="/" className="text-xl font-extrabold text-white tracking-tight">
                    Blue<span className="text-blue-600">Co</span>
                </Link>
            </div>

            <div className="flex-1 flex items-center justify-center px-6">
                <form
                    onSubmit={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        Form.handleSubmit()
                    }}
                    className="w-full max-w-md"
                >
                    <h1 className="text-2xl font-extrabold text-white tracking-tight leading-tight">
                        Create your account.
                    </h1>
                    <p className="text-gray-500 text-sm mt-1 mb-4">
                        Sign up to book and manage your appointments.
                    </p>

                    <div className="flex flex-col gap-3">

                        <div className="flex gap-3">
                            <Form.Field
                                name="firstName"
                                validators={{
                                    onChange: ({ value }: { value: string }) => {
                                        if (value.length === 0) return 'Required'
                                    }
                                }}
                                children={(field) => {
                                    const { errors } = field.state.meta;
                                    return <div className="flex flex-col gap-1 w-full">
                                        <label className="text-[11px] uppercase tracking-wide text-gray-500">First Name</label>
                                        <input
                                            type="text"
                                            value={field.state.value}
                                            onBlur={field.handleBlur}
                                            onChange={(e) => field.handleChange(e.target.value)}
                                            placeholder="Abdulazeez"
                                            className={fieldClass(errors.length > 0)}
                                        />
                                        {errors.length > 0 && <span className="text-red-500 text-xs">{errors[0]}</span>}
                                    </div>
                                }}
                            />

                            <Form.Field
                                name="lastName"
                                validators={{
                                    onChange: ({ value }: { value: string }) => {
                                        if (value.length === 0) return 'Required'
                                    }
                                }}
                                children={(field) => {
                                    const { errors } = field.state.meta;
                                    return <div className="flex flex-col gap-1 w-full">
                                        <label className="text-[11px] uppercase tracking-wide text-gray-500">Last Name</label>
                                        <input
                                            type="text"
                                            value={field.state.value}
                                            onBlur={field.handleBlur}
                                            onChange={(e) => field.handleChange(e.target.value)}
                                            placeholder="Uthman"
                                            className={fieldClass(errors.length > 0)}
                                        />
                                        {errors.length > 0 && <span className="text-red-500 text-xs">{errors[0]}</span>}
                                    </div>
                                }}
                            />
                        </div>

                        <div className="flex gap-3">
                            <Form.Field
                                name="gender"
                                validators={{
                                    onChange: ({ value }) => {
                                        if (!value || value.length === 0) return 'Required'
                                    }
                                }}
                                children={(field) => {
                                    const { errors } = field.state.meta;
                                    return <div className="flex flex-col gap-1 w-full">
                                        <label className="text-[11px] uppercase tracking-wide text-gray-500">Gender</label>
                                        <select
                                            value={field.state.value}
                                            onBlur={field.handleBlur}
                                            onChange={(e) => field.handleChange(e.target.value as patientType["gender"])}
                                            className={`${fieldClass(errors.length > 0)} appearance-none`}
                                        >
                                            <option value="" className="bg-black">Select</option>
                                            <option value="Male" className="bg-black">Male</option>
                                            <option value="Female" className="bg-black">Female</option>
                                            <option value="Others" className="bg-black">Others</option>
                                        </select>
                                        {errors.length > 0 && <span className="text-red-500 text-xs">{errors[0]}</span>}
                                    </div>
                                }}
                            />

                            <Form.Field
                                name="dateOfBirth"
                                validators={{
                                    onChange: ({ value }: { value: string }) => {
                                        if (value.length === 0) return 'Required'
                                        if (new Date(value) > new Date()) return 'Invalid date'
                                    }
                                }}
                                children={(field) => {
                                    const { errors } = field.state.meta;
                                    return <div className="flex flex-col gap-1 w-full">
                                        <label className="text-[11px] uppercase tracking-wide text-gray-500">Date of Birth</label>
                                        <input
                                            type="date"
                                            value={field.state.value}
                                            onBlur={field.handleBlur}
                                            onChange={(e) => field.handleChange(e.target.value)}
                                            className={`${fieldClass(errors.length > 0)} [color-scheme:dark]`}
                                        />
                                        {errors.length > 0 && <span className="text-red-500 text-xs">{errors[0]}</span>}
                                    </div>
                                }}
                            />
                        </div>

                        <div className="flex gap-3">
                            <Form.Field
                                name="phone"
                                validators={{
                                    onChange: ({ value }: { value: string }) => {
                                        if (value.length === 0) return 'Required'
                                        if (!/^[0-9]{10,15}$/.test(value)) return 'Invalid'
                                    }
                                }}
                                children={(field) => {
                                    const { errors } = field.state.meta;
                                    return <div className="flex flex-col gap-1 w-full">
                                        <label className="text-[11px] uppercase tracking-wide text-gray-500">Phone Number</label>
                                        <input
                                            type="tel"
                                            value={field.state.value}
                                            onBlur={field.handleBlur}
                                            onChange={(e) => field.handleChange(e.target.value)}
                                            placeholder="0800 000 0000"
                                            className={fieldClass(errors.length > 0)}
                                        />
                                        {errors.length > 0 && <span className="text-red-500 text-xs">{errors[0]}</span>}
                                    </div>
                                }}
                            />

                            <Form.Field
                                name="email"
                                validators={{
                                    onChange: ({ value }: { value: string }) => {
                                        if (value.length > 0 && !value.includes('@')) return 'Invalid'
                                    }
                                }}
                                children={(field) => {
                                    const { errors } = field.state.meta;
                                    return <div className="flex flex-col gap-1 w-full">
                                        <label className="text-[11px] uppercase tracking-wide text-gray-500">Email <span className="normal-case text-gray-600">(optional)</span></label>
                                        <input
                                            type="email"
                                            value={field.state.value}
                                            onBlur={field.handleBlur}
                                            onChange={(e) => field.handleChange(e.target.value)}
                                            placeholder="you@email.com"
                                            className={fieldClass(errors.length > 0)}
                                        />
                                        {errors.length > 0 && <span className="text-red-500 text-xs">{errors[0]}</span>}
                                    </div>
                                }}
                            />
                        </div>

                        <div className="flex gap-3">
                            <Form.Field
                                name="password"
                                validators={{
                                    onChange: ({ value }: { value: string }) => {
                                        if (value.length === 0) return 'Required'
                                        if (value.length < 6) return 'Min 6 chars'
                                    }
                                }}
                                children={(field) => {
                                    const { errors } = field.state.meta;
                                    return <div className="flex flex-col gap-1 w-full">
                                        <label className="text-[11px] uppercase tracking-wide text-gray-500">Password</label>
                                        <input
                                            type="password"
                                            value={field.state.value}
                                            onBlur={field.handleBlur}
                                            onChange={(e) => field.handleChange(e.target.value)}
                                            placeholder="••••••••"
                                            className={fieldClass(errors.length > 0)}
                                        />
                                        {errors.length > 0 && <span className="text-red-500 text-xs">{errors[0]}</span>}
                                    </div>
                                }}
                            />

                            <Form.Field
                                name="confirmPassword"
                                validators={{
                                    onChangeListenTo: ['password'],
                                    onChange: ({ value, fieldApi }) => {
                                        if (value.length === 0) return 'Required'
                                        if (value !== fieldApi.form.getFieldValue('password')) return 'No match'
                                    }
                                }}
                                children={(field) => {
                                    const { errors } = field.state.meta;
                                    return <div className="flex flex-col gap-1 w-full">
                                        <label className="text-[11px] uppercase tracking-wide text-gray-500">Confirm Password</label>
                                        <input
                                            type="password"
                                            value={field.state.value}
                                            onBlur={field.handleBlur}
                                            onChange={(e) => field.handleChange(e.target.value)}
                                            placeholder="••••••••"
                                            className={fieldClass(errors.length > 0)}
                                        />
                                        {errors.length > 0 && <span className="text-red-500 text-xs">{errors[0]}</span>}
                                    </div>
                                }}
                            />
                        </div>
                    </div>

                    <label className="flex items-center gap-2 text-xs text-gray-500 mt-3">
                        <input
                            type="checkbox"
                            checked={agreedToTerms}
                            onChange={(e) => setAgreedToTerms(e.target.checked)}
                            className="accent-blue-600"
                        />
                        I agree to the <a href="" className="text-blue-500 hover:underline">Terms</a> and <a href="" className="text-blue-500 hover:underline">Privacy Policy</a>
                    </label>

                    <button
                        type="submit"
                        disabled={loading || !agreedToTerms}
                        className="mt-3 w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2.5 rounded-full cursor-pointer border-none transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                        {loading ? "Creating account..." : "Sign Up"}
                    </button>

                    <p className="text-center text-xs text-gray-500 mt-3">
                        Already have an account? <Link to="/login" className="text-blue-500 hover:underline">Sign in</Link>
                    </p>
                </form>
            </div>
        </section>
    )
}

export default Register