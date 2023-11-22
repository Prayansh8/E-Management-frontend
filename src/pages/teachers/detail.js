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
import { Seo } from "src/components/seo";
import apiCalls from "src/api";
import { useParams } from "react-router-dom";
import { RouterLink } from "src/components/router-link";
import { paths } from "src/paths";

export default function StudentDetails() {
  const { id } = useParams();

  const [currentTab, setCurrentTab] = useState("home");
  const [student, setStudent] = useState({});

  const tabs = [{ label: "Home", value: "home" }];

  const handleTabsChange = useCallback((event, value) => {
    setCurrentTab(value);
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
            {currentTab === "home" && <Grid container>hello</Grid>}
          </Box>
        </Container>
      </Box>
    </>
  );
}
