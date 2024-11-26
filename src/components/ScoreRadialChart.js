import React from 'react';
import {
    RadialBarChart,
    RadialBar,
    ResponsiveContainer,
    PolarAngleAxis,
} from 'recharts';
import './ScoreRadialChart.css';

const ScoreRadialChart = ({ score }) => {
    // Préparez les données pour le graphique
    const data = [
        {
            name: 'Score',
            value: score * 100, // Convertir en pourcentage
            fill: '#E60000', // Couleur du pourcentage
        },
    ];

    return (
        <div className="radial-chart-container">
            <h2 className="radial-chart-title">Score</h2>
            <ResponsiveContainer width="100%" height="100%">
                <RadialBarChart
                    cx="50%"
                    cy="50%"
                    innerRadius="70%"
                    outerRadius="80%"
                    barSize={10}
                    data={data}
                    startAngle={90}
                    endAngle={450}
                >
                    <PolarAngleAxis
                        type="number"
                        domain={[0, 100]}
                        angleAxisId={0}
                        tick={false}
                    />
                    <RadialBar
                        minAngle={15}
                        background={{ fill: '#F5F5F5' }}
                        clockWise
                        dataKey="value"
                    />
                    <text
                        x="50%"
                        y="50%"
                        textAnchor="middle"
                        dominantBaseline="middle"
                        className="radial-chart-label"
                    >
                        <tspan x="50%" dy="-0.5em" fontSize="26px" fontWeight="bold">{`${data[0].value}%`}</tspan>
                        <tspan x="50%" dy="1.5em" fontSize="16px">de votre</tspan>
                        <tspan x="50%" dy="1.5em" fontSize="16px">objectif</tspan>
                    </text>
                </RadialBarChart>
            </ResponsiveContainer>

        </div>
    );
};

export default ScoreRadialChart;
