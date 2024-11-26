import React from 'react';
import {
    RadarChart,
    PolarGrid,
    PolarAngleAxis,
    Radar,
    ResponsiveContainer,
} from 'recharts';
import './PerformanceRadarChart.css';

const PerformanceRadarChart = ({ data }) => {
    if (!data || data.length === 0) {
        return <p>Chargement des données...</p>;
    }

    // Objet de traduction des noms en français
    const translations = {
        cardio: 'Cardio',
        energy: 'Énergie',
        endurance: 'Endurance',
        strength: 'Force',
        speed: 'Vitesse',
        intensity: 'Intensité',
    };

    // Ordre souhaité des `kind`
    const desiredOrder = ['Intensité', 'Vitesse', 'Force', 'Endurance', 'Énergie', 'Cardio'];

    // Traduire et trier les données
    const sortedData = data
        .map((item) => ({
            ...item,
            kind: translations[item.kind] || item.kind, // Traduire les noms
        }))
        .sort((a, b) => desiredOrder.indexOf(a.kind) - desiredOrder.indexOf(b.kind)); // Trier selon l'ordre désiré

    return (
        <div className="radar-chart-container">
            <ResponsiveContainer width="100%" height={300}>
                <RadarChart outerRadius="70%" data={sortedData}>
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
