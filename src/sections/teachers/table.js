import PropTypes from "prop-types";
import Edit02Icon from "@untitled-ui/icons-react/build/esm/Edit02";
import SearchMdIcon from "@untitled-ui/icons-react/build/esm/SearchMd";
import {
  Avatar,
  Button,
  Card,
  Checkbox,
  Divider,
  IconButton,
  InputAdornment,
  OutlinedInput,
  Stack,
  SvgIcon,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import { Scrollbar } from "src/components/scrollbar";
import { RouterLink } from "src/components/router-link";
import { paths } from "src/paths";
import { useSchoolContext } from "src/contexts/school-context";
import { SeverityPill } from "src/components/severity-pill";
import { Link } from "react-router-dom";

export const TeachersTable = ({ teachers, currentPage, totalTeachers }) => {
  const { sectionsById, gradeIndexToLabel } = useSchoolContext();

  return (
    <>
      <Card>
        <Divider />
        <Stack
          alignItems="center"
          direction="row"
          flexWrap="wrap"
          gap={2}
          sx={{ p: 3 }}
        >
          <OutlinedInput
            placeholder="Search Teachers"
            startAdornment={
              <InputAdornment position="start">
                <SvgIcon>
                  <SearchMdIcon />
                </SvgIcon>
              </InputAdornment>
            }
            sx={{ flexGrow: 1 }}
          />
        </Stack>
        <Scrollbar>
          <Table sx={{ minWidth: 700 }}>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox />
                </TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Classes</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {teachers.map((teacher) => {
                return (
                  <TableRow hover key={teacher.id}>
                    <TableCell padding="checkbox">
                      <Checkbox />
                    </TableCell>
                    <TableCell>
                      <Stack alignItems="center" direction="row" spacing={1}>
                        <Avatar
                          src={teacher.profile_picture}
                          sx={{
                            height: 42,
                            width: 42,
                          }}
                        />
                        <div>
                          <Link
                            to={paths.viewTeacher(teacher.id)}
                            style={{ color: "inherit", textDecoration: "none" }}
                          >
                            {teacher.first_name} {teacher.last_name}
                          </Link>
                          <Typography color="text.secondary" variant="body2">
                            {teacher.gender[0].toUpperCase()} -{" "}
                            {teacher.phone.split("+91")[1]}{" "}
                            {teacher.email ? `- ${teacher.email}` : ""}
                          </Typography>
                        </div>
                      </Stack>
                    </TableCell>
                    <TableCell>
                      <Stack spacing={1} direction={"row"}>
                        {teacher.role_specific_data?.associted_grade_sections
                          ? teacher.role_specific_data.associted_grade_sections.map(
                              (gradeSectionId) => (
                                <Button
                                  sx={{ p: 0 }}
                                  variant="link"
                                  key={gradeSectionId}
                                  component={RouterLink}
                                  href={paths.viewClassSection(gradeSectionId)}
                                >
                                  <SeverityPill sx={{ cursor: "pointer" }}>
                                    {
                                      gradeIndexToLabel[
                                        sectionsById[gradeSectionId]
                                          ?.grade__level
                                      ]
                                    }
                                    {sectionsById[gradeSectionId]?.title}
                                  </SeverityPill>
                                </Button>
                              )
                            )
                          : "Not Assigned"}
                      </Stack>
                    </TableCell>
                    <TableCell align="right">
                      <IconButton
                        component={RouterLink}
                        href={paths.viewTeacher(teacher.id)}
                      >
                        <SvgIcon>
                          <Edit02Icon />
                        </SvgIcon>
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Scrollbar>
        <TablePagination
          component="div"
          count={totalTeachers}
          onPageChange={() => {}}
          onRowsPerPageChange={() => {}}
          page={currentPage - 1}
          rowsPerPage={10}
          rowsPerPageOptions={[10, 25, 50]}
        />
      </Card>
    </>
  );
};

TeachersTable.propTypes = {
  teachers: PropTypes.array,
  currentPage: PropTypes.number,
  totalTeachers: PropTypes.number,
};

TeachersTable.defaultProps = {
  teachers: [],
  currentPage: 0,
  totalTeachers: 0,
};
