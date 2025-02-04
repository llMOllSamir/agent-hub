import React from 'react'
import { CallRecord } from '../../types/dataTypes'
import { VictoryChart, VictoryLine, VictoryAxis, VictoryTheme, VictoryTooltip } from "victory";
import dayjs from 'dayjs';

type Props = {
    call: CallRecord
}
export default function CallDurationChart({ call }: Props) {
    const { call_journey } = call

    const formattedData = call_journey.map((stage, index) => ({
        stage: stage.stage,
        duration: dayjs(stage.end_timestamp).diff(dayjs(stage.start_timestamp), "second"),
        index,
    }));
    return (
        <VictoryChart
            theme={VictoryTheme.material}
            domainPadding={20}
            width={600} // Wider chart
            height={300} // Shorter height
        >
            {/* X-Axis */}
            <VictoryAxis
                tickValues={formattedData.map((d) => d.index)}
                tickFormat={formattedData.map((d) => d.stage)}
                style={{ tickLabels: { fontSize: 10, angle: 0, textAnchor: "start" } }}
            />

            {/* Y-Axis */}
            <VictoryAxis dependentAxis tickFormat={(x) => `${x}s`} />

            {/* Line Chart */}
            <VictoryLine
                data={formattedData}
                x="index"
                y="duration"
                style={{
                    data: { stroke: "blue", strokeWidth: 2 },
                }}
                labels={({ datum }) => `${datum.duration}s`}
                labelComponent={<VictoryTooltip />}
            />
        </VictoryChart>)
}
