import React from 'react';
import {Dialog, DialogActions, DialogContent, DialogTitle, Slide} from "@mui/material";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const DialogContainer = ({openDialog, handleCloseDialog,title, Action, children,maxWidth, ...other}) => {
  return (
    <Dialog
      fullWidth
      maxWidth={maxWidth ? maxWidth : "md"}
      open={openDialog}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleCloseDialog}
      sx={{backgroundColor: "#3366FF"}}
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
