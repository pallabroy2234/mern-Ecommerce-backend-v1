import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./pages/Home.jsx";
import Shop from "./pages/Shop.jsx";
import Cart from "./pages/Cart.jsx";
import Details from "./pages/Details.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Shipping from "./pages/Shipping.jsx";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {getCategories} from "./store/reducers/homeReducer.js";
import CategoryShop from "./pages/CategoryShop.jsx";
import SearchProducts from "./pages/SearchProducts.jsx";
import Payment from "./pages/Payment.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import ProtectUser from "./utils/ProtectUser.jsx";
import Index from "./components/dashboard/Index.jsx";
import Orders from "./components/dashboard/Orders.jsx";
import Wishlist from "./components/dashboard/Wishlist.jsx";
import ChangePassword from "./components/dashboard/ChangePassword.jsx";
import OrderDetails from "./components/dashboard/OrderDetails.jsx";
import Chat from "./components/dashboard/Chat.jsx";
import io from "socket.io-client";
import {updateSeller} from "./store/reducers/chatReducer.js";
import ConfirmOrder from "./pages/ConfirmOrder.jsx";

const socket = io("http://localhost:3000");

function App() {
	const dispatch = useDispatch();
	const {userInfo} = useSelector((state) => state.auth);

	useEffect(() => {
		dispatch(getCategories());
	}, []);

	useEffect(() => {
		socket.on("active-seller", (allSellers) => {
			dispatch(updateSeller(allSellers));
		});
	}, []);

	return (
		<BrowserRouter>
			<Routes>
				<Route path='/login' element={<Login />} />
				<Route path='/register' element={<Register />} />
				<Route path='/' element={<Home />} />
				<Route path='/shop' element={<Shop />} />
				<Route path='/products?' element={<CategoryShop />} />
				<Route path='/products/search?' element={<SearchProducts />} />
				<Route path='/cart' element={<Cart />} />
				<Route path='/shipping' element={<Shipping />} />
				<Route path='/payment' element={<Payment />} />
				<Route path='/product/details/:slug' element={<Details />} />
				<Route path='/order/confirm?' element={<ConfirmOrder />} />

				<Route path='/dashboard' element={<ProtectUser />}>
					<Route path='' element={<Dashboard />}>
						<Route path='' element={<Index />} />
						<Route path='/dashboard/orders' element={<Orders />} />
						<Route path='/dashboard/order/details/:orderId' element={<OrderDetails />} />
						<Route path='/dashboard/wishlist' element={<Wishlist />} />
						<Route path='/dashboard/chat' element={<Chat />} />
						<Route path='/dashboard/chat/:sellerId' element={<Chat />} />
						<Route path='/dashboard/change-password' element={<ChangePassword />} />
					</Route>
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
