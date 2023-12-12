import {lazy} from "react";
import SellerDashboard from "../../views/seller/SellerDashboard.jsx";
import AddProduct from "../../views/seller/AddProduct.jsx";
import Products from "../../views/seller/Products.jsx";
import DiscountProducts from "../../views/seller/DiscountProducts.jsx";
import Orders from "../../views/seller/Orders.jsx";


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
        ability: ["seller"]
    }
    , {
        path: "/seller/dashboard/add-product",
        element: <AddProduct/>,
        ability: ["seller"]
    },
    {
        path: "/seller/dashboard/products",
        element: <Products/>,
        ability: ["seller"]
    },
    {
        path: "/seller/dashboard/discount-products",
        element: <DiscountProducts/>,
        ability: ["seller"]
    },{
        path: "/seller/dashboard/orders",
        element: <Orders/>,
        ability: ["seller"]
    }
]