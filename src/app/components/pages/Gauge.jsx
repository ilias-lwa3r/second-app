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


const GaugeChart = ({GaugeData}) => {
    return (
        <Doughnut
          data={{
            labels: [
              'M11 Digital Business Strategy',
              'Manquant'
              
            ],
            datasets: [
              {
                label: 'DMA Radar',
                data: GaugeData,
                backgroundColor: ['rgba(38,67,72, 1)','rgba(255,255,255,0'],
                borderColor: 'rgba(38,67,72, 1)',
                borderWidth: 1,
              },
            ],
          }}  options= {{
            rotation: 270, 
            circumference: 180, 
            legend: {
                display: false
              },
          }}
        />
    )
} 

export default GaugeChart;