import React, { useState } from "react";
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
  InputAdornment,
  IconButton,
  FormHelperText,
} from "@mui/material";
import { Seo } from "src/components/seo";
import apiCalls from "src/api";
import { toast } from "react-hot-toast";
import { useFormik } from "formik";
import { useNavigate } from "react-router";
import { DatePicker } from "@mui/x-date-pickers";
import { paths } from "src/paths";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { capitalizeFirstLetter } from "src/utils";

export default function AddTeacher() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const formik = useFormik({
    initialValues: {
      first_name: "",
      last_name: "",
      email: "",
      dob: "1999-08-24",
      gender: "male",
      phone: "",
      password: "",
      confirm_password: "",
    },
    validationSchema: Yup.object({
      first_name: Yup.string().required("First name is required"),
      last_name: Yup.string().required("Last name is required"),
      email: Yup.string().email(),
      dob: Yup.date(),
      gender: Yup.string(),
      phone: Yup.string().length(10).required("Phone is required"),
      password: Yup.string().required("Password is required"),
      confirm_password: Yup.string().oneOf(
        [Yup.ref("password"), null],
        "Passwords must match"
      ),
    }),
    onSubmit: async (values) => {
      try {
        const userData = values;
        userData.role = "teacher";
        userData.username = userData.phone;
        userData.phone = "+91" + userData.phone;
        userData.first_name = capitalizeFirstLetter(userData.first_name);
        userData.last_name = capitalizeFirstLetter(userData.last_name);
        const resData = await apiCalls.createUsers(values);
        if (resData) {
          navigate(paths.editTeacher(resData.id));
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
      <Seo title="Add Teacher Page" />
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
              <Typography variant="h4">Add Teacher</Typography>
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
                      TextField
                      error={
                        !!(
                          formik.touched.first_name && formik.errors.first_name
                        )
                      }
                      helpertext={
                        formik.touched.first_name && formik.errors.first_name
                      }
                      name="first_name"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.first_name}
                      placeholder="Samarth"
                      required
                    />
                    <FormHelperText
                      sx={{
                        color: "text.danger",
                      }}
                    >
                      {formik.touched.first_name && formik.errors.first_name}
                    </FormHelperText>
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
                      error={
                        !!(formik.touched.last_name && formik.errors.last_name)
                      }
                      helpertext={
                        formik.touched.last_name && formik.errors.last_name
                      }
                      placeholder="Sharma"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.last_name}
                      required
                    />
                    <FormHelperText
                      sx={{
                        color: "text.danger",
                      }}
                    >
                      {formik.touched.last_name && formik.errors.last_name}
                    </FormHelperText>
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
                      error={!!(formik.touched.gender && formik.errors.gender)}
                      helpertext={formik.touched.gender && formik.errors.gender}
                      variant="outlined"
                      name="gender"
                      required
                      SelectProps={{ native: true }}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.gender}
                    >
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </TextField>
                    <FormHelperText
                      sx={{
                        color: "text.danger",
                      }}
                    >
                      {formik.touched.gender && formik.errors.gender}
                    </FormHelperText>
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
                      name="dob"
                      value={formik.values.dob}
                      error={!!(formik.touched.dob && formik.errors.dob)}
                      helpertext={formik.touched.dob && formik.errors.dob}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      renderInput={(params) => (
                        <TextField {...params} variant="outlined" />
                      )}
                      inputFormat="dd/MM/yyyy"
                    />
                    <FormHelperText
                      sx={{
                        color: "text.danger",
                      }}
                    >
                      {formik.touched.dob && formik.errors.dob}
                    </FormHelperText>
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
                      error={!!(formik.touched.email && formik.errors.email)}
                      helpertext={formik.touched.email && formik.errors.email}
                      placeholder="samarth@apnichanderi.in"
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      value={formik.values.email}
                    />
                    <FormHelperText
                      sx={{
                        color: "text.danger",
                      }}
                    >
                      {formik.touched.email && formik.errors.email}
                    </FormHelperText>
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
                      required
                      error={!!(formik.touched.phone && formik.errors.phone)}
                      helpertext={formik.touched.phone && formik.errors.phone}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.phone}
                      type="number"
                    />
                    <FormHelperText
                      sx={{
                        color: "text.danger",
                      }}
                    >
                      {formik.touched.phone && formik.errors.phone}
                    </FormHelperText>
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
                      Password
                    </FormLabel>
                    <OutlinedInput
                      name="password"
                      required
                      placeholder="***************"
                      error={
                        !!(formik.touched.password && formik.errors.password)
                      }
                      helpertext={
                        formik.touched.password && formik.errors.password
                      }
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.password}
                      type={showPassword ? "text" : "password"}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                    <FormHelperText
                      sx={{
                        color: "text.danger",
                      }}
                    >
                      {formik.touched.password && formik.errors.password}
                    </FormHelperText>
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
                      Confirm Password
                    </FormLabel>
                    <OutlinedInput
                      name="confirm_password"
                      required
                      placeholder="***************"
                      error={
                        !!(
                          formik.touched.confirm_password &&
                          formik.errors.confirm_password
                        )
                      }
                      helpertext={
                        formik.touched.confirm_password &&
                        formik.errors.confirm_password
                      }
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.confirm_password}
                      type={showConfirmPassword ? "text" : "password"}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() =>
                              setShowConfirmPassword(!showConfirmPassword)
                            }
                          >
                            {showConfirmPassword ? (
                              <Visibility />
                            ) : (
                              <VisibilityOff />
                            )}
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                    <FormHelperText
                      sx={{
                        color: "text.danger",
                      }}
                    >
                      {formik.touched.confirm_password && formik.errors.confirm_password}
                    </FormHelperText>
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
                  Create Teacher
                </Button>
              </Box>
            </form>
          </Card>
        </Box>
      </Container>
    </>
  );
}
