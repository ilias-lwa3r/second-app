'use client'
import React from 'react';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';
import { Radar } from 'react-chartjs-2';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

const RadarChart = ({ RadarLabels, RadarData }) => {
  const data = {
    labels: RadarLabels,
    datasets: [
      {
        label: 'Taux de Complétude',
        data: RadarData,
        backgroundColor: 'rgba(0,73,83, 0.2)',
        borderColor: 'rgba(0,73,83, 1)',
        borderWidth: 2,
        pointBackgroundColor: 'rgba(0,73,83, 1)',
      },
    ],
  };

  const options = {
    scales: {
      r: {
        beginAtZero: true,
        suggestedMin: 0,
        suggestedMax: 100,
        ticks: {
          stepSize: 20
        }
      }
    }
  };

  return <Radar data={data} options={options} />;
};

export default RadarChart;
