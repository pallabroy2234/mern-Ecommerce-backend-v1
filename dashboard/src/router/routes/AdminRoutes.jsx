import {lazy} from "react";


const AdminDashboard = lazy(() => import("../../views/admin/AdminDashboard.jsx"));
const Orders = lazy(() => import("../../views/admin/Orders.jsx"));

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
    }
]