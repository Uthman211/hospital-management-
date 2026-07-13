import { Activity, BedDouble, BriefcaseMedical, Calendar, LayoutDashboardIcon, Stethoscope, User, Users, Wallet } from "lucide-react"
import type { ReactNode } from "react"
import { IoMedical } from "react-icons/io5"
import { Link, useLocation } from "react-router-dom"

interface Linkprops {
    id: number,
    name: string,
    pathname: string
    icon: ReactNode
}

interface DashboardProaps {
    children: ReactNode

}

export default function DashboardLayout({ children }: DashboardProaps) {


    const links: Linkprops[] = [
        {
            id: 1,
            name: "Dashboard",
            pathname: "/overview",
            icon: <LayoutDashboardIcon />

        },
        {
            id: 2,
            name: "Patients",
            pathname: "/patients",
            icon: <Users />

        },
        {
            id: 3,
            name: "Doctors",
            pathname: "/doctors",
            icon: <User />

        },
        {
            id: 4,
            name: "Appointments",
            pathname: "/appointments",
            icon: <Calendar />

        },
        {
            id: 5,
            name: "Treatments",
            pathname: "/treatment",
            icon: <Stethoscope />

        },
        {
            id: 6,
            name: "Payments",
            pathname: "/payments",
            icon: <Wallet />

        },
        {
            id: 7,
            name: "Staff",
            pathname: "/staff",
            icon: <BriefcaseMedical />

        },
        {
            id: 8,
            name: "Diagnosis",
            pathname: "/diagnosis",
            icon: <Activity />

        },
        {
            id: 9,
            name: "Wards",
            pathname: "/wards",
            icon: <BedDouble />

        }

    ]
    const path = useLocation()

    return (
        <section className="grid min-h-screen grid-cols-1 bg-[whitesmoke] lg:grid-cols-5">
            <aside className="border-r border-gray-300 bg-white p-4 text-white h-screen overflow-y-auto sticky top-0 shadow-xl lg:col-span-1 lg:h-screen">

                <div className="flex items-center gap-4 border-[0.5px] border-gray-300 rounded-md py-2 px-5 text-black mb-10">

                    <IoMedical />
                    <h1 className="font-bold">Blue Co</h1>
                </div>

                <div></div>



                <div className="flex flex-col gap-3 ">
                    {
                        links.map((link) => (

                            <Link
                                to={link.pathname}
                                key={link.id}
                                className={`hover:bg-blue-500 text-gray-700 hover:text-white transition-all duration-300 py-2 px-4 rounded-md flex items-center gap-2 ${path.pathname.startsWith(link.pathname) ? 'bg-blue-500 text-white' : ''}`}
                            >
                                {link.icon}
                                <span> {link.name} </span>
                            </Link>
                        ))


                    }

                </div>



            </aside>
            <main className="bg-blue-50/50 p-5 lg:col-span-4">
                {children}
            </main>
        </section>

    )

}