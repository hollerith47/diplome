import * as Yup from 'yup';
import { format } from 'date-fns';
import {
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    Divider,
    Unstable_Grid2 as Grid
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { FormProvider, RHFTextField } from '../../components/hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import RHFAutocomplete from '../../components/hook-form/RHFAutocomplete';
import { updateImage } from '../../redux/slices/authSlice';

export const genderList = ['Мужчина', 'Женщина'];

export const AccountProfileDetails = () => {
    const dispatch = useDispatch();
    const { admin } = useSelector(store => store.auth);
    const user = admin ? admin : [];

    const profileSchema = Yup.object().shape({
        first_name: Yup.string(),
        last_name: Yup.string(),
        email: Yup.string(),
        phone: Yup.string(),
        gender: Yup.string(),
        about: Yup.string(),
        birth_date: Yup.date().default(() => new Date()),
    });

    const defaultValues = {
        first_name: user?.first_name,
        last_name: user?.last_name,
        email: user?.email,
        phone: user?.phone,
        gender: user?.gender,
        about: user?.about,
        birth_date: user?.birth_date
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
            const formattedData = {
                ...data,
                birth_date: format(new Date(data.birth_date), 'yyyy-MM-dd')
            };
            // console.log('DATA', formattedData);
            await dispatch(updateImage(formattedData));
        } catch (error) {
            console.log('error', error);
            reset();
            setError('afterSubmit', {
                ...error,
                message: error.message
            });
        }
    };

    return (
      <FormProvider
        onSubmit={handleSubmit(onSubmit)}
        methods={methods}
      >
          <Card>
              <CardHeader
                subheader="The information can be edited"
                title="Профиль"
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
                                label="Имя"
                              />
                          </Grid>
                          <Grid
                            xs={12}
                            md={6}
                          >
                              <RHFTextField
                                label="Фамилия"
                                name="last_name"
                              />
                          </Grid>
                          <Grid
                            xs={12}
                            md={6}
                          >
                              <RHFTextField
                                label="Адрес электронной почты"
                                disabled
                                name="email"
                              />
                          </Grid>
                          <Grid
                            xs={12}
                            md={6}
                          >
                              <RHFTextField
                                label="Номер телефона"
                                name="phone"
                              />
                          </Grid>
                          <Grid
                            xs={12}
                            md={6}
                          >
                              <RHFTextField
                                label="Дата рождения"
                                name="birth_date"
                                type="date"
                              />
                          </Grid>
                          <Grid
                            xs={12}
                            md={6}
                          >
                              <RHFAutocomplete
                                label="Выберите пол"
                                name="gender"
                                options={genderList.map((option) => option)}
                              />
                          </Grid>
                          <Grid
                            xs={12}
                            md={6}
                          >
                              <RHFTextField
                                label="О себе"
                                name="about"
                              />
                          </Grid>
                      </Grid>
                  </Box>
              </CardContent>
              <Divider/>
              <CardActions sx={{ justifyContent: 'flex-end' }}>
                  <Button
                    variant="contained"
                    type={'submit'}>
                      Сохранить изменения
                  </Button>
              </CardActions>
          </Card>
      </FormProvider>
    );
};
