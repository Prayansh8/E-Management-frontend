import PropTypes from "prop-types";
import { Box, Stack, Typography } from "@mui/material";
import { Logo } from "src/components/logo";
import { RouterLink } from "src/components/router-link";
import { paths } from "src/paths";
import { useTenantContext } from "src/contexts/tenant-context";

export const Layout = (props) => {
  const { children } = props;
  const { tenantConfig } = useTenantContext();

  return (
    <Box
      sx={{
        backgroundColor: "background.default",
        display: "flex",
        flex: "1 1 auto",
        flexDirection: {
          xs: "column-reverse",
          md: "row",
        },
      }}
    >
      <Box
        sx={{
          alignItems: "center",
          backgroundColor: "neutral.800",
          backgroundImage:
            'url("https://static.easify.xyz/lp/assets/gradient-bg.svg")',
          backgroundPosition: "top center",
          backgroundRepeat: "no-repeat",
          color: "common.white",
          display: "flex",
          flex: {
            xs: "0 0 auto",
            md: "1 1 auto",
          },
          justifyContent: "center",
          p: {
            xs: 4,
            md: 8,
          },
        }}
      >
        <Box maxWidth="md">
          <Typography sx={{ mb: 1 }} variant="h4">
            Welcome to E-Management
          </Typography>
          <Typography color="text.secondary" sx={{ mb: 4 }}>
            {tenantConfig.description
              ? tenantConfig.description
              : "E-Management: An efficient Employee Management System designed to streamline and oversee employee work tasks."}
          </Typography>
          {/* <Typography
            variant="subtitle2"
            sx={{ mb: 2 }}
          >
            Join 6,000+ forward-thinking companies:
          </Typography> */}
        </Box>
      </Box>
      <Box
        sx={{
          backgroundColor: "background.paper",
          display: "flex",
          flex: {
            xs: "1 1 auto",
            md: "0 0 auto",
          },
          flexDirection: "column",
          justifyContent: {
            md: "center",
          },
          maxWidth: "100%",
          p: {
            xs: 4,
            md: 8,
          },
          width: {
            md: 600,
          },
        }}
      >
        <div>
          <Box sx={{ mb: 4 }}>
            <Stack
              alignItems="center"
              component={RouterLink}
              direction="row"
              display="inline-flex"
              href={paths.index}
              spacing={1}
              sx={{ textDecoration: "none" }}
            >
              <Box
                sx={{
                  display: "inline-flex",
                  height: 24,
                  width: 24,
                }}
              >
                <Logo />
              </Box>
              <Box
                sx={{
                  color: "text.primary",
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: 14,
                  fontWeight: 800,
                  letterSpacing: "0.3px",
                  lineHeight: 2.5,
                  "& span": {
                    color: "primary.main",
                  },
                }}
              >
                {tenantConfig.name ? tenantConfig.name : "E-Management"}{" "}
                <span>- ONLINE</span>
              </Box>
            </Stack>
          </Box>
          {children}
        </div>
      </Box>
    </Box>
  );
};

Layout.propTypes = {
  children: PropTypes.node,
};
