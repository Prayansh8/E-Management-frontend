import React, { useEffect, useState, useRef } from "react";
import {
  Container,
  Grid,
  Stack,
  Box,
  Typography,
  Button,
  SvgIcon,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Divider,
} from "@mui/material";
import { Seo } from "src/components/seo";
import apiCalls from "src/api";
import { useParams } from "react-router-dom";
import { useSchoolContext } from "src/contexts/school-context";
import { RouterLink } from "src/components/router-link";
import { ManageAccounts } from "@mui/icons-material";
import { paths } from "src/paths";
import { AttendanceItemCard } from "src/pages/attendance/AttendanceItemCard";
import { clearCache, getCache, isDateToday, setCache } from "src/utils";
import { ConfirmationModal } from "src/components/confirmation-modal";
import { useNavigate } from "react-router";
import { format } from "date-fns";
import { toast } from "react-hot-toast";

export default function TakeGradeSectionAttendance() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { gradeIndexToLabel, sectionsById, setShowGloablLoader } = useSchoolContext();
  const listBottomItem = useRef(null);

  const [gradeSection, setGradeSection] = useState({});
  const [students, setStudents] = useState([]);
  const [studentsBackup, setStudentsBackup] = useState([]);
  const [markedStudents, setMarkedStudents] = useState([]);
  const [showMarkedStudents, setShowMarkedStudents] = useState(false);
  const [markedStudentToMark, setMarkedStudentToMark] = useState({});
  const [studentsById, setStudentsById] = useState({});

  const [earlierTodaysAttendance, setEarlierTodaysAttendance] = useState({
    count: 0,
  });

  const [cachedAttendanceSection, setCachedAttendanceSection] = useState(null);

  const [openResetAttendanceModal, setOpenResetAttendanceModal] =
    useState(false);
  const [openPendingAttendanceModal, setOpenPendingAttendanceModal] =
    useState(false);
  const [openSubmitAttendanceModal, setOpenSubmitAttendanceModal] =
    useState(false);
  const [attendanceResults, setAttnedanceResults] = useState([]);
  const [attendanceCreatedAt, setAttendanceCreatedAt] = useState(false);

  const getGradeSectionAllStudentsList = async () => {
    const resData = await apiCalls.getGradesSectionAllStudents(id);
    if (resData) {
      const sortedStudents = resData.sort((a, b) => {
        if (b.roll_number !== a.roll_number) {
          return b.roll_number.localeCompare(a.roll_number);
        }
        return b.enrollment_id.localeCompare(a.enrollment_id);
      });
      const tempStudentsById = {};
      for (let index = 0; index < resData.length; index++) {
        const student = resData[index];
        tempStudentsById[student.id] = student;
      }
      setStudentsById(tempStudentsById);
      setStudentsBackup(sortedStudents);
      restoreDraftSession(sortedStudents);
    }
  };

  const getTodaysAttendance = async () => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    const formattedToday = today.toISOString().split("T")[0];
    const formattedTomorrow = tomorrow.toISOString().split("T")[0];
    const resData = await apiCalls.getAttendance({
      grade_section: id,
      timestamp_after: formattedToday,
      timestamp_before: formattedTomorrow,
    });
    setEarlierTodaysAttendance(resData);
  };

  const restAttendanceState = () => {
    clearCache("attendance");
    setStudents(studentsBackup);
    setMarkedStudents([]);
    setAttnedanceResults([]);
    setMarkedStudentToMark({});
    setAttendanceCreatedAt(false);
  };

  useEffect(() => {
    setGradeSection(sectionsById[id]);
    getGradeSectionAllStudentsList();
    getTodaysAttendance();
  }, [id]);

  useEffect(() => {
    setTimeout(() => {
      if (listBottomItem.current) {
        listBottomItem.current.scrollIntoView({ behavior: "smooth" });
      }
    }, 500);
  }, [listBottomItem.current]);

  const handleMarkedStudentShowHide = () => {
    setShowMarkedStudents(!showMarkedStudents);
  };

  const moveCardToDone = (studentId, mark) => {
    setStudents(students.filter((student) => student.id !== studentId));
    const updateAttendance = markedStudents.includes(studentId);
    const attendanceTempRes = [...attendanceResults];
    const markedStudentToMarkTemp = { ...markedStudentToMark };
    markedStudentToMarkTemp[studentId] = mark;
    setMarkedStudentToMark(markedStudentToMarkTemp);
    if (updateAttendance) {
      for (let index = 0; index < attendanceTempRes.length; index++) {
        if (attendanceTempRes[index].id === studentId) {
          attendanceTempRes[index].mark = mark;
          break;
        }
      }
    } else {
      setMarkedStudents([...markedStudents, studentId]);
      attendanceTempRes.push({
        id: studentId,
        mark,
      });
    }
    const attendanceLocalObject = {
      timestamp: new Date(),
      gradeSectionId: id,
      attendance: attendanceTempRes,
    };
    setAttnedanceResults(attendanceTempRes);
    setCache("attendance", attendanceLocalObject);
    if (!attendanceCreatedAt) {
      setAttendanceCreatedAt(new Date());
    }
  };

  const restoreDraftSession = (allStudents) => {
    const cachedAttendanceLocalObject = getCache("attendance");
    if (
      cachedAttendanceLocalObject?.timestamp &&
      !isDateToday(cachedAttendanceLocalObject?.timestamp)
    ) {
      restAttendanceState();
    } else if (
      !!cachedAttendanceLocalObject?.attendance &&
      !!cachedAttendanceLocalObject?.gradeSectionId
    ) {
      setCachedAttendanceSection(cachedAttendanceLocalObject?.gradeSectionId);
      setAttnedanceResults(cachedAttendanceLocalObject.attendance);
      const markedStudentsList = cachedAttendanceLocalObject.attendance.map(
        (attendanceItem) => attendanceItem.id
      );
      setMarkedStudents(markedStudentsList);
      setStudents(
        allStudents.filter(
          (student) => !markedStudentsList.includes(student.id)
        )
      );
      setAttendanceCreatedAt(cachedAttendanceLocalObject?.timestamp);
      const markedStudentToMarkTemp = {};
      for (
        let index = 0;
        index < cachedAttendanceLocalObject.attendance?.length;
        index++
      ) {
        const attendanceTemp = cachedAttendanceLocalObject.attendance[index];
        markedStudentToMarkTemp[attendanceTemp.id] = attendanceTemp.mark;
      }
      setMarkedStudentToMark(markedStudentToMarkTemp);
      if (cachedAttendanceLocalObject.gradeSectionId !== id) {
        setOpenPendingAttendanceModal(true);
      }
    } else {
      setStudents(allStudents);
    }
  };

  const uploadAttendance = async (cachedAttendanceLocalObject) => {
    const resData = await apiCalls.saveGradesSectionAttendance(id, {
      timestamp: cachedAttendanceLocalObject.timestamp,
      attendance: cachedAttendanceLocalObject.attendance,
    });
    if (resData) {
      const timestamp = resData.timestamp;
      let savedAttendance = getCache("savedAttendance");
      savedAttendance = savedAttendance.filter(
        (savedObj) => savedObj.timestamp !== timestamp
      );
      setCache("savedAttendance", savedAttendance);
      toast.success(`${gradeIndexToLabel[gradeSection?.grade__level]}
      ${gradeSection.title} Attendance Updated`);
    }
    return resData;
  };

  const submitAttendance = async () => {
    setShowGloablLoader(true);
    const cachedAttendanceLocalObject = getCache("attendance");
    const savedAttendance = getCache("savedAttendance");
    savedAttendance.push(cachedAttendanceLocalObject);
    setCache("savedAttendance", savedAttendance);
    toast.success("Attendance Save Locally");
    try {
      const resData = await uploadAttendance(cachedAttendanceLocalObject);
      if (resData) {
        restAttendanceState();
        setShowGloablLoader(false);
        navigate(paths.viewClassSection(id));
      } else {
        toast.error("Something Went Wrong!");
        setShowGloablLoader(false);
        return;
      }
    } catch (error) {
      console.log(error);
    }
    setShowGloablLoader(false);
  };

  return (
    <>
      <Seo title="Take Class Section Attendance" />
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
                  <Typography variant="h4">
                    {gradeIndexToLabel[gradeSection?.grade__level]}{" "}
                    {gradeSection.title} Attendance
                  </Typography>
                </Stack>

                <Stack direction="row" spacing={4}>
                  <Button
                    variant="contained"
                    component={RouterLink}
                    href={paths.takeClassSectionAttendance(id)}
                    startIcon={
                      <SvgIcon>
                        <ManageAccounts />
                      </SvgIcon>
                    }
                  >
                    History
                  </Button>
                </Stack>
              </Stack>
            </Grid>
          </Box>
          <Box sx={{ pb: 2 }}>
            <Grid container>
              <Grid item sm={2} lg={3}></Grid>
              <Grid xs={12} sm={8} lg={6} item>
                {students.length !== 0 &&
                  students.map((student) => (
                    <AttendanceItemCard
                      key={student.id}
                      markedAction={moveCardToDone}
                      student={student}
                    />
                  ))}

                <Accordion
                  sx={{
                    p: 1,
                    my: 2,
                    borderRadius: 1,
                  }}
                  expanded={showMarkedStudents}
                  onChange={() => handleMarkedStudentShowHide()}
                >
                  <AccordionSummary>
                    <Typography variant="h6">
                      Show Marked Students ({markedStudents.length})
                    </Typography>
                  </AccordionSummary>
                  <Divider />
                  <AccordionDetails sx={{ p: 0 }}>
                    {markedStudents.length !== 0 &&
                      markedStudents.map((studentId) => (
                        <AttendanceItemCard
                          key={studentId}
                          markedAction={moveCardToDone}
                          student={studentsById[studentId]}
                          previousMark={markedStudentToMark[studentId]}
                        />
                      ))}
                  </AccordionDetails>
                </Accordion>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Button
                      sx={{
                        mt: 2,
                      }}
                      fullWidth
                      color="error"
                      variant="contained"
                      disabled={markedStudents.length === 0}
                      onClick={() => setOpenResetAttendanceModal(true)}
                    >
                      Reset
                    </Button>
                  </Grid>
                  <Grid item xs={6}>
                    <Button
                      sx={{
                        mt: 2,
                      }}
                      fullWidth
                      variant="contained"
                      disabled={students.length !== 0}
                      onClick={() => setOpenSubmitAttendanceModal(true)}
                    >
                      Save
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item sm={2} lg={3}></Grid>
            </Grid>
          </Box>
          <ConfirmationModal
            open={openResetAttendanceModal}
            title={"Reset Attendance Draft"}
            descriptions={[
              <>
                <Typography variant="h6">
                  Class : {gradeIndexToLabel[gradeSection?.grade__level]} (
                  {gradeSection?.title})
                </Typography>
              </>,
              <>
                <Typography variant="h6">
                  Saved Time :{" "}
                  {format(new Date(attendanceCreatedAt), "dd/MM/yyyy hh:mm a")}
                </Typography>
              </>,
              <>
                <Typography>
                  Attendance Taken of <b>{markedStudents.length}</b> students
                  and Remaining of <b>{students.length}</b> students
                </Typography>
              </>,
            ]}
            onClose={() => setOpenResetAttendanceModal(false)}
            confirmText={"Reset"}
            confirmAction={() => {
              restAttendanceState();
              setOpenResetAttendanceModal(false);
            }}
          />
          <ConfirmationModal
            open={openPendingAttendanceModal}
            title={"Previous attendance submission pending"}
            descriptions={[
              <>
                <Typography variant="h6">
                  Class :{" "}
                  {
                    gradeIndexToLabel[
                      sectionsById[cachedAttendanceSection]?.grade__level
                    ]
                  }{" "}
                  ({sectionsById[cachedAttendanceSection]?.title})
                </Typography>
              </>,
              <>
                <Typography variant="h6">
                  Saved Time :{" "}
                  {format(new Date(attendanceCreatedAt), "dd/MM/yyyy hh:mm a")}
                </Typography>
              </>,
              <>
                <Typography>
                  Attendance Taken of <b>{markedStudents.length}</b> students
                  and Remaining of <b>{students.length}</b> students
                </Typography>
              </>,
            ]}
            onClose={() => setOpenPendingAttendanceModal(false)}
            confirmText={"Complete Previous Class"}
            confirmAction={() => {
              setOpenPendingAttendanceModal(false);
              navigate(
                paths.takeClassSectionAttendance(cachedAttendanceSection)
              );
            }}
            declineText={"Reset"}
            declineAction={() => {
              restAttendanceState();
              setOpenPendingAttendanceModal(false);
            }}
          />
          <ConfirmationModal
            open={openSubmitAttendanceModal}
            title={`Attendance - ${
              gradeIndexToLabel[gradeSection?.grade__level]
            }
            ${gradeSection?.title} (${
              markedStudents.length -
              Object.keys(markedStudentToMark)
                ?.map((markedStuId) => ({
                  id: markedStuId,
                  mark: markedStudentToMark[markedStuId],
                }))
                ?.filter((markedStu) => markedStu.mark !== "P")?.length
            } / ${markedStudents.length} Students)`}
            descriptions={[
              <>
                <Typography variant="h6">
                  Saved Time :{" "}
                  {format(new Date(attendanceCreatedAt), "dd/MM/yyyy hh:mm a")}
                </Typography>
              </>,
              <>
                <Typography sx={{ pb: 2 }} variant="h6">
                  Please recheck the list of students not present today
                </Typography>
                {Object.keys(markedStudentToMark)
                  ?.map((markedStuId) => ({
                    id: markedStuId,
                    mark: markedStudentToMark[markedStuId],
                  }))
                  ?.filter((markedStu) => markedStu.mark !== "P")
                  ?.sort((a, b) => {
                    return b.mark.localeCompare(a.mark);
                  })
                  ?.map((notPresentStudent) => {
                    const student = studentsById[notPresentStudent.id];
                    return (
                      <Typography
                        sx={{ py: 1 }}
                        variant="h6"
                        key={notPresentStudent.id}
                      >
                        <span
                          style={{
                            color:
                              notPresentStudent.mark === "A"
                                ? "#f85b43"
                                : "#F79009",
                          }}
                        >
                          {notPresentStudent.mark}
                        </span>
                        {"  "}-{"  "}
                        {student.first_name} {student.middle_name}{" "}
                        {student.last_name}
                      </Typography>
                    );
                  })}
              </>,
            ]}
            onClose={() => setOpenSubmitAttendanceModal(false)}
            confirmText={"Submit"}
            confirmAction={() => {
              setOpenSubmitAttendanceModal(false);
              submitAttendance();
            }}
          />
          {students.length !== 0 && <Box ref={listBottomItem}></Box>}
        </Container>
      </Box>
      <ConfirmationModal
        open={earlierTodaysAttendance?.count > 0}
        title={`Today's attendance for ${
          gradeIndexToLabel[gradeSection?.grade__level]
        } ${gradeSection.title} is already taken`}
        descriptions={[]}
        onClose={() => {}} // can not close model
        confirmText={"Go Back"}
        confirmAction={() => {
          setEarlierTodaysAttendance({ count: 0 });
          navigate(-1);
        }}
        declineText={null}
      />
    </>
  );
}
