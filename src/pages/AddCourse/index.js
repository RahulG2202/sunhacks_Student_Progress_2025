import React, { useState } from "react";
import axios from "axios";

import {
  Container,
  Typography,
  Box,
  Paper,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  CircularProgress,
  Alert,
} from "@mui/material";

// Icons
import UploadFileIcon from "@mui/icons-material/UploadFile";

const courseOptions = [
  "SER515: Foundations of Software Engineering",
  "SER501: Advanced Data Structures and Algorithms",
  "SER531: Semantic Web Engineering",
  "CSE575: Statistical Machine Learning",
];

const AddCourse = () => {
  const [professorName, setProfessorName] = useState("");
  const [courseName, setCourseName] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type === "text/csv") {
      setSelectedFile(file);
      setError(""); // Clear previous errors
    } else {
      setSelectedFile(null);
      setError("Please select a valid CSV file.");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!professorName || !courseName || !selectedFile) {
      setError("All fields are required.");
      setSuccess("");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    const formData = new FormData();
    formData.append("professorName", professorName);
    formData.append("courseName", "S001");
    formData.append("file", selectedFile);

    try {
      const response = await axios.post(
        "http://localhost:8000/api/upload-course-data",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setSuccess("Data submitted successfully! Redirecting to dashboard...");
      console.log("API Response:", response.data);
      setLoading(false);
    } catch (apiError) {
      setError("Failed to submit data. Please try again.");
      console.error("API Error:", apiError);
      setLoading(false);
    }
  };

  return (
    <div>
      <Container maxWidth="sm">
        <Paper elevation={3} sx={{ mt: 5, p: 4, borderRadius: 2 }}>
          <Typography variant="h4" component="h1" align="center" gutterBottom>
            Upload Course Data
          </Typography>
          <Typography
            variant="body2"
            align="center"
            color="text.secondary"
            sx={{ mb: 4 }}
          >
            Fill in the details and upload the student performance CSV file.
          </Typography>

          <form onSubmit={handleSubmit}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
              <TextField
                label="Professor Name"
                variant="outlined"
                fullWidth
                value={professorName}
                onChange={(e) => setProfessorName(e.target.value)}
                disabled={loading}
              />

              <FormControl fullWidth variant="outlined" disabled={loading}>
                <InputLabel id="course-name-label">Course Name</InputLabel>
                <Select
                  labelId="course-name-label"
                  label="Course Name"
                  value={courseName}
                  onChange={(e) => setCourseName(e.target.value)}
                >
                  {courseOptions.map((course) => (
                    <MenuItem key={course} value={course}>
                      {course}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <Button
                variant="outlined"
                component="label" // This makes the button act like a <label>
                fullWidth
                startIcon={<UploadFileIcon />}
                disabled={loading}
              >
                Upload CSV File
                <input
                  type="file"
                  hidden
                  accept=".csv"
                  onChange={handleFileChange}
                />
              </Button>

              {selectedFile && (
                <Typography
                  variant="body2"
                  color="text.secondary"
                  align="center"
                >
                  Selected file: {selectedFile.name}
                </Typography>
              )}

              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
                fullWidth
                disabled={loading}
                sx={{ mt: 2, py: 1.5 }}
              >
                {loading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  "Submit Data"
                )}
              </Button>

              {error && (
                <Alert severity="error" sx={{ mt: 2 }}>
                  {error}
                </Alert>
              )}
              {success && (
                <Alert severity="success" sx={{ mt: 2 }}>
                  {success}
                </Alert>
              )}
            </Box>
          </form>
        </Paper>
      </Container>
    </div>
  );
};

export default AddCourse;
