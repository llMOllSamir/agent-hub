import { Navigate, Outlet } from 'react-router-dom'
import { User } from '../utils/data'

export default function HomeLayout({ user }: { user: User | null }) {
    if (user?.role === "admin") return <Navigate to="/admin" />
    return (
        <Outlet />
    )
}
