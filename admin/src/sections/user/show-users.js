import Head from 'next/head';
import { Box, Container, Stack, Typography } from '@mui/material';
import LoadingScreen from '../../components/loading-screen';

const ShowUsers = ({
    usersComponent,
    pageData,
    btnComponent,
    userSearchComponent,
    isLoading
}) => {

    return (
      <>
          <Head>
              <title>
                  {pageData.pageTitle}
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
                      <Stack
                        direction="row"
                        justifyContent="space-between"
                        spacing={4}
                      >
                          <Stack spacing={1}>
                              <Typography variant="h4">
                                  {pageData.title}
                              </Typography>
                          </Stack>
                          <div>
                              {btnComponent}
                          </div>
                      </Stack>
                      {userSearchComponent}
                      {
                          isLoading ? (
                            <LoadingScreen />
                          ) : (
                            <>
                                {usersComponent}
                            </>
                          )
                      }
                  </Stack>
              </Container>
          </Box>
      </>
    );
};

export default ShowUsers;
