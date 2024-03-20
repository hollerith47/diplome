import { Layout as DashboardLayout } from '../../layouts/dashboard/layout';
import { UsersSearch } from '../../sections/user/users-search';
import ShowUsers from '../../sections/user/show-users';
import { useDispatch, useSelector } from 'react-redux';
import UserList from '../../sections/user/user-list';
import { useCallback, useEffect, useState } from 'react';
import { useUserIds, useUsers } from '../../hooks';
import { useSelection } from '../../hooks/use-selection';
import { getUsers } from '../../redux/slices/authSlice';

const pageData = {
    pageTitle: 'Register user | H Tech',
    title: 'Edit Users'
};
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

    useEffect(() => {
        dispatch(getUsers());
    }, [dispatch]);

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

    return (
      <>
          <ShowUsers
            pageData={pageData}
            userSearchComponent={<UsersSearch
              onSearchChange={(e) => setSearchQuery(e.target.value)}/>}
            usersComponent={
                <UserList
                  usersArray={users}
                  count={usersArray.length}
                  onDeselectAll={usersSelection.handleDeselectAll}
                  onDeselectOne={usersSelection.handleDeselectOne}
                  onPageChange={handlePageChange}
                  onRowsPerPageChange={handleRowsPerPageChange}
                  onSelectAll={usersSelection.handleSelectAll}
                  onSelectOne={usersSelection.handleSelectOne}
                  page={page}
                  rowsPerPage={rowsPerPage}
                  selected={usersSelection.selected}
                />}
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