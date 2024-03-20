import Head from 'next/head';
import { Box, Link, Stack, Typography } from '@mui/material';
import NextLink from 'next/link';

const AuthPageComponent = ({pageData, formComponent}) => {
    return (
      <>
          <Head>
              <title>
                  {pageData.headerTitle}
              </title>
          </Head>
          <Box
            sx={{
                backgroundColor: 'background.paper',
                flex: '1 1 auto',
                alignItems: 'center',
                display: 'flex',
                justifyContent: 'center'
            }}
          >
              <Box
                sx={{
                    maxWidth: 550,
                    px: 3,
                    py: '100px',
                    width: '100%'
                }}
              >
                  <div>
                      <Stack
                        spacing={1}
                        sx={{ mb: 3 }}
                      >
                          <Typography variant="h4">
                              {pageData.title}
                          </Typography>
                          <Typography
                            color="text.secondary"
                            variant="body2"
                          >
                              {pageData.subtitle}
                              &nbsp;
                              <Link
                                component={NextLink}
                                href={pageData.href}
                                underline="hover"
                                variant="subtitle2"
                              >
                                  {pageData.btnTitle}
                              </Link>
                          </Typography>
                      </Stack>
                      {/* form */}
                      {formComponent}
                  </div>
              </Box>
          </Box>;
      </>
    );
};

export default AuthPageComponent;