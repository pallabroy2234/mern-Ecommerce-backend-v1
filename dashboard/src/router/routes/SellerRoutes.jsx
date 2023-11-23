import {lazy} from "react";
import SellerDashboard from "../../views/seller/SellerDashboard.jsx";
import AddProduct from "../../views/seller/AddProduct.jsx";

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
    ,
    {
        path: "/seller/dashboard/add-product",
        element: <AddProduct/>,
        ability: ["seller"]
    }
]