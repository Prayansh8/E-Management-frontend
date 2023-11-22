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
  Checkbox,
  TableBody,
  IconButton,
  TablePagination,
} from "@mui/material";
import { Seo } from "src/components/seo";
import { RouterLink } from "src/components/router-link";
import apiCalls from "src/api";
import { breakPaginatedResponse } from "src/utils";
import { Scrollbar } from "src/components/scrollbar";
import { useSchoolContext } from "src/contexts/school-context";
import { paths } from "src/paths";
import Eye from "@untitled-ui/icons-react/build/esm/Eye";
import { format } from "date-fns";

export default function ImportSummaries() {
  const { sectionsById, gradeIndexToLabel } = useSchoolContext();
  const [summariesPaginatedData, setSummariesPaginatedData] = useState({});

  const getStudent = async () => {
    const resData = await apiCalls.getStudentsImportSummaries();
    if (resData) {
      setSummariesPaginatedData(breakPaginatedResponse(resData));
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
                  <Typography variant="h4">Import Summaries</Typography>
                </Stack>
              </Stack>
            </Grid>
          </Box>
          <Box
            sx={{
              flexGrow: 1,
              pt: 3,
            }}
          >
            <Card>
              <Scrollbar>
                <Table sx={{ minWidth: 700 }}>
                  <TableHead>
                    <TableRow>
                      <TableCell padding="checkbox">
                        <Checkbox />
                      </TableCell>
                      <TableCell>Timestamp</TableCell>
                      <TableCell>Class Section</TableCell>
                      <TableCell align="center">Total Students</TableCell>
                      <TableCell align="center">Successful Count</TableCell>
                      <TableCell align="center">Failed Count</TableCell>
                      <TableCell align="right">Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {summariesPaginatedData.data?.map((summary) => {
                      return (
                        <TableRow hover key={summary.id}>
                          <TableCell padding="checkbox">
                            <Checkbox />
                          </TableCell>
                          <TableCell>
                              {format(new Date(summary.created_at), 'dd/MM/yyyy hh:mm a')}
                          </TableCell>
                          <TableCell>
                            {
                              gradeIndexToLabel[
                                sectionsById[summary.grade_section]
                                  ?.grade__level
                              ]
                            }
                          </TableCell>
                          <TableCell align="center">
                            {summary.students_count}
                          </TableCell>
                          <TableCell align="center">
                            {summary.successful_imports.length}
                          </TableCell>
                          <TableCell align="center">{summary.failed_imports.length}</TableCell>
                          <TableCell align="right">
                            <IconButton
                              component={RouterLink}
                              href={paths.studentImportSummary(summary.id)}
                            >
                              <SvgIcon>
                                <Eye />
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
                count={summariesPaginatedData.data?.length ? summariesPaginatedData.data?.length : 0 }
                onPageChange={() => {}}
                onRowsPerPageChange={() => {}}
                page={(summariesPaginatedData.currentPage ? summariesPaginatedData.currentPage : 1) - 1}
                rowsPerPage={10}
                rowsPerPageOptions={[10, 25, 50]}
              />
            </Card>
          </Box>
        </Container>
      </Box>
    </>
  );
}
