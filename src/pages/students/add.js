import React from "react";
import * as Yup from "yup";
import {
  Box,
  Button,
  Container,
  Stack,
  Typography,
  FormControl,
  FormLabel,
  OutlinedInput,
  Unstable_Grid2 as Grid,
  TextField,
  Card,
} from "@mui/material";
import { Seo } from "src/components/seo";
import apiCalls from "src/api";
import { toast } from "react-hot-toast";
import { useFormik } from "formik";
import { useNavigate } from "react-router";
import { DatePicker } from "@mui/x-date-pickers";
import { paths } from "src/paths";
import { useSchoolContext } from "src/contexts/school-context";
import { capitalizeFirstLetter } from "src/utils";
import { format } from "date-fns";

export default function AddStudent() {
  const navigate = useNavigate();
  const { gradesSectionsList, gradeIndexToLabel } = useSchoolContext();

  const formik = useFormik({
    initialValues: {
      first_name: "",
      middle_name: "",
      last_name: "",
      email: "",
      phone: "",
      gender: "male",
      dob: "1999-08-24",
      grade_section: "",
    },
    validationSchema: Yup.object({
      first_name: Yup.string().required(),
      middle_name: Yup.string(),
      last_name: Yup.string().required(),
      email: Yup.string(),
      grade_section: Yup.string(),
      phone: Yup.string(),
      gender: Yup.string().required(),
      dob: Yup.date().required(),
    }),
    onSubmit: async (values) => {
      try {
        const studentData = values;
        studentData.first_name = capitalizeFirstLetter(studentData.first_name);
        studentData.middle_name = capitalizeFirstLetter(
          studentData.middle_name
        );
        studentData.last_name = capitalizeFirstLetter(studentData.last_name);
        const resData = await apiCalls.createStudents(values);
        if (resData) {
          navigate(paths.editStudent(resData.id));
          toast.success("Success");
        }
      } catch (error) {
        console.error("Error submitting form:", error);
        toast.error("Failed");
      }
    },
  });

  return (
    <>
      <Seo title="Add Student Page" />
      <Container maxWidth="xl">
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            py: 5,
          }}
        >
          <Grid>
            <Stack spacing={1}>
              <Typography variant="h4">Add Student</Typography>
            </Stack>
          </Grid>
        </Box>

        <Box>
          <Card sx={{ p: 4 }}>
            <form onSubmit={formik.handleSubmit}>
              <Grid container spacing={3}>
                <Grid xs={12} sm={6} md={4}>
                  <FormControl fullWidth>
                    <FormLabel
                      sx={{
                        color: "text.primary",
                        mb: 1,
                      }}
                    >
                      First Name
                    </FormLabel>

                    <OutlinedInput
                      type="text"
                      name="first_name"
                      onChange={formik.handleChange}
                      value={formik.values.first_name}
                      placeholder="Samarth"
                      required
                    />
                  </FormControl>
                </Grid>
                <Grid xs={12} sm={6} md={4}>
                  <FormControl fullWidth>
                    <FormLabel
                      sx={{
                        color: "text.primary",
                        mb: 1,
                      }}
                    >
                      Middle Name
                    </FormLabel>
                    <OutlinedInput
                      type="text"
                      name="middle_name"
                      placeholder="Kumar"
                      onChange={formik.handleChange}
                      value={formik.values.middle_name}
                    />
                  </FormControl>
                </Grid>
                <Grid xs={12} sm={6} md={4}>
                  <FormControl fullWidth>
                    <FormLabel
                      sx={{
                        color: "text.primary",
                        mb: 1,
                      }}
                    >
                      Last Name
                    </FormLabel>
                    <OutlinedInput
                      type="text"
                      name="last_name"
                      placeholder="Sharma"
                      onChange={formik.handleChange}
                      value={formik.values.last_name}
                      required
                    />
                  </FormControl>
                </Grid>
                <Grid xs={12} sm={6} md={4}>
                  <FormControl fullWidth>
                    <FormLabel
                      sx={{
                        color: "text.primary",
                        mb: 1,
                      }}
                    >
                      Gender
                    </FormLabel>
                    <TextField
                      type="text"
                      fullWidth
                      select
                      variant="outlined"
                      name="gender"
                      SelectProps={{ native: true }}
                      onChange={formik.handleChange}
                      value={formik.values.gender}
                    >
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </TextField>
                  </FormControl>
                </Grid>
                <Grid xs={12} sm={6} md={4}>
                  <FormControl fullWidth>
                    <FormLabel
                      sx={{
                        color: "text.primary",
                        mb: 1,
                      }}
                    >
                      Date of Birth
                    </FormLabel>
                    <DatePicker
                      type="date"
                      value={formik.values.dob}
                      required
                      onChange={(date) =>
                        formik.setFieldValue("dob", format(date, "yyyy-MM-dd"))
                      }
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          value={formik.values.dob}
                          variant="outlined"
                        />
                      )}
                      inputFormat="dd/MM/yyyy"
                    />
                  </FormControl>
                </Grid>
                <Grid xs={12} sm={6} md={4}>
                  <FormControl fullWidth>
                    <FormLabel
                      sx={{
                        color: "text.primary",
                        mb: 1,
                      }}
                    >
                      Class Section
                    </FormLabel>
                    <TextField
                      type="text"
                      fullWidth
                      select
                      SelectProps={{ native: true }}
                      variant="outlined"
                      name="grade_section"
                      onChange={formik.handleChange}
                      value={formik.values.grade_section}
                    >
                      <option>No Class Selected</option>
                      {gradesSectionsList.map((gradeSection) => (
                        <option key={gradeSection.id} value={gradeSection.id}>
                          {gradeIndexToLabel[gradeSection?.grade__level]}{" "}
                          {gradeSection.title}
                        </option>
                      ))}
                    </TextField>
                  </FormControl>
                </Grid>
                <Grid xs={12} sm={6} md={4}>
                  <FormControl fullWidth>
                    <FormLabel
                      sx={{
                        color: "text.primary",
                        mb: 1,
                      }}
                    >
                      Email
                    </FormLabel>
                    <OutlinedInput
                      name="email"
                      type="email"
                      placeholder="samarth@apnichanderi.in"
                      onChange={formik.handleChange}
                      value={formik.values.email}
                    />
                  </FormControl>
                </Grid>
                <Grid xs={12} sm={6} md={4}>
                  <FormControl fullWidth>
                    <FormLabel
                      sx={{
                        color: "text.primary",
                        mb: 1,
                      }}
                    >
                      Phone Number
                    </FormLabel>
                    <OutlinedInput
                      name="phone"
                      placeholder="7999893361"
                      onChange={formik.handleChange}
                      value={formik.values.phone}
                      type="tel"
                    />
                  </FormControl>
                </Grid>
              </Grid>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  mt: 3,
                }}
              >
                <Button
                  type="submit"
                  fullWidth
                  size="large"
                  variant="contained"
                >
                  Create Student
                </Button>
              </Box>
            </form>
          </Card>
        </Box>
      </Container>
    </>
  );
}
