import React from 'react';
import {CircularProgress, Stack} from "@mui/material";

const SubmittingLoader = () => {
    return (
        <Stack alignItems={"center"}>
            <CircularProgress />
        </Stack>
    );
};

export default SubmittingLoader;
