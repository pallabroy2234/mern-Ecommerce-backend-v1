 import {lazy} from "react";
 import NoFound from "../../views/No-found.jsx";
 // import Home from "../../views/Home.jsx";
 import Login from "../../views/auth/Login.jsx";
 import Register from "../../views/auth/Register.jsx";
 import AdminLogin from "../../views/auth/AdminLogin.jsx";
 import UnAuthorized from "../../views/UnAuthorized.jsx";

 const Home = lazy(() => import("../../views/Home.jsx"));


const PublicRoutes = [
    {
        path: "/",
        element: <Home/>,
    },
    {
        path: "/login",
        element: <Login/>,
        public:true,
    },
    {
        path: "/register",
        element: <Register/>,
        public:true,
    },
    {
        path: "/admin/login",
        element: <AdminLogin/>,
        public:true,
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
