import {AiFillHeart, AiOutlineShoppingCart} from "react-icons/ai";
import {Link, useNavigate} from "react-router-dom";
import {FaEye} from "react-icons/fa";
import Rattings from "../Rattings.jsx";
import {useDispatch, useSelector} from "react-redux";
import React, {useEffect, useState} from "react";
import {addToCart, addToWishlist, messageClear} from "../../store/reducers/cartReducer.js";
import toast from "react-hot-toast";

const ShopProduct = ({style, products}) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const {userInfo} = useSelector((state) => state.auth);
	const {loading} = useSelector((state) => state.home);
	const {successMessage, errorMessage, loader} = useSelector((state) => state.cart);
	const [windowWidth, setWindowWidth] = useState(window.innerWidth);

	const handleAddToCart = (id) => {
		if (userInfo) {
			dispatch(
				addToCart({
					userId: userInfo.id,
					quantity: 1,
					productId: id,
				}),
			);
		} else {
			navigate("/login");
		}
	};

	const handleAddToWishList = (item) => {
		if (userInfo) {
			dispatch(
				addToWishlist({
					userId: userInfo.id,
					productId: item?._id,
					name: item?.name,
					price: item?.price,
					image: item?.images[0]?.url,
					discount: item?.discount,
					ratting: item?.ratting,
					slug: item?.slug,
				}),
			);
		} else {
			navigate("/login");
		}
	};

	useEffect(() => {
		if (successMessage) {
			toast.success(successMessage);
			dispatch(messageClear());
		}
		if (errorMessage) {
			toast.error(errorMessage);
			dispatch(messageClear());
		}
	}, [successMessage, errorMessage]);

	// Update window width on resize
	useEffect(() => {
		const handleResize = () => {
			setWindowWidth(window.innerWidth);
		};
		window.addEventListener("resize", handleResize);
		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	const truncateName = (name) => {
		if (style === "grid" || windowWidth <= 991) {
			// Truncate to a shorter length for grid layout or on smaller screens
			const maxLength = 45; // Define your desired maximum length
			return name.length > maxLength ? name.slice(0, maxLength) + "..." : name;
		} else if (style === "list") {
			// Truncate to a longer length for single-column layout on larger screens
			const maxLength = 200; // Define your desired maximum length
			return name.length > maxLength ? name.slice(0, maxLength) + "..." : name;
		}
	};

	return (
		<>
			<div className={`grid ${style === "grid" ? "3xl:grid-cols-4 2xl:grid-cols-4 xl:grid-cols-3 md-lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 grid-cols-1  gap-4" : "grid-cols-1 md-lg:grid-cols-2 sm:grid-cols-1  gap-3"}`}>
				{products ? (
					<>
						{products?.map((item, index) => (
							<div key={index} className={`shadow-md  rounded-md group z-50 transition-all duration-500 hover:-translate-y-2 ${loading ? "animate-pulse" : ""}`}>
								<div className={`${style === "grid" ? "flex flex-col gap-2" : "grid grid-cols-12 md-lg:flex  md-lg:flex-col gap-8"}`}>
									<div className={`${style === "grid" ? "w-full h-full" : "col-span-4 lg:w-full lg:h-full"} relative overflow-hidden`}>
										<div className='h-[200px]'>
											<img className={`w-full h-full object-contain ${loading ? "animate-pulse" : ""}`} src={item.images[0]?.url} alt='' />
										</div>
										<ul className={`z-50 flex transition-all duration-500 -bottom-10 justify-center items-center opacity-0 group-hover:opacity-100 gap-3 absolute w-full group-hover:bottom-8`}>
											<li onClick={() => handleAddToWishList(item)} className='w-[38px] h-[38px] cursor-pointer bg-white flex justify-center items-center rounded-full hover:bg-dark-moderate-green hover:text-white hover:rotate-[720deg] transition-all duration-200'>
												<AiFillHeart />
											</li>
											<Link to={`/product/details/${item?.slug}`} className='w-[38px] h-[38px] cursor-pointer bg-white flex justify-center items-center rounded-full hover:bg-dark-moderate-green hover:text-white hover:rotate-[720deg] transition-all duration-200'>
												<FaEye />
											</Link>
											<li onClick={() => handleAddToCart(item?._id)} className='w-[38px] h-[38px] cursor-pointer bg-white flex justify-center items-center rounded-full hover:bg-dark-moderate-green hover:text-white hover:rotate-[720deg] transition-all duration-200'>
												<AiOutlineShoppingCart />
											</li>
										</ul>
										<div className='z-40 absolute w-full h-full top-0 bottom-0 left-0 right-0 bg-black  opacity-0 group-hover:opacity-20 transition-all'></div>
									</div>
									<div className={`${style === "grid" ? "flex justify-start items-start flex-col gap-1 " : "col-span-8"}  p-2 -z-50`}>
										<h2 className={`text-md  text-slate-700 font-medium${loading ? "animate-pulse" : ""}`}>{truncateName(item?.name)}</h2>
										<div className='flex justify-start items-center gap-3 mt-4'>
											<span className={`text-md font-bold text-slate-700 ${loading ? "animate-pulse" : ""}`}>${item?.price}</span>
											<div className={`flex text-lg ${loading ? "animate-pulse" : ""}`}>
												<Rattings rattings={item?.ratting} />
											</div>
										</div>
									</div>
								</div>
							</div>
						))}
					</>
				) : (
					<div className='text-xl font-bold'>No Product Found</div>
				)}
			</div>
		</>
	);
};
export default ShopProduct;
