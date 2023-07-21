"use client";

import React, {useState} from 'react';
import {CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis,} from 'recharts';
import {formatDownloads} from './helpers';
import {DownloadData} from "./model";

interface DownloadsChartProps {
    selectedVersions: string[];
    data: DownloadData;
}

const DownloadsChart: React.FC<DownloadsChartProps> = (props) => {
    const [width, setWidth] = useState(window.innerWidth);
    const isMobile = width <= 600;

    var colors = ['#ffa600', '#50d467', '#54b0f2', '#f95d6a', '#2f4b7c'];

    const lines = props.selectedVersions.map((version) => {
        return (
            <Line
                key={version}
                type="monotone"
                dataKey={version}
                stroke={colors.pop()}
                strokeWidth={2}
                activeDot={{r: 8}}
            />
        );
    });

    // Transforming the data to fit into LineChart
    const transformedData = Object.entries(props.data).map(([date, versionDownloads]) => ({
        date,
        ...versionDownloads,
    }));

    return (
        <ResponsiveContainer
            width="100%"
            aspect={isMobile ? 1 : 2}
        >
            <LineChart data={transformedData}>
                <CartesianGrid strokeDasharray="3 3"/>
                <XAxis dataKey="date"/>
                <YAxis
                    width={40}
                    tickFormatter={(tick) => {
                        return formatDownloads(tick, 1);
                    }}
                />
                <Tooltip
                    labelFormatter={(e) => {
                        const d = e.split('-');
                        let dateObj = new Date();
                        dateObj.setFullYear(parseInt(d[0]));
                        dateObj.setMonth(parseInt(d[1]) - 1);
                        dateObj.setDate(parseInt(d[2]));
                        dateObj.setHours(0);
                        dateObj.setMinutes(0);
                        dateObj.setSeconds(0);
                        return dateObj.toLocaleDateString('en-US', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                        });
                    }}
                    formatter={(downloads: number) => {
                        return formatDownloads(downloads);
                    }}
                />
                <Legend/>

                {lines}
            </LineChart>
        </ResponsiveContainer>
    );
};

export default DownloadsChart;
