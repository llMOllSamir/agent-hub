import { ChartLine, Flag, LayoutDashboard, Search, LucideIcon, ChevronRight, SquareChartGantt, UserCog, Lock, Blocks, Activity, ClipboardType, Workflow, ChartNoAxesColumnIncreasing } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'


type Links = {
    path: string,
    title: string,
    icon: LucideIcon
    children?: Links[]
}
export default function AdminSlider() {
    const [collapse, setCollapse] = useState(false)
    const [menu, setMenu] = useState({ target: "", open: false })
    const { pathname } = useLocation()
    const links: Links[] = useMemo(() => {
        return [
            { path: "/admin", icon: LayoutDashboard, title: "Dashboard" },
            { path: "/admin/system-management", icon: SquareChartGantt, title: "System Management" },
            {
                path: "/admin/user-management", icon: Workflow, title: "User Management", children: [
                    { path: "/admin/user-management/user-management", icon: UserCog, title: "Users" },
                    { path: "/admin/user-management/role-management", icon: Lock, title: "Roles" },
                    { path: "/admin/user-management/agents", icon: UserCog, title: "Agents" },
                ]
            },
            {
                path: "/admin/interactions", icon: Workflow, title: "Interactions",
                children: [
                    { path: "/admin/interactions/interactions-settings", icon: Blocks, title: "Settings" },
                    { path: "/admin/interactions/interaction-search", icon: Search, title: "Search" },
                    { path: "/admin/interactions/interaction-analysis", icon: ChartLine, title: "Analysis" },
                ]
            },
            {
                path: "/admin/performance-management", icon: Workflow, title: "Performance", children: [
                    { path: "/admin/performance-management/kpis", icon: Activity, title: "KPIs" },
                    { path: "/admin/performance-management/evaluation-forms", icon: ClipboardType, title: "Evaluation Forms" },
                ]
            },
            {
                path: "/admin/analytics", icon: ChartNoAxesColumnIncreasing, title: "Analytics", children: [
                    { path: "/admin/analytics/reports", icon: Flag, title: "Reports" },
                    { path: "/admin/analytics/statistical", icon: ChartLine, title: "Statistical" },
                ]
            },

        ]
    }, [])



    return (
        <aside className={`select-none transition-all duration-300  shadow-lg shadow-gray-600 py-10  w-14   relative    ${collapse ? "lg:w-14 x-0" : "lg:w-64 lg:px-1  "} `}>
            <button onClick={() => { setCollapse(!collapse) }}
                className={`cursor-pointer transition-all duration-500 ${collapse ? "" : "rotate-180"} border-4 border-gray-300   hidden lg:flex items-center justify-center size-11
                        bg-gray-200 rounded-full absolute z-10 top-9 -end-5`}>
                <ChevronRight size={25} strokeWidth={3} color='#155dfc' />
            </button>
            <div className='flex items-center justify-center gap-2 mt-10'>
                <h2 className=' text-4xl font-mono size-10 border-2 border-blue-700   rounded-full flex justify-center items-center  text-blue-600 font-extrabold'>A</h2>
                <h2 className={` text-2xl hidden ${collapse ? "" : "lg:block"} overflow-hidden text-nowrap text-blue-600 font-extrabold`}>Agents Hub</h2>
            </div>
            <div className={` my-20 flex flex-col gap-2 justify-center items-start  overflow-x-hidden  `}>
                {
                    links.map((link, index) => (link.children ?

                        <div key={index} className='flex items-start justify-center  flex-col gap-4 py-2  transition-all duration-300  px-4 hover:text-black text-gray-400  text-base font-bold capitalize '>
                            <div title={link.title} className='flex justify-start    gap-3 cursor-pointer ' onClick={() => { setMenu(prev => prev.target === link.title ? { ...prev, open: !prev.open } : { target: link.title, open: true }) }}>
                                <link.icon size={30} />
                                <h3 className='text-nowrap'>{link.title}</h3>
                                <ChevronRight size={25} className={`${menu.target === link.title && menu.open ? "rotate-90" : ""} transition-all duration-300`} />
                            </div>
                            {
                                menu.target === link.title && menu.open &&
                                <div className={`flex flex-col gap-2 dropdown`}>
                                    {link.children.map((child, index) => (
                                        <Link key={index} to={child.path}
                                            title={child.title}
                                            className={`cursor-pointer ${pathname === child.path ? "active" : ""} flex items-center duration-200 justify-start gap-4 py-2 px-0  ${collapse ? "px-0" : "md:px-4"} hover:text-black text-gray-400  text-base font-bold capitalize `} >
                                            <child.icon size={30} />
                                            <span>{child.title}</span>
                                        </Link>
                                    ))
                                    }
                                </div>
                            }

                        </div>

                        : <Link key={index} to={link.path}
                            title={link.title}
                            className={`cursor-pointer text-nowrap ${pathname === link.path ? "active" : ""} transition-color duration-200 flex items-center justify-start gap-4 py-2  px-4 hover:text-black text-gray-400  text-base font-bold capitalize `} >
                            <link.icon size={30} />
                            <span>{link.title}</span>
                        </Link>
                    ))
                }
            </div>
        </aside >
    )
} 
