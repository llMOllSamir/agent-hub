import { useContext, useMemo } from 'react'
import { agentsContext } from '../../context/AgentsContext'
import { History, PhoneOutgoing, UsersRound } from 'lucide-react'
import AnalysisCard from '../../components/AnalysisCard'
import DataTable, { TableStyles } from 'react-data-table-component'
import { Link, useNavigate } from 'react-router-dom'
import Chart from "react-apexcharts";
import { Agent } from '../../types/dataTypes'
import { ApexOptions } from 'apexcharts'
interface ChartData {
    hour: string;
    total: number;
    answered: number;
    waiting: number;
    rejected: number;
}
export default function AdminDashboard() {
    const { agents } = useContext(agentsContext)
    const navigate = useNavigate()

    const data: ChartData[] = [
        { hour: "9 AM", total: 50, answered: 40, waiting: 5, rejected: 5 },
        { hour: "10 AM", total: 60, answered: 45, waiting: 8, rejected: 7 },
        { hour: "11 AM", total: 55, answered: 50, waiting: 3, rejected: 2 },
        { hour: "12 PM", total: 70, answered: 60, waiting: 6, rejected: 4 },
        { hour: "1 PM", total: 65, answered: 55, waiting: 7, rejected: 3 },
        { hour: "2 PM", total: 80, answered: 70, waiting: 5, rejected: 5 },
    ];
    const chartOptions: ApexOptions = {
        chart: {
            type: "line",
            toolbar: { show: false },
        },
        xaxis: {
            categories: data.map((d) => d.hour),
        },
        stroke: {
            curve: "smooth",
        },
        tooltip: {
            shared: true,
            intersect: false,
        },
    };

    const series = [
        {
            name: "Total Calls",
            data: data.map((d) => d.total),
        },
        {
            name: "Answered Calls",
            data: data.map((d) => d.answered),
        },
        {
            name: "Waiting Calls",
            data: data.map((d) => d.waiting),
        },
        {
            name: "Rejected Calls",
            data: data.map((d) => d.rejected),
        },
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
        <section className='grid grid-cols-1 gap-6 my-5 ' >

            <div className='grid grid-cols-1    md:grid-cols-2   xl:grid-cols-4 gap-4   '>
                <AnalysisCard Icon={UsersRound} number={agents.length} unite='Agent' title='Total Agents' />
                <AnalysisCard Icon={PhoneOutgoing} number={2500} unite='Call' title='Numbers Of Calls' />
                <AnalysisCard Icon={PhoneOutgoing} number={40} unite='Call' title='Total Calls Today' />
                <AnalysisCard Icon={History} number={4.4} unite='min' title='Average Call Durations' />
            </div>

            <div className='grid grid-cols-1  lg:grid-cols-3 gap-4 '>
                <div className='  bg-white rounded-xl shadow-xl min-w-full overflow-x-auto lg:col-span-2   p-5'>
                    <article className='flex justify-between items-center px-3'>
                        <h4 className='text-xl font-bold text-blue-500 '>Agents</h4>
                        <Link to={"/admin/user-management/agents"} className='bg-blue-200 text-blue-500 font-bold px-3 rounded '>All Agents</Link>
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
                <div className=' bg-white flex-wrap gap-2 flex  shadow-xl  rounded-2xl p-5 '>
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

            <div className='grid grid-cols-1  gap-4 '>
                <div className=' grid grid-cols-1shadow-xl px-2  py-2 rounded-2xl xl:col-span-2  bg-white   '>
                    <h2 className="text-xl font-bold text-blue-500  text-center">Call Statistics Today</h2>
                    <Chart options={chartOptions} series={series} type="line" height={350} width={"100%"} />
                </div>
            </div>
        </section >
    )
}
