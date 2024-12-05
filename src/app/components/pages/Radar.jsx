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



const RadarChart = ({RadarData}) => {
    return (
        <Radar
          data={{
            labels: [
              'M11 Digital Business Strategy',
              'M2.2 Digital Readiness',
              'M2.3 Human-centric Digitalisation',
              'M2.4 Data Management and Connectedness',
              'M2.5 Automation and Artificial Intelligence',
              'M2.6 Green Digitalisation',
            ],
            datasets: [
              {
                label: 'DMA Radar',
                data: RadarData,
                backgroundColor: 'rgba(0,73,83, 0.2)',
                borderColor: 'rgba(0,73,83, 1)',
                borderWidth: 1,
              },
            ],
          }} 
        />
    )
} 

export default RadarChart;