import React, { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import DotsVerticalIcon from "@untitled-ui/icons-react/build/esm/DotsVertical";
import {
  Grid,
  Box,
  Container,
  Stack,
  Avatar,
  Card,
  IconButton,
  SvgIcon,
  Menu,
  MenuItem,
  menuItemClasses,
  Divider,
} from "@mui/material";
import { Seo } from "src/components/seo";
import { useSchoolContext } from "src/contexts/school-context";
import { useParams } from "react-router-dom";
import { SeverityPill } from "src/components/severity-pill";
import { format } from "date-fns";
import { toast } from "react-hot-toast";
import { usePopover } from "src/hooks/use-popover";
import apiCalls from "src/api";
import { ConfirmationModal } from "src/components/confirmation-modal";

export default function GradeAttendanceDetails() {
  const { gradeIndexToLabel, sectionsById } = useSchoolContext();
  const { id } = useParams();

  const [gradeSectionAttendance, setGradeSectionAttendance] = useState({});
  const [attendanceUpdatedAt, setAttendanceUpdatedAt] = useState(null);

  const getGradesSectionAttendanceDetails = async () => {
    const resData = await apiCalls.getGradesSectionAttendanceDetails(id);
    if (resData) {
      setGradeSectionAttendance(resData);
    }
  };

  useEffect(() => {
    getGradesSectionAttendanceDetails();
  }, [attendanceUpdatedAt]);

  return (
    <>
      <Seo title="Grade Attendance Details Page" />
      <Container maxWidth="xl">
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            py: 4,
          }}
        >
          <Grid>
            <Stack spacing={1}>
              <Typography variant="h4">
                {
                  gradeIndexToLabel[
                    sectionsById[gradeSectionAttendance?.grade_section]
                      ?.grade__level
                  ]
                }{" "}
                ({sectionsById[gradeSectionAttendance?.grade_section]?.title})
                Attendence :{" "}
                {!!gradeSectionAttendance?.timestamp &&
                  format(
                    new Date(gradeSectionAttendance?.timestamp),
                    "dd/MM/yyyy hh:mm a"
                  )}
              </Typography>
            </Stack>
          </Grid>
        </Box>
        <Card
          sx={{
            p: 2,
          }}
        >
          <Typography
            sx={{
              py: 2,
            }}
            variant="h6"
          >
            {gradeSectionAttendance?.attendance_summary?.total -
              gradeSectionAttendance?.attendance_summary?.present}{" "}
            Absent Students
          </Typography>
          <Grid container spacing={1}>
            {gradeSectionAttendance?.attendance
              ?.sort((a, b) => {
                return b.status.localeCompare(a.status);
              })
              ?.filter((stuAttendance) => stuAttendance.status !== "P")
              .map((stuAttendance) => (
                <StudentCard
                  key={stuAttendance.id}
                  stuAttendance={stuAttendance}
                  attendanceUpdated={() => setAttendanceUpdatedAt(new Date())}
                />
              ))}
          </Grid>
          <Typography
            sx={{
              py: 2,
            }}
            variant="h6"
          >
            {gradeSectionAttendance?.attendance_summary?.present} Present
            Students
          </Typography>
          <Grid container spacing={1}>
            {gradeSectionAttendance?.attendance
              ?.filter((stuAttendance) => stuAttendance.status === "P")
              .map((stuAttendance) => (
                <StudentCard
                  key={stuAttendance.id}
                  stuAttendance={stuAttendance}
                  attendanceUpdated={() => setAttendanceUpdatedAt(new Date())}
                />
              ))}
          </Grid>
        </Card>
      </Container>
    </>
  );
}

const markToStatus = (mark) => {
  if (mark === "A") {
    return "Absent";
  } else if (mark === "P") {
    return "Present";
  } else {
    return "On Leave";
  }
};

