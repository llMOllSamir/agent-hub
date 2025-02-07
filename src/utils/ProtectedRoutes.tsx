import React from 'react'
import { Navigate } from 'react-router-dom'
import { User } from './data'



type ProtectedRoutesProps = {
    children: React.ReactNode,
    user: User | null
}


export default function ProtectedRoutes({ children, user }: ProtectedRoutesProps) {
    if (!user) return <Navigate to={"/login"} />
    return children
}
