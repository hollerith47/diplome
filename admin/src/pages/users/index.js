import { useCallback, useEffect, useMemo, useState } from 'react';
import NextLink from 'next/link';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import { Button, SvgIcon } from '@mui/material';
import { useSelection } from 'src/hooks/use-selection';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { UsersTable } from 'src/sections/user/users-table';
import { UsersSearch } from 'src/sections/user/users-search';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers } from '../../redux/slices/authSlice';
import ShowUsers from '../../sections/user/show-users';
import { useUsers, useUserIds } from '../../hooks';


const pageData = {
    pageTitle: 'Пользователи | H Tech',
    title: 'Пользователи'
};

const AddButton = () => {
    return (
      <Button
        startIcon={(
          <SvgIcon fontSize="small">
              <PlusIcon/>
          </SvgIcon>
        )}
        variant="contained"
        component={NextLink}
        href={'/add/user'}
      >
          Добавить пользователя
      </Button>
    )
}

const Page = () => {
    const dispatch = useDispatch();
    const { allUsers, isLoading } = useSelector(store => store.auth);
    const usersArray = allUsers ? allUsers : [];
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [searchQuery, setSearchQuery] = useState('');
    const users = useUsers(usersArray, page, rowsPerPage, searchQuery);
    const userIds = useUserIds(users);
    const usersSelection = useSelection(userIds);

    const handlePageChange = useCallback(
      (event, value) => {
          setPage(value);
      },
      []
    );

    const handleRowsPerPageChange = useCallback(
      (event) => {
          setRowsPerPage(event.target.value);
      },
      []
    );

    useEffect(() => {
        dispatch(getUsers());
    }, [dispatch]);

    return (
      <>
          <ShowUsers
            pageData={pageData}
            usersComponent={
                <UsersTable
                  count={usersArray.length}
                  items={users}
                  onDeselectAll={usersSelection.handleDeselectAll}
                  onDeselectOne={usersSelection.handleDeselectOne}
                  onPageChange={handlePageChange}
                  onRowsPerPageChange={handleRowsPerPageChange}
                  onSelectAll={usersSelection.handleSelectAll}
                  onSelectOne={usersSelection.handleSelectOne}
                  page={page}
                  rowsPerPage={rowsPerPage}
                  selected={usersSelection.selected}
                />
            }
            isLoading={isLoading}
            btnComponent={<AddButton />}
            userSearchComponent={<UsersSearch
              onSearchChange={(e) => setSearchQuery(e.target.value)}/>}
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
