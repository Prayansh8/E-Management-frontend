import PropTypes from 'prop-types';
import ChevronDownIcon from '@untitled-ui/icons-react/build/esm/ChevronDown';
import { Box, IconButton, Stack, SvgIcon, Typography } from '@mui/material';
import { usePopover } from 'src/hooks/use-popover';
import { TenantPopover } from './tenant-popover';
import { useAuth } from 'src/hooks/use-auth';
import { useTenantContext } from 'src/contexts/tenant-context';

const roles = ['School 1', 'School 2'];

export const TenantSwitch = (props) => {
  const { selectedRole } = useAuth();
  const { tenantConfig } = useTenantContext();
  const popover = usePopover();

  return (
    <>
      <Stack
        alignItems="center"
        direction="row"
        spacing={2}
        {...props}>
        <Box sx={{ flexGrow: 1 }}>
          <Typography
            color="inherit"
            variant="h6"
            textTransform="capitalize"
          >
            {tenantConfig.short_name}
          </Typography>
          <Typography
            color="neutral.400"
            variant="body2"
          >
            {selectedRole}
          </Typography>
        </Box>
        <IconButton
          onClick={popover.handleOpen}
          ref={popover.anchorRef}
        >
          <SvgIcon sx={{ fontSize: 16 }}>
            <ChevronDownIcon />
          </SvgIcon>
        </IconButton>
      </Stack>
      <TenantPopover
        anchorEl={popover.anchorRef.current}
        onChange={popover.handleClose}
        onClose={popover.handleClose}
        open={popover.open}
        tenants={roles}
      />
    </>
  );
};

TenantSwitch.propTypes = {
  sx: PropTypes.object
};
