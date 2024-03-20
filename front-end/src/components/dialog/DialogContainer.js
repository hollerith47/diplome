import React from 'react';
import {Dialog, DialogActions, DialogContent, DialogTitle, Slide} from "@mui/material";
import {useTheme} from "@mui/material/styles";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const DialogContainer = ({openDialog, handleCloseDialog,title, Action, children,maxWidth, ...other}) => {
  const theme = useTheme();
  return (
    <Dialog
      fullWidth
      maxWidth={maxWidth ? maxWidth : "md"}
      open={openDialog}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleCloseDialog}
      sx={{backgroundColor: theme.palette.mode === 'light'
          ? '#fff'
          : theme.palette.background,}}
      {...other}
    >
      {title && <DialogTitle>{title}</DialogTitle>}
      <DialogContent>
        {children}
      </DialogContent>
      {Action && <DialogActions></DialogActions>}
    </Dialog>
  );
};

export default DialogContainer;
