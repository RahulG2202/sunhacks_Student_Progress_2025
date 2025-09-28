import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import DashboardIcon from "@mui/icons-material/Dashboard";

const DashboardCard = () => {
  return (
    <Card sx={{ maxWidth: 280, mb: 2 }}>
      <Box
        sx={{
          height: 140,
          backgroundColor: "primary.main",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <DashboardIcon sx={{ color: "white", fontSize: 60 }} />
      </Box>
      <CardContent>
        <Typography gutterBottom variant="h6" component="div" color="primary">
          SER515: Foundations of Software Engin
        </Typography>
        <Typography variant="body2" color="text.secondary">
          2025 Fall C
        </Typography>
      </CardContent>
    </Card>
  );
};

export default DashboardCard;
