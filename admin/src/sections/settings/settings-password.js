import { useState } from 'react';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
    Button,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    Divider, IconButton, InputAdornment,
    Stack,
    TextField
} from '@mui/material';
import { FormProvider, RHFTextField } from '../../components/hook-form';
import { Eye, EyeSlash } from 'phosphor-react';

export const SettingsPassword = () => {
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const ResetPasswordSchema = Yup.object().shape({
        password: Yup.string().required('New password is required'),
        password_confirmation: Yup.string().required('Confirm Password is required').oneOf([
            Yup.ref('password'), null
        ], 'Confirm Password not match with password')
    });

    const defaultValues = {
        password: 'demo123456',
        password_confirmation: ''
    };

    const methods = useForm({
        resolver: yupResolver(ResetPasswordSchema),
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
            // submit data to api
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
      <FormProvider methods={methods}>
          <Card>
              <CardHeader
                subheader="Update password"
                title="Password"
              />
              <Divider/>
              <CardContent>
                  <Stack
                    spacing={3}
                    sx={{ maxWidth: 400 }}
                  >
                      <RHFTextField
                        name={'password'}
                        label={'New Password'}
                        type={showNewPassword ? 'text' : 'password'}
                        InputProps={{
                            endAdornment: (
                              <InputAdornment position={'end'}>
                                  <IconButton onClick={() => setShowNewPassword((prev) => !prev)}>
                                      {showNewPassword ? <Eye/> : <EyeSlash/>}
                                  </IconButton>
                              </InputAdornment>
                            )
                        }}
                      />

                      <RHFTextField
                        name={'password_confirmation'}
                        label={'Confirm Password'}
                        type={showConfirmPassword ? 'text' : 'password'}
                        InputProps={{
                            endAdornment: (
                              <InputAdornment position={'end'}>
                                  <IconButton onClick={() => setShowConfirmPassword((prev) => !prev)}>
                                      {showConfirmPassword ? <Eye/> : <EyeSlash/>}
                                  </IconButton>
                              </InputAdornment>
                            )
                        }}
                      />
                  </Stack>
              </CardContent>
              <Divider/>
              <CardActions sx={{ justifyContent: 'flex-end' }}>
                  <Button variant="contained">
                      Update Password
                  </Button>
              </CardActions>
          </Card>
      </FormProvider>
    );
};
