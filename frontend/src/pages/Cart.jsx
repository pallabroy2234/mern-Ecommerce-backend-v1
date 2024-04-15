import Headers from "../components/Headers.jsx";
import {Link, useNavigate} from "react-router-dom";
import {MdOutlineKeyboardArrowRight} from "react-icons/md";
import Footer from "../components/Footer.jsx";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {deleteCartProduct, getCartProducts, messageClear, quantityDecrement, quantityIncrement} from "../store/reducers/cartReducer.js";
import {FadeLoader} from "react-spinners";
import toast from "react-hot-toast";

const Cart = () => {
	const dispatch = useDispatch();
	const {cartProducts, loader, cartProductCount, price, shippingFee, buyProductItem, outOfStockProducts, successMessage, errorMessage} = useSelector((state) => state.cart);
	const {userInfo} = useSelector((state) => state.auth);
	const navigate = useNavigate();
	const cardProducts = [1, 2];

	// Get Cart Products
	useEffect(() => {
		dispatch(getCartProducts(userInfo.id));
	}, []);

	useEffect(() => {
		if (successMessage) {
			toast.success(successMessage);
			dispatch(messageClear());
			dispatch(getCartProducts(userInfo.id));
		}
		if (errorMessage) {
			toast.error(errorMessage);
			dispatch(messageClear());
		}
	}, [successMessage, errorMessage]);

	// * Delete Cart Product
	const handleCartProductDelete = (cartId) => {
		dispatch(deleteCartProduct(cartId));
	};

	const truncateName = (name) => {
		const letter = name.split("");
		if (letter.length > 70) {
			return letter.slice(0, 70).join("") + "...";
		}
		return name;
	};

	const handleRedirect = () => {
		navigate("/shipping", {
			state: {
				products: cartProducts,
				price: parseInt(price),
				shippingFee: shippingFee,
				items: buyProductItem,
			},
		});
	};

	const handleQuantityIncrement = (quantity, stock, cartId) => {
		const temp = quantity + 1;
		if (temp <= stock + 1) {
			dispatch(quantityIncrement(cartId));
		}
	};

	const handleQuantityDecrement = (quantity, cartId) => {
		console.log(quantity, cartId);
		const temp = quantity - 1;
		if (temp >= 0) {
			dispatch(quantityDecrement(cartId));
		}
	};

	return (
		<div>
			{loader && (
				<div className='w-screen h-screen flex justify-center items-center fixed left-0 top-0 bg-[#38303033] z-[999]'>
					<FadeLoader />
				</div>
			)}
			<Headers />
			{/* Banner Section */}
			<div className="bg-[url('/images/banner/card.jpg')] h-[220px] mt-6 bg-cover bg-no-repeat relative bg-left">
				<div className='absolute left-0 top-0 w-full h-full bg-[#2422228a]'>
					<div className='wrapper h-full text-white'>
						<div className='flex flex-col justify-center gap-1 items-center h-full w-full text-white'>
							<h2 className='text-3xl sm:text-xl font-bold'>Shop.my</h2>
							<div className='flex justify-center items-center gap-2 text-2xl sm:text-sm w-full'>
								<Link to={"/"}>Home</Link>
								<span className='pt-2'>
									<MdOutlineKeyboardArrowRight />
								</span>
								<span>Card</span>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className='bg-bright-gray'>
				<div className='customContainer py-16'>
					{cartProducts.length > 0 || outOfStockProducts.length > 0 ? (
						<div className='flex flex-wrap'>
							{/* Left Section */}
							<div className='w-[67%] md-lg:w-full'>
								<div className='pr-3 md-lg:pr-0'>
									<div className='flex flex-col gap-3'>
										<div className='bg-white p-4 '>
											<h2 className='text-md text-green-500 font-semibold'>Stock Products {cartProducts.length}</h2>
										</div>
										{cartProducts &&
											cartProducts?.map((product, index) => (
												<div key={index} className='flex bg-white p-4 flex-col gap-2'>
													<div className='flex justify-start items-center'>
														{/* Shop Name */}
														<h2 className='text-md text-slate-600'>{product?.shopName}</h2>
													</div>
													{product?.products.map((item, index) => (
														<div key={index} className='w-full flex flex-wrap  sm:mb-10'>
															<div className='flex sm:w-full gap-2 w-7/12'>
																<div className='flex gap-4 justify-start items-center'>
																	<img className='w-[80px] h-[80px] object-contain' src={item?.productInfo?.images[0].url} alt={item?.productInfo?.name} />
																	<div className='pr-4 text-slate-600 flex flex-col  gap-2 justify-between'>
																		<h2 className='text-md'>{truncateName(item?.productInfo?.name)}</h2>
																		<div className='flex flex-row gap-5'>
																			<span className='text-sm'>Brand : {item?.productInfo?.brand}</span>
																			{item?.quantity === item?.productInfo?.stock ? <span className='text-red-500 text-sm'>Stock: {item?.productInfo?.stock}</span> : <span className='text-green-500 text-sm'>Stock: {item?.productInfo?.stock}</span>}
																		</div>
																	</div>
																</div>
															</div>

															<div className='flex justify-between w-5/12 sm:w-full sm:mt-3'>
																{/*  Price */}
																<div className='pl-4 sm:pl-0'>
																	<h2 className='text-lg text-orange-500'>${item?.productInfo?.price - Math.floor((item?.productInfo?.price * item?.productInfo?.discount) / 100)}</h2>
																	<p className='line-through'>${item?.productInfo?.price}</p>
																	<p>-{item?.productInfo?.discount}%</p>
																</div>
																{/* Quantity */}
																<div className='flex gap-2 flex-col'>
																	<div className='flex bg-slate-200 h-[30px] justify-center items-center text-xl'>
																		<button onClick={() => handleQuantityDecrement(item?.quantity, item?.cartId)} disabled={item?.quantity === 0} className='px-3 disabled:text-gray-400 disabled:cursor-not-allowed cursor-pointer'>
																			-
																		</button>
																		<div className='px-3 text-[14px] flex justify-center items-center pt-1'>{item?.quantity}</div>
																		<button
																			onClick={() => handleQuantityIncrement(item?.quantity, item?.productInfo?.stock, item?.cartId)}
																			disabled={item?.quantity >= item?.productInfo?.stock + 1}
																			className='px-3 disabled:text-gray-400 disabled:cursor-not-allowed cursor-pointer'>
																			+
																		</button>
																	</div>
																	<button onClick={() => handleCartProductDelete(item?.cartId)} className='px-5 py-[3px] bg-red-500 text-white'>
																		Delete
																	</button>
																</div>
															</div>
														</div>
													))}
												</div>
											))}
										{outOfStockProducts.length > 0 && (
											<div className='flex flex-col gap-3'>
												<div className='bg-white p-4 '>
													<h2 className='text-md text-red-500 font-semibold'>Out Of Stock {outOfStockProducts.length}</h2>
												</div>
												<div className='bg-white flex flex-col gap-4 p-4'>
													{outOfStockProducts &&
														outOfStockProducts?.map((item, index) => (
															<div key={index} className='w-full flex flex-wrap'>
																<div className='flex sm:w-full gap-2 w-7/12'>
																	<div className='flex gap-2 justify-start items-center'>
																		<img className='w-[80px] h-[80px] object-cover' src={item?.products[0]?.images[0]?.url} alt={item?.products[0]?.name} />
																		<div className='pr-4 text-slate-600 flex flex-col gap-2'>
																			<h2 className='text-md'>{truncateName(item?.products[0]?.name)}</h2>
																			<div className='flex flex-row justify-start items-center gap-3'>
																				<span className='text-sm'>Brand : {item?.products[0]?.brand}</span>
																				<span className='text-sm text-red-500'>Stock: {item?.products[0]?.stock}</span>
																			</div>
																		</div>
																	</div>
																</div>

																<div className='flex justify-between w-5/12 sm:w-full sm:mt-3'>
																	{/*  Price */}
																	<div className='pl-4 sm:pl-0'>
																		<h2 className='text-lg text-orange-500'>${item?.products[0].price - Math.floor((item?.products[0].price * item?.products[0]?.discount) / 100)}</h2>
																		<p className='line-through'>${item?.products[0]?.price}</p>
																		<p>-{item?.products[0]?.discount}%</p>
																	</div>
																	{/* Quantity */}
																	<div className='flex gap-2 flex-col'>
																		<div className='flex bg-slate-200 h-[30px] justify-center items-center text-xl'>
																			<button onClick={() => handleQuantityDecrement(item?.quantity, item?._id)} className='px-3 cursor-pointer'>
																				-
																			</button>
																			<div className='px-3 text-[14px] flex justify-center items-center pt-1'>{item?.quantity}</div>
																			<button disabled={true} className='px-3  disabled:text-gray-400 disabled:cursor-not-allowed cursor-pointer'>
																				+
																			</button>
																		</div>
																		<button onClick={() => handleCartProductDelete(item?._id)} className='px-5 py-[3px] bg-red-500 text-white'>
																			Delete
																		</button>
																	</div>
																</div>
															</div>
														))}
												</div>
											</div>
										)}
									</div>
								</div>
							</div>

							{/*  Right Section   */}

							<div className='w-[33%] md-lg:w-full'>
								<div className='pl-3 md-lg:pl-0 md-lg:mt-5'>
									{cardProducts.length > 0 && (
										<div className='bg-white p-3 text-slate-600 flex flex-col gap-3'>
											<h2 className='text-xl font-bold capitalize'>Order Summary</h2>
											<div className='flex justify-between items-center'>
												<span>{buyProductItem} Item</span>
												<span>${price}</span>
											</div>

											<div className='flex justify-between items-center'>
												<span>Shipping Fee</span>
												<span>${shippingFee}</span>
											</div>

											<div className='flex gap-2'>
												<input type='text' className='w-full px-3 border border-slate-200 outline-0 focus:border-orange-500 rounded-sm py-2' placeholder='Coupon' />
												<button className='px-5 py-[1px] bg-blue-500 text-white rounded-sm uppercase text-sm'>Apply</button>
											</div>

											<div className='flex justify-between items-center'>
												<span className='capitalize'>Total</span>
												<span className='text-lg text-orange-500 font-medium'>${price + shippingFee}</span>
											</div>
											<button onClick={handleRedirect} className='px-5 py-[8px] rounded-sm hover:shadow-orange-500/20 hover:shadow-lg bg-orange-500 text-sm text-white uppercase'>
												Process to checkout {buyProductItem}
											</button>
										</div>
									)}
								</div>
							</div>
						</div>
					) : (
						<div>
							<Link to={"/shop"} className='px-4 py-2 border border-indigo-500 bg-indigo-500 text-white rounded-md hover:border hover:border-indigo-500 hover:bg-transparent hover:text-indigo-500 transition-all duration-300 '>
								Shop Now
							</Link>
						</div>
					)}
				</div>
			</div>

			<Footer />
		</div>
	);
};
export default Cart;
