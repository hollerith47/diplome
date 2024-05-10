import { Suspense, lazy } from "react";
import { Navigate, useRoutes } from "react-router-dom";

// layouts
import DashboardLayout from "../layouts/dashboard";
import MainLayout from "../layouts/main";

// config
import { DEFAULT_PATH } from "../config";
import LoadingScreen from "../components/LoadingScreen";

const Loadable = (Component) => (props) => {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <Component {...props} />
    </Suspense>
  );
};

export default function Router() {
  return useRoutes([
    {
      path: "/auth",
      element: <MainLayout />,
      children: [
        {path: "login", index: true, element: <LoginPage /> },
        {path: "register", element: <RegisterPage /> },
        {path: "reset-password", element: <ResetPasswordPage /> },
      ]
    },
    {
      path: "/",
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to={DEFAULT_PATH} replace />, index: true },
        { path: "app", element: <GeneralApp /> },
        { path: "settings", element: <Settings /> },
        { path: "group", element: <GroupPage /> },
        { path: "call", element: <CallPage /> },
        { path: "profile", element: <ProfilePage /> },
        { path: "conversation", element: <Conversation /> },
        { path: "intro", element: <Intro /> },
        { path: "join-room", element: <Join /> },
        { path: "room", element: <Room /> },

        { path: "404", element: <Page404 /> },
        { path: "*", element: <Navigate to="/404" replace /> },
      ],
    },
    { path: "*", element: <Navigate to="/404" replace /> },
    { path: "/landing", element: <LandingPage /> },
  ]);
}

const GeneralApp = Loadable(
  lazy(() => import("../pages/dashboard/GeneralApp")),
);
const LandingPage = Loadable(lazy(() => import("../pages/LandingPage")));
const LoginPage = Loadable(lazy(() => import("../pages/auth/Login")));
const RegisterPage = Loadable(lazy(() => import("../pages/auth/Register")));
const ResetPasswordPage = Loadable(lazy(() => import("../pages/auth/ResetPassword")));


const Page404 = Loadable(lazy(() => import("../pages/Page404")));
const Settings = Loadable(lazy(() => import("../pages/dashboard/Settings")));
const GroupPage = Loadable(lazy(() => import("../pages/dashboard/Group")));
const CallPage = Loadable(lazy(() => import("../pages/dashboard/Call")));
const ProfilePage = Loadable(lazy(() => import("../pages/dashboard/Profile")));
const Intro = Loadable(lazy(() => import("../pages/dashboard/Intro")));
const Join = Loadable(lazy(() => import("../pages/dashboard/Join")));
const Room = Loadable(lazy(() => import("../pages/dashboard/Room")));
const Conversation = Loadable(lazy(() => import("../pages/dashboard/Conversation")));
