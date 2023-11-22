import PropTypes from "prop-types";
import {
  Card,
  Stack,
  Typography,
  Grid,
  Box,
  Dialog,
  Button,
  Grow,
} from "@mui/material";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { StudentQuickDetailsCard } from "src/components/student/quick-card";

export const AttendanceItemCard = ({ student, markedAction, previousMark }) => {
  const studentFullName = `${student.first_name} ${student.middle_name} ${student.last_name}`;
  const title = student.roll_number ? student.roll_number : studentFullName;
  // const description = student.roll_number ? `${student.first_name} ${student.middle_name} ${student.last_name}` : "";
  const description = student.enrollment_id;
  const studentId = student.id;
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showCard, setShowCard] = useState(true);
  const delayedMarkedAction = (mark) => {
    if (!previousMark) {
      setShowCard(false);
    }
    setTimeout(() => {
      markedAction(studentId, mark);
    }, 500);
  };

  const markAttendance = (mark) => {
    if (mark === "L") {
      toast.success(`L - ${student.first_name}`);
      setShowDetailsModal(false);
    } else if (mark === "A") {
      toast.error(`A - ${student.first_name}`);
    } else if (mark === "P") {
      toast.success(`P - ${student.first_name}`);
    }
    delayedMarkedAction(mark);
  };

  const showDetails = () => {
    setShowDetailsModal(true);
  };

  const getCenterBGColor = (mark) => {
    if (mark === "A") {
      return "#f85b43";
    } else if (mark === "P") {
      return "#5ac557";
    } else if (mark === "L") {
      return "#F79009";
    }
  };

  return (
    <Grow
      in={showCard}
      sx={{ transformOrigin: "0 0 0 0", py: 2 }}
      {...(showCard ? { timeout: 500 } : {})}
    >
      <Box>
        <Card>
          <Grid container justifyContent={"space-between"}>
            <Grid
              sx={{
                backgroundColor: "#f85b43",
                width: "15%",
                cursor: "pointer",
              }}
              onClick={() => markAttendance("A")}
            >
              {previousMark !== "A" && (
                <Box
                  sx={{
                    borderRadius: "0",
                  }}
                >
                  <Typography variant="h4" align="center" sx={{ padding: 1 }}>
                    A
                  </Typography>
                </Box>
              )}
            </Grid>
            <Grid
              sx={{
                width: "70%",
                ...(previousMark && {
                  backgroundColor: getCenterBGColor(previousMark),
                }),
              }}
            >
              <Stack alignItems="center" direction="row">
                <Stack
                  alignItems="start"
                  direction="column"
                  sx={{ py: 1, px: 2, cursor: "pointer" }}
                  onClick={showDetails}
                >
                  <Typography color="text.primary" variant="h5">
                    {title}
                  </Typography>
                  <Typography size="small" variant="outlined">
                    {description}
                  </Typography>
                </Stack>
              </Stack>
            </Grid>
            <Grid
              disabled={previousMark === "A"}
              sx={{
                backgroundColor: "#5ac557",
                width: "15%",
                cursor: "pointer",
              }}
              onClick={() => markAttendance("P")}
            >
              {" "}
              {previousMark !== "P" && (
                <Box
                  sx={{
                    borderRadius: "0",
                  }}
                >
                  <Typography variant="h4" align="center" sx={{ padding: 1 }}>
                    P
                  </Typography>
                </Box>
              )}
            </Grid>
          </Grid>
        </Card>
        <Dialog
          fullWidth
          open={showDetailsModal}
          onClose={() => setShowDetailsModal(false)}
        >
          <StudentQuickDetailsCard student={student} />
          <Box sx={{ p: 2 }}>
            {previousMark !== "L" && (
              <Button
                sx={{
                  mt: 2,
                }}
                fullWidth
                color="warning"
                variant="contained"
                onClick={() => markAttendance("L")}
              >
                On Leave
              </Button>
            )}
            <Button
              sx={{
                mt: 2,
              }}
              fullWidth
              color="error"
              variant="contained"
              onClick={() => setShowDetailsModal(false)}
            >
              Close
            </Button>
          </Box>
        </Dialog>
      </Box>
    </Grow>
  );
};

AttendanceItemCard.defaultProps = {
  student: {},
  previousMark: null,
};

AttendanceItemCard.propTypes = {
  student: PropTypes.object.isRequired,
  markedAction: PropTypes.func.isRequired,
  previousMark: PropTypes.oneOf(["P", "A", "L", null, undefined]),
};
