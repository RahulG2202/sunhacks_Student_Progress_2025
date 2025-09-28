import { Paper, Typography, Box } from "@mui/material";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function ScoreChart({ title, data, lineColor }) {
  const chartData = {
    labels: data.map((item) => item.name),
    datasets: [
      {
        label: "Score",
        data: data.map((item) => item.score),
        borderColor: lineColor,
        backgroundColor: lineColor,
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            return `Score: ${context.parsed.y}%`;
          },
        },
      },
    },
    scales: {
      y: {
        min: 0,
        max: 100,
        title: {
          display: true,
          text: "Score (%)",
        },
      },
    },
  };

  return (
    <Paper elevation={3} sx={{ p: 2, borderRadius: 2, height: "100%" }}>
      <Typography variant="h6" component="h3" gutterBottom>
        {title}
      </Typography>
      <Box sx={{ height: 300 }}>
        <Line options={options} data={chartData} />
      </Box>
    </Paper>
  );
}

export default ScoreChart;
