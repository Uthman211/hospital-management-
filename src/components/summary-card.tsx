import type { LucideIcon } from "lucide-react"

interface SummaryCardProps {
    Icon: LucideIcon
    title: string
    count: number | string
    className?: string
    iconColor?: string
    iconBg?: string
}

function SummaryCard({ Icon, title, count, className, iconColor = "text-blue-600", iconBg = "bg-blue-50" }: SummaryCardProps) {
    return (
        <div className={`${className ? className : "col-span-1"} text-black border-[0.5px] border-gray-300 flex items-center gap-3 p-3 rounded-xl h-30`}>

            <div className={`p-3 rounded-md ${iconBg}`}>
                <Icon className={iconColor} />
            </div>

            <div>
                <h1 className="font-semibold text-md">{title}</h1>
                <h1 className="font-bold text-xl">
                    {typeof count === 'number' ? Intl.NumberFormat().format(count) : count}
                </h1>
            </div>

        </div>
    )
}

export default SummaryCard