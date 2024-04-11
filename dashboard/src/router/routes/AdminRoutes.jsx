import {lazy} from "react";
// import AdminDashboard from "../../views/admin/AdminDashboard.jsx";
// import Orders from "../../views/admin/Orders.jsx";
// import Category from "../../views/admin/Category.jsx";
// import Sellers from "../../views/admin/Sellers.jsx";
// import PaymentRequest from "../../views/admin/PaymentRequest.jsx";
// import DeactiveSellers from "../../views/admin/DeactiveSellers.jsx";
// import SellerRequest from "../../views/admin/SellerRequest.jsx";
// import SellerDetails from "../../views/admin/SellerDetails.jsx";
// import ChatSeller from "../../views/admin/ChatSeller.jsx";
// import OrderDetails from "../../views/admin/OrderDetails.jsx";

const AdminDashboard = lazy(() => import("../../views/admin/AdminDashboard.jsx"));
const Orders = lazy(() => import("../../views/admin/Orders.jsx"));
const Category = lazy(() => import("../../views/admin/Category.jsx"));
const Sellers = lazy(() => import("../../views/admin/Sellers.jsx"));
const PaymentRequest = lazy(() => import("../../views/admin/PaymentRequest.jsx"));
const DeactiveSellers = lazy(() => import("../../views/admin/DeactiveSellers.jsx"));
const SellerRequest = lazy(() => import("../../views/admin/SellerRequest.jsx"));
const SellerDetails = lazy(() => import("../../views/admin/SellerDetails.jsx"));
const ChatSeller = lazy(() => import("../../views/admin/ChatSeller.jsx"));
const OrderDetails = lazy(() => import("../../views/admin/OrderDetails.jsx"));


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
    },
    {
        path: "/admin/dashboard/payment-request",
        element: <PaymentRequest/>,
        role: "admin"
    },
    {
        path: "/admin/dashboard/deActive-sellers",
        element: <DeactiveSellers/>,
        role: "admin"
    },
    {
        path: "/admin/dashboard/sellers-request",
        element: <SellerRequest/>,
        role: "admin"
    },
    {
        path: "/admin/dashboard/seller/details/:sellerId",
        element: <SellerDetails/>,
        role: "admin"
    },
    {
        path: "/admin/dashboard/chat-sellers",
        element: <ChatSeller/>,
        role: "admin"
    },
    {
        path: "/admin/dashboard/chat-sellers/:sellerId",
        element: <ChatSeller/>,
        role: "admin"
    },
    {
        path: "/admin/dashboard/order/details/:orderId",
        element: <OrderDetails/>,
        role: "admin"
    }
]