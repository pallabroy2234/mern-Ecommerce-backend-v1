import Headers from "../components/Headers.jsx";
import Footer from "../components/Footer.jsx";
import {FaList} from "react-icons/fa";
import {useEffect, useState} from "react";
import {Link, Outlet, useNavigate} from "react-router-dom";
import {RxDashboard} from "react-icons/rx";
import {RiProductHuntLine} from "react-icons/ri";
import {BsChat, BsHeart} from "react-icons/bs";
import {TfiLock} from "react-icons/tfi";
import {BiLogInCircle} from "react-icons/bi";
import {useDispatch, useSelector} from "react-redux";
import {logout, messageClear, userReset} from "../store/reducers/authReducer.js";
import toast from "react-hot-toast";
import {resetCart} from "../store/reducers/cartReducer.js";

const Dashboard = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [filterShow, setFilterShow] = useState(false);
	const {userInfo, successMessage, errorMessage} = useSelector((state) => state.auth);

	const handleLogout = () => {
		if (userInfo) {
			dispatch(logout());
		}
	};

	useEffect(() => {
		if (successMessage) {
			toast.success(successMessage);
			dispatch(messageClear());
			dispatch(userReset());
			dispatch(resetCart());
		}
		if (errorMessage) {
			toast.error(errorMessage);
			dispatch(messageClear());
		}
	}, [errorMessage, successMessage, userInfo]);

	return (
		<div>
			<Headers />
			<div className='bg-slate-200 mt-5'>
				<div className='w-[90%] mx-auto md-lg:block pt-5 hidden'>
					<div>
						<button onClick={() => setFilterShow(!filterShow)} className='text-center p-3 bg-indigo-500 text-white'>
							<FaList />
						</button>
					</div>
				</div>

				<div className='h-full mx-auto'>
					<div className='py-5 flex md-lg:w-[90%] mx-auto relative'>
						{/* left section */}
						<div className={`rounded-md z-[9999] shadow-lg md-lg:absolute ${filterShow ? "-left-4" : "-left-[360px]"} w-[270px] ml-4 bg-white`}>
							<ul className='py-2 text-slate-600 px-4'>
								<li className='flex justify-start items-center gap-2 py-2'>
									<span className='text-xl'>
										<RxDashboard />
									</span>
									<Link to={"/dashboard"} className='block'>
										Dashboard
									</Link>
								</li>

								<li className='flex justify-start items-center gap-2 py-2'>
									<span className='text-xl'>
										<RiProductHuntLine />
									</span>
									<Link to={"/dashboard/orders"} className='block'>
										My Orders
									</Link>
								</li>

								<li className='flex justify-start items-center gap-2 py-2'>
									<span className='text-xl'>
										<BsHeart />
									</span>
									<Link to={"/dashboard/wishlist"} className='block'>
										Wishlist
									</Link>
								</li>

								<li className='flex justify-start items-center gap-2 py-2'>
									<span className='text-xl'>
										<BsChat />
									</span>
									<Link to={"/dashboard/chat"} className='block'>
										Chat
									</Link>
								</li>

								<li className='flex justify-start items-center gap-2 py-2'>
									<span className='text-xl'>
										<TfiLock />
									</span>
									<Link to={"/dashboard/change-password"} className='block'>
										Change Password
									</Link>
								</li>

								<li className='flex justify-start items-center gap-2 py-2'>
									<span className='text-xl'>
										<BiLogInCircle />
									</span>
									<button onClick={handleLogout} type='button' className='block cursor-pointer'>
										Logout
									</button>
								</li>
							</ul>
						</div>
						{/* right section */}
						<div className='w-[calc(100%-270px)] md-lg:w-full'>
							<div className='mx-4 md-lg:mx-0'>
								<Outlet />
							</div>
						</div>
					</div>
				</div>
			</div>
			<Footer />
		</div>
	);
};
export default Dashboard;
