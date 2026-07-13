
import { useAuth } from "@/context/auth-context"
import { Navigate, Outlet } from "react-router-dom"




function ProtectedRoute() {

const {user, admin} = useAuth ()

if(!user || !admin) {
    return <Navigate to={"/not-found"} />
}

  return <Outlet />

}

export default ProtectedRoute