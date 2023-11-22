import React, { useState, useEffect, useCallback } from "react";
import Edit02Icon from "@untitled-ui/icons-react/build/esm/Edit02";
import {
  Container,
  Grid,
  Stack,
  Box,
  Typography,
  SvgIcon,
  Divider,
  Tab,
  Tabs,
  Button,
} from "@mui/material";
import { useParams, useSearchParams } from "react-router-dom";
import { RouterLink } from "src/components/router-link";
import { useNavigate } from "react-router";
import { Seo } from "src/components/seo";
import { paths } from "src/paths";
import apiCalls from "src/api";
import { StudentFee } from "src/sections/student/fee";

export default function StudentDetails() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [currentTab, setCurrentTab] = useState("home");
  const [student, setStudent] = useState({});

  const tabs = [
    { label: "Home", value: "home" },
    { label: "Fee", value: "fee" },
  ];

  const handleTabsChange = useCallback((event, value) => {
    setCurrentTab(value);
    navigate(`?tab=${value}`);
  }, []);

  const getStudent = async () => {
    const resData = await apiCalls.getStudentDetails(id);
    if (resData) {
      setStudent(resData);
    }
  };

  useEffect(() => {
    getStudent();
  }, [id]);

  useEffect(() => {
    const selectedTab = searchParams.get("tab");
    if (["fee", "home"].includes(selectedTab)) {
      setCurrentTab(selectedTab);
    }
  }, [searchParams]);

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
                  <Typography variant="h4">
                    Dear,
                    {student.first_name} {student.middle_name}{" "}
                    {student.last_name}
                  </Typography>
                </Stack>
                <div>
                  <Stack direction="row" spacing={4}>
                    <Button
                      variant="contained"
                      component={RouterLink}
                      href={paths.editStudent(id)}
                      startIcon={
                        <SvgIcon>
                          <Edit02Icon />
                        </SvgIcon>
                      }
                    >
                      Edit
                    </Button>
                  </Stack>
                </div>
              </Stack>
            </Grid>
          </Box>
          <Stack direction={"row"} justifyContent={"space-between"}>
            <Stack>
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
            <Stack justifyContent={"end"}></Stack>
          </Stack>
          <Divider />
          <Box
            sx={{
              flexGrow: 1,
              pt: 3,
            }}
          >
            {currentTab === "home" && <Grid container>hello</Grid>}
            {currentTab === "fee" && (
              <StudentFee student={student} />
            )}
          </Box>
        </Container>
      </Box>
    </>
  );
}
