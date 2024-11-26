import React from 'react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
} from 'recharts';
import './AverageChart.css';

const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
        return (
            <div className="custom-tooltip">
                <p className="label">{`${payload[0].value} min`}</p>
            </div>
        );
    }
    return null;
};

const AverageChart = ({ data }) => {
    const days = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];

    return (
        <div className="average-chart-container">
            <h2>Durée moyenne des sessions</h2>

            <ResponsiveContainer width="100%" height={250}>
                <LineChart
                    data={data.map((session) => ({
                        ...session,
                        day: days, // Transforme les jours en abréviations
                    }))}
                    margin={{ top: 10, right: 10, left: 10, bottom: 10 }}
                >
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
