import {lazy} from "react";

// import SellerDashboard from "../../views/seller/SellerDashboard.jsx";
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
import Pending from "../../views/seller/Pending.jsx";
import Deactive from "../../views/seller/Deactive.jsx";
import AddBanner from "../../views/seller/AddBanner.jsx";
import Banners from "../../views/seller/Banners.jsx";


const SellerDashboard = lazy(() => import("../../views/seller/SellerDashboard.jsx"));


export const sellerRoutes = [
    {
        path: "/seller/account-pending",
        element: <Pending/>,
        ability:"seller",
       
    },
    {
        path: "/seller/account-deactive",
        element: <Deactive/>,
        ability:"seller",
        
    },
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
        visibility: ["active", "deactive"],
    },
    {
        path: "/seller/dashboard/order/details/:orderId",
        element: <OrderDetails/>,
        role: "seller",
        visibility: ["active", "deactive"],
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
        role: "seller",
        visibility: ["active", "deactive", "pending"],
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
        visibility: ["active", "deactive", "pending"],
    },
    {
        path: "/seller/dashboard/add-banner/:productId",
        element: <AddBanner/>,
        role: "seller",
        status: "active"
    },
    {
        path: "/seller/dashboard/banners",
        element: <Banners/>,
        role: "seller",
           status: "active"
    },
]