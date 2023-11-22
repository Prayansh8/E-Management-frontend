import React, { useEffect, useState } from "react";
import {
  Container,
  Grid,
  Stack,
  Box,
  Typography,
  Button,
  SvgIcon,
} from "@mui/material";
import { Seo } from "src/components/seo";
import apiCalls from "src/api";
import { useParams } from 'react-router-dom';
import { useSchoolContext } from "src/contexts/school-context";
import { StudentStats } from "src/sections/student/stats";
import { StudentsTable } from "src/sections/student/table";
import { Edit } from "@mui/icons-material";
import { paths } from "src/paths";
import { RouterLink } from "src/components/router-link";

export default function ViewGrade() {

  const { id } = useParams();
  const { gradeIndexToLabel } = useSchoolContext();

  const [grade, setGrade] = useState({});

  const getGradeDetail = async () => {
    const resData = await apiCalls.getGrade(id);
    if (resData) {
      setGrade(resData);
    }
  };

  useEffect(() => {
    getGradeDetail();
  }, [id]);

  return (
    <>
      <Seo title="Class Details" />
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
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  spacing={4}
                >
                  <Stack spacing={1}>
                    <Typography variant="h4">{gradeIndexToLabel[grade?.level]}</Typography>
                  </Stack>
                  <Stack direction="row" spacing={2}>
                    <Button
                      variant="contained"
                      component={RouterLink}
                      href={paths.editClass(grade.id)}
                      startIcon={
                        <SvgIcon>
                          <Edit />
                        </SvgIcon>
                      }
                    >
                      Edit
                    </Button>
                  </Stack>
                </Stack>
            </Grid>
          </Box>
          <Box>
            <StudentStats defaultParams={{ grade: id }} />
          </Box>
          <Box sx={{pt: 2}}>
            <StudentsTable defaultParams={{ grade_section__grade: id }} />
          </Box>
        </Container>
      </Box>
    </>
  );
}
