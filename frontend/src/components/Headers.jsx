import {GrMail} from "react-icons/gr";
import {FaFacebook, FaLinkedin, FaList, FaLock, FaUser} from "react-icons/fa";
import {AiFillGithub, AiFillHeart, AiFillShopping, AiOutlineTwitter} from "react-icons/ai";
import {MdOutlineKeyboardArrowDown} from "react-icons/md";
import {useEffect, useState} from "react";
import {Link, useLocation, useNavigate, useSearchParams} from "react-router-dom";
import {IoIosCall} from "react-icons/io";
import {useDispatch, useSelector} from "react-redux";
import {getCartProducts, getWishList} from "../store/reducers/cartReducer.js";

const Headers = () => {
	const dispatch = useDispatch();
	const {categories} = useSelector((state) => state.home);
	const {userInfo} = useSelector((state) => state.auth);
	const {cartProductCount, wishListCount} = useSelector((state) => state.cart);

	const navigate = useNavigate();
	const {pathname} = useLocation();
	const [showLanguage, setShowLanguage] = useState(false);
	const [showSideBar, setShowSideBar] = useState(true);
	const [showCategory, setShowCategory] = useState(true);
	const [height, setHeight] = useState();
	const [searchValue, setSearchValue] = useState("");
	const [category, setCategory] = useState();

	const search = (e) => {
		navigate(`/products/search?category=${category ? category : ""}&&search=${searchValue ? searchValue : ""}`);
	};

	const handleRedirectCartPage = () => {
		if (userInfo) {
			navigate("/cart");
		} else {
			navigate("/login");
		}
	};

	const handleRedirectWishListPage = () => {
		if (userInfo) {
			navigate("/dashboard/wishlist");
		} else {
			navigate("/login");
		}
	};

	useEffect(() => {
		if (userInfo !== "") {
			dispatch(getCartProducts(userInfo.id));
			dispatch(getWishList(userInfo.id));
		}
	}, []);

	return (
		<div className='w-full bg-white'>
			{/* Top Header  */}
			<div className='header-top bg-bright-gray md-lg:hidden'>
				<div className='w-[85%] lg:w-[90%] mx-auto'>
					<div className='flex w-full justify-between items-center h-[50px] text-slate-500'>
						<ul className='flex justify-start items-center gap-8'>
							<li className='flex justify-center items-center gap-2  text-sm relative after:absolute after:h-[18px] after:w-[1px] after:bg-[#afafaf] after:-right-[16px]'>
								<span className='mt-1'>
									<GrMail />
								</span>
								<span>pallabtushar2234@gmail.com</span>
							</li>
							<li>Multi vendor E-commerce</li>
						</ul>

						<div>
							<div className='flex justify-center items-center gap-10'>
								<div className='flex justify-center items-center gap-4'>
									<a href='#'>
										<FaFacebook />
									</a>
									<a href='#'>
										<AiOutlineTwitter />
									</a>
									<a href='#'>
										<FaLinkedin />
									</a>
									<a href='#'>
										<AiFillGithub />
									</a>
								</div>
								<div className='flex cursor-pointer text-slate-800 text-sm relative  justify-center items-center gap-1 border-x-[1.5px] border-[#afafaf] px-5' onClick={() => setShowLanguage(!showLanguage)}>
									<img src={"http://localhost:5174/images/language.png"} alt='' />
									<span>
										<MdOutlineKeyboardArrowDown />
									</span>
									<ul className={`${showLanguage ? "visible top-8 transition-all duration-300" : "invisible"} z-10 absolute  top-12 rounded-sm  text-white p-2 w-[100px] flex flex-col gap-3 bg-black`}>
										<li>Bangla</li>
										<li>English</li>
									</ul>
								</div>
								{userInfo ? (
									<Link to={"/dashboard"} className='flex cursor-pointer justify-center items-center gap-2 text-sm'>
										<span>
											<FaUser />
										</span>
										<span>{userInfo?.name}</span>
									</Link>
								) : (
									<Link to={"/login"} className='flex cursor-pointer justify-center items-center gap-2 text-sm'>
										<span>
											<FaLock />
										</span>
										<span>Login</span>
									</Link>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Navigation Header */}
			<div className='bg-white'>
				<div className='w-[85%] lg:w-[90%] mx-auto'>
					<div className='h-[80px] md-lg:h-[100px] flex justify-between items-center flex-wrap'>
						<div className='md-lg:w-full w-3/12 md-lg:pt-4'>
							<div className='flex justify-between items-center'>
								<Link to='/'>
									<img src={"http://localhost:5174/images/logo.png"} alt='logo' />
								</Link>
								<div onClick={() => setShowSideBar(false)} className='justify-center items-center w-[30px] h-[30px] bg-white text-slate-600 border border-slate-600 rounded-sm cursor-pointer md-lg:flex lg:hidden xl:hidden 2xl:hidden 3xl:hidden '>
									<span>
										<FaList />
									</span>
								</div>
							</div>
						</div>

						<div className='md-lg:w-full w-9/12'>
							<div className='flex justify-between md-lg:justify-center items-center flex-wrap pl-8'>
								<ul className='flex justify-start items-start gap-8 text-sm font-bold uppercase md-lg:hidden'>
									<li>
										<Link to={"/"} className={`p-2 block ${pathname === "/" ? "text-dark-moderate-green" : "text-slate-600"}`}>
											Home
										</Link>
									</li>
									<li>
										<Link to={"/shop"} className={`p-2 block ${pathname === "/shop" ? "text-dark-moderate-green" : "text-slate-600"}`}>
											Shop
										</Link>
									</li>
									<li>
										<Link to={"/"} className={`p-2 block ${pathname === "/block" ? "text-dark-moderate-green" : "text-slate-600"}`}>
											Blog
										</Link>
									</li>
									<li>
										<Link to={"/"} className={`p-2 block ${pathname === "/about" ? "text-dark-moderate-green" : "text-slate-600"}`}>
											About
										</Link>
									</li>
									<li>
										<Link to={"/"} className={`p-2 block ${pathname === "/contact" ? "text-dark-moderate-green" : "text-slate-600"}`}>
											Contact
										</Link>
									</li>
								</ul>
								<div className='flex md-lg:hidden justify-center items-center gap-5'>
									<div onClick={handleRedirectWishListPage} className='relative flex justify-center items-center cursor-pointer w-[35px] h-[35px] rounded-full bg-[#e2e2e2]'>
										<span className='text-xl text-red-500'>
											<AiFillHeart />
										</span>
										{wishListCount > 0 ? <div className='w-[20px] h-[20px] absolute bg-green-500 rounded-full text-white flex text-[12px] justify-center items-center -top-[3px] -right-[5px]'>{wishListCount}</div> : null}
									</div>
									<div onClick={handleRedirectCartPage} className='relative flex justify-center items-center cursor-pointer w-[35px] h-[35px] rounded-full bg-[#e2e2e2]'>
										<span className='text-xl text-orange-500'>
											<AiFillShopping />
										</span>
										{cartProductCount > 0 ? <div className='w-[20px] h-[20px] absolute bg-green-500 rounded-full text-white flex text-[12px] justify-center items-center -top-[3px] -right-[5px]'>{cartProductCount}</div> : null}
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Small Device Navigation bar */}
			<div className='hidden md-lg:block'>
				{/* overlay */}
				<div onClick={() => setShowSideBar(true)} className={`fixed duration-300 transition-all ${showSideBar ? "invisible" : "visible"} hidden md-lg:block w-screen h-screen bg-[rgba(0,0,0,0.5)] top-0 left-0 z-[9999]`}></div>

				{/* Navigation */}

				<div className={`w-[300px] z-[99999] transition-all duration-300 fixed  ${showSideBar ? "-left-[300px]" : "left-0"} top-0 overflow-y-auto bg-white h-screen py-6 px-8`}>
					<div className='flex justify-start flex-col gap-6'>
						<Link to='/' className='w-[170px] h-[70px] flex justify-center items-center'>
							<img src={"http://localhost:5174/images/logo.png"} className='w-full h-full object-contain' alt='logo' />
						</Link>
						<div className='flex justify-start items-center gap-6'>
							<div className='flex cursor-pointer text-slate-800 text-sm relative  justify-center items-center gap-1 border-r-[1.5px] border-[#afafaf] pr-5' onClick={() => setShowLanguage(!showLanguage)}>
								<img src={"http://localhost:5174/images/language.png"} alt='' />
								<span>
									<MdOutlineKeyboardArrowDown />
								</span>
								<ul className={`${showLanguage ? "visible top-8 transition-all duration-300" : "invisible"} z-10 absolute  top-12 rounded-sm  text-white p-2 w-[100px] flex flex-col gap-3 bg-black`}>
									<li>Bangla</li>
									<li>English</li>
								</ul>
							</div>
							{userInfo ? (
								<div className='flex cursor-pointer justify-center items-center gap-2 text-sm' to='#'>
									<span>
										<FaUser />
									</span>
									<span className='text-sm text-nowrap text-ellipsis'>{userInfo?.name}</span>
								</div>
							) : (
								<Link to='/login' className='flex cursor-pointer justify-center  items-center gap-2 text-sm'>
									<span>
										<FaLock />
									</span>
									<span>Login</span>
								</Link>
							)}
						</div>
						<ul className='flex flex-col justify-start items-start gap-3 text-md font-semibold uppercase mt-3'>
							<li>
								<Link to={"/"} className={`py-2 block ${pathname === "/" ? "text-dark-moderate-green" : "text-slate-600"}`}>
									Home
								</Link>
							</li>
							<li>
								<Link to={"/"} className={`py-2 block ${pathname === "/shop" ? "text-dark-moderate-green" : "text-slate-600"}`}>
									Shop
								</Link>
							</li>
							<li>
								<Link to={"/"} className={`py-2 block ${pathname === "/block" ? "text-dark-moderate-green" : "text-slate-600"}`}>
									Blog
								</Link>
							</li>
							<li>
								<Link to={"/"} className={`py-2 block ${pathname === "/about" ? "text-dark-moderate-green" : "text-slate-600"}`}>
									About
								</Link>
							</li>
							<li>
								<Link to={"/"} className={`py-2 block ${pathname === "/contact" ? "text-dark-moderate-green" : "text-slate-600"}`}>
									Contact
								</Link>
							</li>
							<li>
								<Link to={"/dashboard/wishlist"} className=''>
									<span className='text-orange-500'>Wishlist</span>
								</Link>
							</li>
							<li>
								<div onClick={handleRedirectCartPage} className=''>
									<span className='text-orange-500'>Cart Product</span>
								</div>
							</li>
						</ul>
						<div className='flex justify-start items-center gap-4 mt-10'>
							<a href='#'>
								<FaFacebook />
							</a>
							<a href='#'>
								<AiOutlineTwitter />
							</a>
							<a href='#'>
								<FaLinkedin />
							</a>
							<a href='#'>
								<AiFillGithub />
							</a>
						</div>

						<div className='w-full flex justify-end md-lg:justify-start gap-3 items-center'>
							<div className='w-[48px] h-[48px] rounded-full flex bg-white-smoke justify-center items-center'>
								<span>
									<IoIosCall />
								</span>
							</div>
							<div className='flex justify-end flex-col gap-1'>
								<h2 className='text-sm font-medium text-slate-700'>+8801231231231</h2>
								<span className='text-xs'>Support 33/45 time</span>
							</div>
						</div>

						<ul className='flex flex-col justify-start items-start gap-3 text-[#1c1c1c]'>
							<li className='flex justify-start items-center gap-2  text-sm'>
								<span>
									<GrMail />
								</span>
								<span>pallabtushar2234@gmail.com</span>
							</li>
							<span className='text-sm'>Multi vendor E-commerce</span>
						</ul>
					</div>
				</div>
			</div>

			{/*  Category Option   */}
			<div className='customContainer  mt-3'>
				<div className='flex w-full flex-wrap md-lg:gap-8'>
					<div className='w-3/12 md-lg:w-full'>
						<div className='bg-white relative'>
							<div onClick={() => setShowCategory(!showCategory)} className='h-[50px] bg-violet-400 text-white flex justify-center md-lg:justify-between md-lg:px-6 items-center gap-3 font-bold text-md cursor-pointer'>
								<div className='flex justify-center items-center gap-3'>
									<span>
										<FaList />
									</span>
									<span>All Category</span>
								</div>
								<span className='pt-1'>
									<MdOutlineKeyboardArrowDown />
								</span>
							</div>

							<div className={`${showCategory ? "h-0" : "h-[400px]"} overflow-y-auto  transition-all md-lg:relative duration-500 absolute z-[999] bg-white w-full border-x`}>
								<ul className='py-2 text-slate-600 font-medium'>
									{categories &&
										categories?.map((item, index) => (
											<li key={index} className='flex justify-start items-center px-[24px] py-[6px] border-b gap-5'>
												<img src={item?.image} alt={item?.name} className='w-[30px] h-[30px] rounded-full overflow-hidden' />
												<Link to={`/products?category=${item?.name}`} className='capitalize'>
													{item?.name}
												</Link>
											</li>
										))}
								</ul>
							</div>
						</div>
					</div>

					{/*  select and search Option   */}
					<div className='w-9/12 pl-8 md-lg:pl-0 md-lg:w-full'>
						<div className='flex flex-wrap w-full justify-between items-center md-lg:gap-6'>
							<div className='w-8/12 md-lg:w-full'>
								<div className='flex border h-[50px] items-center relative gap-5 '>
									<div className='relative after:absolute after:h-[25px] after:w-[1px] after:bg-[#afafaf] after:-right-[15px] md:hidden'>
										<select onChange={(e) => setCategory(e.target.value)} className='w-[170px] capitalize text-slate-600 font-semibold bg-transparent px-2 h-full outline-0 border-none cursor-pointer'>
											<option value=''>Select Categories</option>
											{categories &&
												categories.map((item, index) => (
													<option key={index} value={item?.name}>
														{item?.name}
													</option>
												))}
										</select>
									</div>
									<input type='text' onChange={(e) => setSearchValue(e.target.value)} className='w-full relative bg-transparent text-slate-500 outline-0 px-3 md:pr-[130px] h-full' placeholder='What do you need' />
									<button onClick={(e) => search(e)} className='bg-violet-400 absolute right-0 px-8 h-full font-semibold uppercase text-white'>
										Search
									</button>
								</div>
							</div>

							<div className='w-4/12 block md-lg:hidden pl-2 md-lg:w-full md-lg:p-0 '>
								<div className='w-full flex justify-end md-lg:justify-start gap-3 items-center'>
									<div className='w-[48px] h-[48px] rounded-full flex bg-white-smoke justify-center items-center'>
										<span>
											<IoIosCall />
										</span>
									</div>
									<div className='flex justify-end flex-col gap-1'>
										<h2 className='text-md font-medium text-slate-700'>+8801836197540</h2>
										<span className='text-sm'>support 33/45 time</span>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
export default Headers;
