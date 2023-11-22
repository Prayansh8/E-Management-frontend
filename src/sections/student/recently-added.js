import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  Divider,
  ListItemText,
  Grid,
  Button,
  Dialog,
} from "@mui/material";
import { formatDistanceToNowStrict } from "date-fns";
import { useSchoolContext } from "src/contexts/school-context";
import { paths } from "src/paths";
import apiCalls from "src/api";
import { RouterLink } from "src/components/router-link";
import { AllRecentlyAddedStudents } from "./all-recently-added";

export const RecentlyAddedStudents = () => {
  const { sectionsById, gradeIndexToLabel } = useSchoolContext();
  const [recentlyAdded, setRecentlyAdded] = useState([]);
  const [recentlyAddedCount, setRecentlyAddedCount] = useState(0);
  const [isRecentlyAddedModalOpen, setIsRecentlyAddedModalOpen] =
    useState(false);

  const getRecentlyAddedStudents = async () => {
    const resData = await apiCalls.getRecentlyAddedStudents({ size: 5 });
    if (resData) {
      setRecentlyAdded(resData?.students);
      setRecentlyAddedCount(resData?.count);
    }
  };

  useEffect(() => {
    getRecentlyAddedStudents();
  }, []);

  return (
    <>
      {!!recentlyAddedCount && (
        <Grid
          item
          xs={12}
          lg={4}
        >
          <Card>
            <CardHeader
              action={
                recentlyAddedCount > 5 && (
                  <Button
                    variant="link"
                    onClick={() => setIsRecentlyAddedModalOpen(true)}
                  >
                    See All
                  </Button>
                )
              }
              title="Recently Added"
            />
            <Divider />
            <List disablePadding>
              {recentlyAdded.map((student, index) => {
                const showDivider = index < recentlyAdded.length - 1;
                const ago = formatDistanceToNowStrict(
                  new Date(student.created_at)
                );

                return (
                  <ListItem divider={showDivider} key={student.id}>
                    <ListItemAvatar>
                      <Avatar
                        src={student.profile_picture}
                        sx={{ cursor: "pointer" }}
                      />
                    </ListItemAvatar>
                    <ListItemText
                      disableTypography
                      primary={
                        <Typography
                          color="text.primary"
                          style={{ textDecoration: "none" }}
                          href={paths.viewStudent(student.id)}
                          component={RouterLink}
                        >
                          {student.first_name} {student.middle_name}{" "}
                          {student.last_name}
                        </Typography>
                      }
                      secondary={
                        <Typography color="text.secondary" variant="body2">
                          {student.grade_section
                            ? `${
                                gradeIndexToLabel[
                                  sectionsById[student.grade_section]
                                    ?.grade__level
                                ]
                              } ${sectionsById[student.grade_section]?.title}`
                            : "No Class Assigned"}
                        </Typography>
                      }
                    />
                    <Typography color="text.secondary" noWrap variant="caption">
                      {ago} ago
                    </Typography>
                  </ListItem>
                );
              })}
            </List>
          </Card>
        </Grid>
      )}
      <Dialog
        fullWidth
        maxWidth="sm"
        open={isRecentlyAddedModalOpen}
        onClose={() => setIsRecentlyAddedModalOpen(false)}
      >
        <AllRecentlyAddedStudents onClose={() => setIsRecentlyAddedModalOpen(false)} />
      </Dialog>
    </>
  );
};
