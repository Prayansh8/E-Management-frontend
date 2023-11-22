import React, { useEffect, useState } from "react";
import {
  Container,
  Grid,
  Stack,
  Box,
  Typography,
} from "@mui/material";
import { Seo } from "src/components/seo";
import apiCalls from "src/api";
import { GradeEditForm } from "../../sections/grade/edit-form";
import { useParams } from 'react-router-dom';
import { useSchoolContext } from "src/contexts/school-context";

export default function EditGrade() {

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
  }, []);

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
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  spacing={4}
                >
                  <Stack spacing={1}>
                    <Typography variant="h4">Edit {gradeIndexToLabel[grade?.level]}</Typography>
                  </Stack>
                </Stack>
            </Grid>
          </Box>
          {grade?.id && <GradeEditForm grade={grade} editMode={true} />}
        </Container>
      </Box>
    </>
  );
}
