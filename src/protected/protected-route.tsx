import { useAuth } from "@/context/auth-context"
import { Navigate, Outlet } from "react-router-dom"

function ProtectedRoute() {

    const { isStaffAuthenticated } = useAuth()

    if (!isStaffAuthenticated) {
        return <Navigate to="/staff-login" replace />
    }

    return <Outlet />
}

export default ProtectedRoute