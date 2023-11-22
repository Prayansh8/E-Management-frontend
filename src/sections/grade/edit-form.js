import toast from "react-hot-toast";
import * as Yup from "yup";
import PlusIcon from "@untitled-ui/icons-react/build/esm/Plus";
import { useFormik } from "formik";
import {
  Button,
  Card,
  CardContent,
  Stack,
  TextField,
  Unstable_Grid2 as Grid,
  MenuItem,
  InputAdornment,
  Typography,
  Divider,
  Autocomplete,
  SvgIcon,
} from "@mui/material";
import { paths } from "src/paths";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import apiCalls from "src/api";
import { useSchoolContext } from "src/contexts/school-context";
import { RouterLink } from "src/components/router-link";

export const GradeEditForm = ({ grade, editMode }) => {
  const { gradeIndexes } = useSchoolContext();
  const navigate = useNavigate();
  const [sections, setSections] = useState([]);
  const [availableClassesIndex, setAvailableClassesIndex] = useState([]);
  const [allTeachers, setAllTeachers] = useState([]);
  const [teacherIdToLabel, setTeacherIdToLabel] = useState(null);

  const getSchoolGradesList = async () => {
    const resData = await apiCalls.getGradesQuickList();
    if (resData) {
      setAvailableClassesIndex(
        gradeIndexes.filter((gradeIndex) => !resData.includes(gradeIndex[0]))
      );
    }
  };

  const getAllTeachers = async () => {
    const resData = await apiCalls.getNonPagedUsers({ role: "teacher" });
    if (resData) {
      setAllTeachers(resData);
      const idToLabel = {};
      for (let index = 0; index < resData.length; index++) {
        const teacher = resData[index];
        idToLabel[
          teacher.id
        ] = `${teacher.first_name} ${teacher.last_name} - ${teacher.phone}`;
      }
      setTeacherIdToLabel(idToLabel);
    }
  };

  const alphabets = ["A", "B", "C", "D", "E", "F", "G", "H", "I"];

  useEffect(() => {
    getAllTeachers();
    if (editMode) {
      setAvailableClassesIndex(gradeIndexes);
    } else {
      getSchoolGradesList();
      setSections([
        {
          title: "A",
          description: "",
          room: null,
          capacity: null,
          teacher: null,
        },
      ]);
    }
  }, []);

  useEffect(() => {
    if (editMode) {
      setSections(grade.sections?.reverse() || []);
    }
  }, [grade]);

  const handleSectionsUpdates = (index, property, value) => {
    const tempSections = [...sections];
    tempSections[index][property] = value;
    setSections(tempSections);
  };

  const formik = useFormik({
    initialValues: {
      level: grade.level < 13 ? grade.level : "",
      description: grade.description || "",
      flat_fee: grade.flat_fee || "",
    },
    validationSchema: Yup.object({
      level: Yup.number().max(12).min(-2).required(),
      description: Yup.string().max(2000),
      flat_fee: Yup.number(),
    }),
    onSubmit: async (values, helpers) => {
      try {
        let validSectionsData = true;
        for (let index = 0; index < sections.length; index++) {
          const section = sections[index];
          if (section.capacity <= 0) {
            toast.error(`Section ${alphabets[index]} should have Capacity betwwen 1 - 500.`);
            validSectionsData = false;
          } else if (section.title?.length !== 1) {
            toast.error(`Section ${alphabets[index]} Title should only contain 1 capitalized letter`);
            validSectionsData = false;
          }
        }
        if (!validSectionsData) {
          return false;
        }
        const gradeData = values;
        gradeData.sections = sections;
        let resData = {};
        if (grade?.id) {
          resData = await apiCalls.updateGrade(grade.id, gradeData);
          if (resData) {
            toast.success("Grade Updated");
            navigate(paths.viewClass(resData.id));
          }
        } else {
          resData = await apiCalls.createGrade(values);
          if (resData) {
            toast.success("Grade Created");
            navigate(paths.viewClass(resData.id));
          }
        }
        navigate(paths.viewClass(resData.id));
        helpers.setStatus({ success: true });
        helpers.setSubmitting(false);
      } catch (err) {
        console.error(err);
        toast.error("Something went wrong!");
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Card>
        <CardContent>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                error={!!(formik.touched.level && formik.errors.level)}
                fullWidth
                label="Select Class"
                name="level"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                select
                required
                disabled={Boolean(grade?.id)}
                value={formik.values.level}
              >
                {availableClassesIndex.map((option) => (
                  <MenuItem
                    key={option[0]}
                    selected={grade?.level === option[0]}
                    value={option[0]}
                  >
                    {option[1]}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                error={!!(formik.touched.flat_fee && formik.errors.flat_fee)}
                helpertext={formik.touched.flat_fee && formik.errors.flat_fee}
                label="Monthly Fee"
                name="flat_fee"
                type="number"
                required
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.flat_fee}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">₹</InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                error={
                  !!(formik.touched.description && formik.errors.description)
                }
                helpertext={
                  formik.touched.description && formik.errors.description
                }
                name="description"
                label="Description"
                multiline
                rows={3}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.description}
              />
            </Grid>
          </Grid>

          <Typography variant="h5" sx={{ pt: 3 }}>
            Sections
          </Typography>
          {sections.map((section, index) => (
            <span key={index}>
              <Grid sx={{ pt: 4 }} container spacing={2}>
                <Grid item xs={6} md={3}>
                  <TextField
                    fullWidth
                    required
                    label="Title"
                    type="text"
                    disabled
                    onChange={(e) =>
                      handleSectionsUpdates(index, "title", e.target.value)
                    }
                    value={section.title || alphabets[index]}
                  />
                </Grid>
                <Grid item xs={6} md={3}>
                  <TextField
                    fullWidth
                    required
                    label="Capacity"
                    type="text"
                    onChange={(e) =>
                      handleSectionsUpdates(index, "capacity", e.target.value)
                    }
                    value={section.capacity}
                  />
                </Grid>
                <Grid item xs={6} sm={3} md={3}>
                  <TextField
                    fullWidth
                    label="Room Number"
                    type="text"
                    onChange={(e) =>
                      handleSectionsUpdates(index, "room", e.target.value)
                    }
                    value={section.room}
                  />
                </Grid>
                <Grid item xs={6} md={3}>
                  {teacherIdToLabel && (
                    <Autocomplete
                      id="select-assign-teacher"
                      fullWidth
                      options={allTeachers.map((teacher) => ({
                        label: `${teacher.first_name} ${teacher.last_name} - ${teacher.phone}`,
                        id: teacher.id,
                      }))}
                      onChange={(e, value) =>
                        handleSectionsUpdates(index, "teacher", value.id)
                      }
                      defaultValue={
                        section.teacher ? teacherIdToLabel[section.teacher] : ""
                      }
                      renderInput={(params) => (
                        <TextField {...params} label="Select Class Teacher" />
                      )}
                    />
                  )}
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    multiline
                    rows={2}
                    label="Description"
                    type="text"
                    onChange={(e) =>
                      handleSectionsUpdates(
                        index,
                        "description",
                        e.target.value
                      )
                    }
                    value={section.description}
                  />
                </Grid>
              </Grid>
              {sections.length - 1 !== index && <Divider sx={{ pt: 4 }} />}
            </span>
          ))}

          <Stack sx={{ pt: 2 }} direction="row" justifyContent="space-between">
            <Stack spacing={1}></Stack>
            <Stack alignItems="center" direction="row" spacing={2}>
              <Button
                startIcon={
                  <SvgIcon>
                    <PlusIcon />
                  </SvgIcon>
                }
                variant="contained"
                onClick={() =>
                  setSections([
                    ...sections,
                    {
                      title: alphabets[sections.length],
                      description: "",
                      room: null,
                      capacity: null,
                      teacher: null,
                    },
                  ])
                }
              >
                Add New Section
              </Button>
            </Stack>
          </Stack>
        </CardContent>
        <Stack
          direction={{
            xs: "column",
            sm: "row",
          }}
          flexWrap="wrap"
          justifyContent={"end"}
          spacing={3}
          sx={{ p: 3 }}
        >
          <Button
            color="inherit"
            component={RouterLink}
            disabled={formik.isSubmitting}
            href={paths.classes}
          >
            Cancel
          </Button>
          <Button
            disabled={formik.isSubmitting}
            type="submit"
            variant="contained"
          >
            {grade?.id ? "Update" : "Create"}
          </Button>
        </Stack>
      </Card>
    </form>
  );
};
