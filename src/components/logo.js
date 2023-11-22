// import { useTheme } from '@mui/material/styles';

import { useTenantContext } from "src/contexts/tenant-context";

export const Logo = (props) => {
  // const theme = useTheme();
  // const fillColor = theme.palette.primary.main;
  const { tenantConfig } = useTenantContext();


  return (
    <img {...props} 
    src={tenantConfig?.logo? tenantConfig.logo : "/favicon-192.png"} />
  );
};
