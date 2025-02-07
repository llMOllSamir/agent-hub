import React, { useMemo, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Helmet } from "react-helmet";
import { User } from '../utils/data';
import { ChevronDown, Cog, LogOut } from 'lucide-react';


type Props = {
    user: User | null
    setUser: React.Dispatch<React.SetStateAction<User | null>>
    children: React.ReactNode
}

export default function Main({ children, setUser, user }: Props) {
    const { pathname } = useLocation()
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
        <main className='bg-[#e7e9f6] grow  flex flex-col select-none ' >
            <Helmet>
                <title>{title}</title>
            </Helmet>
            <header className='py-4 px-4 md:px-14 my-5 mx-10 rounded-2xl shadow flex items-center bg-white justify-between sticky top-5 z-10'>
                <h1 className='text-base md:text-xl lg:text-2xl font-bold   '>{title}</h1>
                <div className='flex justify-between items-center gap-2 w-20 me-10'>
                    <div className='flex justify-center items-center relative cursor-pointer' onClick={() => setOpenList(!openList)}>
                        <h3 className='font-bold text-lg capitalize'>{user?.name}</h3>
                        <ChevronDown size={20} className='  flex justify-center items-center' />
                        <div className={`${openList ? "h-24  py-3 px-10   " : "h-0 "} overflow-hidden transition-all mt-2 duration-300
                        rounded-xl  z-10 select-none  bg-white shadow w-fit absolute  -start-5  top-full  flex justify-start items-start flex-col gap-3 `}>
                            <Link onClick={() => { setOpenList(false) }} to={"/admin/settings"} className='flex justify-center items-center gap-2'>  <Cog size={25} absoluteStrokeWidth /> Setting</Link>
                            <button
                                onClick={() => {
                                    setOpenList(false)
                                    localStorage.removeItem("user")
                                    setUser(null)
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
