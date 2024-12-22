import React from 'react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from 'recharts';
import './ActivityChart.css';

const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
        return (
            <div className="custom-tooltip">
                <p className="label">{`${payload[0].value}kg`}</p>
                <p className="label">{`${payload[1].value}Kcal`}</p>
            </div>
        );
    }
    return null;
};

const ActivityChart = ({ data }) => {
    if (!data || data.length === 0) {
        return <p>Aucune donnée disponible pour le graphique.</p>;
    }

    // Formatage des dates pour ne garder que le jour
    const formatDay = (dateString) => {
        const date = new Date(dateString);
        return date.getDate(); // Récupère uniquement le jour du mois
    };

    return (
        <div className="activity-chart-container">
            <div className="chart-header">
                <h2>Activité quotidienne</h2>
                <div className="chart-legend">
                    <span className="legend-item">
                        <span className="legend-icon black"></span> Poids (kg)
                    </span>
                    <span className="legend-item">
                        <span className="legend-icon red"></span> Calories brûlées (kCal)
                    </span>
                </div>
            </div>
            <ResponsiveContainer width="100%" height={250}>
                <BarChart
                    data={data}
                    margin={{ top: 10, right: 0, left: 0, bottom: 10 }}
                    barGap={8}
                >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis
                        dataKey="day"
                        tickFormatter={formatDay} // Applique la fonction de formatage
                        tickLine={false}
                        tick={{
                            fill: '#9B9EAC',
                            fontSize: 14,
                            dy: 10,
                        }}
                    />
                    <YAxis
                        yAxisId="kilogram"
                        orientation="right"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: '#9B9EAC', fontSize: 14 }}
                        domain={['dataMin - 1', 'dataMax + 1']}
                    />
                    <YAxis
                        yAxisId="calories"
                        orientation="left"
                        hide={true} // Cacher l'axe des calories
                    />
                    <Tooltip
                        content={<CustomTooltip />}
                        cursor={{ fill: 'rgba(196, 196, 196, 0.5)' }}
                    />
                    <Bar
                        yAxisId="kilogram"
                        dataKey="kilogram"
                        fill="#282D30"
                        radius={[10, 10, 0, 0]}
                        barSize={10}
                        name="Poids (kg)"
                    />
                    <Bar
                        yAxisId="calories"
                        dataKey="calories"
                        fill="#E60000"
                        radius={[10, 10, 0, 0]}
                        barSize={10}
                        name="Calories brûlées (kCal)"
                    />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default ActivityChart;
