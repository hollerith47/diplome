import { Button, SvgIcon } from '@mui/material';
import NextLink from 'next/link';
import { PencilLine } from 'phosphor-react';

const EditUserBtn = ({href}) => {
    return (
      <>
          <Button
            startIcon={(
              <SvgIcon fontSize="small">
                  <PencilLine />
              </SvgIcon>
            )}
            variant="contained"
            component={NextLink}
            href={href}
          >
              Edit
          </Button>

      </>
    );
};

export default EditUserBtn;