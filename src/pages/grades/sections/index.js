import React from "react";
import { useTranslation } from "react-i18next";
import {
  Container,
  Grid,
  Stack,
  Box,
  Typography,
  Card,
  CardMedia,
} from "@mui/material";
import { useNavigate } from "react-router";
import { useSchoolContext } from "src/contexts/school-context";
import { Seo } from "src/components/seo";
import { tokens } from "src/locales/tokens";
import { paths } from "src/paths";

export default function GradesSections() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { gradeIndexToLabel, gradesSectionsList } = useSchoolContext();

  return (
    <>
      <Seo title="Classes" />
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
                    {t(tokens.nav.classes)} Sections
                  </Typography>
                </Stack>
                <Stack alignItems="center" direction="row" spacing={2}>
                </Stack>
              </Stack>
            </Grid>
          </Box>
          <Grid container spacing={3}>
            {gradesSectionsList.map((gradeSection) => (
              <Grid item key={gradeSection.id} xs={12} sm={6} md={4}>
                <Card>
                  <Box
                    onClick={() =>
                      navigate(paths.viewClassSection(gradeSection.id))
                    }
                    sx={{ cursor: "pointer", p: 2 }}
                  >
                    <CardMedia
                      image={
                        "https://st4.depositphotos.com/16913844/25498/v/450/depositphotos_254982548-stock-illustration-layered-papercut-carve-3d-backdrop.jpg"
                      }
                      sx={{
                        backgroundColor: "neutral.50",
                        height: 50,
                        borderRadius: 1,
                      }}
                    />
                    <Box
                      sx={{
                        mt: 2,
                      }}
                    >
                      <Box>
                        <Typography color="text.secondary" variant="body2">
                          {gradeIndexToLabel[gradeSection.grade__level]}
                        </Typography>
                        <Stack
                          direction={"row"}
                          justifyContent={"space-between"}
                        >
                          <Stack>
                            <Typography color="text.priamry" variant="h6">
                              {gradeIndexToLabel[gradeSection.grade__level]}{" "}
                              {gradeSection.title}
                            </Typography>
                          </Stack>
                          <Stack>
                            <Typography color="text.secondary" variant="body2">
                              {gradeSection.teacher__first_name
                                ? `${gradeSection.teacher__first_name} ${gradeSection.teacher__last_name}`
                                : "No Class Teacher"}
                            </Typography>
                          </Stack>
                        </Stack>
                      </Box>
                    </Box>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </>
  );
}
