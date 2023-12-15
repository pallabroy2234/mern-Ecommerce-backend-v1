import {lazy} from "react";

import SellerDashboard from "../../views/seller/SellerDashboard.jsx";
import AddProduct from "../../views/seller/AddProduct.jsx";
import Products from "../../views/seller/Products.jsx";
import DiscountProducts from "../../views/seller/DiscountProducts.jsx";
import Orders from "../../views/seller/Orders.jsx";
import Payments from "../../views/seller/Payments.jsx";
import SellerToCustomer from "../../views/seller/SellerToCustomer.jsx";
import SellerToAdmin from "../../views/seller/SellerToAdmin.jsx";
import Profile from "../../views/seller/Profile.jsx";
import EditProduct from "../../views/seller/EditProduct.jsx";
import OrderDetails from "../../views/seller/OrderDetails.jsx";

// const SellerDashboard = lazy(() => import("../../views/seller/SellerDashboard.jsx"));
// const AddProduct = lazy(() => import("../../views/seller/AddProduct.jsx"));
// const Products = lazy(() => import("../../views/seller/Products.jsx"));
// const DiscountProducts = lazy(() => import("../../views/seller/DiscountProducts.jsx"));
// const Orders = lazy(() => import("../../views/seller/Orders.jsx"));1
// const Payments = lazy(() => import("../../views/seller/Payments.jsx"));
// const SellerToCustomer = lazy(() => import("../../views/seller/SellerToCustomer.jsx"));
// const SellerToAdmin = lazy(() => import("../../views/seller/SellerToAdmin.jsx"));
// const Profile = lazy(() => import("../../views/seller/Profile.jsx"));
// const EditProduct = lazy(() => import("../../views/seller/EditProduct.jsx"));
// const OrderDetails = lazy(() => import("../../views/seller/OrderDetails.jsx"));



export const sellerRoutes = [
   
    {
        path: "/seller/dashboard",
        element: <SellerDashboard/>,
        role: "seller",
        status: "active"
    }
    , {
        path: "/seller/dashboard/add-product",
        element: <AddProduct/>,
        role: "seller",
        status: "active"
    },
    {
        path: "/seller/dashboard/edit-product/:productId",
        element: <EditProduct/>,
        role: "seller",
        status: "active"
    },
    {
        path: "/seller/dashboard/products",
        element: <Products/>,
        role: "seller",
        status: "active"
    },
    {
        path: "/seller/dashboard/discount-products",
        element: <DiscountProducts/>,
        role: "seller",
        status: "active"
    }, {
        path: "/seller/dashboard/orders",
        element: <Orders/>,
        role: "seller",
        ability: ["active", "deactive"],
    },
    {
        path: "/seller/dashboard/order/details/:orderId",
        element: <OrderDetails/>,
        role: "seller",
        ability: ["active", "deactive"],
    },
    {
        path: "/seller/dashboard/payments",
        element: <Payments/>,
        role: "seller",
        status: "active"
    },
    {
        path: "/seller/dashboard/chat-support",
        element: <SellerToAdmin/>,
        ability: ["active", "deactive", "pending"],
    },
    {
        path: "/seller/dashboard/chat-customer/:customerId",
        element: <SellerToCustomer/>,
        role: "seller",
        status: "active"
    },
    {
        path: "/seller/dashboard/chat-customer",
        element: <SellerToCustomer/>,
        role: "seller",
        status: "active"
    },
    {
        path: "/seller/dashboard/profile",
        element: <Profile/>,
        role: "seller",
        status: "active"
    }
]