import React, { useState } from 'react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
} from 'recharts';
import Formatter from '../utils/Formatter';
import './AverageChart.css';

const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
        return (
            <div className="averagechart-custom-tooltip">
                <p>{`${payload[0].value} min`}</p>
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

            {/* Rectangle avec position absolute */}
            {hoverIndex !== null && (
                <svg
                    className="hover-highlight"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <rect
                        x={`${(hoverIndex / data.length) * 100}%`}
                        y="0"
                        width={`${((data.length - hoverIndex) / data.length) * 100}%`}
                        height="100%"
                        fill="rgba(210, 10, 10, 0.6)"
                    />
                </svg>
            )}

            <ResponsiveContainer width="100%" height={170}>
                <LineChart
                    data={data.map((session, index) => ({
                        ...session,
                        day: Formatter.formatDayOfWeek(session.day),
                        index,
                    }))}
                    margin={{ top: 5, right: 15, left: 15, bottom: 25 }}
                    onMouseMove={(e) => {
                        if (e.activeTooltipIndex !== undefined) {
                            setHoverIndex(e.activeTooltipIndex);
                        }
                    }}
                    onMouseLeave={() => setHoverIndex(null)}
                >
                    {/* Dégradé pour la ligne */}
                    <defs>
                        <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
                            <stop offset="0%" stopColor="rgba(255, 255, 255, 0.4)" />
                            <stop offset="100%" stopColor="#FFFFFF" />
                        </linearGradient>
                    </defs>

                    <XAxis
                        dataKey="day"
                        tickLine={false}
                        tick={{
                            fill: 'rgba(255, 255, 255, 0.7)',
                            fontSize: 12,
                            dy: 15, // Décale les ticks vers le bas
                        }}
                        axisLine={false}
                    />
                    <YAxis hide={true} />
                    <Tooltip content={<CustomTooltip />} cursor={false} />
                    <Line
                        type="natural"
                        dataKey="sessionLength"
                        stroke="url(#lineGradient)" // Utilise le dégradé défini
                        strokeWidth={2}
                        dot={false}
                        activeDot={{
                            r: 5,
                            stroke: '#FFF',
                            strokeWidth: 2,
                            fill: '#FFF',

                        }}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default AverageChart;
