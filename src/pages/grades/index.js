import React, { useEffect, useState } from "react";
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
import { useSchoolContext } from "src/contexts/school-context";
import { Seo } from "src/components/seo";
import { useNavigate } from "react-router";
import { tokens } from "src/locales/tokens";
import { paths } from "src/paths";

export default function Grades() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { gradeIndexToLabel, gradesSectionsList } = useSchoolContext();

  const [grades, setGrades] = useState([]);

  useEffect(() => {
    const tempGrades = [];
    for (let index = 0; index < gradesSectionsList.length; index++) {
      const gradeSection = gradesSectionsList[index];
      if (!tempGrades.find((item) => item.id === gradeSection.grade_id)) {
        tempGrades.push({
          level: gradeSection.grade__level,
          id: gradeSection.grade_id,
        });
      }
    }
    setGrades(tempGrades);
  }, [gradesSectionsList]);

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
                  <Typography variant="h4">{t(tokens.nav.classes)}</Typography>
                </Stack>
                <Stack alignItems="center" direction="row" spacing={2}>
                </Stack>
              </Stack>
            </Grid>
          </Box>
          <Grid container spacing={3}>
            {grades.map((grade) => (
              <Grid item key={grade.id} xs={12} sm={6} md={4}>
                <Card>
                  <Box
                    onClick={() => navigate(paths.viewClass(grade.id))}
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
                        alignItems: "center",
                        display: "flex",
                        mt: 2,
                      }}
                    >
                      <Box>
                        <Typography color="text.priamry" variant="h6">
                          {gradeIndexToLabel[grade.level]}
                        </Typography>
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
