import { Layout as AuthLayout } from 'src/layouts/auth/layout';
import LoginForm from '../../sections/Auth/LoginForm';
import AuthPageComponent from '../../components/authPageComponent';
import { LoginPageData } from '../../_data/authData';

const Page = () => {

    return (
      <>
          <AuthPageComponent
            pageData={LoginPageData}
            formComponent={<LoginForm />}
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
