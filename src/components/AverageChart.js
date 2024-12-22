import React, { useState } from 'react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
} from 'recharts';
import Formatter from '../utils/Formatter'; // Import de la classe utilitaire
import './AverageChart.css';

const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
        return (
            <div className="averagechart-custom-tooltip">
                <p className="label">{`${payload[0].value} min`}</p>
            </div>
        );
    }
    return null;
};

const AverageChart = ({ data }) => {
    const [hoverIndex, setHoverIndex] = useState(null);

    return (
        <div className="average-chart-container">
            <h2 className="average-chart-title">Durée moyenne des sessions</h2>
            <ResponsiveContainer width="100%" height={100}>
                <LineChart
                    data={data.map((session, index) => ({
                        ...session,
                        day: Formatter.formatDayOfWeek(session.day), // Utilise la méthode de formatage
                        index,
                    }))}
                    margin={{ top: 10, right: 30, left: 30, bottom: 10 }}
                    onMouseMove={(e) => {
                        if (e.activeTooltipIndex !== undefined) {
                            setHoverIndex(e.activeTooltipIndex);
                        }
                    }}
                    onMouseLeave={() => setHoverIndex(null)}
                >
                    {hoverIndex !== null && (
                        <rect
                            x={`${(hoverIndex / data.length) * 100}%`}
                            y="0"
                            width={`${((data.length - hoverIndex) / data.length) * 100}%`}
                            height="100%"
                            fill="rgba(210, 10, 10, 0.78)"
                        />
                    )}
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis
                        dataKey="day"
                        tickLine={false}
                        tick={{ fill: '#FFF', fontSize: 12 }}
                        axisLine={false}
                    />
                    <YAxis hide={true} />
                    <Tooltip content={<CustomTooltip />} cursor={false} />
                    <Line
                        type="monotone"
                        dataKey="sessionLength"
                        stroke="#FFF"
                        strokeWidth={2}
                        dot={false}
                        activeDot={{
                            r: 5,
                            stroke: '#FFF',
                            strokeWidth: 2,
                            fill: '#E60000',
                        }}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default AverageChart;
