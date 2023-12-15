import {privateRoutes} from "./PrivateRoutes.jsx";
import MainLayout from "../../layout/mainLayout.jsx";
import ProtectRoutes from "./ProtectRoutes.jsx";



export const getRoutes = () => {
    const allRoutes = []
    
 privateRoutes.map((route)=> {
     route.element = <ProtectRoutes route={route}>{route.element}</ProtectRoutes>
 })
    return {
        path: "/",
        element: <MainLayout/>,
        children: privateRoutes
    }
}