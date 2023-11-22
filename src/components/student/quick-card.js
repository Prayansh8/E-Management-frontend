import {
  Card,
  Stack,
  Typography,
  Box,
  CardMedia,
  CardContent,
  Avatar,
  TableRow,
  TableCell,
  TableBody,
  Table,
} from "@mui/material";
import { format } from "date-fns";
import { capitalizeFirstLetter } from "src/utils";

export const StudentQuickDetailsCard = ({ student }) => {
  return (
    <Card
      key={student.id}
      sx={{
        borderRadius: 0,
      }}
    >
      <CardMedia
        image={
          "https://st4.depositphotos.com/16913844/25498/v/450/depositphotos_254982548-stock-illustration-layered-papercut-carve-3d-backdrop.jpg"
        }
        sx={{
          height: 100,
        }}
      />
      <CardContent sx={{ pt: 0 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            mb: 2,
            mt: "-50px",
          }}
        >
          <Avatar
            alt="Applicant"
            src={student.profile_picture}
            sx={{
              border: "3px solid #FFFFFF",
              height: 100,
              width: 100,
            }}
          />
        </Box>
        <Typography
          align="center"
          color="text.primary"
          sx={{ display: "block" }}
          variant="h5"
        >
          {student.first_name} {student.middle_name} {student.last_name}
        </Typography>

        <Table>
          <TableBody>
            <TableRow>
              <TableCell>
                <Typography variant="subtitle2">Enrollment Id</Typography>
              </TableCell>
              <TableCell>
                <Typography color="text.secondary" variant="body2">
                  {student.enrollment_id}
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography variant="subtitle2">Roll Number</Typography>
              </TableCell>
              <TableCell>
                <Typography color="text.secondary" variant="body2">
                  {student.roll_number ? student.roll_number : "-"}
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography variant="subtitle2">Gender</Typography>
              </TableCell>
              <TableCell>
                <Typography color="text.secondary" variant="body2">
                  {student.gender ? capitalizeFirstLetter(student.gender) : "-"}
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography variant="subtitle2">Date of Birth</Typography>
              </TableCell>
              <TableCell>
                <Typography color="text.secondary" variant="body2">
                  {student.date_of_birth
                    ? format(new Date(student.date_of_birth), "dd/MM/yyyy")
                    : "-"}
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography variant="subtitle2">Phone</Typography>
              </TableCell>
              <TableCell>
                <Typography color="text.secondary" variant="body2">
                  {student.phone ? student.phone : "-"}
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography variant="subtitle2">Email</Typography>
              </TableCell>
              <TableCell>
                <Typography color="text.secondary" variant="body2">
                  {student.email ? student.email : "-"}
                </Typography>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>

        <Stack alignItems="center" direction="row" flexWrap="wrap" gap={0.5}>
          {/* {student.skills.map((skill) => (
              <Chip
                key={skill}
                label={skill}
                sx={{ m: 0.5 }}
                variant="outlined"
              />
            ))} */}
        </Stack>
      </CardContent>
    </Card>
  );
};
