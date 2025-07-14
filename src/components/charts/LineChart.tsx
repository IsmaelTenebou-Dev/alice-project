"use client";

import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

interface LineChartProps {
  data: {
    day: string;
    value: number;
  }[];
  maxValue: number;
}

const LineChart: React.FC<LineChartProps> = ({ data, maxValue }) => {
  // Prepare data for Chart.js
  const chartData = {
    labels: data.map(item => item.day),
    datasets: [
      {
        label: 'Transactions',
        data: data.map(item => item.value),
        borderColor: '#7C3AED',
        backgroundColor: 'rgba(124, 58, 237, 0.1)',
        borderWidth: 2,
        pointBackgroundColor: '#7C3AED',
        pointBorderColor: '#ffffff',
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6,
        fill: true,
        tension: 0.4, // This makes the line smooth
      },
    ],
  };

  // Chart options
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        titleColor: '#1F2937',
        bodyColor: '#4B5563',
        borderColor: '#E5E7EB',
        borderWidth: 1,
        padding: 10,
        cornerRadius: 8,
        displayColors: false,
        callbacks: {
          label: function(tooltipItem: { raw: unknown }) {
            const value = tooltipItem.raw as number;
            return value >= 1000 ? `$${(value / 1000).toFixed(1)}k` : `$${value}`;
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: '#9CA3AF',
          font: {
            size: 11,
          },
        },
      },
      y: {
        type: 'linear' as const,
        grid: {
          color: 'rgba(243, 244, 246, 1)',
          drawBorder: false,
        },
        ticks: {
          color: '#9CA3AF',
          font: {
            size: 11,
          },
          callback: function(tickValue: number | string) {
            const value = Number(tickValue);
            return value === 0 ? '0' : `${value / 1000}k`;
          },
          stepSize: Math.ceil(maxValue / 4 / 1000) * 1000,
          max: maxValue * 1.2, // 20% headroom
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="w-full h-[250px]">
      <Line data={chartData} options={options} />
    </div>
  );
};

export default LineChart;
