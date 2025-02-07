import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { User } from '../../utils/data'
import AdminSlider from '../../components/AdminSlider'
import Main from '../../components/Main'


type Props = {
    user: User | null
    setUser: React.Dispatch<React.SetStateAction<User | null>>
}
export default function AdminDashboardLayout({ user, setUser }: Props) {

    if (user?.role !== "admin") return <Navigate to="/" />
    return (
        <React.Fragment>
            <AdminSlider />
            <Main user={user} setUser={setUser}>
                <Outlet />
            </Main>
        </React.Fragment>
    )
}
