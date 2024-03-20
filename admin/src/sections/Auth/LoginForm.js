import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { useState } from 'react';
import NextLink from 'next/link';
import { yupResolver } from '@hookform/resolvers/yup';
import { Eye, EyeSlash } from 'phosphor-react';
import { useForm } from 'react-hook-form';
import { FormProvider, RHFTextField } from '../../components/hook-form';
import {
    Button,
    IconButton,
    InputAdornment,
    Link,
    Stack,
    Alert,
    useTheme
} from '@mui/material';
import { loginAdmin } from '../../redux/slices/authSlice';

const LoginForm = () => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const { isLoading } = useSelector(store => store.auth);
    const [showPassword, setShowPassword] = useState(false);
    const LoginSchema = Yup.object().shape({
        email: Yup.string().required('Email is required').email(
          'Email must be a valid email address'),
        password: Yup.string().required('Password is required')
    });

    const defaultValues = {
        email: 'demo@htech.com',
        password: 'demo@1234'
    };

    const methods = useForm({
        resolver: yupResolver(LoginSchema),
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
            console.log(data);
            const response = await dispatch(loginAdmin(data))
        } catch (err) {
            reset();
            setError('afterSubmit', {
                message: err.data.message
            });
        }
    };

    return (
      <FormProvider
        methods={methods}
        onSubmit={handleSubmit(onSubmit)}
      >
          <Stack spacing={3}>
              {!!errors.afterSubmit && <Alert severity="error">{errors.afterSubmit.message}</Alert>}
              {isSubmitting && <Alert severity="info"> is submitting ...</Alert>}
              {isSubmitSuccessful && <Alert
                severity="success">{'form submitted successfully'}</Alert>}

              <RHFTextField
                name={'email'}
                label="Адрес электронной почты"
              />
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
          </Stack>
          <Stack alignItems={'flex-end'}
                 sx={{ my: 2 }}>
              {/*<Link href="/auth/reset-password">*/}
              <Link
                href={'/auth/reset-password'}
                component={NextLink}
                variant={'body2'}
                color={'inherit'}
                underline={'always'}
              >
                  Забыли пароль?
              </Link>
              {/*</Link>*/}
          </Stack>
          <Button
            fullWidth
            color={'inherit'}
            size={'large'}
            type={'submit'}
            variant={'contained'}
            disabled={isLoading}
            sx={{
                backgroundColor: theme.palette.primary.main,
                color: (theme) => theme.palette.mode === 'light' ? 'common.white' : 'grey.800',
                '&:hover': {
                    backgroundColor: 'text.primary',
                    color: (theme) => theme.palette.mode === 'light' ? 'common.white' : 'grey.800'
                }
            }}
          >
              Войти
          < /Button>
      </FormProvider>
    );
};

export default LoginForm;