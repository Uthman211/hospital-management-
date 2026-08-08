import DashboardLayout from "@/components/dashboardlayout"
import DashboardHeader from "@/components/header"
import SummaryCard from "@/components/summary-card"
import { Calendar, User, Users, Wallet } from "lucide-react"
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    Legend,
} from "recharts"

const appointmentTrend = [
    { month: "Jan", appointments: 18 },
    { month: "Feb", appointments: 24 },
    { month: "Mar", appointments: 20 },
    { month: "Apr", appointments: 30 },
    { month: "May", appointments: 27 },
    { month: "Jun", appointments: 35 },
]

const patientStatusBreakdown = [
    { name: "Active", value: 42, color: "#22c55e" },
    { name: "Inactive", value: 8, color: "#9ca3af" },
]

const recentActivity = [
    { label: "New patient registered", name: "John Doe", time: "10 mins ago" },
    { label: "Appointment scheduled", name: "Dr. Adebayo Johnson", time: "45 mins ago" },
    { label: "Payment received", name: "₦20,000 invoice", time: "1 hour ago" },
    { label: "Treatment recorded", name: "Fatima Abdullahi", time: "3 hours ago" },
]

function OverviewPage() {
    const totalPayments = 90000

    return (
        <DashboardLayout>
            <section>
                <DashboardHeader
                    title="Dashboard Overview"
                    desc="Welcome to Hospital Management System" />

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-10">
                    <SummaryCard Icon={Users} title="Total Patients" count={5} className="bg-white" />
                    <SummaryCard Icon={User} title="Total Doctors" count={5} className="bg-white" />
                    <SummaryCard Icon={Calendar} title="Total Appointments" count={5} className="bg-white" />
                    <SummaryCard
                        Icon={Wallet}
                        title="Total Payments"
                        count={new Intl.NumberFormat("en-NG", {
                            style: "currency",
                            currency: "NGN",
                            minimumFractionDigits: 0,
                        }).format(totalPayments)}
                        className="bg-white"
                    />
                </div>

                {/* Charts row */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-6">

                    {/* Appointment trend - bar chart */}
                    <div className="lg:col-span-2 bg-white border-[0.5px] border-gray-300 rounded-xl p-6">
                        <h2 className="font-semibold text-black mb-1">Appointments Over Time</h2>
                        <p className="text-sm text-gray-500 mb-4">Monthly appointment volume</p>
                        <ResponsiveContainer width="100%" height={280}>
                            <BarChart data={appointmentTrend}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                                <XAxis dataKey="month" stroke="#6b7280" fontSize={12} />
                                <YAxis stroke="#6b7280" fontSize={12} />
                                <Tooltip
                                    contentStyle={{ borderRadius: "8px", border: "1px solid #e5e7eb" }}
                                />
                                <Bar dataKey="appointments" fill="#2563eb" radius={[6, 6, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Patient status - pie chart */}
                    <div className="bg-white border-[0.5px] border-gray-300 rounded-xl p-6">
                        <h2 className="font-semibold text-black mb-1">Patient Status</h2>
                        <p className="text-sm text-gray-500 mb-4">Active vs inactive</p>
                        <ResponsiveContainer width="100%" height={280}>
                            <PieChart>
                                <Pie
                                    data={patientStatusBreakdown}
                                    dataKey="value"
                                    nameKey="name"
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={90}
                                    paddingAngle={3}
                                >
                                    {patientStatusBreakdown.map((entry, i) => (
                                        <Cell key={i} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend verticalAlign="bottom" height={30} />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>

                </div>

                {/* Recent activity */}
                <div className="bg-white border-[0.5px] border-gray-300 rounded-xl p-6 mt-4">
                    <h2 className="font-semibold text-black mb-4">Recent Activity</h2>
                    <div className="flex flex-col">
                        {recentActivity.map((activity, i) => (
                            <div
                                key={i}
                                className={`flex items-center justify-between py-3 text-sm ${
                                    i !== recentActivity.length - 1 ? "border-b border-gray-100" : ""
                                }`}
                            >
                                <div>
                                    <p className="text-black font-medium">{activity.label}</p>
                                    <p className="text-gray-500">{activity.name}</p>
                                </div>
                                <span className="text-gray-400 text-xs">{activity.time}</span>
                            </div>
                        ))}
                    </div>
                </div>

            </section>
        </DashboardLayout>
    )
}

export default OverviewPage