function StudentCard({ stuAttendance, attendanceUpdated }) {
  const popover = usePopover();
  const [updateAttendanceTo, setUpdateAttendanceTo] = useState(null);
  const { id } = useParams();

  const pillColor = (mark) => {
    if (mark === "A") {
      return "error";
    } else if (mark === "P") {
      return "success";
    } else {
      return "warning";
    }
  };

  const updateStudentAttendance = async (updatedStatus) => {
    const resData = await apiCalls.updatedStudentMarkedAttendance(id, {
      student_attendance_id: stuAttendance.id,
      status: updatedStatus,
    });
    if (resData) {
      toast.success(
        `${studentFullName} attendance is updated as ${markToStatus(
          updatedStatus
        )}`
      );
      attendanceUpdated();
    }
  };

  const studentFullName = `${stuAttendance?.student?.first_name} ${stuAttendance?.student?.middle_name} ${stuAttendance?.student?.last_name}`;

  return (
    <Grid item xs={12} sm={6} md={4} lg={4}>
      <Card key={stuAttendance.id}>
        <Stack alignItems="center" direction="row" sx={{ p: 2 }} spacing={2}>
          <Avatar
            src={stuAttendance?.student?.profile_picture}
            sx={{
              height: 60,
              width: 60,
            }}
          />
          <Box sx={{ flexGrow: 1 }}>
            <Typography color="text.primary" variant="h6">
              {studentFullName}
            </Typography>
            <Typography color="text.secondary" gutterBottom variant="body2">
              {stuAttendance?.student?.enrollment_id}{" "}
              <SeverityPill color={pillColor(stuAttendance?.status)}>
                {markToStatus(stuAttendance?.status)}
              </SeverityPill>
            </Typography>
          </Box>
          {new Date(stuAttendance.created_at).getDate() ===
            new Date().getDate() && (
            <IconButton onClick={popover.handleOpen} ref={popover.anchorRef}>
              <SvgIcon fontSize="small">
                <DotsVerticalIcon />
              </SvgIcon>
            </IconButton>
          )}
        </Stack>
      </Card>
      <UpdateAttendanceMenu
        anchorEl={popover.anchorRef.current}
        onClose={popover.handleClose}
        open={popover.open}
        currentlyMarked={stuAttendance?.status}
        updateAttendanceAs={(updatedMark) => setUpdateAttendanceTo(updatedMark)}
      />
      <ConfirmationModal
        open={!!updateAttendanceTo}
        title={"Update Attendance"}
        descriptions={[
          <>
            Are you sure want to update attendance for student{" "}
            <b>{studentFullName}</b> as{" "}
            <b>{markToStatus(updateAttendanceTo)}</b>.
          </>,
        ]}
        onClose={() => {
          setUpdateAttendanceTo(null);
          popover.handleClose();
        }}
        confirmText={"Update"}
        confirmAction={() => {
          setUpdateAttendanceTo(null);
          popover.handleClose();
          updateStudentAttendance(updateAttendanceTo);
        }}
        declineText={"Cancel"}
      />
    </Grid>
  );
}

export const UpdateAttendanceMenu = (props) => {
  const {
    anchorEl,
    onClose,
    open = false,
    currentlyMarked,
    updateAttendanceAs,
  } = props;

  return (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        horizontal: "right",
        vertical: "bottom",
      }}
      onClose={onClose}
      open={open}
      sx={{
        [`& .${menuItemClasses.root}`]: {
          fontSize: 14,
          "& svg": {
            mr: 1,
          },
        },
      }}
      transformOrigin={{
        horizontal: "right",
        vertical: "top",
      }}
    >
      <Typography
        sx={{ px: 2, fontSize: "0.75em" }}
        color="text.secondary"
        variant="body2"
      >
        Update Attendance
      </Typography>
      <Divider />
      {!(currentlyMarked === "P") && (
        <MenuItem
          onClick={() => updateAttendanceAs("P")}
          sx={{ color: "success.main" }}
        >
          {markToStatus("P")}
        </MenuItem>
      )}
      {!(currentlyMarked === "A") && (
        <MenuItem
          onClick={() => updateAttendanceAs("A")}
          sx={{ color: "error.main" }}
        >
          {markToStatus("A")}
        </MenuItem>
      )}
      {!(currentlyMarked === "L") && (
        <MenuItem
          onClick={() => updateAttendanceAs("L")}
          sx={{ color: "warning.main" }}
        >
          {markToStatus("L")}
        </MenuItem>
      )}
    </Menu>
  );
};
