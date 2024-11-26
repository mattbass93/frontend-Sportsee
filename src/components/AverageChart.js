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
    if (!data || data.length === 0) {
        return <p>Chargement des données...</p>;
    }

    const days = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];

    return (
        <div className="average-chart-container">
            {/* Titre du graphique */}
            <h2 className="average-chart-title">Durée moyenne des sessions</h2>

            {/* Graphique responsive */}
            <ResponsiveContainer width="100%" height="100%">
                <LineChart
                    data={data.map((session) => ({
                        ...session,
                        day: days[session.day - 1], // Transforme les jours en abréviations
                    }))}
                    margin={{ top: 10, right: 30, left: 0, bottom: 10 }}
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
