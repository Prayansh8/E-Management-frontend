import React, { useState, useEffect } from "react";
import {
  Container,
  Grid,
  Stack,
  Box,
  Typography,
  SvgIcon,
  Card,
  TableHead,
  Table,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,
  Tab,
  IconButton,
  Dialog,
  DialogContent,
  useMediaQuery,
} from "@mui/material";
import { Seo } from "src/components/seo";
import apiCalls from "src/api";
import { Scrollbar } from "src/components/scrollbar";
import Eye from "@untitled-ui/icons-react/build/esm/Eye";
import { useParams } from "react-router-dom";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { capitalizeFirstLetter } from "src/utils";
import XIcon from "@untitled-ui/icons-react/build/esm/X";
import { PropertyList } from "src/components/property-list";
import { PropertyListItem } from "src/components/property-list-item";

const ImportSummariesDetail = () => {
  const [value, setValue] = React.useState("success");
  const [studentImportModalOpen, setStudentImportModalOpen] = useState(false);
  const [itemTr, setItemTr] = useState();
  const handleChangeTab = (event, newValue) => {
    setValue(newValue);
  };

  const [summariesPaginatedData, setSummariesPaginatedData] = useState({});
  const { id } = useParams();

  const getStudent = async () => {
    const resData = await apiCalls.getStudentsImportSummaryDetail(id);
    if (resData) {
      setSummariesPaginatedData(resData);
    }
  };

  useEffect(() => {
    getStudent();
  }, []);
  return (
    <>
      <Seo title="Students" />
      <Box>
        <Container maxWidth="xl">
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              py: 3,
            }}
          >
            <Grid>
              <Stack direction="row" justifyContent="space-between" spacing={4}>
                <Stack spacing={1}>
                  <Typography variant="h4">Import Summary Details</Typography>
                </Stack>
              </Stack>
            </Grid>
          </Box>

          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList
                onChange={handleChangeTab}
                aria-label="lab API tabs example"
              >
                <Tab label="Success" value="success" />
                <Tab label="Failed" value="failed" />
              </TabList>
            </Box>
            <Box
              sx={{
                flexGrow: 1,
                pt: 3,
              }}
            >
              <Card>
                <Scrollbar>
                  <TabPanel sx={{ padding: 0 }} value="success">
                    <Table sx={{ minWidth: 700 }}>
                      <TableHead>
                        <TableRow>
                          <TableCell>S.No</TableCell>
                          <TableCell>First Name</TableCell>
                          <TableCell>Middle Name</TableCell>
                          <TableCell>Last Name</TableCell>
                          <TableCell>Gender</TableCell>
                          <TableCell>Date Of Birth</TableCell>
                          <TableCell>Phone</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {summariesPaginatedData.successful_imports &&
                        summariesPaginatedData.successful_imports.length > 0 ? (
                          summariesPaginatedData.successful_imports.map(
                            (studentId, index) => {
                              return (
                                <TableRow hover key={studentId.id}>
                                  <TableCell>{index + 1}</TableCell>
                                  <TableCell>
                                    {studentId.first_name || "-"}
                                  </TableCell>
                                  <TableCell>
                                    {studentId.middle_name || "-"}
                                  </TableCell>
                                  <TableCell>
                                    {studentId.last_name || "-"}
                                  </TableCell>
                                  <TableCell>
                                    {studentId.gender || "-"}
                                  </TableCell>
                                  <TableCell>
                                    {studentId.date_of_birth || "-"}
                                  </TableCell>
                                  <TableCell>
                                    {studentId.phone || "-"}
                                  </TableCell>
                                </TableRow>
                              );
                            }
                          )
                        ) : (
                          <TableRow>
                            <TableCell colSpan={6} align="center">
                              No one is successfully import!
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </TabPanel>
                  <TabPanel sx={{ padding: 0 }} value="failed">
                    <Scrollbar>
                      <Table sx={{ minWidth: 700 }}>
                        <TableHead>
                          <TableRow>
                            <TableCell>S.No</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Gender</TableCell>
                            <TableCell>error</TableCell>
                            <TableCell>step</TableCell>
                            <TableCell align="right">Actions</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {summariesPaginatedData.failed_imports &&
                          summariesPaginatedData.failed_imports.length > 0 ? (
                            summariesPaginatedData.failed_imports.map(
                              (studentId, index) => {
                                const formattedStep = studentId.step
                                  .split("_")
                                  .join(" ");

                                return (
                                  <TableRow hover key={index}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>
                                      {studentId.incoming_student_data
                                        ?.first_name || "-"}
                                      {" " +
                                        (studentId.incoming_student_data
                                          ?.middle_name || "") +
                                        " "}
                                      {studentId.incoming_student_data
                                        ?.last_name || "-"}
                                    </TableCell>
                                    <TableCell>
                                      {capitalizeFirstLetter(
                                        studentId.incoming_student_data?.gender
                                      ) || "-"}
                                    </TableCell>
                                    <TableCell>
                                      {studentId?.error &&
                                        Object.keys(studentId.error).map(
                                          (fieldName) => {
                                            const formattedFieldName = fieldName
                                              .split("_")
                                              .join(" ");
                                            return (
                                              <div key={formattedFieldName}>
                                                {typeof studentId?.error?.[
                                                  fieldName
                                                ] === Array
                                                  ? studentId?.error?.[
                                                      fieldName
                                                    ].map(
                                                      (
                                                        errorMsg,
                                                        errorIndex
                                                      ) => (
                                                        <div key={errorIndex}>
                                                          {formattedFieldName
                                                            .charAt(0)
                                                            .toUpperCase() +
                                                            formattedFieldName.slice(
                                                              1
                                                            )}
                                                          : {errorMsg}
                                                        </div>
                                                      )
                                                    )
                                                  : studentId?.error?.[
                                                      fieldName
                                                    ]}
                                              </div>
                                            );
                                          }
                                        )}
                                    </TableCell>
                                    <TableCell>
                                      {capitalizeFirstLetter(formattedStep)}
                                    </TableCell>
                                    <TableCell align="right">
                                      <IconButton
                                        onClick={() =>
                                          setStudentImportModalOpen(true)
                                        }
                                      >
                                        <SvgIcon>
                                          <Eye
                                            onClick={() => setItemTr(index)}
                                          />
                                        </SvgIcon>
                                      </IconButton>
                                    </TableCell>
                                  </TableRow>
                                );
                              }
                            )
                          ) : (
                            <TableRow>
                              <TableCell colSpan={6} align="center">
                              No one is failed!
                              </TableCell>
                            </TableRow>
                          )}
                        </TableBody>
                      </Table>
                    </Scrollbar>
                  </TabPanel>
                </Scrollbar>
                <TablePagination
                  component="div"
                  count={
                    summariesPaginatedData.data?.length
                      ? summariesPaginatedData.data?.length
                      : 0
                  }
                  onPageChange={() => {}}
                  onRowsPerPageChange={() => {}}
                  page={
                    (summariesPaginatedData.currentPage
                      ? summariesPaginatedData.currentPage
                      : 1) - 1
                  }
                  rowsPerPage={10}
                />
              </Card>
            </Box>
          </TabContext>
        </Container>
      </Box>
      <ShowFailedStudentDetails
        open={studentImportModalOpen}
        onClose={() => setStudentImportModalOpen(false)}
        itemTr={itemTr}
        failedImports={summariesPaginatedData.failed_imports}
      />
    </>
  );
};

