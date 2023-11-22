import React, { useState, useEffect, useCallback } from "react";
import {
  Container,
  Grid,
  Stack,
  Box,
  Typography,
  Divider,
  Tab,
  Tabs,
} from "@mui/material";
import { Seo } from "src/components/seo";
import apiCalls from "src/api";
import { useSchoolContext } from "src/contexts/school-context";
import { TeachersTable } from "src/sections/teachers/table";
import { breakPaginatedResponse } from "src/utils";

export default function Teachers() {
  const { teachers, setTeachers } = useSchoolContext();
  const [teachersPaginatedData, setTeachersPaginatedData] = useState({});
  const [currentTab, setCurrentTab] = useState("home");

  const tabs = [{ label: "Home", value: "home" }];

  const handleTabsChange = useCallback((event, value) => {
    setCurrentTab(value);
  }, []);

  const getTeachers = async () => {
    const resData = await apiCalls.getUsers({ role: "teacher" });
    if (resData) {
      setTeachersPaginatedData(breakPaginatedResponse(resData));
    }
  };

  useEffect(() => {
    getTeachers();
  }, []);

  useEffect(() => {
    if (teachersPaginatedData.data) {
      setTeachers(teachersPaginatedData.data);
    }
  }, [teachersPaginatedData]);

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
                  <Typography variant="h4">Teachers</Typography>
                </Stack>
                <div>
                  <Stack direction="row" spacing={4}>
                  </Stack>
                </div>
              </Stack>
            </Grid>
          </Box>
          <div>
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
            <Divider />
          </div>
          <Box
            sx={{
              flexGrow: 1,
              pt: 3,
            }}
          >
            {currentTab === "home" && (
              <TeachersTable
                teachers={teachers}
                currentPage={teachersPaginatedData.currentPage}
                totalTeachers={teachersPaginatedData.totalCount}
              />
            )}
          </Box>
        </Container>
      </Box>
    </>
  );
}
