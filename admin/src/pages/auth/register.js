import { Layout as AuthLayout } from '../../layouts/auth/layout';
import RegisterForm from '../../sections/Auth/RegisterForm';
import AuthPageComponent from '../../components/authPageComponent';
import { RegisterPageData } from '../../_data/authData';

const Page = () => {

    return (
      <>
          <AuthPageComponent
            pageData={RegisterPageData }
            formComponent={<RegisterForm />}
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
