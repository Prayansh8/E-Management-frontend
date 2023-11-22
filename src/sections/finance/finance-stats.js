import PropTypes from "prop-types";
import {
  Box,
  Card,
  Stack,
  Typography,
  Unstable_Grid2 as Grid,
} from "@mui/material";
// import { SeverityPill } from 'src/components/severity-pill';
import { useEffect, useState } from "react";
import apiCalls from "src/api";

export const FinanceStats = ({ defaultParams }) => {
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpanses, setTotalExpanses] = useState(0);
  const [totalPending, setTotalPending] = useState(0);

  const getTransactions = async () => {
    const resData = await apiCalls.getTransactionsStats({ ...defaultParams });
    if (resData) {
      setTotalIncome(resData.total_credited ? resData.total_credited : 0);
      setTotalExpanses(resData.total_debited ? resData.total_debited : 0);
      setTotalPending(resData.total_pending ? resData.total_pending : 0);
    }
  };

  useEffect(() => {
    getTransactions();
  }, [defaultParams]);
  return (
    <Box
      sx={{
        pb: 3,
      }}
    >
      <Card>
        <Grid
          container
          sx={{
            "& > *:not(:last-of-type)": {
              borderRight: (theme) => ({
                md: `1px solid ${theme.palette.divider}`,
              }),
              borderBottom: (theme) => ({
                xs: `1px solid ${theme.palette.divider}`,
                md: "none",
              }),
            },
          }}
        >
          <Grid xs={12} sm={6} md={3}>
            <Stack alignItems="center" spacing={1} sx={{ p: 3 }}>
              <Typography
                color="text.secondary"
                component="h2"
                variant="overline"
              >
                Total Income
              </Typography>
              <Stack alignItems="center" direction="row" spacing={1}>
                <Typography variant="h5">₹ {totalIncome}</Typography>
                {/* <SeverityPill color="success">
                +25%
              </SeverityPill> */}
              </Stack>
            </Stack>
          </Grid>
          <Grid xs={12} sm={6} md={3}>
            <Stack alignItems="center" spacing={1} sx={{ p: 3 }}>
              <Typography
                color="text.secondary"
                component="h5"
                variant="overline"
              >
                Total Expanses
              </Typography>
              <Stack alignItems="center" direction="row" spacing={1}>
                <Typography variant="h5">₹ {totalExpanses}</Typography>
                {/* <SeverityPill color="success">
                +12%
              </SeverityPill> */}
              </Stack>
            </Stack>
          </Grid>
          <Grid xs={12} sm={6} md={3}>
            <Stack alignItems="center" spacing={1} sx={{ p: 3 }}>
              <Typography
                color="text.secondary"
                component="h2"
                variant="overline"
              >
                Net Profit
              </Typography>
              <Stack alignItems="center" direction="row" spacing={1}>
                <Typography variant="h5">
                  ₹ {totalIncome - totalExpanses}
                </Typography>
                {/* <SeverityPill color="error">
                -20%
              </SeverityPill> */}
              </Stack>
            </Stack>
          </Grid>
          <Grid xs={12} sm={6} md={3}>
            <Stack alignItems="center" spacing={1} sx={{ p: 3 }}>
              <Typography
                color="text.secondary"
                component="h2"
                variant="overline"
              >
                Pending Income
              </Typography>
              <Typography variant="h5">₹ {totalPending}</Typography>
            </Stack>
          </Grid>
        </Grid>
      </Card>
    </Box>
  );
};

FinanceStats.propTypes = {
  defaultParams: PropTypes.object,
};

FinanceStats.defaultProps = {
  defaultParams: {},
};
