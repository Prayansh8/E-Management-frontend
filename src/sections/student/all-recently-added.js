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
  IconButton,
} from "@mui/material";
import { formatDistanceToNowStrict } from "date-fns";
import { useSchoolContext } from "src/contexts/school-context";
import { paths } from "src/paths";
import apiCalls from "src/api";
import { RouterLink } from "src/components/router-link";
import CloseIcon from '@mui/icons-material/Close';


export const AllRecentlyAddedStudents = ({onClose}) => {
  const { sectionsById, gradeIndexToLabel } = useSchoolContext();
  const [recentlyAdded, setRecentlyAdded] = useState([]);

  const getRecentlyAddedStudents = async () => {
    const resData = await apiCalls.getRecentlyAddedStudents();
    if (resData) {
      setRecentlyAdded(resData?.students);
    }
  };

  useEffect(() => {
    getRecentlyAddedStudents();
  }, []);

  return (
    <Grid>
      <Card>
        <CardHeader
          title="Recently Added"
          subheader={<>count: {recentlyAdded.length}</>}
          action={
            <IconButton aria-label="close" onClick={onClose}>
              <CloseIcon />
            </IconButton>
          } 
        />
        <Divider />
        <List disablePadding>
          {recentlyAdded.map((student, index) => {
            const showDivider = index < recentlyAdded.length - 1;
            const ago = formatDistanceToNowStrict(new Date(student.created_at));

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
                              sectionsById[student.grade_section]?.grade__level
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
  );
};
