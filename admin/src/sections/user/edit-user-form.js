import * as Yup from 'yup';
import { format } from 'date-fns';
import { useDispatch, useSelector } from 'react-redux';
import { FormProvider, RHFTextField } from '../../components/hook-form';
import { genderList } from '../account/account-profile-details';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { getUsers, updateImage, updateUserByAdmin } from '../../redux/slices/authSlice';
import {
    Box, Button, Card,
    CardActions,
    CardContent,
    CardHeader,
    Divider,
    Unstable_Grid2 as Grid
} from '@mui/material';
import RHFAutocomplete from '../../components/hook-form/RHFAutocomplete';
import { useState } from 'react';
import { ToggleEditBtn } from '../../redux/slices/appSlice';

const userRoles = ['user', 'admin'];

const EditUserForm = ({ userData, isEditable }) => {
      const dispatch = useDispatch();
      const {admin} = useSelector(store => store.auth);

      const profileSchema = Yup.object().shape({
          first_name: Yup.string(),
          last_name: Yup.string(),
          email: Yup.string(),
          phone: Yup.string(),
          gender: Yup.string(),
          about: Yup.string(),
          role: Yup.string(),
          birth_date: Yup.date().default(() => new Date())
      });

      const defaultValues = {
          first_name: userData?.first_name,
          last_name: userData?.last_name,
          email: userData?.email,
          phone: userData?.phone,
          gender: userData?.gender,
          about: userData?.about,
          role: userData?.role,
          birth_date: userData?.birth_date
      };

      const methods = useForm({
          resolver: yupResolver(profileSchema),
          defaultValues
      });

      const {
          reset,
          watch,
          setError,
          handleSubmit,
          formState: { errors, isSubmitting, isSubmitSuccessful, isValid }
      } = methods;

      const onSubmit = async (data) => {
            try {
                // send to backend
                let formattedData;
                const { email, ...rest } = data;
                formattedData = {
                    ...rest,
                    id: userData.id,
                    birth_date: format(new Date(data.birth_date), 'yyyy-MM-dd')
                };
                if (userData.id !== admin.id ){
                    console.log("this is the admin");
                    await dispatch(updateUserByAdmin(formattedData));
                    await dispatch(getUsers())
                    dispatch(ToggleEditBtn());
                }
                else {
                    console.log("same user");
                    await dispatch(updateImage(formattedData));
                    await dispatch(getUsers())
                    dispatch(ToggleEditBtn());

                }
                // console.log('DATA', formattedData);


            } catch (error) {
                console.log('error', error);
                reset();
                setError('afterSubmit', {
                    ...error,
                    message: error.message
                });
            }
        }
      ;

      return (
        <FormProvider
          methods={methods}
          onSubmit={handleSubmit(onSubmit)}
        >
            <Card>
                <CardHeader
                  subheader="The information can be edited"
                  title="Profile"
                />
                <CardContent sx={{ pt: 0 }}>
                    <Box sx={{ m: -1.5 }}>
                        <Grid
                          container
                          spacing={3}
                        >
                            <Grid
                              xs={12}
                              md={6}
                            >
                                <RHFTextField
                                  name="first_name"
                                  label="First name"
                                  disabled={!isEditable}
                                />
                            </Grid>
                            <Grid
                              xs={12}
                              md={6}
                            >
                                <RHFTextField
                                  label="Last name"
                                  name="last_name"
                                  disabled={!isEditable}
                                />
                            </Grid>
                            <Grid
                              xs={12}
                              md={6}
                            >
                                <RHFTextField
                                  label="Email Address"
                                  disabled
                                  name="email"
                                />
                            </Grid>
                            <Grid
                              xs={12}
                              md={6}
                            >
                                <RHFTextField
                                  label="Phone Number"
                                  name="phone"
                                  disabled={!isEditable}
                                />
                            </Grid>
                            <Grid
                              xs={12}
                              md={6}
                            >
                                <RHFTextField
                                  label="Birthday"
                                  name="birth_date"
                                  type="date"
                                  disabled={!isEditable}
                                />
                            </Grid>
                            <Grid
                              xs={12}
                              md={6}
                            >
                                <RHFAutocomplete
                                  label="Select gender"
                                  name="gender"
                                  disabled={!isEditable}
                                  options={genderList.map((option) => option)}
                                />
                            </Grid>
                            <Grid
                              xs={12}
                              md={6}
                            >
                                <RHFTextField
                                  label="About"
                                  name="about"
                                  disabled={!isEditable}
                                />
                            </Grid>
                            <Grid
                              xs={12}
                              md={6}
                            >
                                <RHFAutocomplete
                                  label="Make Admin"
                                  name="role"
                                  disabled={!isEditable}
                                  options={userRoles.map((option) => option)}
                                />
                            </Grid>
                        </Grid>
                    </Box>
                </CardContent>
                <Divider/>
                <CardActions sx={{ justifyContent: 'flex-end' }}>
                    <Button
                      variant="outlined"
                      disabled={!isEditable}
                      type={'reset'}>

                        Reset
                    </Button>
                    <Button
                      variant="contained"
                      disabled={!isEditable}
                      type={'submit'}>
                        Save details
                    </Button>
                </CardActions>
            </Card>

        </FormProvider>
      );
  }
;

export default EditUserForm;