 import {lazy} from "react";
 import NoFound from "../../views/No-found.jsx";
 import Home from "../../views/Home.jsx";
 import Login from "../../views/auth/Login.jsx";
 import Register from "../../views/auth/Register.jsx";
 import AdminLogin from "../../views/auth/AdminLogin.jsx";
 import UnAuthorized from "../../views/UnAuthorized.jsx";

// const NoFound = lazy(() => import("../../views/No-found.jsx"));
// const Home = lazy(() => import("../../views/Home.jsx"));
// const Login = lazy(() => import("../../views/auth/Login.jsx"));
// const Register = lazy(() => import("../../views/auth/Register.jsx"));
// const AdminLogin = lazy(() => import("../../views/auth/AdminLogin.jsx"));



const PublicRoutes = [
    {
        path: "/",
        element: <Home/>,
    },
    {
        path: "/login",
        element: <Login/>,
    },
    {
        path: "/register",
        element: <Register/>,
    },
    {
        path: "/admin/login",
        element: <AdminLogin
        />,
    },
    {
        path: "*",
        element: <NoFound/>,
    },
    {
        path: "/unauthorized",
        element: <UnAuthorized/>,
    },
];

export default PublicRoutes;
