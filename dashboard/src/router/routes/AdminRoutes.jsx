import {lazy} from "react";
import AdminDashboard from "../../views/admin/AdminDashboard.jsx";
import Orders from "../../views/admin/Orders.jsx";
import Category from "../../views/admin/Category.jsx";
import Sellers from "../../views/admin/Sellers.jsx";


// const AdminDashboard = lazy(() => import("../../views/admin/AdminDashboard.jsx"));
// const Orders = lazy(() => import("../../views/admin/Orders.jsx"));
// const Category = lazy(() => import("../../views/admin/Category.jsx"));

export const adminRoutes = [
    {
        path: "/admin/dashboard",
        element: <AdminDashboard/>,
        role: "admin"
    },
    {
        path: "/admin/dashboard/orders",
        element: <Orders/>,
        role: "admin"
    },
    {
        path: "/admin/dashboard/category",
        element: <Category/>,
        role: "admin"
    },
    {
        path: "/admin/dashboard/sellers",
        element: <Sellers/>,
        role: "admin"
    }
]