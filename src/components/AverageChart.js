import React, { useState, useEffect } from 'react';
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

    const [tickDy, setTickDy] = useState(15);


    useEffect(() => {
        const mediaQuery = window.matchMedia('(min-width: 1440px) and (min-height: 1024px)');


        const updateDy = () => {
            setTickDy(mediaQuery.matches ? 30 : 15);
        };

        updateDy();
        mediaQuery.addEventListener('change', updateDy);
        return () => mediaQuery.removeEventListener('change', updateDy);
    }, []);

    return (
        <div className="average-chart-container">
            <h2 className="average-chart-title">Durée moyenne des sessions</h2>

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
                            dy: tickDy,
                        }}
                        axisLine={false}
                    />
                    <YAxis hide={true} />
                    <Tooltip content={<CustomTooltip />} cursor={false} />
                    <Line
                        type="natural"
                        dataKey="sessionLength"
                        stroke="url(#lineGradient)"
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
