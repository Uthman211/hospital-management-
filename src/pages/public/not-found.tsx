import { Recycle, } from "lucide-react"
import { useNavigate } from "react-router-dom"


function NotFoundPage() {

    const navigate = useNavigate()

    const gotoHomepage = () =>{
        navigate("/")
    }


  return (
    <div className="flex flex-col gap-3 h-screen justify-center items-center ">
<Recycle size={100} />

<h1 className="font-bold text-4xl text-red-500">404</h1>
<p className="text-xl font-semibold text-slate-400">Lost in Space</p>
<button className="bg-red-500 text-white rounded-md px-5 py-2 cursor-pointer w-max" 
onClick={gotoHomepage}
>
    Go back to homepage</button>
    </div>
  )
}

export default NotFoundPage