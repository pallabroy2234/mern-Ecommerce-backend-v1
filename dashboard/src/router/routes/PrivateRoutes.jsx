import {adminRoutes} from "./AdminRoutes.jsx";
import {sellerRoutes} from "./SellerRoutes.jsx";


export const privateRoutes = [
    ...adminRoutes,
    ...sellerRoutes
]