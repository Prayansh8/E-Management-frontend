import React, { useState, useCallback } from "react";
import PlusIcon from "@untitled-ui/icons-react/build/esm/Plus";
import {
  Container,
  Grid,
  Stack,
  Box,
  Button,
  Typography,
  Divider,
  Tab,
  Tabs,
  SvgIcon,
} from "@mui/material";
import { Seo } from "src/components/seo";
import { RouterLink } from "src/components/router-link";
import { paths } from "src/paths";
import { StudentStats } from "src/sections/student/stats";
import { RecentlyAddedStudents } from "src/sections/student/recently-added";

export default function Students() {
  const [currentTab, setCurrentTab] = useState("home");

  const tabs = [{ label: "Home", value: "home" }];

  const handleTabsChange = useCallback((event, value) => {
    setCurrentTab(value);
  }, []);

  return (
    <>
      <Seo title="Students" />
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
                  <Typography variant="h4">Students</Typography>
                </Stack>
                <Stack direction="row" spacing={4}>
                  <Button
                    variant="contained"
                    component={RouterLink}
                    href={paths.addStudent}
                    startIcon={
                      <SvgIcon>
                        <PlusIcon />
                      </SvgIcon>
                    }
                  >
                    Add
                  </Button>
                </Stack>
              </Stack>
            </Grid>
          </Box>
          <div>
            <Stack direction="row" justifyContent="space-between">
              <Tabs
                indicatorColor="primary"
                onChange={handleTabsChange}
                scrollButtons="auto"
                textColor="primary"
                value={currentTab}
                variant="scrollable"
              >
                {tabs.map((tab) => (
                  <Tab key={tab.value} label={tab.label} value={tab.value} />
                ))}
              </Tabs>
            </Stack>
            <Divider />
          </div>
          <Box
            sx={{
              flexGrow: 1,
              pt: 3,
            }}
          >
            {currentTab === "home" && (
              <>
                <Grid container spacing={2}>
                  <Grid item xs={12} lg={8}>
                    <StudentStats />
                  </Grid>
                  <RecentlyAddedStudents />
                  {/* Student List with Fee Due */}
                </Grid>
              </>
            )}
          </Box>
        </Container>
      </Box>
    </>
  );
}
