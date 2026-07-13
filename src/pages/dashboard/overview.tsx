import DashboardLayout from "@/components/dashboardlayout"
import DashboardHeader from "@/components/header"

import SummaryCard from "@/components/summary-card"

import { Calendar,  User, Users, Wallet } from "lucide-react"






function OverviewPage() {
    return (
<DashboardLayout>
    <section>
        <DashboardHeader 
        title="Dashboard Overview" 
        desc="Welcome to Hospital Management System"/>

<div className="grid grid-cols-4 gap-3 mt-10">
    <SummaryCard Icon={Users} title="Total Patients" count={3} className="bg-white" />
    <SummaryCard Icon={User} title="Total Doctors" count={3} className="bg-white" />
    <SummaryCard Icon={Calendar} title="Total Appointments" count={3} className="bg-white" />
    <SummaryCard Icon={Wallet} title="Total Payments" count={`₦${30000}`} className="bg-white"/>

</div>


    </section>
</DashboardLayout>

    )


}

export default OverviewPage