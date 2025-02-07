import { useMemo, useState } from 'react'
import { CallRecord } from '../../types/dataTypes'
import DataTable, { TableColumn, TableStyles } from 'react-data-table-component'
import { useNavigate } from 'react-router-dom'
import { Eye } from 'lucide-react'
import Modal from '../Modal'

type Props = {
    calls: CallRecord[]
    agent: (id: number) => string
}
export default function CallsTable({ calls, agent }: Props) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCall, setSelectedCall] = useState<CallRecord | null>(null);

    const navigate = useNavigate()



    const columns = useMemo<TableColumn<CallRecord>[]>(() => [
        {
            name: 'Agent',
            selector: (row) => agent(Number(row.agent_id)),
            sortable: true,
        },
        {
            name: 'Start Time',
            selector: (row) => new Date(row.start_time).toLocaleString(),

        },
        {
            name: 'End Time',
            selector: (row) => new Date(row.end_time).toLocaleString(),
        },
        {
            name: 'Duration',
            selector: (row) => `${Math.floor(row.duration / 60)}:${row.duration % 60 < 10 ? `0${row.duration % 60}` : row.duration % 60} min`,
        },
        {
            name: "Caller",
            selector: (row) => row.ani,
        },
        {
            name: "Escalated",
            selector: (row) => row.is_escalated ? "Yes" : "No",
        },
        {
            name: "Quality",
            selector: (row) => row.call_Quality
        },
        {
            name: "Resolution",
            selector: (row) => row.call_Resolution
        },
        {
            name: "Sentiment",
            selector: (row) => row.call_Sentiment
        },
        {
            name: "Summary",
            cell: (row) => <button className='cursor-pointer  px-4 py-2 rounded-xl hover:animate-bounce' onClick={() => { setIsModalOpen(true); setSelectedCall(row) }}><Eye size={20} /></button>
        }
    ], [agent])



    const customStyles: TableStyles = {
        table: {
            style: {
                padding: "10px",
                borderRadius: "20px 20px 0 0 ",
            }
        },
        headRow: {
            style: {
                backgroundColor: 'transparent', // Make the header row background transparent
                fontSize: '14px',
                fontWeight: 'bold'
            },
        },
        rows: {
            style: {
                backgroundColor: 'transparent', // Make each row background transparent
                cursor: 'pointer',
                fontWeight: '500',
            },
        },
        cells: {
            style: {
                justifyContent: "center",
            }
        },
        headCells: {
            style: {
                justifyContent: "center"
            }
        }
    };

    return (
        <div className='overflow-x-auto bg-white rounded-2xl '>
            <DataTable
                columns={columns}
                data={calls}
                pagination
                responsive
                highlightOnHover
                paginationPerPage={10}
                paginationRowsPerPageOptions={[10]}
                striped
                customStyles={customStyles}
                onRowClicked={(row) => navigate(`/admin/interactions/${row.sid}`)}
            />
            {
                isModalOpen && selectedCall && (
                    <Modal closeModel={() => { setIsModalOpen(false); setSelectedCall(null) }}>
                        <h2 className='text-xl font-bold text-blue-700 '>Call Summary</h2>
                        <ul className='space-y-2 my-5 list-disc'>
                            {
                                selectedCall.transcript_summary.map((s) => s).sort((a, b) => a.order - b.order).map((s, i) => <li className='font-semibold' key={i}>{s.content}</li>)
                            }
                        </ul>
                    </Modal>
                )
            }
        </div>
    )
}
