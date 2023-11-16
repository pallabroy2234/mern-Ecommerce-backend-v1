import {lazy} from "react";

const AdminDashboard = lazy(() => import("../../views/admin/AdminDashboard.jsx"));
export const adminRoutes = [
    {
        path: "/admin/dashboard",
        element: <AdminDashboard/>,
        role: "admin"
    }
]