import React, { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { Box, Stack } from "@mui/material";
import SideBar from "./SideBar";
import { useDispatch, useSelector } from "react-redux";
import { getSocket, connectSocket } from "../../socket";
import { showSnackBar } from "../../redux/slices/appSlice";

const DashboardLayout = () => {
    const { isLoggedIn, token } = useSelector(store => store.auth);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!isLoggedIn) {
            return;
        }

        connectSocket(token);

        const socket = getSocket();
        if (socket) {
            socket.on("unauthorized", () => {
                dispatch(showSnackBar({
                    open: true,
                    message: "Session expired. Please log in again.",
                    severity: "error",
                }));
            });

            return () => {
                socket.off("unauthorized");
            };
        }
    }, [isLoggedIn, token, dispatch]);

    if (!isLoggedIn) {
        return <Navigate to="/landing" replace />;
    }

    return (
        <>
            <Stack direction="row">
                <SideBar />
                <Box>
                    <Outlet />
                </Box>
            </Stack>
        </>
    );
};

export default DashboardLayout;
