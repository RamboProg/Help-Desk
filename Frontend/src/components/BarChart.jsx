import React from 'react';
import { Bar } from 'react-chartjs-2';

const BarChart = ({ chartData, chartOptions }) => {
  return <Bar data={chartData} options={chartOptions} />;
};

export default BarChart;