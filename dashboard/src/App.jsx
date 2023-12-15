import {useEffect, useState} from "react";
import Routes from "./router/Router.jsx";
import publicRoutes from "./router/routes/PublicRoutes.jsx";
import {getRoutes} from "./router/routes/index.jsx";
import {useDispatch, useSelector} from "react-redux";
import {get_user_info} from "./store/Reducers/authReducer.js";


const App = () => {
    const dispatch = useDispatch()
    const {token} = useSelector(state => state.auth)
    const [allRoutes, setAllRoutes] = useState([...publicRoutes])
    
    useEffect(() => {
        const routes = getRoutes()
        setAllRoutes([...allRoutes, routes])
    }, []);
    
    useEffect(() => {
        if (token) {
            dispatch(get_user_info())
        }
    }, [token]);
    
    // const filteredRoutes = token ? allRoutes.filter((route)=> !route.public) :allRoutes;
    
    return (
        <Routes allRoutes={allRoutes}/>
    )
}
export default App

