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

    // Traduction des "kind" en français
    const kindTranslation = {
        cardio: 'Cardio',
        energy: 'Énergie',
        endurance: 'Endurance',
        strength: 'Force',
        speed: 'Vitesse',
        intensity: 'Intensité',
    };

    // Ordre spécifique des catégories
    const desiredOrder = ['Intensité', 'Vitesse', 'Force', 'Endurance', 'Énergie', 'Cardio'];

    // Traduire et réordonner les données
    const translatedData = data
        .map((item) => ({
            ...item,
            kind: kindTranslation[item.kind] || item.kind, // Traduction en français
        }))
        .sort((a, b) => desiredOrder.indexOf(a.kind) - desiredOrder.indexOf(b.kind)); // Tri selon l'ordre souhaité

    return (
        <div className="radar-chart-container">
            <ResponsiveContainer width="100%" height={200}>
                <RadarChart outerRadius="70%" data={translatedData}>
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
