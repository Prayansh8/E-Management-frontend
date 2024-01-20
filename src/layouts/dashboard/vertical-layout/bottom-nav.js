import React, { useEffect, useState } from "react";
import {
  Box,
  BottomNavigation,
  BottomNavigationAction,
  Paper,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  CssBaseline,
  Typography,
} from "@mui/material";
import {
  ClassOutlined,
  ClassSharp,
  Countertops,
  Home,
} from "@mui/icons-material";
import { useSchoolContext } from "src/contexts/school-context";
import { useNavigate } from "react-router";
import { paths } from "src/paths";
import { useAuthContext } from "src/contexts/auth-context";

export default function BottomNav() {
  const navigate = useNavigate();
  const { gradesSectionsList, gradeIndexToLabel } = useSchoolContext();
  const { user } = useAuthContext();
  const [selectedNavItem, setSelectedNavItem] = useState(0);

  const [openAttendanceDrawer, setOpenAttendanceDrawer] = useState(false);
  const [userAssociatedSections, setUserAssociatedSections] = useState([]);
  const [bottomNavigationItems, setBottomNavigationItems] = useState([]);

  useEffect(() => {
    if (user.is_admin) {
      setUserAssociatedSections(gradesSectionsList);
    } else if (user.is_teacher) {
      const associatedSectionsIds =
        user.role_specific_data?.associted_grade_sections;
      setUserAssociatedSections(
        gradesSectionsList.filter((gradesSection) =>
          associatedSectionsIds.includes(gradesSection.id)
        )
      );
    }
  }, [user, gradesSectionsList]);

  useEffect(() => {
    let tempBottomNavigationItems = [];
    if (user.is_admin) {
      tempBottomNavigationItems = [
        ...tempBottomNavigationItems,
        {
          onClick: () => navigate(paths.projects),
          icon: <ClassOutlined sx={{ fontSize: 18 }} />,
          label: "Projects",
        },

        {
          icon: <Home sx={{ fontSize: 18 }} />,
          onClick: () => navigate(paths.index),
          label: "Home",
        },
      ];
      setSelectedNavItem(2);
    } else if (user.is_teacher) {
      tempBottomNavigationItems = [
        ...tempBottomNavigationItems,
        {
          label: "Home",
          icon: <Home sx={{ fontSize: 18 }} />,
          onClick: () => navigate(paths.classes),
        },
        {
          onClick: () => {
            userAssociatedSections.length === 1
              ? navigate(
                  paths.takeClassSectionAttendance(userAssociatedSections[0].id)
                )
              : setOpenAttendanceDrawer(true);
          },
          label: "Take Attendance",
          icon: <Countertops sx={{ fontSize: 18 }} />,
        },
      ];
    }
    setBottomNavigationItems(tempBottomNavigationItems);
  }, [user]);

  return (
    !!bottomNavigationItems.length && (
      <Box>
        <CssBaseline />
        <Paper
          sx={{
            position: "fixed",
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 1300,
          }}
        >
          <BottomNavigation
            showLabels
            value={selectedNavItem}
            onChange={(event, newValue) => {
              setSelectedNavItem(newValue);
            }}
          >
            {bottomNavigationItems.map((item, index) => (
              <BottomNavigationAction
                key={index}
                showLabel
                {...item}
                label={
                  <Typography sx={{ fontSize: "0.8em" }} variant="body2">
                    {item.label}
                  </Typography>
                }
                sx={{
                  px: 1,
                  minWidth: "50px",
                }}
              />
            ))}
          </BottomNavigation>
        </Paper>

        <Drawer
          anchor={"bottom"}
          open={openAttendanceDrawer}
          onClose={() => setOpenAttendanceDrawer(false)}
        >
          <Box
            sx={{ width: "auto" }}
            onClick={() => setOpenAttendanceDrawer(false)}
            onKeyDown={() => setOpenAttendanceDrawer(false)}
          >
            <List>
              {userAssociatedSections.length &&
                userAssociatedSections?.map((gradeSection, index) => (
                  <ListItem key={index} disablePadding>
                    <ListItemButton
                      onClick={() =>
                        navigate(
                          paths.takeClassSectionAttendance(gradeSection.id)
                        )
                      }
                    >
                      <ListItemIcon>
                        <ClassSharp />
                      </ListItemIcon>
                      <ListItemText
                        primary={`${
                          gradeIndexToLabel[gradeSection?.grade__level]
                        } ${gradeSection?.title}`}
                      />
                    </ListItemButton>
                  </ListItem>
                ))}

              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <ClassSharp />
                  </ListItemIcon>
                  <ListItemText primary={"Hidden Item"} />
                </ListItemButton>
              </ListItem>
            </List>
          </Box>
        </Drawer>
      </Box>
    )
  );
}
