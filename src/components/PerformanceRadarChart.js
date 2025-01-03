import React from 'react';
import {
    RadarChart,
    PolarGrid,
    PolarAngleAxis,
    Radar,
    ResponsiveContainer,
} from 'recharts';
import Formatter from '../utils/Formatter';
import './PerformanceRadarChart.css';

const PerformanceRadarChart = ({ data }) => {
    if (!data || data.length === 0) {
        return <p>Données introuvables</p>;
    }

    const translatedData = Formatter.translateAndOrderKinds(data);

    return (
        <div className="radar-chart-container">
            <ResponsiveContainer width="100%" height="100%">
                <RadarChart outerRadius="70%" data={translatedData}>
                    <PolarGrid stroke="#FFF" />
                    <PolarAngleAxis
                        dataKey="kind"
                        tick={{ fill: '#FFF', fontSize: 9 }}
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
