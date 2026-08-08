import { Link, useNavigate } from "react-router-dom"
import { formOptions, useForm } from "@tanstack/react-form"
import { useState } from "react"
import { toast } from "sonner"
import apiClient from "@/api/apiClient"

interface StaffLoginProps {
    email: string
    password: string
}

function StaffLogin() {

    const [loading, setLoading] = useState<boolean>(false)
    const navigate = useNavigate()

    const defaultFormData: StaffLoginProps = {
        email: '',
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
                const { data } = await apiClient.post("/login/user", {
                    email: value.email,
                    password: value.password,
                })

                if (data.success) {
                    toast.success('Login successful')
                    localStorage.setItem('staffToken', data.token)
                    localStorage.setItem('staffUser', JSON.stringify(data.message))
                    setTimeout(() => { navigate('/overview') }, 800)
                } else {
                    toast.error(data.message || 'Invalid email or password')
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
                        Staff Login.
                    </h1>
                    <p className="text-gray-500 mt-2 mb-8">
                        Sign in to access the hospital dashboard.
                    </p>

                    <div className="flex flex-col gap-5">
                        <Form.Field
                            name="email"
                            validators={{
                                onChange: ({ value }: { value: string }) => {
                                    if (value.length === 0) return 'Email is required'
                                    if (!value.includes('@')) return 'Invalid email'
                                }
                            }}
                            children={(field) => {
                                const { errors } = field.state.meta;
                                return <div className="flex flex-col gap-1.5">
                                    <label className="text-xs uppercase tracking-wide text-gray-500">Email</label>
                                    <input
                                        type="email"
                                        value={field.state.value}
                                        onBlur={field.handleBlur}
                                        onChange={(e) => field.handleChange(e.target.value)}
                                        placeholder="staff@hospital.com"
                                        className={`bg-transparent border-b ${errors.length > 0 ? 'border-red-500' : 'border-gray-700'} focus:border-blue-600 text-white placeholder:text-gray-600 outline-none py-2.5 transition-colors`}
                                    />
                                    {errors.length > 0 && <span className="text-red-500 text-xs">{errors[0]}</span>}
                                </div>
                            }}
                        />

                        <Form.Field
                            name="password"
                            validators={{
                                onChange: ({ value }: { value: string }) => {
                                    if (value.length === 0) return 'Password is required'
                                }
                            }}
                            children={(field) => {
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
                            }}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="mt-8 w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3 rounded-full cursor-pointer border-none transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                        {loading ? "Signing in..." : "Sign In"}
                    </button>
                </form>
            </div>
        </section>
    )
}

export default StaffLogin