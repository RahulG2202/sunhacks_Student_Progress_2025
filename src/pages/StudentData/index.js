import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Paper,
  Box,
  Grid,
  Chip,
  CircularProgress,
  Alert,
  Button,
  Snackbar,
} from "@mui/material";

import ScoreChart from "../../components/common/ScoreChart";

import LightbulbOutlinedIcon from "@mui/icons-material/LightbulbOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";

const mockStudentApiData = {
  studentInfo: {
    id: "S1022",
    name: "Daniel Davis",
    email: "daniel.davis@example.com",
    riskScore: "Medium",
    averageScore: 81,
  },
  professorInfo: {
    name: "Dr. Carter",
  },
  aiInsight:
    "Daniel's assignment scores have shown a recent drop of over 20%. This, combined with a medium risk score, suggests he may be struggling with recent topics. A quick check-in could help identify the issue before the final exam.",
  quizScores: [
    { name: "Quiz 1", score: 65 },
    { name: "Quiz 2", score: 75 },
    { name: "Quiz 3", score: 80 },
    { name: "Quiz 4", score: 78 },
  ],
  assignmentScores: [
    { name: "Assign 1", score: 90 },
    { name: "Assign 2", score: 85 },
    { name: "Assign 3", score: 95 },
    { name: "Assign 4", score: 70 },
  ],
};

const getRiskColor = (risk) => {
  return risk === "High" ? "error" : risk === "Medium" ? "warning" : "success";
};

const StudentProfile = () => {
  const [studentData, setStudentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleSendResources = () => {
    // Need to implement resource sending logic here
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  useEffect(() => {
    const fetchStudentData = () => {
      try {
        setTimeout(() => {
          setStudentData(mockStudentApiData);
          setLoading(false);
        }, 1000);
      } catch (err) {
        setError("Failed to fetch student data.");
        setLoading(false);
      }
    };
    fetchStudentData();
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  const subject = encodeURIComponent(
    `1-on-1 Meeting Invitation for ${studentData?.studentInfo.name}`
  );
  const body = encodeURIComponent(
    `Hi ${studentData?.studentInfo.name},\n\nI noticed some recent trends in your assignment scores and wanted to check in. I'd like to invite you for a brief 1-on-1 meeting to discuss the recent topics and see how I can help you succeed in the course.\n\nPlease let me know what time works best for you.\n\nBest,\n${studentData?.professorInfo.name}`
  );
  const mailtoLink = `mailto:${studentData?.studentInfo.email}?subject=${subject}&body=${body}`;

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={2} sx={{ p: 3, mb: 4, borderRadius: 2 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box>
            <Typography variant="h4" component="h1">
              {studentData.studentInfo.name}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Student ID: {studentData.studentInfo.id}
            </Typography>
          </Box>
          <Box textAlign="center">
            <Typography variant="h6">Current Risk Level</Typography>
            <Chip
              label={studentData.studentInfo.riskScore}
              color={getRiskColor(studentData.studentInfo.riskScore)}
              sx={{ mt: 1, fontSize: "1rem" }}
            />
          </Box>
        </Box>
      </Paper>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <ScoreChart
            title="Quiz Performance"
            data={studentData.quizScores}
            lineColor="#8884d8"
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <ScoreChart
            title="Assignment Performance"
            data={studentData.assignmentScores}
            lineColor="#82ca9d"
          />
        </Grid>
      </Grid>

      <Paper elevation={2} sx={{ p: 3, mt: 4, borderRadius: 2 }}>
        <Typography variant="h5" component="h2" gutterBottom>
          AI-Generated Insights & Actions
        </Typography>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            mt: 2,
            p: 2,
            backgroundColor: "background.default",
            borderRadius: 1,
          }}
        >
          <LightbulbOutlinedIcon
            color="primary"
            sx={{ mr: 2, fontSize: "2rem" }}
          />
          <Typography
            variant="body1"
            sx={{ fontStyle: "italic", color: "text.secondary" }}
          >
            {studentData.aiInsight}
          </Typography>
        </Box>

        <Box
          sx={{ mt: 3, display: "flex", gap: 2, justifyContent: "flex-end" }}
        >
          <Button
            variant="contained"
            color="primary"
            startIcon={<EmailOutlinedIcon />}
            component="a"
            href={mailtoLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            Send 1-on-1 Invite
          </Button>

          <Button
            variant="outlined"
            color="secondary"
            startIcon={<SchoolOutlinedIcon />}
            onClick={handleSendResources}
          >
            Send Resources
          </Button>
        </Box>
      </Paper>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="success"
          sx={{ width: "100%" }}
        >
          A link to extra resources has been sent to the student!
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default StudentProfile;
