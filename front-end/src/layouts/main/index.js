import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { Container } from "@mui/material";
import { useSelector } from "react-redux";

const MainLayout = () => {
    const { isLoggedIn } = useSelector((store) => store.auth);
    if (isLoggedIn) {
        return <Navigate to={"/app"} />;
    }
    return (
        <Container sx={{ mt: 5 }}>
            <Outlet />
        </Container>
    );
};

export default MainLayout;
