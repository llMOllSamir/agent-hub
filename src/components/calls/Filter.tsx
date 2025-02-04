import React, { useEffect, useState } from 'react'
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { Box } from "@mui/material";
import { Dayjs } from "dayjs";

type Prop = {
    setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
    setFilteredCalls: React.Dispatch<React.SetStateAction<"All" | "Date" | "Agent" | "Caller">>;
    searchTerm: string;
    filteredCalls: "All" | "Date" | "Agent" | "Caller";
    dateRange: [Dayjs | null, Dayjs | null]
    setDateRange: React.Dispatch<React.SetStateAction<[Dayjs | null, Dayjs | null]>>
}

export default function Filter({ setSearchTerm, setFilteredCalls, searchTerm, filteredCalls, setDateRange }: Prop) {
    const [startDate, setStartDate] = useState<Dayjs | null>(null);
    const [endDate, setEndDate] = useState<Dayjs | null>(null);

    useEffect(() => {
        if (startDate && endDate) {
            setDateRange([startDate, endDate]);
        }
    }, [startDate, endDate, setDateRange]);

    return (
        <div className="flex flex-col sm:flex-row gap-4 p-4   rounded-lg">

            {/* Filter Dropdown */}
            <select
                value={filteredCalls}
                onChange={(e) => setFilteredCalls(e.target.value as "All" | "Date" | "Agent" | "Caller")}
                className="border p-2 rounded w-full sm:w-48"
            >
                <option value="All">All</option>
                <option value="Date">Date</option>
                <option value="Agent">Agent</option>
                <option value="Caller">Caller</option>
            </select>

            {filteredCalls === "Date" ?
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, gap: 2, width: { xs: "100%", sm: "auto" }, }} >
                        {/* Start Date Picker */}
                        <DateTimePicker
                            label="Start Date & Time"
                            value={startDate}
                            onChange={(newValue) => setStartDate(newValue)}
                        />

                        {/* End Date Picker */}
                        <DateTimePicker
                            label="End Date & Time"
                            value={endDate}
                            onChange={(newValue) => setEndDate(newValue)}
                        />
                    </Box>
                </LocalizationProvider>
                : <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search..."
                    className="border p-2 rounded w-full md:w-64"

                />
            }
        </div>
    )
}
