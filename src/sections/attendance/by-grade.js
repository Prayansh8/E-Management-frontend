import { Card, Stack, Typography } from "@mui/material";
import { SeverityPill } from "src/components/severity-pill";
import { useSchoolContext } from "src/contexts/school-context";

export const AttendanceByGrades = ({ byGrades }) => {
  const { gradeIndexToLabel } = useSchoolContext();

  const pillColor = (mark) => {
    if (mark === "A") {
      return "error";
    } else if (mark === "P") {
      return "success";
    } else {
      return "warning";
    }
  };

  return (
    <Stack
      sx={{
        pb: 2,
      }}
      direction="row"
      spacing={2}
    >
      {byGrades &&
        Object.keys(byGrades)?.map((gradeLevel) => (
          <Card key={gradeLevel}>
            <Stack
              alignItems="center"
              direction="row"
              justifyContent="space-between"
              spacing={2}
              sx={{
                p: 2,
              }}
            >
              <div>
                {byGrades[gradeLevel]?.map((section) => (
                  <span key={section.id}>
                    <Typography sx={{ mt: 1 }} variant="h6">
                      {gradeIndexToLabel[gradeLevel]} {section.title}
                    </Typography>
                    <Stack sx={{ mt: 1, mb: 2 }} direction={"row"} spacing={1}>
                      <SeverityPill color={pillColor("P")}>
                        {section.present}
                      </SeverityPill>
                      <SeverityPill color={pillColor("A")}>
                        {section.absent}
                      </SeverityPill>
                      <SeverityPill color={pillColor("L")}>
                        {section.on_leave}
                      </SeverityPill>
                    </Stack>
                  </span>
                ))}
              </div>
            </Stack>
          </Card>
        ))}
    </Stack>
  );
};
