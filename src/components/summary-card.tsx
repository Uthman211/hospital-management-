



import type { LucideIcon } from "lucide-react"
interface SummaryCardProps{
    Icon: LucideIcon
    title: string 
    count: number | string
    className?: string
}



function SummaryCard({Icon, title, count, className} : SummaryCardProps) {
    return (
        <div className={`${className ? className : "col-span-1"} text-black border-[0.5px] border-gray-300 flex items-center gap-3 p-3 rounded-xl h-30`}>

            <div className="p-2 rounded-md ">

                <Icon />

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