import React, { useEffect, useState } from "react";
import {
  Container,
  Grid,
  Stack,
  Box,
  Typography,
  Divider,
  Card,
  CardContent,
  TextField,
  Autocomplete,
} from "@mui/material";
import { Seo } from "src/components/seo";
import { useSchoolContext } from "src/contexts/school-context";
import apiCalls from "src/api";
import { toast } from "react-hot-toast";

export default function AssignTeacher() {
  const { gradeIndexToLabel, gradesSectionsList } = useSchoolContext();
  const [allTeachers, setAllTeachers] = useState([]);
  const [teacherIdToLabel, setTeacherIdToLabel] = useState(null);

  const getAllTeachers = async () => {
    const resData = await apiCalls.getNonPagedUsers({ role: "teacher" });
    if (resData) {
      setAllTeachers(resData);
      const idToLabel = {};
      for (let index = 0; index < resData.length; index++) {
        const teacher = resData[index];
        idToLabel[teacher.id] = `${teacher.first_name} ${
          teacher.last_name
        } - ${teacher.gender[0].toUpperCase()} - ${teacher.phone}`;
      }
      setTeacherIdToLabel(idToLabel);
    }
  };

  const assignTeacherToClassSection = async (classSectionId, teacherId) => {
    const resData = await apiCalls.updateGradesSection(classSectionId, {
      teacher: teacherId,
    });
    if (resData) {
      toast.success("Class Teacher Updated");
    } else {
      toast.error("Failed to Update Class Teacher");
    }
  };

  useEffect(() => {
    getAllTeachers();
  }, []);

  return (
    <>
      <Seo title="Assign Teacher" />
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
                  <Typography variant="h4">Assign Class Teacher</Typography>
                </Stack>
              </Stack>
            </Grid>
          </Box>
          <Box>
            <Card
              sx={{
                px: 4,
                pt: 5,
                pb: 0,
              }}
            >
              {teacherIdToLabel && gradesSectionsList.map((gradeSection, index) => (
                <CardContent sx={{ pt: 0 }} key={gradeSection.id}>
                  <Grid sx={{ pb: 2 }} container spacing={3}>
                    <Grid item xs={12} md={4}>
                      <Typography variant="h6" sx={{ pt: 2 }}>
                        {gradeIndexToLabel[gradeSection.grade__level]}{" "}
                        {gradeSection.title}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={12} md={8}>
                      <Autocomplete
                        id="select-assign-teacher"
                        fullWidth
                        options={allTeachers.map((teacher) => ({
                          label: `${teacher.first_name} ${
                            teacher.last_name
                          } - ${teacher.gender[0].toUpperCase()} - ${
                            teacher.phone
                          }`,
                          id: teacher.id,
                        }))}
                        onChange={(e, value) =>
                          assignTeacherToClassSection(gradeSection.id, value.id)
                        }
                        defaultValue={teacherIdToLabel[gradeSection?.teacher]}
                        renderInput={(params) => (
                          <TextField {...params} label="Select Teacher" />
                        )}
                      />
                    </Grid>
                  </Grid>
                  {gradesSectionsList.length - 1 !== index && <Divider />}
                </CardContent>
              ))}
            </Card>
          </Box>
        </Container>
      </Box>
    </>
  );
}
