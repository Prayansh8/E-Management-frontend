import { Stack, Typography, Unstable_Grid2 as Grid } from "@mui/material";

export const StatsCardSmall = ({ label, value, bgColor }) => {
    const getBgColor = () => {
      if (bgColor === "red") {
        return (theme) =>
          theme.palette.mode === "dark" ? "neutral.800" : "error.lightest";
      } else if (bgColor === "yellow") {
        return (theme) =>
          theme.palette.mode === "dark" ? "neutral.800" : "warning.lightest";
      } else if (bgColor === "blue") {
        return (theme) =>
          theme.palette.mode === "dark" ? "neutral.800" : "success.lightest";
      } else {
        return (theme) =>
          theme.palette.mode === "dark" ? "neutral.800" : "success.lightest";
      } 
    };
  
    return (
      <Grid item xs={6} md={3} sm={4}>
        <Stack
          alignItems="center"
          direction="row"
          spacing={2}
          sx={{
            backgroundColor: getBgColor(),
            borderRadius: 2.5,
            p: 2,
          }}
        >
          <Typography variant="h5">{value ? value : 0}</Typography>
          <Typography variant="body2">{label}</Typography>
        </Stack>
      </Grid>
    );
  };
