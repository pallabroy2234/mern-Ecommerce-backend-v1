import {privateRoutes} from "./PrivateRoutes.jsx";
import MainLayout from "../../layout/mainLayout.jsx";


export const getRoutes = () => {
    return {
        path: "/",
        element: <MainLayout/>,
        children: privateRoutes
    }
}