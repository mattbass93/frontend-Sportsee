import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

const ActivityChart = ({ data }) => {
    return (
        <BarChart width={600} height={300} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="kilogram" fill="#8884d8" />
            <Bar dataKey="calories" fill="#82ca9d" />
        </BarChart>
    );
};

export default ActivityChart;

