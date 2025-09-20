import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Dashboard = ({ userId, year }) => {
  const [data, setData] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(`http://localhost:5000/api/finances/${userId}/${year}`);
      setData(res.data);
    };
    fetchData();
  }, [userId, year]);

  const chartData = {
    labels: data.map(d => d.month),
    datasets: [
      {
        label: 'Amount',
        data: data.map(d => d.amount),
        backgroundColor: '#00d1ff',
      },
    ],
  };

  return (
    <div className="dashboard-container">
      <h2>Financial Records ({year})</h2>
      <table>
        <thead>
          <tr>
            <th>Month</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
            <tr key={idx}>
              <td>{row.month}</td>
              <td>R{row.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Bar data={chartData} />
    </div>
  );
};

export default Dashboard;
