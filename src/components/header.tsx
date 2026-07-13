
interface HeaderProps{
    title: string
    desc: string
}


function DashboardHeader({title, desc} : HeaderProps) {
  return (
    <div className="flex flex-col gap-3">
        <h1 className="text-2xl text-black font-bold">{title}</h1>
<p className=" font-semibold text-slate-500">{desc}</p>

    </div>
  )
}

export default DashboardHeader