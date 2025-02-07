import { CallRecord } from '../../types/dataTypes'
import dayjs from 'dayjs';
import { ApexOptions } from 'apexcharts';
import Chart from "react-apexcharts";

type Props = {
    call: CallRecord
}
export default function CallDurationChart({ call }: Props) {
    const { call_journey } = call

    const lineData = call_journey.map((stage) => ({
        stage: stage.stage,
        duration: dayjs(stage.end_timestamp).diff(dayjs(stage.start_timestamp), "second"),
    }));
    const chartOptions: ApexOptions = {
        chart: {
            type: "line",
            toolbar: { show: false },
        },
        xaxis: {
            categories: lineData.map((item) => item.stage), // X-axis labels
        },
        stroke: {
            curve: "smooth",
            width: 2,
        },
        markers: {
            size: 5,
        },
        tooltip: {
            shared: true,
            intersect: false,
        },
        colors: ["#155dfc"], // Custom line color
    };

    const series = [
        {
            name: "Duration (seconds)",
            data: lineData.map((item) => item.duration),
        },
    ];
    return (
        <Chart options={chartOptions} series={series} type="line" height={350} width={"100%"} />
    )
}
