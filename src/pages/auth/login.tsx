import { Link, useNavigate } from "react-router-dom"
import { formOptions, useForm } from "@tanstack/react-form"
import { useState } from "react"
import { toast } from "sonner"
import { hospitalPatientAuthServices } from "@/services/patientAuthServices"

interface Loginprops {
    identifier: string
    password: string
}

function Login() {

    const [loading, setLoading] = useState<boolean>(false)
    const navigate = useNavigate()

    const defaultFormData: Loginprops = {
        identifier: '',
        password: ''
    }

    const formOpt = formOptions({
        defaultValues: defaultFormData,
    })

    const Form = useForm({
        ...formOpt,
        onSubmit: async ({ value }) => {
            setLoading(true)
            try {
                const res = await hospitalPatientAuthServices.loginPatient({
                    identifier: value.identifier,
                    password: value.password,
                })

                if (res.success) {
                    toast.success('Login successful')
                    localStorage.setItem('token', res.token)
                    localStorage.setItem('patient', JSON.stringify(res.patientData))
                    setTimeout(() => { navigate('/') }, 1000)
                } else {
                    toast.error(res.message || 'Invalid phone number, email, or password')
                }
            } catch (error: any) {
                toast.error(error.response?.data?.message || 'Something went wrong. Please try again.')
            } finally {
                setLoading(false)
            }
        }
    })

    return (
        <section className="min-h-screen bg-black flex flex-col">

            <div className="px-8 py-6">
                <Link to="/" className="text-2xl font-extrabold text-white tracking-tight">
                    Blue<span className="text-blue-600">Co</span>
                </Link>
            </div>

            <div className="flex-1 flex items-center justify-center px-6 pb-16">
                <form
                    onSubmit={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        Form.handleSubmit()
                    }}
                    className="w-full max-w-sm"
                >
                    <h1 className="text-4xl font-extrabold text-white tracking-tight leading-tight">
                        Welcome back.
                    </h1>
                    <p className="text-gray-500 mt-2 mb-8">
                        Sign in to manage your appointments and care.
                    </p>

                    <div className="flex flex-col gap-5">
                        <Form.Field
                            name="identifier"
                            validators={{
                                onChange: ({ value }: { value: string }) => {
                                    if (value.length === 0) {
                                        return 'Phone number or email is required'
                                    }
                                }
                            }}
                            children={
                                (field) => {
                                    const { errors } = field.state.meta;
                                    return <div className="flex flex-col gap-1.5">
                                        <label className="text-xs uppercase tracking-wide text-gray-500">Phone Number or Email</label>
                                        <input
                                            type="text"
                                            value={field.state.value}
                                            onBlur={field.handleBlur}
                                            onChange={(e) => field.handleChange(e.target.value)}
                                            placeholder="0800 000 0000 or you@email.com"
                                            className={`bg-transparent border-b ${errors.length > 0 ? 'border-red-500' : 'border-gray-700'} focus:border-blue-600 text-white placeholder:text-gray-600 outline-none py-2.5 transition-colors`}
                                        />
                                        {errors.length > 0 && <span className="text-red-500 text-xs">{errors[0]}</span>}
                                    </div>
                                }
                            }
                        />

                        <Form.Field
                            name="password"
                            validators={{
                                onChange: ({ value }: { value: string }) => {
                                    if (value.length === 0) {
                                        return 'Password is required'
                                    }
                                }
                            }}
                            children={
                                (field) => {
                                    const { errors } = field.state.meta;
                                    return <div className="flex flex-col gap-1.5">
                                        <label className="text-xs uppercase tracking-wide text-gray-500">Password</label>
                                        <input
                                            type="password"
                                            value={field.state.value}
                                            onBlur={field.handleBlur}
                                            onChange={(e) => field.handleChange(e.target.value)}
                                            placeholder="••••••••"
                                            className={`bg-transparent border-b ${errors.length > 0 ? 'border-red-500' : 'border-gray-700'} focus:border-blue-600 text-white placeholder:text-gray-600 outline-none py-2.5 transition-colors`}
                                        />
                                        {errors.length > 0 && <span className="text-red-500 text-xs">{errors[0]}</span>}
                                    </div>
                                }
                            }
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="mt-8 w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3 rounded-full cursor-pointer border-none transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                        {loading ? "Signing in..." : "Sign In"}
                    </button>

                    <div className="flex items-center justify-between mt-6 text-sm text-gray-500">
                        <Link to="/register" className="hover:text-white transition-colors">
                            New here? <span className="text-blue-500">Sign up</span>
                        </Link>
                        <Link to="/forget-password" className="hover:text-white transition-colors">
                            Forgot password?
                        </Link>
                    </div>
                </form>
            </div>
        </section>
    )
}

export default Login