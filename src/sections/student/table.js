import PropTypes from "prop-types";
import Edit02Icon from "@untitled-ui/icons-react/build/esm/Edit02";
import SearchMdIcon from "@untitled-ui/icons-react/build/esm/SearchMd";
import {
  Avatar,
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
import { useEffect, useState } from "react";
import { breakPaginatedResponse, capitalizeFirstLetter } from "src/utils";
import { format, formatDistanceToNowStrict } from "date-fns";
import apiCalls from "src/api";
import { Link } from "react-router-dom";

export const StudentsTable = ({ defaultParams }) => {
  const [studentsPaginatedData, setStudentsPaginatedData] = useState({});

  const getStudents = async (page = 1) => {
    const resData = await apiCalls.getStudents({
      page,
      ...defaultParams,
    });
    if (resData) {
      setStudentsPaginatedData(breakPaginatedResponse(resData));
    }
  };

  useEffect(() => {
    getStudents();
  }, [defaultParams]);

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
            placeholder="Search Students"
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
                <TableCell>Date Of Birth</TableCell>
                <TableCell>Gender</TableCell>
                <TableCell align="center">Phone & Email</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {studentsPaginatedData.data?.map((student) => {
                return (
                  <TableRow hover key={student.id}>
                    <TableCell padding="checkbox">
                      <Checkbox />
                    </TableCell>
                    <TableCell>
                      <Stack alignItems="center" direction="row" spacing={1}>
                        <Avatar
                          src={student.profile_picture}
                          sx={{
                            height: 42,
                            width: 42,
                          }}
                        />
                        <div>
                          <Link
                            to={paths.viewStudent(student.id)}
                            style={{ color: "inherit", textDecoration: "none" }}
                          >
                            {" "}
                            {student.first_name} {student.middle_name}{" "}
                            {student.last_name}
                          </Link>
                          <Typography color="text.secondary" variant="body2">
                            {student.enrollment_id}{" "}
                            {student.roll_number && `- ${student.roll_number}`}
                          </Typography>
                        </div>
                      </Stack>
                    </TableCell>
                    <TableCell>
                      {formatDistanceToNowStrict(
                        new Date(student.date_of_birth)
                      )}{" "}
                      ({format(new Date(student.date_of_birth), "dd/MM/yyyy")})
                    </TableCell>
                    <TableCell>
                      {capitalizeFirstLetter(student.gender)}
                    </TableCell>
                    <TableCell align="center">
                      {student.phone || student.email ? (
                        <div>
                          <Typography color="inherit" variant="subtitle2">
                            {student.phone}
                          </Typography>
                          <Typography color="text.secondary" variant="body2">
                            {student.email}
                          </Typography>
                        </div>
                      ) : (
                        "-"
                      )}
                    </TableCell>
                    <TableCell align="right">
                      <IconButton
                        component={RouterLink}
                        href={paths.viewStudent(student.id)}
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
          count={
            studentsPaginatedData.totalCount
              ? studentsPaginatedData.totalCount
              : 0
          }
          onPageChange={(e, page) => {
            getStudents(page + 1);
          }}
          onRowsPerPageChange={() => {}}
          page={
            (studentsPaginatedData.currentPage
              ? studentsPaginatedData.currentPage
              : 1) - 1
          }
          rowsPerPage={10}
          rowsPerPageOptions={[10, 25, 50]}
        />
      </Card>
    </>
  );
};

StudentsTable.propTypes = {
  defaultParams: PropTypes.object,
};

StudentsTable.defaultProps = {
  defaultParams: {},
};
