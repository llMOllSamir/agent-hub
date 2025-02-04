import React, { useMemo, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Helmet } from "react-helmet";
import { User } from '../utils/data';
import { ChevronDown, Cog, LogOut } from 'lucide-react';

export default function Main({ children }: { children: React.ReactNode }) {
    const { pathname } = useLocation()
    const user: User | null = JSON.parse(localStorage.getItem("user") || "null") || null
    const [openList, setOpenList] = useState(false)
    const [title, setTitle] = React.useState('')
    const navigate = useNavigate()
    const routes = useMemo(() => {
        return [
            { path: "/admin", title: "Dashboard" },
            { path: "/admin/system-management", title: "System Management" },
            {
                path: "/admin/user-management", title: "User Management", children: [
                    { path: "/admin/user-management/user-management", title: "Users" },
                    { path: "/admin/user-management/role-management", title: "Roles " },
                    { path: "/admin/user-management/agents", title: "Agents" },
                ]
            },
            {
                path: "/admin/interactions", title: "Interactions",
                children: [
                    { path: "/admin/interactions/interactions-settings", title: "Settings" },
                    { path: "/admin/interactions/call-tags", title: "Call Tags" },
                    { path: "/admin/interactions/interaction-search", title: "Search" },
                    { path: "/admin/interactions/interaction-analysis", title: "Analysis" },
                ]
            },
            {
                path: "/admin/performance-management", title: "Performance", children: [
                    { path: "/admin/performance-management/kpis", title: "KPIs" },
                    { path: "/admin/performance-management/evaluation-forms", title: "Evaluation Forms" },
                ]
            },
            {
                path: "/admin/analytics", title: "Analytics", children: [
                    { path: "/admin/analytics/reports", title: "Reports" },
                    { path: "/admin/analytics/statistical", title: "Statistical" },
                ]
            },]
    }, [])

    React.useEffect(() => {
        const route = routes.find(route => route.path === pathname || route.children?.find(child => child.path === pathname))
        if (route && route.children) {
            setTitle(`${route.title} / ${route.children.find(child => child.path === pathname)?.title}`)
        } else if (route) {
            setTitle(route.title)
        } else {
            setTitle('Dashboard')
        }
    }, [pathname, routes])




    return (
        <main className='bg-gray-200 grow text-black px-10  py-3 flex flex-col ' >
            <Helmet>
                <title>{title}</title>
            </Helmet>
            <header className='border-b-2 border-gray-300 p-3 px-5 -mx-5 mb-3 flex items-center  justify-between'>
                <h1 className='text-base md:text-xl lg:text-2xl font-bold   '>{title}</h1>
                <div className='flex justify-between items-center gap-2 w-20 me-10'>
                    <span className='size-8 p-3 flex justify-center items-center font-extrabold rounded-full bg-gray-300 capitalize'>{user?.name[0]}</span>
                    <h3 className='font-bold text-lg capitalize'>{user?.name}</h3>
                    <div className='flex justify-center items-center relative'>
                        <ChevronDown size={20} className='cursor-pointer  flex justify-center items-center' onClick={() => setOpenList(!openList)} />
                        <div className={`${openList ? "h-24  py-3 px-4  border-2 " : "h-0 overflow-hidden"} transition-all duration-300
                        rounded-xl  z-10 select-none  bg-white w-36 absolute -start-32 -bottom-36 top-full mt-3 flex justify-start items-start flex-col gap-3 `}>
                            <Link onClick={() => { setOpenList(false) }} to={"/admin/settings"} className='flex justify-center items-center gap-2'>  <Cog size={25} absoluteStrokeWidth /> Setting</Link>
                            <button
                                onClick={() => {
                                    setOpenList(false)
                                    localStorage.removeItem("user")
                                    navigate("/login")
                                }}
                                className='flex justify-center items-center gap-2 cursor-pointer'>  <LogOut size={25} absoluteStrokeWidth /> Logout</button>
                        </div>
                    </div>
                </div>
            </header>
            {children}
        </main>
    )
}
