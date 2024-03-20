import { Layout as DashboardLayout } from '../../layouts/dashboard/layout';
import Head from 'next/head';
import { Box, Container, Stack, Typography } from '@mui/material';
import RegisterForm from '../../sections/Auth/RegisterForm';

const Page = () => {
    return (
      <>
          <Head>
              <title>
                  Регистрация пользователя | H Tech
              </title>
          </Head>
          <Box
            component="main"
            sx={{
                flexGrow: 1,
                py: 8
            }}
          >
              <Container maxWidth="xl">
                  <Stack spacing={3}>
                      <Typography variant="h4">
                          Регистрация пользователя
                      </Typography>
                      <RegisterForm />
                  </Stack>
              </Container>
          </Box>
      </>
    );
};

Page.getLayout = (page) => (
  <DashboardLayout>
      {page}
  </DashboardLayout>
);
export default Page;