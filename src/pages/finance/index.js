import {
  Box,
  Container,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { FinanceStats } from "../../sections/finance/finance-stats";
import { TransactionsTable } from "src/sections/finance/transactions-table";

const categoryOptions = [
  {
    label: "Running Month",
    value: "runningMonth",
  },
  {
    label: "Last Month",
    value: "lastMonth",
  },
  {
    label: "last Quater",
    value: "lastQuater",
  },
  {
    label: "Whole Year",
    value: "year",
  },
];

const Finance = () => {
  return (
    <>
      <Box>
        <Container maxWidth="xl">
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              py: 3,
            }}
          >
            <Grid>
              <Stack direction="row" justifyContent="space-between" spacing={4}>
                <Stack spacing={1}>
                  <Typography variant="h4">Finance</Typography>
                </Stack>
                <Stack>
                  <TextField
                    disabled
                    label="Frequency"
                    name="frequency"
                    select
                    SelectProps={{ native: true }}
                    sx={{
                      maxWidth: "100%",
                      width: 240,
                    }}
                  >
                    {categoryOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </TextField>
                </Stack>
              </Stack>
            </Grid>
          </Box>
        </Container>
      </Box>
      <Box
        sx={{
          px: 3,
        }}
      >
        <FinanceStats />
        <TransactionsTable defaultParams={{ date: new Date() }} />
      </Box>
    </>
  );
};

export default Finance;
