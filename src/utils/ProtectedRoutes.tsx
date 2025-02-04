import React from 'react'
import { Navigate } from 'react-router-dom'



type ProtectedRoutesProps = {
    children: React.ReactNode,
}
type User = {
    name: string,
    password: string,
    role: "admin" | "agent"
} | null
export default function ProtectedRoutes({ children }: ProtectedRoutesProps) {
    const user: User = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user") || "{}") : null


    if (!user) return <Navigate to={"/login"} />
    return children
}
