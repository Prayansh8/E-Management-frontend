import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Stack,
  Typography,
  Unstable_Grid2 as Grid,
} from "@mui/material";
import apiCalls from "src/api";

export const StudentStats = ({ defaultParams }) => {
  const [stats, setstats] = useState([]);

  const getStats = async () => {
    const resData = await apiCalls.getStudentsStats({
      ...defaultParams
    });
    if (resData) {
      setstats(resData);
    }
  };

  useEffect(() => {
    getStats();
  }, [defaultParams]);

  return (
    <Card>
      <CardContent>
        <Grid container spacing={3}>
          <Grid xs={12} md={3}>
            <Stack
              alignItems="center"
              direction="row"
              spacing={2}
              sx={{
                backgroundColor: (theme) =>
                  theme.palette.mode === "dark"
                    ? "neutral.800"
                    : "error.lightest",
                borderRadius: 2.5,
                px: 3,
                py: 4,
              }}
            >
              <Box
                sx={{
                  flexShrink: 0,
                  height: 48,
                  width: 48,
                  "& img": {
                    width: "100%",
                  },
                }}
              >
                <img src="https://static.easify.xyz/lp/assets/iconly/iconly-glass-chart.svg" />
              </Box>
              <div>
                <Typography color="text.secondary" variant="body2">
                  Total Students
                </Typography>
                <Typography variant="h5">{stats.total}</Typography>
              </div>
            </Stack>
          </Grid>
          <Grid xs={12} md={3}>
            <Stack
              alignItems="center"
              direction="row"
              spacing={2}
              sx={{
                backgroundColor: (theme) =>
                  theme.palette.mode === "dark"
                    ? "neutral.800"
                    : "warning.lightest",
                borderRadius: 2.5,
                px: 3,
                py: 4,
              }}
            >
              <Box
                sx={{
                  flexShrink: 0,
                  height: 48,
                  width: 48,
                  "& img": {
                    width: "100%",
                  },
                }}
              >
                <img src="https://static.easify.xyz/lp/assets/iconly/iconly-glass-discount.svg" />
              </Box>
              <div>
                <Typography color="text.secondary" variant="body2">
                  Present Today
                </Typography>
                <Typography variant="h5">{stats.present ? stats.present : 0}</Typography>
              </div>
            </Stack>
          </Grid>
          <Grid xs={12} md={3}>
            <Stack
              alignItems="center"
              direction="row"
              spacing={2}
              sx={{
                backgroundColor: (theme) =>
                  theme.palette.mode === "dark"
                    ? "neutral.800"
                    : "success.lightest",
                borderRadius: 2.5,
                px: 3,
                py: 4,
              }}
            >
              <Box
                sx={{
                  flexShrink: 0,
                  height: 48,
                  width: 48,
                  "& img": {
                    width: "100%",
                  },
                }}
              >
                <img src="https://static.easify.xyz/lp/assets/iconly/iconly-glass-tick.svg" />
              </Box>
              <div>
                <Typography color="text.secondary" variant="body2">
                Absent Today
                </Typography>
                <Typography variant="h5">{stats.absent ? stats.absent : 0}</Typography>
              </div>
            </Stack>
          </Grid>
          <Grid xs={12} md={3}>
            <Stack
              alignItems="center"
              direction="row"
              spacing={2}
              sx={{
                backgroundColor: (theme) =>
                  theme.palette.mode === "dark"
                    ? "neutral.800"
                    : "error.lightest",
                borderRadius: 2.5,
                px: 3,
                py: 4,
              }}
            >
              <Box
                sx={{
                  flexShrink: 0,
                  height: 48,
                  width: 48,
                  "& img": {
                    width: "100%",
                  },
                }}
              >
                <img src="https://static.easify.xyz/lp/assets/iconly/iconly-glass-chart.svg" />
              </Box>
              <div>
                <Typography color="text.secondary" variant="body2">
                  On Leave Today
                </Typography>
                <Typography variant="h5">{stats.on_leave ? stats.on_leave : 0}</Typography>
              </div>
            </Stack>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};
