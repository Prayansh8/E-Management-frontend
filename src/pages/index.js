import {
  Box,
  Container,
  Stack,
  Typography,
  Unstable_Grid2 as Grid,
} from "@mui/material";
import { Seo } from "src/components/seo";
import { usePageView } from "src/hooks/use-page-view";
import { useSettings } from "src/hooks/use-settings";
import { useAuthContext } from "src/contexts/auth-context";
import { getUserTitleName } from "src/utils";
import { DashboardStats } from "src/sections/dashboard/stats";

const Page = () => {
  const settings = useSettings();
  const { user } = useAuthContext();

  usePageView();

  return (
    <>
      <Seo title="Dashboard - E-Management" />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 4,
        }}
      >
        <Container maxWidth={settings.stretch ? false : "xl"}>
          <Grid
            container
            spacing={{
              xs: 3,
              lg: 4,
            }}
          >
            <Grid xs={12}>
              <Stack direction="row" justifyContent="space-between" spacing={4}>
                <div>
                  <Typography variant="h4">
                    Hi {getUserTitleName(user)},
                  </Typography>
                </div>
              </Stack>
            </Grid>
            <Grid xs={12} lg={8}>
              <Stack
                spacing={{
                  xs: 3,
                  lg: 4,
                }}
              >
                <DashboardStats />
              </Stack>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default Page;
