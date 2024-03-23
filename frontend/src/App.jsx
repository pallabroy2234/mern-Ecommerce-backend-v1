import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./pages/Home.jsx";
import Shop from "./pages/Shop.jsx";
import Card from "./pages/Card.jsx";
import Details from "./pages/Details.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Shipping from "./pages/Shipping.jsx";
import {useDispatch} from "react-redux";
import {useEffect} from "react";
import {getCategories} from "./store/reducers/homeReducer.js";
import CategoryShop from "./pages/CategoryShop.jsx";


function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCategories())
    }, []);
    
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/" element={<Home/>}/>
                <Route path="/shop" element={<Shop/>}/>
                <Route path="/products?" element={<CategoryShop/>}/>
                <Route path="/card" element={<Card/>}/>
                <Route path="/shipping" element={<Shipping/>}/>
                <Route path="/product/details/:slug" element={<Details/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default App

