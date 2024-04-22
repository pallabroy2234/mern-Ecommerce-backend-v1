import {lazy} from "react";
import Success from "../../views/Success.jsx";
// import NoFound from "../../views/No-found.jsx";
// import Home from "../../views/Home.jsx";
// import Login from "../../views/auth/Login.jsx";
// import Register from "../../views/auth/Register.jsx";
// import AdminLogin from "../../views/auth/AdminLogin.jsx";
// import UnAuthorized from "../../views/UnAuthorized.jsx";

const Home = lazy(() => import("../../views/Home.jsx"));
const Login = lazy(() => import("../../views/auth/Login.jsx"));
const Register = lazy(() => import("../../views/auth/Register.jsx"));
const AdminLogin = lazy(() => import("../../views/auth/AdminLogin.jsx"));
const NoFound = lazy(() => import("../../views/No-found.jsx"));
const UnAuthorized = lazy(() => import("../../views/UnAuthorized.jsx"));


const PublicRoutes = [
    {
        path: "/",
        element: <Home/>,
    },
    {
        path: "/login",
        element: <Login/>,
        public: true,
    },
    {
        path: "/register",
        element: <Register/>,
        public: true,
    },
    {
        path: "/admin/login",
        element: <AdminLogin/>,
        public: true,
    },
    {
        path: "/success?",
        element: <Success/>,
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
