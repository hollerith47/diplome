import React, {useEffect} from "react";
import {Navigate, Outlet} from "react-router-dom";
import {Box, Stack} from "@mui/material";
import SideBar from "./SideBar";
import {useSelector} from "react-redux";

const DashboardLayout = () => {
    const {isLoggedIn, token} = useSelector(store => store.auth);
    // const {id} = useSelector(store => store.auth.user);

    useEffect(() => {
        window.onload = function () {
            if (!window.location.hash) {
                window.location = window.location + '#loaded';
                window.location.reload();
            }
        }
        // S'abonner à un canal et écouter les événements
        // echo.channel('testChannel')
        //     .listen('Hello', (e) => {
        //         console.log('Message reçu:', e);
        //     });

        // Se désabonner du canal lors du démontage du composant
        // return () => {
        //     echo.leave('testChannel');
        // };

    }, [isLoggedIn]);

    if (!isLoggedIn) {
        return <Navigate to={"/landing"}/>
    }
    return (
        <>
            <Stack
                direction="row"
            >
                {/*sidebar*/}
                <SideBar/>
                <Box>
                    <Outlet/>
                </Box>
            </Stack>
        </>
    );
};

export default DashboardLayout;
