import React from 'react';
import DialogContainer from "./DialogContainer";
import DialogBody from "./DialogBody";


const ShowDialog = ({open, handleClose, header, content}) => {
    return (
        <>
            <DialogContainer
                openDialog={open}
                maxWidth={"xs"}
                handleCloseDialog={handleClose}
            >
                <DialogBody content={content} handleClose={handleClose} header={header} />
            </DialogContainer>

        </>
    );
};

export default ShowDialog;
