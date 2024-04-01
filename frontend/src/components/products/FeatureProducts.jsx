import React, {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {AiFillHeart, AiOutlineShoppingCart} from "react-icons/ai";
import {FaEye} from "react-icons/fa";
import Rattings from "../Rattings.jsx";
import {useDispatch, useSelector} from "react-redux";
import {addToCart, addToWishlist, messageClear} from "../../store/reducers/cartReducer.js";
import toast from "react-hot-toast";
import {FadeLoader} from "react-spinners";

const FeatureProducts = ({featureProducts}) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const {successMessage, errorMessage, loader} = useSelector((state) => state.cart);
	const {userInfo} = useSelector((state) => state.auth);

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

	const truncateName = (name) => {
		const letter = name.split("");
		if (letter.length > 50) {
			return letter.slice(0, 50).join("") + "...";
		}
		return name;
	};

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

	return (
		<div className='customContainer'>
			{loader && (
				<div className='w-screen h-screen flex justify-center items-center fixed left-0 top-0 bg-[#38303033] z-[999]'>
					<FadeLoader />
				</div>
			)}
			<div className='w-full'>
				<div className='text-center flex justify-center items-center flex-col text-4xl text-slate-600 font-bold relative pb-[45px]'>
					<h2>Feature Products</h2>
					<div className='w-[100px] h-[4px] bg-dark-moderate-green mt-[4px]'></div>
				</div>
			</div>

			<div className='w-full grid 3xl:grid-cols-5 2xl:grid-cols-4  xl:grid-cols-4 lg:grid-cols-4 md-lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-5'>
				{featureProducts ? (
					<>
						{featureProducts?.map((item, index) => (
							<div key={index} className='group border transition-all duration-300 shadow-md hover:-translate-y-2  z-50 rounded-md'>
								{/* Product Image and Link */}
								<div className='relative overflow-hidden'>
									{item?.discount ? <div className='z-50 flex justify-center items-center absolute text-white w-[38px] h-[38px] rounded-full bg-red-500 font-semibold text-xs left-2 top-2'>-{item?.discount}%</div> : null}
									<div className='w-full h-[220px] overflow-hidden'>
										<img className='w-full h-full object-contain' src={item?.images[0]?.url} alt={truncateName(item?.name)} />
									</div>
									<ul className='z-50 flex transition-all duration-300 -bottom-10 justify-center items-center gap-3 absolute w-full group-hover:bottom-3 '>
										<li onClick={() => handleAddToWishList(item)} className='w-[38px] h-[38px] cursor-pointer bg-white flex justify-center items-center rounded-full hover:bg-dark-moderate-green hover:text-white hover:rotate-[720deg] transition-all duration-200'>
											<AiFillHeart />
										</li>
										<li>
											<Link to={`/product/details/${item?.slug}`} className='w-[38px] h-[38px] cursor-pointer bg-white flex justify-center items-center rounded-full hover:bg-dark-moderate-green hover:text-white hover:rotate-[720deg] transition-all duration-200'>
												<FaEye />
											</Link>
										</li>
										<li onClick={() => handleAddToCart(item?._id)} className='w-[38px] h-[38px] cursor-pointer bg-white flex justify-center items-center rounded-full hover:bg-dark-moderate-green hover:text-white hover:rotate-[720deg] transition-all duration-200'>
											<AiOutlineShoppingCart />
										</li>
									</ul>
									<div className='z-40 absolute w-full h-full top-0 bottom-0 left-0 right-0 bg-black  opacity-0 group-hover:opacity-20 transition-all'></div>
								</div>

								{/* Product Content */}
								<div className='py-3 text-slate-600 px-2'>
									<h2>{truncateName(item?.name)}</h2>
									<div className='flex justify-start items-center gap-3'>
										<span className='text-lg font-bold'>${item?.price}</span>
										<div className='flex'>
											<Rattings rattings={item?.ratting} />
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
		</div>
	);
};
export default FeatureProducts;
