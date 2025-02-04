import { useContext, useMemo } from 'react'
import { agentsContext } from '../../context/AgentsContext'
import { History, PhoneOutgoing, UsersRound } from 'lucide-react'
import AnalysisCard from '../../components/AnalysisCard'
import DataTable, { TableStyles } from 'react-data-table-component'
import { Link, useNavigate } from 'react-router-dom'
import { VictoryChart, VictoryLine, VictoryTheme, VictoryAxis, VictoryLegend, VictoryTooltip } from "victory";
import { Agent } from '../../types/dataTypes'

export default function AdminDashboard() {
    const { agents } = useContext(agentsContext)
    const navigate = useNavigate()

    const data = [
        { hour: "9 AM", total: 50, answered: 40, waiting: 5, rejected: 5 },
        { hour: "10 AM", total: 60, answered: 45, waiting: 8, rejected: 7 },
        { hour: "11 AM", total: 55, answered: 50, waiting: 3, rejected: 2 },
        { hour: "12 PM", total: 70, answered: 60, waiting: 6, rejected: 4 },
        { hour: "1 PM", total: 65, answered: 55, waiting: 7, rejected: 3 },
        { hour: "2 PM", total: 80, answered: 70, waiting: 5, rejected: 5 },
    ];
    const flags = [
        { word: "emergency", repeated: 500 },
        { word: "patient", repeated: 50 },
        { word: "doctor", repeated: 460 },
        { word: "nurse", repeated: 55 },
        { word: "appointment", repeated: 420 },
        { word: "medication", repeated: 400 },
        { word: "prescription", repeated: 380 },
        { word: "hospital", repeated: 360 },
        { word: "ambulance", repeated: 340 },
        { word: "checkup", repeated: 320 },
        { word: "admission", repeated: 300 },
        { word: "discharge", repeated: 280 },
        { word: "insurance", repeated: 260 },
        { word: "billing", repeated: 240 },
        { word: "surgeon", repeated: 220 },
        { word: "pharmacy", repeated: 600 },
        { word: "test results", repeated: 180 },
        { word: "diagnosis", repeated: 620 },
        { word: "treatment", repeated: 140 },
        { word: "therapy", repeated: 130 },
        { word: "recovery", repeated: 120 },
        { word: "operation", repeated: 110 },
        { word: "consultation", repeated: 105 },
        { word: "vaccination", repeated: 100 },
        { word: "surgery", repeated: 95 },
        { word: "ICU", repeated: 90 },
        { word: "ER", repeated: 85 },
        { word: "specialist", repeated: 80 },
        { word: "radiology", repeated: 75 },
        { word: "cardiology", repeated: 70 },
        { word: "neurology", repeated: 800 },
        { word: "orthopedic", repeated: 60 },
        { word: "pediatrics", repeated: 2 },
        { word: "dermatology", repeated: 56 },
        { word: "gynecology", repeated: 54 },
        { word: "oncology", repeated: 52 },
        { word: "anesthesiology", repeated: 50 },
        { word: "mental health", repeated: 600 },
        { word: "psychiatry", repeated: 46 },
        { word: "allergy", repeated: 44 },
        { word: "immunology", repeated: 42 },
        { word: "pathology", repeated: 40 },
        { word: "endocrinology", repeated: 38 },
        { word: "gastroenterology", repeated: 36 },
        { word: "urology", repeated: 34 },
        { word: "nephrology", repeated: 32 },
        { word: "pulmonology", repeated: 30 },
        { word: "rheumatology", repeated: 28 },
        { word: "hematology", repeated: 26 },
        { word: "ophthalmology", repeated: 24 },
        { word: "geriatrics", repeated: 22 },
        { word: "palliative care", repeated: 20 },
        { word: "home care", repeated: 18 },
        { word: "nutrition", repeated: 16 },
        { word: "physical therapy", repeated: 14 },
        { word: "speech therapy", repeated: 12 },
        { word: "occupational therapy", repeated: 10 },
        { word: "social work", repeated: 8 }
    ];
    const flagsRepeatedTime = flags.map(flag => flag.repeated).reduce((a, b) => a + b, 0);

    const columns = useMemo(() => {
        return [
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
                name: 'Avg Call Duration',
                selector: (row: Agent) => row.performance.avg_call_duration,
                sortable: true,
            },
        ];
    }, [])


    const customStyles: TableStyles = {
        table: {
            style: {
                backgroundColor: 'transparent', // Make the table background transparent
            },
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
                justifyContent: "center"
            }
        },
        headCells: {
            style: {
                justifyContent: "center"
            }
        }
    };

    return (
        <section className='flex flex-col gap-5   ' >
            <h2 className='text-blue-600  text-2xl font-bold capitalize '>overview</h2>
            <div className='flex justify-center  items-center  lg:mx-5   md:flex-row gap-4 flex-wrap '>
                <AnalysisCard Icon={UsersRound} number={agents.length} title='Total Agents' />
                <AnalysisCard Icon={PhoneOutgoing} number={2500} title='Numbers Of Calls' />
                <AnalysisCard Icon={PhoneOutgoing} number={40} title='Total Calls Today' />
                <AnalysisCard Icon={History} number={"4.4 min"} title='Average Call Durations' />
                <div className=' bg-stone-200 flex-wrap gap-2 flex w-full md:w-1/2 shadow-xl lg:w-[400px] xl:w-[500px] rounded-2xl p-5 '>
                    {flags.map((flag, index) => (
                        <span
                            key={index}
                            style={{
                                fontSize: `${Math.floor((flag.repeated / flagsRepeatedTime) * 100 * 4)}px`, // Scale size
                                color: `hsl(${Math.random() * 360}, 100%, 40%)`, // Random color
                                order: `${Math.floor(Math.random() * 10)}`,
                            }}
                            className={"transition-all duration-300 font-bold "}
                        >{flag.word}</span>))}
                </div>
            </div>
            {/* charts and table */}
            <div className='flex justify-start items-center flex-col lg:flex-row gap-10 '>
                <div className='  bg-stone-200 rounded-xl shadow-xl min-w-full overflow-x-auto w-96  lg:min-w-1/2 p-5'>
                    <article className='flex justify-between items-center px-3'>
                        <h4 className='text-xl font-bold text-blue-600 '>Agents</h4>
                        <Link to={"/admin/user-management/agents"} className='bg-blue-600 text-white font-bold px-3 rounded '>All Agents</Link>
                    </article>
                    <DataTable
                        columns={columns}
                        data={agents}
                        pagination
                        highlightOnHover
                        paginationPerPage={6}
                        paginationRowsPerPageOptions={[6]}
                        striped
                        customStyles={customStyles}
                        onRowClicked={(row) => navigate(`/admin/user-management/agents/${row.id}`)}
                    />
                </div>
                <div className=' flex flex-col items-center justify-center shadow-xl px-2 min-w-1/3 py-2 rounded-2xl  bg-stone-200  '>
                    <h2 className="text-xl font-bold text-blue-600  text-center">Call Statistics Today</h2>
                    <VictoryChart theme={VictoryTheme.material} animate
                        width={window.innerWidth < 768 ? 350 : 600}
                        height={window.innerWidth < 768 ? 300 : 400}
                        style={{ parent: { margin: "auto", padding: "10px" } }}>
                        <VictoryAxis tickValues={data.map((d) => d.hour)} tickFormat={data.map((d) => d.hour)}
                            style={{
                                tickLabels: { fontSize: window.innerWidth < 768 ? 8 : 12, angle: -45, textAnchor: "end" },
                            }} />
                        <VictoryAxis dependentAxis tickFormat={(t) => `${t} calls`} style={{
                            tickLabels: {
                                fontSize: window.innerWidth < 768 ? 8 : 10, // Set different font sizes based on screen size
                            },
                        }} />
                        <VictoryLine
                            data={data}
                            x="hour"
                            y="total"
                            style={{ data: { stroke: "#4F46E5", strokeWidth: 3 } }}
                            labels={({ datum }) => `Total: ${datum.total}`}
                            labelComponent={<VictoryTooltip />}
                        />
                        <VictoryLine
                            data={data}
                            x="hour"
                            y="answered"
                            style={{ data: { stroke: "#22C55E", strokeWidth: 3 } }}
                            labels={({ datum }) => `Answered: ${datum.answered}`}
                            labelComponent={<VictoryTooltip />}
                        />
                        <VictoryLine
                            data={data}
                            x="hour"
                            y="waiting"
                            style={{ data: { stroke: "#FACC15", strokeWidth: 3, } }}
                            labelComponent={<VictoryTooltip />}
                            labels={({ datum }) => `Waiting: ${datum.waiting}`}
                        />
                        <VictoryLine
                            data={data}
                            x="hour"
                            y="rejected"
                            style={{ data: { stroke: "#EF4444", strokeWidth: 3 } }}
                            labelComponent={<VictoryTooltip />}
                            labels={({ datum }) => `Rejected: ${datum.rejected}`}
                        />
                        <VictoryLegend
                            x={window.innerWidth < 768 ? 20 : 50}
                            y={10}
                            orientation="horizontal"
                            gutter={window.innerWidth < 768 ? 10 : 20}
                            data={[
                                { name: "Total Calls", symbol: { fill: "#4F46E5" } },
                                { name: "Answered", symbol: { fill: "#22C55E" } },
                                { name: "Waiting", symbol: { fill: "#FACC15" } },
                                { name: "Rejected", symbol: { fill: "#EF4444" } },
                            ]}
                        />
                    </VictoryChart>
                </div>

            </div>
        </section >
    )
}
