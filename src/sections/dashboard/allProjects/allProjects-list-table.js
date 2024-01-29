import { Fragment } from "react";
import PropTypes from "prop-types";
import DotsHorizontalIcon from "@untitled-ui/icons-react/build/esm/DotsHorizontal";
import {
  Box,
  IconButton,
  LinearProgress,
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
import { SeverityPill } from "src/components/severity-pill";

export const ProjectListTable = (props) => {
  const {
    count = 0,
    items = [],
    onPageChange = () => {},
    onRowsPerPageChange,
    page = 0,
    rowsPerPage = 0,
  } = props;

  return (
    <div>
      <Scrollbar>
        <Table sx={{ minWidth: 1200 }}>
          <TableHead>
            <TableRow>
              <TableCell width="25%">Name</TableCell>
              <TableCell width="25%">Stock</TableCell>
              <TableCell>Actual Cost</TableCell>
              <TableCell>Estimated Cost</TableCell>
              <TableCell>Project Lead</TableCell>
              <TableCell>Team Lead</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((project) => {
              const quantityColor =
                project.quantity >= 10 ? "success" : "error";
              const statusColor =
                project.status === "published" ? "info" : "success";
              const hasManyVariants = project.variants > 1;
              const teamLeadColor =
                project.teamLead === "published" ? "success" : "info";

              return (
                <Fragment key={project.id}>
                  <TableRow hover key={project.id}>
                    <TableCell width="25%">
                      <Box
                        sx={{
                          alignItems: "center",
                          display: "flex",
                        }}
                      >
                        <Box
                          sx={{
                            cursor: "pointer",
                            ml: 2,
                          }}
                        >
                          <Typography variant="subtitle2">
                            {project?.projectInformation?.projectName || "N/A"}
                          </Typography>

                          <Typography color="text.secondary" variant="body2">
                            {project?.projectInformation?.projectType || "N/A"}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell width="25%">
                      <LinearProgress
                        value={project?.projectTimeline?.workHours || "N/A"}
                        variant="determinate"
                        color={quantityColor}
                        sx={{
                          height: 8,
                          width: 36,
                        }}
                      />
                      <Typography color="text.secondary" variant="body2">
                        {project?.projectTimeline?.workHours || "N/A"} in stock
                        {hasManyVariants &&
                          ` in ${
                            project?.projectTimeline?.workHours || "N/A"
                          } variants`}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      {project?.projectCostAndExpenses?.actualProjectCost ||
                        "N/A"}
                    </TableCell>
                    <TableCell>
                      {project?.projectCostAndExpenses?.estimatedProjectCost ||
                        "N/A"}
                    </TableCell>
                    <TableCell>
                      <SeverityPill color={teamLeadColor}>
                        {project?.projectTeam?.teamLead || "N/A"}
                      </SeverityPill>
                    </TableCell>
                    <TableCell>
                      <SeverityPill color={statusColor}>
                        {project?.projectTeam?.projectLead || "N/A"}
                      </SeverityPill>
                    </TableCell>
                    <TableCell align="right">
                      <IconButton>
                        <SvgIcon>
                          <DotsHorizontalIcon />
                        </SvgIcon>
                      </IconButton>
                    </TableCell>
                  </TableRow>
                </Fragment>
              );
            })}
          </TableBody>
        </Table>
      </Scrollbar>
      <TablePagination
        component="div"
        count={count}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </div>
  );
};

ProjectListTable.propTypes = {
  count: PropTypes.number,
  items: PropTypes.array,
  onPageChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func,
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
};
