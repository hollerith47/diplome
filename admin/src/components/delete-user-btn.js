import { Button, SvgIcon, useTheme } from '@mui/material';
import { Trash } from 'phosphor-react';

const DeleteUserBtn = ({handleDelete}) => {
    const theme = useTheme();

    return (
      <>
          <Button
            startIcon={(
              <SvgIcon fontSize="small">
                  <Trash />
              </SvgIcon>
            )}
            onClick={handleDelete}
            variant="contained"
            sx={{backgroundColor: theme.palette.error.main}}
          >
              Delete
          </Button>

      </>
    );
};

export default DeleteUserBtn;