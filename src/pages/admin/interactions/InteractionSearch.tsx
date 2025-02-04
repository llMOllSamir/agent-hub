import { useCallback, useContext, useMemo, useState } from 'react'
import { callsContext } from '../../../context/callsContext'
import CallsTable from '../../../components/calls/CallsTable'
import { agentsContext } from '../../../context/AgentsContext'
import { CallRecord } from '../../../types/dataTypes'
import Filter from '../../../components/calls/Filter'
import dayjs, { Dayjs } from 'dayjs'


export default function InteractionSearch() {
    const { callRecord } = useContext(callsContext)
    const { agents } = useContext(agentsContext)
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredCalls, setFilteredCalls] = useState<"All" | "Date" | "Agent" | "Caller">("All");
    const [dateRange, setDateRange] = useState<[Dayjs | null, Dayjs | null]>([
        null,
        null,
    ]);
    const [start, end] = dateRange


    const getAgentName = useCallback<(id: number) => string>((id) => {
        const agent = agents.find((agent) => agent.id === id)
        return agent ? agent.name : '';
    }, [agents])

    const displayCallsRecord = useMemo<CallRecord[]>(() => {
        if (filteredCalls === "All") return callRecord
        if (filteredCalls === "Date" && start && end) return callRecord.filter((call) => {
            return dayjs(call.start_time).isAfter(dayjs(start)) || dayjs(call.start_time).isSame(dayjs(start)) &&
                (dayjs(call.end_time).isBefore(end) || dayjs(call.end_time).isSame(end))
        })
        if (filteredCalls === "Agent") return callRecord.filter(call => getAgentName(Number(call.agent_id)).toLowerCase().includes(searchTerm.toLowerCase()))
        if (filteredCalls === "Caller") return callRecord.filter(call => call.ani.includes(searchTerm))
        return callRecord
    }, [searchTerm, callRecord, filteredCalls, getAgentName, start, end])


    return (
        <section className='grow'>
            <h2 className='text-2xl font-bold text-blue-700 my-4'>Calls Interaction</h2>
            <Filter searchTerm={searchTerm} setSearchTerm={setSearchTerm} filteredCalls={filteredCalls} setFilteredCalls={setFilteredCalls} setDateRange={setDateRange} dateRange={dateRange} />
            <CallsTable calls={displayCallsRecord} agent={getAgentName} />
        </section>
    )
}
