import React from "react";
import { useTranslation } from "react-i18next";
import { Container, Grid, Stack, Box, Typography } from "@mui/material";
import { Seo } from "src/components/seo";
import { GradeEditForm } from "../../sections/grade/edit-form";

export default function AddNewGrade() {
  const { t } = useTranslation();

  return (
    <>
      <Seo title="Add Class" />
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
                  <Typography variant="h4">{t("addNewClass")}</Typography>
                </Stack>
              </Stack>
            </Grid>
          </Box>
          <GradeEditForm grade={{}} />
        </Container>
      </Box>
    </>
  );
}
