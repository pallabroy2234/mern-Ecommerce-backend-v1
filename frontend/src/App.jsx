import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./pages/Home.jsx";
import Shop from "./pages/Shop.jsx";
import Card from "./pages/Card.jsx";
import Details from "./pages/Details.jsx";


function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/shop" element={<Shop/>}/>
                <Route path="/card" element={<Card/>}/>
                <Route path="/product/details/:slug" element={<Details/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default App

