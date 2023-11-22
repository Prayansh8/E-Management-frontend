import { Box } from '@mui/material';
import { useTenantContext } from 'src/contexts/tenant-context';
import { Logo } from './logo';

export const SplashScreen = () => {

  const { tenantConfig } = useTenantContext();
  
  return (
    <Box
      sx={{
        alignItems: 'center',
        backgroundColor: 'background.paper',
        flexDirection: 'column',
        height: '100vh',
        justifyContent: 'center',
        p: 3,
        top: 0,
        width: '100vw',
        zIndex: 1400
      }}
    >
      <Box style={{textAlign: 'center'}}>
        <Logo style={{width: '200px', marginTop: '200px'}} />
        <h1>{tenantConfig.name}</h1>
      </Box>
    </Box>
  )
};
