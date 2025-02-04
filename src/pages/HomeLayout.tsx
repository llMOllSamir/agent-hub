import { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { User } from '../utils/data'

export default function HomeLayout() {
    const navigate = useNavigate()

    useEffect(() => {
        const user: User | null = JSON.parse(localStorage.getItem("user") || "null") || null
        if (user?.role === "admin") { navigate("/admin") }
    }, [navigate])

    return (
        <Outlet />
    )
}
