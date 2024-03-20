import Head from 'next/head';
import { useRouter } from 'next/router';
import { Box, Button, Container, Stack, SvgIcon, Typography } from '@mui/material';
import { Layout as DashboardLayout } from '../../../layouts/dashboard/layout';
import { useDispatch, useSelector } from 'react-redux';
import EditUserForm from '../../../sections/user/edit-user-form';
import ShowUsers from '../../../sections/user/show-users';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import { BookOpen, PencilLine } from 'phosphor-react';
import { ToggleEditBtn } from '../../../redux/slices/appSlice';

const EditButton = ({ handleClick, isEditable }) => {
    return (
      <Button
        startIcon={(
          <SvgIcon fontSize="small">
              {!isEditable ? <PencilLine/> : <BookOpen/>}

          </SvgIcon>
        )}
        variant="contained"
        onClick={handleClick}
      >
          {!isEditable ? 'Edit' : 'Read only'}
      </Button>
    );
};

const Page = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const { allUsers, isLoading } = useSelector(store => store.auth);
    const { isUserEditable } = useSelector(store => store.app);
    const { id } = router.query;
    const userId = parseInt(id, 10);
    const user = allUsers.find(user => user.id === userId);

    const pageData = {
        pageTitle: 'User | H Tech',
        title: `${user.first_name}  ${user.last_name}`
    };

    const handleEditClick = () => {
        dispatch(ToggleEditBtn());
    };

    return (
      <>
          <ShowUsers
            pageData={pageData}
            usersComponent={
                <EditUserForm
                  isEditable={isUserEditable}
                  userData={user}
                />}
            btnComponent={
                <EditButton
                  handleClick={handleEditClick}
                  isEditable={isUserEditable}/>
            }
            isLoading={isLoading}
          />
      </>
    );
};

Page.getLayout = (page) => (
  <DashboardLayout>
      {page}
  </DashboardLayout>
);

export default Page;