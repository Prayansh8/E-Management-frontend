import PropTypes from "prop-types";
import SearchMdIcon from "@untitled-ui/icons-react/build/esm/SearchMd";
import {
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
} from "@mui/material";
import { Scrollbar } from "src/components/scrollbar";
import { RouterLink } from "src/components/router-link";
import { paths } from "src/paths";
import { useEffect, useState } from "react";
import {
  breakPaginatedResponse,
  getUserTitleName,
  isDateTodayYesterdayOrWeekday,
} from "src/utils";
import { format } from "date-fns";
import apiCalls from "src/api";
import { useSchoolContext } from "src/contexts/school-context";
import Eye from "@untitled-ui/icons-react/build/esm/Eye";
import { SeverityPill } from "src/components/severity-pill";
import { Link } from "react-router-dom";

export const GradeAttendanceGroupTable = ({ defaultParams }) => {
  const { gradeIndexToLabel, sectionsById } = useSchoolContext();
  const [
    gradeSectionAttendancesPaginatedData,
    setGradeSectionAttendancesPaginatedData,
  ] = useState({});

  const getGradesSectionAttendancesList = async (page = 1) => {
    const resData = await apiCalls.getGradesSectionAttendances({
      page,
      ...defaultParams,
    });
    if (resData) {
      setGradeSectionAttendancesPaginatedData(breakPaginatedResponse(resData));
    }
  };

  useEffect(() => {
    getGradesSectionAttendancesList();
  }, []);

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
            placeholder="Search Attendance"
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
                <TableCell>Timestamp</TableCell>
                <TableCell>Class Section</TableCell>
                <TableCell align="center">Attendance</TableCell>
                <TableCell align="center">Absent</TableCell>
                <TableCell align="center">On Leave</TableCell>
                <TableCell>Taken By</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {gradeSectionAttendancesPaginatedData.data?.map(
                (attendanceGroup) => {
                  return (
                    <TableRow hover key={attendanceGroup.id}>
                      <TableCell padding="checkbox">
                        <Checkbox />
                      </TableCell>
                      <TableCell>
                        {format(
                          new Date(attendanceGroup.timestamp),
                          "dd MMM yyyy - hh:mm a"
                        )}{" "}
                        <SeverityPill>
                          {isDateTodayYesterdayOrWeekday(
                            new Date(attendanceGroup.timestamp)
                          )}
                        </SeverityPill>
                      </TableCell>
                      <TableCell>
                        <Link
                          to={paths.viewClassSection(
                            attendanceGroup.grade_section
                          )}
                          style={{ color: "inherit", textDecoration: "none" }}
                        >
                          {
                            gradeIndexToLabel[
                              sectionsById[attendanceGroup.grade_section]
                                ?.grade__level
                            ]
                          }{" "}
                          {sectionsById[attendanceGroup.grade_section]?.title}
                        </Link>
                      </TableCell>
                      <TableCell align="center">
                        {attendanceGroup?.attendance_summary?.present} /{" "}
                        {attendanceGroup?.attendance_summary?.total}
                      </TableCell>
                      <TableCell align="center">
                        {attendanceGroup?.attendance_summary?.absent}
                      </TableCell>
                      <TableCell align="center">
                        {attendanceGroup?.attendance_summary?.on_leave}
                      </TableCell>
                      <TableCell>
                        <Link
                          to={paths.viewTeacher(attendanceGroup.taken_by.id)}
                          style={{ color: "inherit", textDecoration: "none" }}
                        >
                          {getUserTitleName(attendanceGroup?.taken_by)}
                        </Link>
                      </TableCell>
                      <TableCell align="right">
                        <IconButton
                          component={RouterLink}
                          href={paths.viewAttendance(attendanceGroup.id)}
                        >
                          <SvgIcon>
                            <Eye />
                          </SvgIcon>
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  );
                }
              )}
            </TableBody>
          </Table>
        </Scrollbar>
        <TablePagination
          component="div"
          count={
            gradeSectionAttendancesPaginatedData.totalCount
              ? gradeSectionAttendancesPaginatedData.totalCount
              : 0
          }
          onPageChange={(e, page) => {
            getGradesSectionAttendancesList(page + 1);
          }}
          onRowsPerPageChange={() => {}}
          page={
            (gradeSectionAttendancesPaginatedData.currentPage
              ? gradeSectionAttendancesPaginatedData.currentPage
              : 1) - 1
          }
          rowsPerPage={10}
          rowsPerPageOptions={[10, 25, 50]}
        />
      </Card>
    </>
  );
};

GradeAttendanceGroupTable.propTypes = {
  defaultParams: PropTypes.object,
};

GradeAttendanceGroupTable.defaultProps = {
  defaultParams: {},
};
