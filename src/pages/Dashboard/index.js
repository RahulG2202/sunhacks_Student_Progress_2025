import { useState, useEffect } from "react";
import { fetchStudents } from "../../api/mockStudentApi"; // Import our mock API
import {
  Container,
  Typography,
  Paper,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Chip,
  CircularProgress,
  Alert,
} from "@mui/material";

const getRiskColor = (risk) => {
  switch (risk.toLowerCase()) {
    case "high":
      return "error"; // Red
    case "medium":
      return "warning"; // Orange
    case "low":
      return "success"; // Green
    default:
      return "default";
  }
};

const Dashboard = () => {
  const [students, setStudents] = useState([]);
  const [totalStudents, setTotalStudents] = useState(0);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadStudentData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetchStudents(page, rowsPerPage);
        setStudents(response.data);
        setTotalStudents(response.totalCount);
      } catch (err) {
        setError("Failed to fetch student data.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadStudentData();
  }, [page, rowsPerPage]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const professorInfo = {
    name: "Dr. Emily Carter",
    course: "SER515: Foundations of Software Engineering",
    capacity: totalStudents,
  };

  return (
    <Container maxWidth="lg">
      <Paper elevation={2} sx={{ p: 3, mt: 4, mb: 4, borderRadius: 2 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box>
            <Typography variant="h5" component="h1" gutterBottom>
              {professorInfo.course}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Professor: {professorInfo.name}
            </Typography>
          </Box>
          <Box textAlign="center">
            <Typography variant="h6">Class Capacity</Typography>
            <Typography variant="h4" color="primary">
              {professorInfo.capacity}
            </Typography>
          </Box>
        </Box>
      </Paper>

      <TableContainer component={Paper} elevation={2} sx={{ borderRadius: 2 }}>
        <Table sx={{ minWidth: 650 }} aria-label="student data table">
          <TableHead sx={{ backgroundColor: "primary.main" }}>
            <TableRow>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                Student Name
              </TableCell>
              <TableCell
                sx={{ color: "white", fontWeight: "bold" }}
                align="center"
              >
                Average Overall Score
              </TableCell>
              <TableCell
                sx={{ color: "white", fontWeight: "bold" }}
                align="center"
              >
                Risk Score
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={3} align="center" sx={{ py: 5 }}>
                  <CircularProgress />
                  <Typography>Loading student data...</Typography>
                </TableCell>
              </TableRow>
            ) : error ? (
              <TableRow>
                <TableCell colSpan={3} align="center">
                  <Alert severity="error">{error}</Alert>
                </TableCell>
              </TableRow>
            ) : (
              students.map((student) => (
                <TableRow
                  key={student.id}
                  hover
                  tabIndex={0}
                  role="button"
                  onClick={() =>
                    window.open(
                      `/student/${student.id}`,
                      "_blank",
                      "noopener,noreferrer"
                    )
                  }
                  sx={{
                    cursor: "pointer",
                    "&:hover": { backgroundColor: "action.hover" },
                    "&:last-child td, &:last-child th": { border: 0 },
                  }}
                >
                  <TableCell component="th" scope="row">
                    {student.studentName}
                  </TableCell>
                  <TableCell align="center">{student.averageScore}%</TableCell>
                  <TableCell align="center">
                    <Chip
                      label={student.riskScore}
                      color={getRiskColor(student.riskScore)}
                      size="small"
                    />
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
        {/* ====== Pagination Component ====== */}
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={totalStudents}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
    </Container>
  );
};

export default Dashboard;
