'use client'
import React from 'react';
import { 
    Chart as ChartJS, 
    ArcElement, 
    Tooltip, 
    Legend 
} from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(
    ArcElement, 
    Tooltip, 
    Legend
);

const GaugeChart = ({ themeRatio, title, subThemes }) => {
  const labels = subThemes.map((st) => st.title);
  const values = subThemes.map((st) => st.ratio);

  const data = {
    labels: [...labels, 'Manquant'],
    datasets: [
      {
        label: title,
        data: [...values, 100 - themeRatio],
        backgroundColor: [
          ...labels.map((_, idx) => `hsl(${idx * 60}, 70%, 50%)`), 
          'rgba(200,200,200, 0.2)'
        ],
        borderColor: [
          ...labels.map((_, idx) => `hsl(${idx * 60}, 70%, 50%)`), 
          'rgba(200,200,200, 0.2)'
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    rotation: 270, 
    circumference: 180, 
    plugins: {
      legend: {
        display: true,
        position: 'bottom'
      }
    }
  };

  return <Doughnut data={data} options={options} />;
};

export default GaugeChart;
