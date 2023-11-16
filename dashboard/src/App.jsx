import {useEffect, useState} from "react";
import Routes from "./router/Router.jsx";
import publicRoutes from "./router/routes/PublicRoutes.jsx";
import {getRoutes} from "./router/routes/index.jsx";


const App = () => {
    const [allRoutes, setAllRoutes] = useState([...publicRoutes])
    
    useEffect(() => {
        const routes = getRoutes()
        setAllRoutes([...allRoutes, routes])
    }, []);
    
    return (
        <Routes allRoutes={allRoutes}/>
    )
}
export default App

