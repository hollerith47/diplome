import { useMemo } from 'react';

const useUserIds = (users) => {
    return useMemo(
      () => {
          return users.map((user) => user.id);
      },
      [users]
    );
};

export default useUserIds;