import React from "react";
import { CircularProgress, Grid } from "@mui/material";
import { useTenantContext } from "src/contexts/tenant-context";

const CircularLoaderWithImage = ({ show }) => {

  const { tenantConfig } = useTenantContext();

  const styles = {
    root: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      position: "fixed",
      height: "100vh",
      zIndex: "1500",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    circularProgress: {
      position: "absolute",
    },
    logoImage: {
      position: "absolute",
      width: "80px",
      height: "80px",
      borderRadius: "50%",
    },
  };

  return (
    show &&
    <Grid container style={styles.root}>
      <CircularProgress
        thickness={2.5}
        color={"primary"}
        size={100}
        style={styles.circularProgress}
      />
      <img
        src={tenantConfig?.logo}
        alt="School Logo Loader"
        style={styles.logoImage}
      />
    </Grid>
  );
};

export default CircularLoaderWithImage;
