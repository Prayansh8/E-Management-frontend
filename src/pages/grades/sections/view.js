import React from "react";
import {
  Container,
  Grid,
  Stack,
  Box,
  Typography,
  Button,
} from "@mui/material";
import { Seo } from "src/components/seo";
import { useParams } from "react-router-dom";
import { useSchoolContext } from "src/contexts/school-context";
import { RouterLink } from "src/components/router-link";
import { paths } from "src/paths";
import { StudentsTable } from "src/sections/student/table";
import { StudentStats } from "src/sections/student/stats";

export default function ViewGradeSection() {
  const { id } = useParams();
  const { gradeIndexToLabel, sectionsById } = useSchoolContext();

  return (
    <>
      <Seo title="Add New Class" />
      <Box>
        <Container maxWidth={"xl"}>
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              py: 5,
            }}
          >
            <Grid item xs={12}>
              <Stack direction="row" justifyContent="space-between" spacing={4}>
                <Stack spacing={1}>
                  <Typography variant="h4">
                    {gradeIndexToLabel[sectionsById[id]?.grade__level]}{" "}
                    {sectionsById[id]?.title}
                  </Typography>
                </Stack>
                <Stack direction="row" spacing={4}>
                  <Button
                    variant="contained"
                    component={RouterLink}
                    href={paths.takeClassSectionAttendance(id)}
                  >
                    Attendance
                  </Button>
                </Stack>
              </Stack>
            </Grid>
          </Box>
          <Box>
            <StudentStats defaultParams={{ grade_section: id }} />
          </Box>
          <Box sx={{ pt: 2 }}>
            <StudentsTable defaultParams={{ grade_section: id }} />
          </Box>
        </Container>
      </Box>
    </>
  );
}
