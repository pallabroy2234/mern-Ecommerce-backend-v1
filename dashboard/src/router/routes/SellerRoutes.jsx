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


const Home = lazy(() => import("../../views/Home.jsx"));
export const sellerRoutes = [
    {
        path: "/",
        element: <Home/>,
        ability: ["admin", "seller"]
    },
    {
        path: "/seller/dashboard",
        element: <SellerDashboard/>,
        role: "seller",
        status:"active"
    }
    , {
        path: "/seller/dashboard/add-product",
        element: <AddProduct/>,
        role: "seller",
        status:"active"
    },
    {
        path: "/seller/dashboard/products",
        element: <Products/>,
        role: "seller",
        status:"active"
    },
    {
        path: "/seller/dashboard/discount-products",
        element: <DiscountProducts/>,
        role: "seller",
        status:"active"
    },{
        path: "/seller/dashboard/orders",
        element: <Orders/>,
        role: "seller",
        ability: ["active", "deactive"],
    },
    {
        path: "/seller/dashboard/payments",
        element: <Payments/>,
        role: "seller",
        status:"active"
    },
    {
        path: "/seller/dashboard/chat-support",
        element: <SellerToAdmin/>,
        ability: ["active", "deactive","pending"],
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