import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';

interface Entry {
  date: string;
  pressure: string;
  temperature: string;
  humidity: string;
}

function generateChartData(data: Entry[]) {
  const labels = data.map(entry => new Date(entry.date).toLocaleTimeString());
  const pressureData = data.map(entry => parseFloat(entry.pressure));
  const temperatureData = data.map(entry => parseFloat(entry.temperature));
  const humidityData = data.map(entry => parseFloat(entry.humidity));

  return {
    labels,
    datasets: [
      {
        label: 'Pressure',
        data: pressureData,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Temperature',
        data: temperatureData,
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
      {
        label: 'Humidity',
        data: humidityData,
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
      },
    ],
  };
}

const ChartData = () => {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/chart-data');
        const formattedChartData = generateChartData(response.data);
        setChartData(formattedChartData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching chart data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h2>Chart Data</h2>
      {chartData && !loading ? <Line data={chartData} /> : <span>No data</span>}
    </div>
  );
};

export default ChartData;