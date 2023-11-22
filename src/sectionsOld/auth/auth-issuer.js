import PropTypes from 'prop-types';
import { Box, Link, Stack, Tooltip, Typography } from '@mui/material';
import { paths } from 'src/paths';

const issuers = {
  Amplify: 'https://static.easify.xyz/lp/assets/logos/logo-amplify.svg',
  Auth0: 'https://static.easify.xyz/lp/assets/logos/logo-auth0.svg',
  Firebase: 'https://static.easify.xyz/lp/assets/logos/logo-firebase.svg',
  JWT: 'https://static.easify.xyz/lp/assets/logos/logo-jwt.svg'
};

export const AuthIssuer = (props) => {
  const { issuer: currentIssuer } = props;

  return (
    <Box
      sx={{
        borderColor: 'divider',
        borderRadius: 2.5,
        borderStyle: 'solid',
        borderWidth: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        p: 3
      }}
    >
      <Typography variant="body2">
        Visit our
        {' '}
        <Link
          component="a"
          href={paths.docs}
          target="_blank"
          underline="hover"
          variant="subtitle2"
        >
          docs
        </Link>
        {' '}
        and find out how to switch between
      </Typography>
      <Stack
        alignItems="center"
        direction="row"
        gap={3}
        sx={{ mt: 2 }}
      >
        {Object.keys(issuers).map((issuer) => {
          const isCurrent = issuer === currentIssuer;
          const icon = issuers[issuer];

          return (
            <Tooltip
              key={issuer}
              title={issuer}
            >
              <Box
                component="img"
                src={icon}
                sx={{
                  height: 30,
                  '&:not(:hover)': {
                    ...(!isCurrent && {
                      filter: 'grayscale(100%)'
                    })
                  }
                }}
              />
            </Tooltip>
          );
        })}
      </Stack>
    </Box>
  );
};

AuthIssuer.propTypes = {
  issuer: PropTypes.string.isRequired
};
