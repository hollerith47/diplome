import {
    Avatar, Button,
    Checkbox, Stack,
    Table, TableBody,
    TableCell,
    TableHead,
    TablePagination,
    TableRow, Typography
} from '@mui/material';
import { Scrollbar } from '../../components/scrollbar';
import { getInitials } from '../../utils/get-initials';
import EditUserBtn from '../../components/edit-user-btn';
import DeleteUserBtn from '../../components/delete-user-btn';

const UserList = ({
    usersArray,
    page,
    count,
    onPageChange,
    onRowsPerPageChange,
    rowsPerPage,
    selected = [],
    onSelectAll,
    onSelectOne,
    onDeselectAll,
    onDeselectOne
}) => {
    const selectedSome = (selected.length > 0) && (selected.length < usersArray.length);
    const selectedAll = (usersArray.length > 0) && (selected.length === usersArray.length);
    return (
      <>
          <Scrollbar>
              <Table>
                  <TableHead>
                      <TableRow>
                          <TableCell padding="checkbox">
                              <Checkbox
                                checked={selectedAll}
                                indeterminate={selectedSome}
                                onChange={(event) => {
                                    if (event.target.checked) {
                                        onSelectAll?.();
                                    } else {
                                        onDeselectAll?.();
                                    }
                                }}
                              />
                          </TableCell>
                          <TableCell>
                              Name
                          </TableCell>
                          <TableCell>
                              Actions
                          </TableCell>
                      </TableRow>
                  </TableHead>
                  <TableBody>
                      {usersArray.map(user => {
                          const isSelected = selected.includes(user.id);
                          return (
                            <TableRow
                              hover
                              key={user.id}
                              selected={isSelected}
                            >
                                <TableCell padding="checkbox">
                                    <Checkbox
                                      checked={isSelected}
                                      onChange={(event) => {
                                          if (event.target.checked) {
                                              onSelectOne?.(user.id);
                                          } else {
                                              onDeselectOne?.(user.id);
                                          }
                                      }}
                                    />
                                </TableCell>
                                <TableCell>
                                    <Stack
                                      direction="row"
                                      spacing={2}
                                      sx={{ width: '100%' }}
                                      justifyContent="space-between"
                                    >
                                        <Stack
                                          alignItems="center"
                                          direction="row"
                                          spacing={3}
                                        >
                                            <Avatar src={user.image}>
                                                {getInitials(user.name)}
                                            </Avatar>
                                            <Typography variant="subtitle2">
                                                {user.first_name}{' '}{user.last_name}
                                            </Typography>
                                        </Stack>
                                    </Stack>
                                </TableCell>
                                <TableCell>
                                    <Stack direction="row" spacing={2}>
                                        <EditUserBtn href={`/users/${user.id}`} />
                                        <DeleteUserBtn handleDelete={()=> console.log(`you deleted the user with id: ${user.id}`)}/>
                                    </Stack>
                                </TableCell>
                            </TableRow>
                          );
                      })}
                  </TableBody>
              </Table>
          </Scrollbar>
          <TablePagination
            component="div"
            count={count}
            onPageChange={onPageChange}
            onRowsPerPageChange={onRowsPerPageChange}
            page={page}
            rowsPerPage={rowsPerPage}
            rowsPerPageOptions={[5, 10, 25]}
          />
      </>
    );
};

export default UserList;