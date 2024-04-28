import Headers from "../components/Headers.jsx";
import Footer from "../components/Footer.jsx";
import {FaFacebookF} from "react-icons/fa";
import {AiOutlineGooglePlus} from "react-icons/ai";
import {Link, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {messageClear, userLogin} from "../store/reducers/authReducer.js";
import {FadeLoader} from "react-spinners";
import toast from "react-hot-toast";

const Login = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const {loader, successMessage, userInfo, errorMessage} = useSelector((state) => state.auth);

	const [state, setState] = useState({
		email: "",
		password: "",
	});

	const handleChange = (e) => {
		setState({
			...state,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(userLogin(state));
	};

	useEffect(() => {
		if (successMessage) {
			toast.success(successMessage);
			dispatch(messageClear());
			navigate("/");
		}
		if (errorMessage) {
			toast.error(errorMessage);
			dispatch(messageClear());
		}
		if (userInfo) {
			navigate("/");
		}
	}, [successMessage, errorMessage]);

	return (
		<div>
			{loader && (
				<div className='w-screen h-screen flex justify-center items-center fixed left-0 top-0 bg-[#38303033] z-[999]'>
					<FadeLoader />
				</div>
			)}
			<Headers />
			{/* Register */}
			<div className='bg-slate-200 mt-4'>
				<div className='w-full justify-center items-center p-10 sm:p-5'>
					<div className='w-[500px] md:w-auto sm:w-full mx-auto bg-white rounded-md'>
						<div className='p-8 sm:p-5'>
							<h2 className=' text-center w-full text-xl text-slate-600 font-bold'>Login</h2>
							{/* Register Section */}
							<div>
								<form onSubmit={(e) => handleSubmit(e)} className='text-slate-600'>
									<div className='flex flex-col gap-1 mb-3'>
										<label htmlFor='email'>Email</label>
										<input onChange={(e) => handleChange(e)} type='email' id='email' name='email' placeholder='Email' className='w-full px-3 py-2 border border-slate-200 outline-0 focus:border-indigo-500 rounded-md' />
									</div>

									<div className='flex flex-col gap-1 mb-4'>
										<label htmlFor='password'>Password</label>
										<input onChange={(e) => handleChange(e)} type='password' id='password' name='password' placeholder='Password' className='w-full px-3 py-2 border border-slate-200 outline-0 focus:border-indigo-500 rounded-md' />
									</div>

									<button className='px-8 w-full py-2 bg-purple-500 shadow-lg hover:shadow-purple-500/30 text-white rounded-md'>Login</button>
								</form>
								<div className='flex justify-center items-center py-2'>
									<div className='h-[1px] bg-slate-300 w-[95%]'></div>
									<span className='px-3 text-slate-600'>or</span>
									<div className='h-[1px] bg-slate-300 w-[95%]'></div>
								</div>

								{/* Login with facebook */}
								<button className='px-8 w-full py-2 bg-indigo-500 shadow-lg hover:shadow-indigo-500/30 text-white rounded-md flex justify-center items-center gap-2 mb-4'>
									<span>
										<FaFacebookF />
									</span>
									<span className='capitalize text-base sm:text-sm  whitespace-nowrap text-ellipsis overflow-hidden'>Login With Facebook</span>
								</button>
								{/* Login with google */}
								<button className='px-8 w-full py-2  bg-orange-500 shadow-lg hover:shadow-orange-500/30 text-white rounded-md flex justify-center items-center gap-2 mb-4'>
									<span>
										<AiOutlineGooglePlus />
									</span>
									<span className='capitalize text-base sm:text-sm whitespace-nowrap text-ellipsis overflow-hidden'>Login With Google</span>
								</button>
							</div>

							{/*  Already Account redirect to user login page   */}
							<div className='text-center text-slate-600 pt-1'>
								<p>
									You don't have an account?{" "}
									<Link to={"/register"} className='text-blue-500'>
										Register
									</Link>
								</p>
								<p>
									<a className='text-blue-500 pr-1' target='_blank' href='http://localhost:5173/login'>
										Login
									</a>
									Seller Account
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
			<Footer />
		</div>
	);
};
export default Login;
