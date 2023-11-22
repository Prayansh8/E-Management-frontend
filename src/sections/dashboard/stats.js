import React, { useEffect, useState } from "react";
import { Card, Typography, Unstable_Grid2 as Grid } from "@mui/material";
import apiCalls from "src/api";
import { StatsCardSmall } from "src/components/stats-card-small";

export const DashboardStats = ({ defaultParams }) => {
  const [stats, setStats] = useState({});

  const getDashboardStats = async () => {
    const resData = await apiCalls.getDashboardStats(defaultParams);
    if (resData) {
      setStats(resData);
    }
  };

  useEffect(() => {
    getDashboardStats();
  }, []);

  return (
    <Card>
      <Typography variant="h6" sx={{ px: 3, pt: 2, pb: 0 }}>
        Users
      </Typography>
      <Grid container spacing={3}>
        <StatsCardSmall
          bgColor={"red"}
          label={"Students"}
          value={stats.total_active_students}
        />
        <StatsCardSmall
          bgColor={"red"}
          label={"Teachers"}
          value={stats.total_active_teachers}
        />
      </Grid>
      <Typography variant="h6" sx={{ px: 3, pt: 2, pb: 0 }}>
        Attendance Today
      </Typography>
      <Grid container spacing={3}>
        <StatsCardSmall
          bgColor={"blue"}
          label={"Present"}
          value={stats.attendance_today?.present}
        />
        <StatsCardSmall
          bgColor={"blue"}
          label={"Absent"}
          value={stats.attendance_today?.absent}
        />
        <StatsCardSmall
          bgColor={"blue"}
          label={"On Leave"}
          value={stats.attendance_today?.on_leave}
        />
      </Grid>
    </Card>
  );
};
