import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { User } from '../../utils/data'
import AdminSlider from '../../components/AdminSlider'
import Main from '../../components/Main'

export default function AdminDashboardLayout() {

    const navigate = useNavigate()

    useEffect(() => {
        const user: User | null = JSON.parse(localStorage.getItem("user") || "null") || null
        if (user?.role === "agent") { navigate("/") }
    }, [navigate])

    return (
        <React.Fragment>
            <AdminSlider />
            <Main>
                <Outlet />
            </Main>
        </React.Fragment>
    )
}
