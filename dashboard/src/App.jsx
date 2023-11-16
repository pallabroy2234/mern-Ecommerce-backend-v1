import {useState} from "react";
import Routes from "./router/Router.jsx";
import publicRoutes from "./router/routes/PublicRoutes.jsx";

const App = () => {
    const [allRoutes, setAllRoutes] = useState([...publicRoutes])
    
    return (
        <Routes allRoutes={allRoutes}/>
    )
}
export default App

