// src/api/mockStudentApi.js

// A large array of mock student data to simulate a full class roster.
const mockStudentData = Array.from({ length: 35 }, (_, i) => {
  const score = Math.floor(Math.random() * 40) + 60; // Score between 60 and 100
  let risk;
  if (score < 70) risk = "High";
  else if (score < 85) risk = "Medium";
  else risk = "Low";

  return {
    id: i + 1,
    studentName: `Student ${String.fromCharCode(65 + (i % 26))}${
      Math.floor(i / 26) || ""
    }`, // Student A, B, ..., Z, A1, B1...
    averageScore: score,
    riskScore: risk,
  };
});

// This function simulates fetching data from a backend API with pagination.
export const fetchStudents = async (page, rowsPerPage) => {
  console.log(`Fetching page: ${page}, rowsPerPage: ${rowsPerPage}`);

  // Simulate network delay
  return new Promise((resolve) => {
    setTimeout(() => {
      // Calculate the start and end index for the requested page
      const start = page * rowsPerPage;
      const end = start + rowsPerPage;

      // Slice the data to get only the items for the current page
      const paginatedData = mockStudentData.slice(start, end);

      resolve({
        data: paginatedData,
        totalCount: mockStudentData.length, // The total number of records
      });
    }, 500); // 500ms delay to simulate a real API call
  });
};
