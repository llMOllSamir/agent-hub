import { useContext, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { agentsContext } from '../../../context/AgentsContext'
import profilePic from "../../../../public/assets/images/profile.webp"
import { History } from 'lucide-react'
import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import DataTable, { TableStyles, TableColumn } from 'react-data-table-component'
import EditAgent from '../../../components/EditAgent'



type CallHistory = {
    call_id: string;
    date: string;
    duration: string;
    status: "Resolved" | "Missed" | "Ongoing";
    rating: number | null;
}


export default function AgentDetails() {
    const { id } = useParams()
    const { agents } = useContext(agentsContext)
    const agent = useMemo(() => agents.find((agent) => agent.id === Number(id)), [agents, id])
    const [openModal, setOpenModal] = useState(false)
    const data = useMemo(() => {
        return [
            { metric: "Total Calls", value: agent?.performance?.total_calls || 0 },
            { metric: "Missed Calls", value: agent?.performance?.missed_calls || 0 },
            { metric: "Resolved Calls", value: agent?.performance?.resolved_calls || 0 },
            { metric: "Avg Rating", value: Number(agent?.performance?.call_rating_avg) * 100 }
        ]
    }, [agent])

    const barChartOptions: ApexOptions = {
        chart: {
            type: "bar",
            toolbar: { show: false },
        },
        xaxis: {
            categories: data.map((item) => item.metric), // X-axis labels
        },
        colors: ["#2b7fff"], // Custom bar color
        plotOptions: {
            bar: {
                horizontal: false, // Set to true for a horizontal bar chart
                columnWidth: "50%",
            },
        },
        dataLabels: {
            enabled: true,
        },
    };

    const barSeries = [
        {
            name: "Performance",
            data: data.map((item) => item.value),
        },
    ];


    const customStyles: TableStyles = {
        headRow: {
            style: {
                fontSize: '18px',
                fontWeight: 'bold',
            },
        },
        rows: {
            style: {
                fontWeight: '500',
                fontSize: '14px',
            },
        },
        headCells: {
            style: {
                justifyContent: "center",
            }
        }, cells: {
            style: {
                textTransform: "capitalize",
                fontWeight: '500',
                paddingBlock: "4px"
            }
        }
        ,
        pagination: {
            style: {
            }
        }

    };

    const pieData = useMemo(() => {
        return [
            { x: "Morning", y: agent?.performance.call_distribution.morning || 0 },
            { x: "Evening", y: agent?.performance.call_distribution.evening || 0 },
        ];
    }, [agent])

    const chartOptions: ApexOptions = {
        chart: {
            type: "pie",
        },
        labels: pieData.map((item) => item.x), // Set labels for the pie chart
        legend: {
            position: "bottom",
        },
        colors: ["#82ff94", "#2b7fff"],
    };



    const columns = useMemo<TableColumn<CallHistory>[]>(() => {
        return [
            {
                name: "Call ID",
                selector: (row) => row.call_id,
                sortable: true,
                center: true
            },
            {
                name: "Date",
                selector: (row) => row.date,
                sortable: true,
                center: true

            },
            {
                name: "Duration",
                selector: (row) => row.duration,
                center: true

            },
            {
                name: "Status",
                selector: (row) => row.status,
                cell: (row) => (
                    <span
                        className={`px-2 py-1 rounded-lg text-white ${row.status === "Missed" ? "bg-red-500" :
                            row.status === "Resolved" ? "bg-green-500" :
                                "bg-blue-500"
                            }`}
                    >
                        {row.status}
                    </span>
                ),
                center: true

            },
            {
                name: "Rating",
                selector: (row) => row.rating || "N/A",
                center: true

            }
        ]
    }, []);

    return (
        <>
            {
                agent && <section className='shadow-2xl rounded-2xl capitalize text-gray-500 grid grid-cols-1 mt-5 gap-6'>
                    <div className='flex justify-between items-center mx-10'>
                        <h2 className='text-xl text-blue-500 font-bold mb-5 '>Agent Profile</h2>
                        <button onClick={() => { setOpenModal(true) }} className='bg-blue-500 text-white cursor-pointer  px-4 py-2 rounded-xl' >Edit Profile</button>
                    </div>
                    <div className=' grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>

                        <div className='flex flex-col gap-6  bg-white  shadow-2xl rounded-2xl p-5'>
                            <h2 className='text-xl font-bold '>User Information</h2>
                            <div className='flex items-center gap-4 mt-10'>
                                <img src={profilePic} alt={agent?.name || "Agent profile image"} className='rounded-full shadow-2xl size-28' />
                                <div className='flex flex-col  text-base font-semibold'>
                                    <h3 className='text-xl font-bold'>{agent.name}</h3>
                                    <p>{agent.role}</p>
                                </div>
                            </div>
                            <h3 className='text-lg font-bold flex items-center gap-2'>Communication Info
                                <hr className='grow' />
                            </h3>
                            <div className='flex flex-col gap-2 text-base font-semibold '>
                                <div className='flex gap-4 '>
                                    <p>Phone: </p>
                                    <p ><Link to={`tel:${agent.contact.phone}`}>{agent.contact.phone}</Link></p>
                                </div>
                                <div className='flex gap-4 '>
                                    <p>Email: </p>
                                    <p ><Link to={`mailto:${agent.contact.email}`}>{agent.contact.email}</Link></p>
                                </div>
                                <div className='flex gap-4 '>
                                    <p>Extension: </p>
                                    <p>{agent.contact.extension}</p>
                                </div>
                                <div className='flex gap-4 '>
                                    <p>Department: </p>
                                    <p>{agent.department}</p>
                                </div>
                                <div className='flex gap-4 '>
                                    <p>Location: </p>
                                    <p>{agent.location}</p>
                                </div>

                                <div className='flex gap-4 '>
                                    <p>Last Activity: </p>
                                    <p className='flex gap-2 justify-center items-center'>   <History size={18} />
                                        {new Date(agent.activity.last_login).toDateString()}</p>
                                </div>
                            </div>
                        </div>

                        <div className="rounded-lg grid grid-cols-1 shadow-2xl   p-5  bg-white ">
                            <h2 className="text-xl text-center font-semibold ">Call Distribution </h2>
                            <Chart options={chartOptions} series={pieData.map((item) => item.y)} type="pie" height={400} width={"100%"} />
                        </div>

                        <div className="p-4 bg-white shadow-md rounded-lg ">
                            <h2 className="text-xl font-semibold mb-2 text-center">Agent Performance</h2>
                            <Chart options={barChartOptions} series={barSeries} type="bar" height={350} />

                        </div>

                    </div>

                    <div className="p-4 bg-white shadow-md rounded-lg my-5 overflow-x-auto  ">
                        <h2 className="text-xl font-semibold mb-2">Call History</h2>
                        <DataTable
                            columns={columns}
                            data={agent.call_history}
                            pagination
                            paginationPerPage={5}
                            paginationRowsPerPageOptions={[5]}
                            highlightOnHover
                            striped
                            pointerOnHover
                            className='rounded-2xl'
                            customStyles={customStyles}
                            noDataComponent={<h2 className='text-xl font-bold text-blue-700 my-4'>No permissions found</h2>}
                        />
                    </div>

                </section>
            }
            {agent && <EditAgent agent={agent} openModel={openModal} closeModel={() => { setOpenModal(false) }} />}
        </>
    )
}
