import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import AssignmentIcon from "@mui/icons-material/Assignment";
import DashboardCard from "../../components/dashboard/dashboardCard";

const Dashboard = () => {
  return (
    <div>
      <Box sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>
          Dashboard
        </Typography>

        <DashboardCard />

        <Button
          variant="contained"
          color="primary"
          startIcon={<AssignmentIcon />}
        >
          View Assignments
        </Button>
      </Box>
    </div>
  );
};

export default Dashboard;
