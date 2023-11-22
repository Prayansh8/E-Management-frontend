import React, { useEffect, useState } from "react";
import { Seo } from "src/components/seo";
import {
  Box,
  Container,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { GradeAttendanceGroupTable } from "src/sections/attendance/table";
import apiCalls from "src/api";
import { AttendanceByGrades } from "src/sections/attendance/by-grade";

const Attendance = () => {

  const [attendanceStats, setAttendanceStats] = useState({});

  const getAttendanceStats = async () => {
    const resData = await apiCalls.getAttendanceStats();
    if (resData) {
      setAttendanceStats(resData);
    }
  };

  useEffect(() => {
    getAttendanceStats()
  }, []);

  return (
    <>
      <Seo title="Attendance Page" />
      <Container maxWidth="xl">
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            py: 4,
          }}
        >
          <Grid>
            <Stack spacing={1}>
              <Typography variant="h4">Attendence</Typography>
            </Stack>
          </Grid>
        </Box>
        <Box>
        <AttendanceByGrades byGrades={attendanceStats?.by_grades} />
          <GradeAttendanceGroupTable />
        </Box>
      </Container>
    </>
  );
};

export default Attendance;
