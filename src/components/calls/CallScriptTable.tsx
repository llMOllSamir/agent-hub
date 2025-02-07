import { useMemo } from 'react'
import { CallRecord, SessionTranscript } from '../../types/dataTypes'
import DataTable, { TableColumn, TableStyles } from 'react-data-table-component'


type Props = {
    call: CallRecord
}


type TableData = {
    speaker: "Agent" | "Customer";
    timeInCall: string;
    stage: string;
    transcript: string;
};

function formatTime(seconds: number): string {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    if (hours > 0) {
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    } else {
        return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    }
}

// Convert session_transcript to table format
const formatData = (sessionTranscript: SessionTranscript[], startCall: number): TableData[] => {
    return sessionTranscript.flatMap((entry) => {
        const currentTime = new Date(entry.start_timestamp).getTime();
        const endTime = new Date(entry.end_timestamp).getTime();
        const timeInCall = `${formatTime((currentTime - startCall) / 1000)}- ${formatTime((endTime - startCall) / 1000)}`; // Time in seconds

        return [
            {
                speaker: "Agent",
                timeInCall,
                stage: entry.stage_name,
                transcript: entry.agent,
            },
            {
                speaker: "Customer",
                timeInCall,
                stage: entry.stage_name,
                transcript: entry.customer,
            },
        ];
    });
};

// Define table columns

export default function CallScriptTable({ call }: Props) {
    const { session_transcript } = call

    const startCall = new Date(call.start_time).getTime()

    const columns = useMemo<TableColumn<TableData>[]>(() => {
        return [
            {
                name: "Speaker",
                selector: (row) => row.speaker,
                center: true
            },
            {
                name: "Time in Call",
                selector: (row) => row.timeInCall,
                center: true
            },
            {
                name: "Record Texting",
                selector: (row) => row.transcript,
                width: "500px",
                wrap: true,
                style: {
                    fontWeight: "bold"
                }
            },
            {
                name: "Stage",
                selector: (row) => row.stage,
                center: true
            },
            {
                name: "Response ",
                selector: () => "Positive",
                center: true
            },

        ];
    }, [])
    const customStyles: TableStyles = {
        table: {
            style: {
                backgroundColor: 'transparent',
            },
        },
        headRow: {
            style: {
                fontSize: '16px',
                fontWeight: 'bold',
            },
        },
        rows: {
            style: {
                backgroundColor: 'transparent', // Make each row background transparent
                cursor: "pointer",
                fontWeight: "500"
            },
        },
        headCells: {
            style: {
                justifyContent: "center",
                borderRight: '1px solid #ccc', // Border between cells horizontally

            }
        },
        cells: {
            style: {
                borderRight: '1px solid #ccc', // Border between cells horizontally

            }
        }

    };

    return (
        <div className='shadow-xl rounded-2xl select-none overflow-auto'>
            <DataTable
                columns={columns}
                data={formatData(session_transcript, startCall)}
                pagination
                customStyles={customStyles}
                highlightOnHover
                striped
                responsive
                paginationPerPage={10}
                paginationRowsPerPageOptions={[10]}
            /></div>
    )
}
