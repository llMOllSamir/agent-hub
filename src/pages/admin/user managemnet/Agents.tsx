import React, { useContext, useMemo, useState } from 'react'
import { agentsContext } from '../../../context/AgentsContext'
import { UserRoundSearch } from 'lucide-react'
import DataTable, { TableStyles } from 'react-data-table-component'
import { useNavigate } from 'react-router-dom'
import EditAgent from '../../../components/EditAgent'
import { Agent } from '../../../types/dataTypes'

export default function Agents() {
    const { agents, deleteAgent } = useContext(agentsContext)
    const [openModel, setOpenModel] = useState(false)
    const [editAgent, setEditAgent] = useState<Agent | null>(null)
    const [search, setSearch] = React.useState('')
    const navigate = useNavigate()
    const displayedData = useMemo(() => {
        return agents.filter((agent) => agent.name.toLowerCase().includes(search.toLowerCase()))
    }, [agents, search])

    const closeModel = () => {
        setOpenModel(false)
        setEditAgent(null)
    }
    const openModelToggle = (agent: Agent) => {
        setEditAgent(agent)
        setOpenModel(true)
    }

    const columns = useMemo(() => [
        {
            name: 'Name',
            selector: (row: Agent) => row.name,
            sortable: true,
        },
        {
            name: 'Email',
            selector: (row: Agent) => row.contact.email,
            sortable: true,
        },
        {
            name: 'Total Calls',
            selector: (row: Agent) => row.performance.total_calls,
            sortable: true,
        },
        {
            name: 'Avg. Call Duration',
            selector: (row: Agent) => row.performance.avg_call_duration,
            sortable: true,
        },
        {
            name: 'Department',
            selector: (row: Agent) => row.department,
            sortable: true,
        },
        {
            name: 'Extension',
            selector: (row: Agent) => row.contact.extension,
            sortable: true,
        }, {
            name: 'Status',
            selector: (row: Agent) => row.status,
            cell: (row: Agent) => row.status === "Active" ? "🟢 Active" : "🔴 Inactive",
            sortable: true,
        },
        {
            name: "Action",
            cell: (row: Agent) => <div className='flex gap-4'>
                <button className='bg-yellow-500 text-white cursor-pointer  px-4 py-2 rounded-xl' onClick={() => openModelToggle(row)} >Edit</button>
                {
                    row.status === "Active" ? <button className='bg-red-500 text-white cursor-pointer  px-4 py-2 rounded-xl' onClick={() => deleteAgent(row)}>InActive</button> :
                        <button className='bg-green-600  text-white cursor-pointer  px-5 py-2 rounded-xl' onClick={() => { deleteAgent(row) }} >Active</button>
                }
            </div>
        }
    ], [deleteAgent]);


    const customStyles: TableStyles = {
        table: {
            style: {
                backgroundColor: 'transparent', // Make the table background transparent
            },
        },
        cells: {
            style: {
                justifyContent: "center"
            }
        },
        headRow: {
            style: {
                backgroundColor: 'transparent', // Make the header row background transparent
                fontSize: '16px',
                fontWeight: 'bold',
            },
        },
        rows: {
            style: {
                backgroundColor: 'transparent', // Make each row background transparent
                fontWeight: '500',
            },
        },
        headCells: {
            style: {
                justifyContent: "center"
            }
        }

    };
    return (
        <section className='grid grid-cols-1  gap-4' >
            <h2 className='text-2xl font-bold text-blue-500'>Agents List</h2>

            <div className='flex justify-end w-full  items-center ms-auto relative'>
                <label htmlFor="search" className='absolute top-1/2 -translate-y-1/2 end-3'>
                    <UserRoundSearch size={32} strokeWidth={2.5} absoluteStrokeWidth />
                </label>
                <input type="text" id='search' placeholder='Search...' value={search} onChange={(e) => setSearch(e.target.value)}
                    className='p-2 transition-all duration-300 w-80    focus:w-full md:focus:w-96 rounded-lg border-2 border-gray-300 focus:outline-0' />
            </div>

            <div className='select-none shadow-2xl  bg-white overflow-x-auto rounded-2xl p-5'>
                <DataTable
                    columns={columns}
                    data={displayedData}
                    pagination
                    paginationPerPage={10}
                    paginationRowsPerPageOptions={[10]}
                    highlightOnHover
                    striped
                    pointerOnHover
                    onRowClicked={(row) => navigate(`/admin/user-management/agents/${row.id}`)}
                    customStyles={customStyles}
                />
            </div>
            {editAgent && <EditAgent openModel={openModel} agent={editAgent} closeModel={closeModel} />}
        </section>
    )
}