export default ImportSummariesDetail;

const ShowFailedStudentDetails = (props) => {
  const { onClose, open = false, itemTr, failedImports } = props;

  const isValidIndex =
    Number.isInteger(itemTr) && itemTr >= 0 && itemTr < failedImports.length;
  const selectedItem = isValidIndex ? failedImports[itemTr] : null;
  const incomingStudentData = selectedItem
    ? selectedItem.incoming_student_data
    : null;

  const excludeProperties = ["profile_picture", "tenant", "grade_section"];
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"));
  const align = lgUp ? "horizontal" : "vertical";

  return (
    <div>
      <Dialog fullWidth maxWidth="sm" open={open} onClose={onClose}>
        <Stack
          alignItems="center"
          direction="row"
          justifyContent="space-between"
          spacing={3}
          sx={{
            px: 3,
            py: 2,
          }}
        >
          <Typography variant="h6">Details</Typography>
          <IconButton color="inherit" onClick={onClose}>
            <SvgIcon>
              <XIcon />
            </SvgIcon>
          </IconButton>
        </Stack>
        <DialogContent>
          {isValidIndex && incomingStudentData ? (
            <>
              {Object.keys(incomingStudentData).map((key) => {
                if (!excludeProperties.includes(key)) {
                  return (
                    <PropertyList key={`${key}-${incomingStudentData[key]}`}>
                      <PropertyListItem
                        align={align}
                        disableGutters
                        divider
                        label={key}
                        value={incomingStudentData[key] || "-"}
                      />
                    </PropertyList>
                  );
                }
                return null;
              })}
            </>
          ) : (
            <Typography>No data found for selected item.</Typography>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};
