import React, { useState } from "react";
import { Seo } from "src/components/seo";
import Download01Icon from "@untitled-ui/icons-react/build/esm/Download01";
import LineChartUp04Icon from "src/icons/untitled-ui/duocolor/line-chart-up-04";
import PlusIcon from "@untitled-ui/icons-react/build/esm/Plus";
import User01 from "@untitled-ui/icons-react/build/esm/User01";
import {
  Box,
  Button,
  Container,
  Grid,
  Stack,
  SvgIcon,
  Divider,
  Typography,
  Card,
} from "@mui/material";
import { paths } from "src/paths";
import { RouterLink } from "src/components/router-link";
import { useTenantContext } from "src/contexts/tenant-context";
import { ImportStudents } from "src/sections/student/import";
import { ImportTeachers } from "src/sections/teachers/import";

const Adminstration = () => {
  const { tenantConfig } = useTenantContext();
  const [studentsImportModalOpen, setStudentsImportModalOpen] = useState(false);
  const [teachersImportModalOpen, setTeachersImportModalOpen] = useState(false);

  return (
    <>
      <Seo title="Admin Space" />
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
              <Typography variant="h4">
                {tenantConfig.name} Adminstration
              </Typography>
            </Stack>
          </Grid>
        </Box>
        <Stack
          spacing={{
            xs: 3,
            lg: 4,
          }}
        >
          <Card>
            <Typography variant="h6" sx={{ px: 3, pt: 2, pb: 0 }}>
              Students
            </Typography>
            <Grid sx={{ px: 3, py: 2 }} container spacing={3}>
              <Grid item xs={12} sm={6} md={3}>
                <Button
                  variant="contained"
                  component={RouterLink}
                  href={paths.addStudent}
                  fullWidth
                  startIcon={
                    <SvgIcon>
                      <PlusIcon />
                    </SvgIcon>
                  }
                >
                  Add
                </Button>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Button
                  variant="contained"
                  fullWidth
                  onClick={() => setStudentsImportModalOpen(true)}
                  startIcon={
                    <SvgIcon>
                      <Download01Icon />
                    </SvgIcon>
                  }
                >
                  Import
                </Button>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Button
                  startIcon={
                    <SvgIcon>
                      <LineChartUp04Icon />
                    </SvgIcon>
                  }
                  fullWidth
                  variant="contained"
                  component={RouterLink}
                  href={paths.studentImportSummaries}
                >
                  Import Summaries
                </Button>
              </Grid>
            </Grid>
            <Divider />
            <Typography variant="h6" sx={{ px: 3, pt: 2, pb: 0 }}>
              Teachers
            </Typography>
            <Grid sx={{ px: 3, py: 2 }} container spacing={3}>
              <Grid item xs={12} sm={6} md={3}>
                <Button
                  variant="contained"
                  component={RouterLink}
                  href={paths.addTeacher}
                  fullWidth
                  startIcon={
                    <SvgIcon>
                      <PlusIcon />
                    </SvgIcon>
                  }
                >
                  Add
                </Button>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Button
                  variant="contained"
                  onClick={() => setTeachersImportModalOpen(true)}
                  fullWidth
                  startIcon={
                    <SvgIcon>
                      <Download01Icon />
                    </SvgIcon>
                  }
                >
                  Import
                </Button>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Button
                  startIcon={
                    <SvgIcon>
                      <User01 />
                    </SvgIcon>
                  }
                  component={RouterLink}
                  fullWidth
                  href={paths.assignClassSectionTeacher}
                  variant="contained"
                >
                  Assign Class
                </Button>
              </Grid>
            </Grid>
            <Divider />
            <Typography variant="h6" sx={{ px: 3, pt: 2, pb: 0 }}>
              Classes
            </Typography>
            <Grid sx={{ px: 3, py: 2 }} container spacing={3}>
              <Grid item xs={12} sm={6} md={3}>
                <Button
                  startIcon={
                    <SvgIcon>
                      <PlusIcon />
                    </SvgIcon>
                  }
                  fullWidth
                  variant="contained"
                  component={RouterLink}
                  href={paths.addClass}
                >
                  Add
                </Button>
              </Grid>
            </Grid>
          </Card>
        </Stack>
      </Container>
      <ImportStudents
        open={studentsImportModalOpen}
        onClose={() => setStudentsImportModalOpen(false)}
      />
      <ImportTeachers
        open={teachersImportModalOpen}
        onClose={() => setTeachersImportModalOpen(false)}
      />
    </>
  );
};

export default Adminstration;
