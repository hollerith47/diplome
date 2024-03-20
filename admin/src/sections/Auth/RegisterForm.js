import { FormProvider, RHFOtpCodes, RHFTextField } from '../../components/hook-form';
import { useState } from 'react';
import { useTheme } from '@mui/material';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Alert, Button, IconButton, InputAdornment, Stack } from '@mui/material';
import { Eye, EyeSlash } from 'phosphor-react';

const RegisterForm = () => {
    const theme = useTheme();
    const [isSucceed, setIsSucceed] = useState(false);
    const inputs = ['code1', 'code2', 'code3', 'code4', 'code5', 'code6'];
    const [isOtpSucceed, setOtpIsSucceed] = useState(false);
    // const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const RegisterSchema = Yup.object().shape({
        first_name: Yup.string().required('First Name is required'),
        last_name: Yup.string().required('Last Name is required'),
        email: Yup.string()
                  .required('Email is required')
                  .email('Email must be a valid email address'),
        password: Yup.string().required('Password is required'),
        password_confirmation: Yup.string()
                                  .required('Confirm password is required')
                                  .oneOf([Yup.ref('password'), null], 'Passwords must match')
    });

    const registerSchema_with_otp = Yup.object().shape({
        email: Yup.string().required('Email is required').email(
          'Email must be a valid email address'),
        code1: Yup.string().required('OTP is required'),
        code2: Yup.string().required('OTP is required'),
        code3: Yup.string().required('OTP is required'),
        code4: Yup.string().required('OTP is required'),
        code5: Yup.string().required('OTP is required'),
        code6: Yup.string().required('OTP is required')
    });

    const defaultValues = {
        first_name: '',
        last_name: '',
        email: 'demo@htech-cloud.com',
        password: 'demo12345',
        password_confirmation: 'demo12345'
    };
    const methods = useForm({
        resolver: yupResolver(isSucceed ? registerSchema_with_otp : RegisterSchema),
        defaultValues
    });

    const {
        reset,
        setError,
        handleSubmit,
        formState: { errors, isSubmitting, isSubmitSuccessful }
    } = methods;

    const onSubmit = async (data) => {
        try {
            // submit to api
        } catch (error) {
            console.log(error);
            reset();
            setError('afterSubmit', {
                ...error,
                message: error.message
            });
        }
    };

    return (
      <>
          <FormProvider
            methods={methods}
            onSubmit={handleSubmit(onSubmit)}
          >
              <Stack
                spacing={3}
                sx={{maxWidth: "700px"}}
              >
                  {!!errors.afterSubmit && <Alert
                    severity="error">{errors.afterSubmit.message}</Alert>}
                  {isSubmitting && <Alert severity="info"> is submitting ...</Alert>}
                  {!isOtpSucceed &&
                    isSubmitSuccessful &&
                    <Alert security="success">
                        {isSucceed
                          ? 'check your email and provide the otp code'
                          : 'form submitted successfully'}
                    </Alert>
                  }

                  {!isSucceed &&
                    <Stack
                      direction={{ xs: 'column', sm: 'row' }}
                      spacing={2}
                    >
                        <RHFTextField
                          name={'first_name'}
                          label={'Имя'}
                        />
                        <RHFTextField
                          name={'last_name'}
                          label={'Фамилия'}
                        />
                    </Stack>
                  }
                  <RHFTextField
                    name={'email'}
                    label="Адрес электронной почты"
                  />

                  {!isSucceed ?
                    <>
                        <RHFTextField
                          name={'password'}
                          label="Пароль"
                          type={showPassword ? 'text' : 'password'}
                          InputProps={{
                              endAdornment: (
                                <InputAdornment position={'end'}>
                                    <IconButton onClick={() => setShowPassword((prev) => !prev)}>
                                        {showPassword ? <Eye/> : <EyeSlash/>}
                                    </IconButton>
                                </InputAdornment>
                              )
                          }}
                        />
                        <RHFTextField
                          name={'password_confirmation'}
                          label="Подтвердите пароль"
                          type={showPassword ? 'text' : 'password'}
                          InputProps={{
                              endAdornment: (
                                <InputAdornment position={'end'}>
                                    <IconButton onClick={() => setShowPassword((prev) => !prev)}>
                                        {showPassword ? <Eye/> : <EyeSlash/>}
                                    </IconButton>
                                </InputAdornment>
                              )
                          }}
                        />
                    </> :
                    // <RHFTextField name={"otp"} label="Provide the email code confirmation"/>
                    <RHFOtpCodes
                      keyName={'code'}
                      inputs={inputs}
                    />
                  }
                  <Button
                    fullWidth
                    color="inherit"
                    size={"large"}
                    type={"submit"}
                    variant={"contained"}
                    // disabled={isLoading}
                    sx={{
                        mt: 5,
                        backgroundColor: theme.palette.primary.main,
                        color: (theme) => theme.palette.mode === "light" ? "common.white" : "grey.800",
                        '&:hover': {
                            backgroundColor: "text.primary",
                            color: (theme) => theme.palette.mode === "light" ? "common.white" : "grey.800"
                        }
                    }}
                  >
                      {isSucceed ? "Подтвердите электронную почту" : "Создать аккаунт"}
                  < /Button>
              </Stack>

          </FormProvider>
      </>
    );
};

export default RegisterForm;