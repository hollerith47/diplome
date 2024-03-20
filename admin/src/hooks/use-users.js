import { useMemo } from 'react';
import { applyPagination } from '../utils/apply-pagination';

const useUsers = (usersData, page, rowsPerPage, searchQuery) => {
    return useMemo(
      // TODO: later implement search for all rows for users
      () => {
          const filteredData = usersData?.filter((user) =>
            user.first_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.last_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.email.toLowerCase().includes(searchQuery.toLowerCase())
          );
          return applyPagination(filteredData, page, rowsPerPage);
      },
      [page, rowsPerPage, searchQuery, usersData]
    );
};

export default useUsers;