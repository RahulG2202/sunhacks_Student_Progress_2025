import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "./theme";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from "react-router-dom";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

// Import the page components
import Dashboard from "./pages/Dashboard";
import AddCourse from "./pages/AddCourse";
import StudentData from "./pages/StudentData";

import "./App.css";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <Router>
        {/* Navigation Bar */}
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Student Alert System
            </Typography>
            {/* Using React Router's Link component with MUI's Button component */}
            <Button color="inherit" component={Link} to="/dashboard">
              Dashboard
            </Button>
            <Button color="inherit" component={Link} to="/add-course">
              Add Course
            </Button>
            <Button color="inherit" component={Link} to="/student-data">
              Student View
            </Button>
          </Toolbar>
        </AppBar>

        {/* Main Content Area */}
        <Box component="main" sx={{ p: 3 }}>
          <Routes>
            {/* Route for the Dashboard page */}
            <Route path="/dashboard" element={<Dashboard />} />

            {/* Route for the Add Course page */}
            <Route path="/add-course" element={<AddCourse />} />

            {/* Route for the Student Data page */}
            <Route path="/student-data" element={<StudentData />} />

            {/* Default route: Redirects to the dashboard if the path is just "/" */}
            <Route path="/" element={<Navigate to="/dashboard" />} />
          </Routes>
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;
