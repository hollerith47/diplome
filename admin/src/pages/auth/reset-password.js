import { Box, Link, Stack, Typography } from '@mui/material';
import NextLink from 'next/link';
import LoginForm from '../../sections/Auth/LoginForm';
import Head from 'next/head';
import { useRouter } from 'next/navigation';
import { Layout as AuthLayout } from '../../layouts/auth/layout';
import AuthPageComponent from '../../components/authPageComponent';
import { ResetPasswordPageData } from '../../_data/authData';
import ResetPasswordForm from '../../sections/Auth/ResetPasswordForm';


const Page = () => {
    const router = useRouter();

    return (
      <>
          <AuthPageComponent
            pageData={ResetPasswordPageData}
            formComponent={<ResetPasswordForm />}
          />
      </>
    );
};

Page.getLayout = (page) => (
  <AuthLayout>
      {page}
  </AuthLayout>
);

export default Page;