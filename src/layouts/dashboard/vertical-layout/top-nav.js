import PropTypes from "prop-types";
import Menu01Icon from "@untitled-ui/icons-react/build/esm/Menu01";
import {
  Box,
  IconButton,
  Stack,
  SvgIcon,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import { AccountButton } from "../account-button";
import { SearchButton } from "../search-button";
import { useTenantContext } from "src/contexts/tenant-context";
// import { useEffect, useState } from "react";

const TOP_NAV_HEIGHT = 64;
const SIDE_NAV_WIDTH = 280;

export const TopNav = (props) => {
  const { onMobileNavOpen, ...other } = props;
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"));
  const { pageTitle } = useTenantContext();

  return (
    <Box
      component="header"
      sx={{
        backdropFilter: "blur(6px)",
        backgroundColor: (theme) =>
          alpha(theme.palette.background.default, 0.8),
        position: "sticky",
        left: {
          lg: `${SIDE_NAV_WIDTH}px`,
        },
        top: 0,
        width: {
          lg: `calc(100% - ${SIDE_NAV_WIDTH}px)`,
        },
        zIndex: (theme) => theme.zIndex.appBar,
      }}
      {...other}
    >
      <Stack
        alignItems="center"
        direction="row"
        justifyContent="space-between"
        spacing={2}
        sx={{
          minHeight: TOP_NAV_HEIGHT,
          px: 2,
        }}
      >
        {lgUp && (
          <Stack alignItems="center" direction="row" spacing={2}>
          <SearchButton />
            <Typography variant="h5">{pageTitle}</Typography>
          </Stack>
        )}
        <Stack alignItems="center" direction="row" spacing={2}>
          <AccountButton />
          {!lgUp && <Typography variant="h5">{pageTitle}</Typography>}
        </Stack>
        {!lgUp && (
          <Stack alignItems="center" direction="row" spacing={2}>
            <SearchButton />
            <IconButton onClick={onMobileNavOpen}>
              <SvgIcon>
                <Menu01Icon />
              </SvgIcon>
            </IconButton>
          </Stack>
        )}
      </Stack>
    </Box>
  );
};

TopNav.propTypes = {
  onMobileNavOpen: PropTypes.func,
};
