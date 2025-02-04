import { useContext, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { agentsContext } from '../../../context/AgentsContext'
import profilePic from "../../../../public/assets/images/profile.jpg"
import { History } from 'lucide-react'
import { VictoryAxis, VictoryBar, VictoryChart, VictoryPie, VictoryTheme, VictoryTooltip } from 'victory'
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
            { metric: "Total Calls", value: agent?.performance?.total_calls },
            { metric: "Missed Calls", value: agent?.performance?.missed_calls },
            { metric: "Resolved Calls", value: agent?.performance?.resolved_calls },
            { metric: "Avg Rating", value: Number(agent?.performance?.call_rating_avg) * 100 }
        ]
    }, [agent])
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
                agent && <section className='shadow-2xl rounded-2xl capitalize  p-5 py-10'>
                    <div className='flex justify-between mx-10'>
                        <h2 className='text-xl text-blue-700 font-bold mb-5 '>Agent Profile</h2>
                        <button onClick={() => { setOpenModal(true) }} className='bg-yellow-700 text-white cursor-pointer  px-4 py-2 rounded-xl' >Edit Profile</button>
                    </div>
                    <div className='flex flex-col lg:flex-row justify-center items-center gap-10 flex-wrap my-5'>
                        <div className='flex items-center flex-col md:flex-row gap-10  shadow-2xl rounded-2xl p-5'>
                            <img src={profilePic} alt={agent?.name || "Agent profile image"} className='w-52 aspect-[8/10] rounded-2xl shadow-2xl' />
                            <div className='flex flex-col gap-2 text-base font-semibold '>
                                <h3 className='text-xl font-bold'>{agent.name}</h3>
                                <p>{agent.role}</p>
                                <p>{agent.department}</p>
                                <address>
                                    <p ><Link to={`mailto:${agent.contact.email}`}>{agent.contact.email}</Link></p>
                                    <p ><Link to={`tel:${agent.contact.phone}`}>{agent.contact.phone}</Link></p>
                                    <p >Ext: {agent.contact.extension}</p>
                                    <p >{agent.location}</p>
                                </address>
                                <p className='flex gap-1 items-center'>
                                    Last Activity:
                                    <History size={18} />
                                    {new Date(agent.activity.last_login).toDateString()}
                                </p>
                            </div>
                        </div>

                        <div className="rounded-lg flex flex-col shadow-2xl  p-4 items-center max-w-96 w-3/4">
                            <h2 className="text-xl font-semibold ">Call Distribution</h2>
                            <VictoryPie
                                data={
                                    [{ x: "Morning", y: agent.performance.call_distribution.morning },
                                    { x: "Evening", y: agent.performance.call_distribution.evening }]
                                } animate={true}
                                colorScale={["#6366F1", "#F59E0B"]}
                                labels={({ datum }) => `${datum.x}: ${datum.y}`}
                                style={{ labels: { fontSize: 14, fontWeight: "bold" } }}
                                innerRadius={90}
                                labelPosition={'startAngle'}
                            />
                        </div>

                        <div className="p-4 bg-white shadow-md rounded-lg max-w-96 w-3/4">
                            <h2 className="text-xl font-semibold mb-2 text-center">Agent Performance</h2>
                            <VictoryChart theme={VictoryTheme.material} domainPadding={40}>

                                {/* X-Axis (Performance Metrics) */}
                                <VictoryAxis
                                    tickValues={data.map(d => d.metric)}
                                    tickFormat={data.map(d => d.metric)}
                                    style={{
                                        axis: { stroke: "#000" },
                                        ticks: { stroke: "#000", size: 5 },
                                        tickLabels: { fontSize: 12, fontWeight: "bold", angle: -15 }
                                    }}
                                />

                                {/* Y-Axis (Values) */}
                                <VictoryAxis
                                    dependentAxis
                                    tickFormat={(t) => `${t}`}
                                    style={{
                                        axis: { stroke: "#000" },
                                        ticks: { stroke: "#000", size: 5 },
                                        tickLabels: { fontSize: 12 }
                                    }}
                                />

                                {/* Bar Chart */}
                                <VictoryBar
                                    data={data}
                                    animate
                                    x="metric"
                                    y="value"
                                    style={{ data: { fill: "#4F46E5", width: 50 } }}
                                    labels={({ datum }) => datum.value}
                                    labelComponent={<VictoryTooltip />}
                                />
                            </VictoryChart>
                        </div>

                    </div>

                    <div className="p-4 bg-white shadow-md rounded-lg my-5 overflow-auto max-w-[300px] sm:max-w-[500px] md:max-w-[800px] lg:max-w-full">
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
