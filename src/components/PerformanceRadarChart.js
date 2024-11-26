import React from 'react';
import {
    RadarChart,
    PolarGrid,
    PolarAngleAxis,
    Radar,
    ResponsiveContainer,
} from 'recharts';
import './PerformanceRadarChart.css'; // Assurez-vous que les styles sont bien importés

const PerformanceRadarChart = ({ data }) => {
    if (!data || data.length === 0) {
        return <p>Chargement des données...</p>;
    }

    return (
        <div className="radar-chart-container">
            <ResponsiveContainer width="100%" height="100%">
                <RadarChart outerRadius="70%" data={data}>
                    <PolarGrid stroke="#FFF" />
                    <PolarAngleAxis
                        dataKey="kind"
                        tick={{ fill: '#FFF', fontSize: 12 }}
                    />
                    <Radar
                        name="Performance"
                        dataKey="value"
                        stroke="#E60000"
                        fill="#E60000"
                        fillOpacity={0.6}
                    />
                </RadarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default PerformanceRadarChart;
