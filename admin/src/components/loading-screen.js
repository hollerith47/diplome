import { Stack, Typography } from '@mui/material';

const LoadingScreen = () => {
    return (
      <>
          <Stack spacing={2}
                 alignItems={'center'}>
              <Typography
                variant='h5'
              >
                  Загрузка...
              </Typography>
          </Stack>
      </>
    );
};

export default LoadingScreen;