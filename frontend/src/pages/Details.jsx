import Footer from "../components/Footer.jsx";
import Headers from "../components/Headers.jsx";
import {Link, useLocation, useNavigate, useParams} from "react-router-dom";
import {MdOutlineKeyboardArrowRight} from "react-icons/md";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import {GoArrowLeft, GoArrowRight} from "react-icons/go";
import React, {useEffect, useState} from "react";
import Rattings from "../components/Rattings.jsx";
import {AiFillGithub, AiFillHeart, AiOutlineTwitter} from "react-icons/ai";
import {FaFacebookF, FaLinkedin} from "react-icons/fa";
import Review from "../components/Review.jsx";
import "swiper/css";
import "swiper/css/pagination";
import {Swiper, SwiperSlide} from "swiper/react";
import {Pagination} from "swiper/modules";
import {useDispatch, useSelector} from "react-redux";
import {getProductDetails} from "../store/reducers/homeReducer.js";
import {FadeLoader} from "react-spinners";
import toast from "react-hot-toast";
import {addToCart, addToWishlist, getWishList, messageClear, removeWishlist} from "../store/reducers/cartReducer.js";

const Details = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const {loading, product, relatedProducts, moreProducts} = useSelector((state) => state.home);
	const {errorMessage, successMessage, wishListProducts} = useSelector((state) => state.cart);
	const {userInfo} = useSelector((state) => state.auth);
	const {slug} = useParams();
	const [state, setState] = useState("reviews");
	const [quantity, setQuantity] = useState(1);

	useEffect(() => {
		dispatch(getProductDetails(slug));
	}, [slug]);

	const [image, setImage] = useState("");

	useEffect(() => {
		setImage("");
	}, [product]);

	// Toast message  || Cart Reducer
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

	// * GET WISH LIST PRODUCTS

	useEffect(() => {
		if (userInfo) {
			dispatch(getWishList(userInfo.id));
		}
	}, [successMessage]);

	useEffect(() => {
		if (wishListProducts) {
			const wishlistItems = wishListProducts.map((item) => item?.productId);
			setActiveWishlistItems(wishlistItems);
		}
	}, [wishListProducts]);

	const [activeWishlistItems, setActiveWishlistItems] = useState([]);

	const truncateText = (text) => {
		if (text.length > 50) {
			return text.substring(0, 50) + "...";
		}
		return text;
	};

	const handleQuantityIncrement = () => {
		if (quantity >= product.stock) {
			toast.error("Out of Stock");
		} else {
			setQuantity(quantity + 1);
		}
	};

	const handleQuantityDecrement = () => {
		if (quantity <= 1) {
			toast.error("Minimum Quantity Reached");
		} else {
			setQuantity(quantity - 1);
		}
	};

	const handleAddToCart = () => {
		if (userInfo) {
			dispatch(
				addToCart({
					userId: userInfo.id,
					quantity: quantity,
					productId: product._id,
				}),
			);
		} else {
			navigate("/login");
		}
	};

	// * HANDLE WISHLIST FUNCTION || CART REDUCER || ADD AND REMOVE ALSO
	const handleWishlist = () => {
		if (userInfo) {
			const isAlreadyInWishlist = activeWishlistItems.includes(product._id);
			const activeWishlist = wishListProducts.find((item) => item.productId === product._id);

			if (!isAlreadyInWishlist) {
				dispatch(
					addToWishlist({
						userId: userInfo.id,
						productId: product?._id,
						name: product?.name,
						price: product?.price,
						image: product?.images[0]?.url,
						discount: product?.discount,
						ratting: product?.ratting,
						slug: product?.slug,
					}),
				);
			} else {
				dispatch(removeWishlist(activeWishlist._id));
			}
		} else {
			navigate("/login");
		}
	};

	// * HANDLE BUY BUTTON FUNCTION

	const handleBuyNow = () => {
		if (userInfo) {
			let price = 0;
			if (product.discount !== 0) {
				price = product.price - Math.floor((product.price * product.discount) / 100);
			} else {
				price = product.price;
			}
			const obj = [
				{
					sellerId: product?.sellerId,
					shopName: product?.shopName,
					price: parseInt(quantity) * parseInt(price - Math.floor((price * 5) / 100)),
					products: [
						{
							quantity,
							productInfo: product,
						},
					],
				},
			];
			navigate("/shipping", {
				state: {
					products: obj,
					price: parseInt(price) * parseInt(quantity),
					shippingFee: 85,
					items: 1,
				},
			});
		} else {
			navigate("/login");
		}
	};

	const responsive = {
		superExtraLargeDesktop: {
			breakpoint: {max: 4000, min: 3000},
			items: 5,
		},
		superLargeDesktop: {
			breakpoint: {max: 3000, min: 1700},
			items: 5,
		},
		desktop: {
			breakpoint: {max: 1700, min: 1024},
			items: 4,
		},
		tablet: {
			breakpoint: {max: 1024, min: 464},
			items: 3,
			// optional, default to 1.
		},
		mdTablet: {
			breakpoint: {max: 991, min: 464},
			items: 3,
			// optional, default to 1.
		},
		mobile: {
			breakpoint: {max: 768, min: 0},
			items: 4,
			// optional, default to 1.
		},
		smMobile: {
			breakpoint: {max: 640, min: 0},
			items: 3,
			// optional, default to 1.
		},
		xsMobile: {
			breakpoint: {max: 440, min: 0},
			items: 2,
			// optional, default to 1.
		},
	};

	const CustomLeftArrow = ({onClick}) => {
		return (
			<button className='bg-transparent border border-black hover:bg-black/50 hover:border-0 hover:text-white text-black w-[40px] h-[40px] text-lg flex justify-center items-center absolute top-1/2 left-2 transform -translate-y-1/2' onClick={() => onClick()}>
				<GoArrowLeft />
			</button>
		);
	};

	const CustomRightArrow = ({onClick}) => {
		return (
			<button className='bg-transparent border border-black hover:bg-black/50 hover:border-0 hover:text-white text-black w-[40px] h-[40px] text-lg flex justify-center items-center absolute top-1/2 right-2 transform -translate-y-1/2' onClick={() => onClick()}>
				<GoArrowRight />
			</button>
		);
	};

	return (
		<div>
			{loading && (
				<div className='w-screen h-screen flex justify-center items-center fixed left-0 top-0 bg-[#38303033] z-[999]'>
					<FadeLoader />
				</div>
			)}
			<Headers />
			{/* Banner Section */}
			<div className="bg-[url('/images/banner/order.jpg')] h-[220px] mt-6 bg-cover bg-no-repeat relative bg-left">
				<div className='absolute left-0 top-0 w-full h-full bg-[#2422228a]'>
					<div className='wrapper h-full text-white'>
						<div className='flex flex-col justify-center gap-1 items-center h-full w-full text-white'>
							<h2 className='text-3xl sm:text-xl font-bold'>Shop.my</h2>
						</div>
					</div>
				</div>
			</div>

			<div className='bg-slate-100 py-5 mb-5'>
				<div className='customContainer'>
					{/* Links */}
					<div className='flex justify-start items-center text-md text-slate-600 w-full'>
						<Link to={"/"} className='text-base sm:text-xs'>
							Home
						</Link>
						<span className='pt-1'>
							<MdOutlineKeyboardArrowRight />
						</span>
						<Link to={"/"} className='whitespace-nowrap text-base sm:text-xs'>
							{product?.category}
						</Link>
						<span className='pt-1'>
							<MdOutlineKeyboardArrowRight />
						</span>
						<span className='whitespace-nowrap text-ellipsis overflow-hidden text-base sm:text-xs'>{product?.name}</span>
					</div>
				</div>
			</div>

			{/* Product and product details section  */}
			<section className='customContainer pb-16'>
				<div className='grid grid-cols-2  md:grid-cols-1 gap-8'>
					<div className=''>
						<div className='p-5 border '>
							<div className='h-[450px] sm:h-[250px]'>{product.images && <img className='w-full h-full object-contain' src={`${image ? image : product?.images[0].url}`} alt={product?.name} />}</div>
						</div>

						<div className='py-3'>
							{product.images && (
								<Carousel autoPlay={true} infinite={true} responsive={responsive} transitionDuration={150} mouseTracking={false} keyBoardControl={false} customLeftArrow={<CustomLeftArrow />} customRightArrow={<CustomRightArrow />}>
									{product.images &&
										product?.images.map((item, index) => (
											<div onClick={() => setImage(item.url)} key={index} className={`w-[100px] h-[100px]  gap-6 ${item.url === image ? "border border-black transition-all duration-300" : ""}`}>
												<img src={item.url} className={`w-full h-full object-contain cursor-pointer ${item.url === image ? "scale-[0.8] transition-all duration-300" : ""}`} alt='' />
											</div>
										))}
								</Carousel>
							)}
						</div>
					</div>

					<div className='flex flex-col gap-5'>
						{/* Product Heading */}
						<div className='text-3xl md:text-xl  text-slate-600 font-bold'>
							<h2 title={product?.name} className='text-3xl lg:text-xl  md:text-2xl sm:text-[16px]'>
								{product?.name}
							</h2>
						</div>

						{/* Product Ratting */}
						<div className='flex justify-start items-center gap-4'>
							<div className='flex text-xl'>
								<Rattings rattings={product?.ratting} />
							</div>
							<span className='text-green-500'>(23 reviews)</span>
						</div>
						{/* Discount Section */}
						<div className='text-2xl sm:text-xl text-red-500 font-bold flex gap-3'>
							{product.discount > 0 ? (
								<>
									<h2 className='line-through'>${product?.price}</h2>
									<h2>
										${product?.price - Math.floor((product.price * product?.discount) / 100)}(-{product?.discount}%)
									</h2>
								</>
							) : (
								<h2>Price : ${product?.price}</h2>
							)}
						</div>
						{/*  Description   */}
						<div className='text-slate-600'>
							<p>{product?.description}</p>
						</div>
						{/*   Quantity  , stock and Favorite Item */}
						<div className='flex gap-3 pb-10 border-b flex-wrap'>
							{product?.stock && product?.stock ? (
								<>
									<div className='flex justify-start items-start gap-4 sm:flex-col '>
										<div className='flex bg-slate-200 h-[50px] justify-center items-center text-xl rounded-sm'>
											<button onClick={handleQuantityDecrement} className='px-6 cursor-pointer'>
												-
											</button>
											<div className='px-5'>{quantity}</div>
											<button onClick={handleQuantityIncrement} className='px-6 cursor-pointer'>
												+
											</button>
										</div>
										<div className='w-full'>
											<button onClick={handleAddToCart} className='px-9 py-3 h-[50px] whitespace-nowrap sm:w-full cursor-pointer hover:shadow-lg hover:shadow-purple-500/40 bg-purple-500 text-white rounded-sm'>
												Add to Cart
											</button>
										</div>
									</div>
								</>
							) : null}
							<div>
								<button
									onClick={handleWishlist}
									className={`${activeWishlistItems.includes(product._id) ? "bg-red-500 hover:shadow-red-500/30" : "hover:shadow-cyan-500/40 bg-cyan-500"} h-[50px] w-[50px] flex justify-center items-center cursor-pointer text-xl hover:shadow-lg  text-white`}>
									<AiFillHeart />
								</button>
							</div>
						</div>

						{/* Availability and Share on    */}
						<div className='flex flex-col gap-6 py-5'>
							<div className='flex items-center justify-start gap-14'>
								<span className='text-black font-bold text-xl sm:text-lg'>Availability</span>
								<span className={`text-${product?.stock > 0 ? "green" : "red"}-500`}>{product?.stock > 0 ? `In Stock(${product?.stock})` : "Out of Stock"}</span>
							</div>
							<div className='flex items-center justify-start gap-20 md-lg:gap-10 md:gap-20 sm:items-start sm:flex-col sm:gap-5 '>
								<span className='text-black font-bold text-xl sm:text-lg'>Share on</span>
								<ul className='flex justify-start items-center gap-3'>
									<li>
										<Link to={"#"} className='w-[38px] h-[38px] hover:bg-[#7fad39] hover:text-white flex justify-center items-center bg-indigo-500 text-white  rounded-full'>
											<FaFacebookF />
										</Link>
									</li>
									<li>
										<Link to={"#"} className='w-[38px] h-[38px] hover:bg-[#7fad39] hover:text-white flex justify-center items-center bg-cyan-500 text-white rounded-full'>
											<AiOutlineTwitter />
										</Link>
									</li>
									<li>
										<Link to={"#"} className='w-[38px] h-[38px] hover:bg-[#7fad39] hover:text-white flex justify-center items-center bg-purple-500 text-white rounded-full'>
											<FaLinkedin />
										</Link>
									</li>
									<li>
										<Link to={"#"} className='w-[38px] h-[38px] hover:bg-[#7fad39] hover:text-white flex justify-center items-center bg-blue-500 text-white rounded-full'>
											<AiFillGithub />
										</Link>
									</li>
								</ul>
							</div>
						</div>

						{/*  Chatting Option  */}
						<div className={`flex py-5 gap-3 flex-wrap`}>
							{/* Buy now Button hidden  */}
							{product?.stock > 0 ? (
								<button onClick={handleBuyNow} className='px-9 py-3 hidden   whitespace-nowrap sm:w-full  cursor-pointer hover:shadow-lg hover:shadow-emerald-500/40 bg-emerald-500 text-white rounded-sm capitalize'>
									Buy Now
								</button>
							) : null}

							<Link to={`/dashboard/chat/${product?.sellerId}`} className='px-9 py-3  whitespace-nowrap sm:w-full cursor-pointer hover:shadow-lg hover:shadow-lime-500/40 bg-lime-500 text-white rounded-sm capitalize'>
								Chat Seller
							</Link>
						</div>
					</div>
				</div>
			</section>

			{/* Review and Store Product */}
			<section className='customContainer pb-16'>
				<div className='flex flex-wrap'>
					{/* Left */}
					<div className='w-[72%] md-lg:w-full'>
						<div className='pr-4 md-lg:pr-0'>
							<div className='grid grid-cols-2 gap-2'>
								<button onClick={() => setState("reviews")} className={`transition-all duration-300 py-1 px-5 hover:bg-green-500 ${state === "reviews" ? "bg-green-500 text-white" : "bg-slate-200 text-slate-700 hover:text-white"} rounded-sm`}>
									Reviews
								</button>
								<button onClick={() => setState("description")} className={`transition-all duration-300 py-1 px-5 hover:bg-green-500 ${state === "description" ? "bg-green-500 text-white " : "bg-slate-200 text-slate-700 hover:text-white"} rounded-sm`}>
									Description
								</button>
							</div>
							{/* reviews and description */}
							<div>
								{state === "reviews" ? (
									<div>
										<Review product={product} />
									</div>
								) : state === "description" ? (
									<>
										<p className='py-5 text-slate-600'>{product && product.description}</p>
									</>
								) : null}
							</div>
						</div>
					</div>
					{/* Right */}
					<div className='w-[28%] md-lg:w-full'>
						{/*  Shop Related Products   */}
						<div className='pl-4 md-lg:pl-0'>
							<div className='px-3 py-2 text-slate-600 bg-slate-200'>
								<h2>{moreProducts && moreProducts.length > 0 ? moreProducts[0].shopName : "No Related Products Found"}</h2>
							</div>
							<div className='flex flex-col p-5 gap-8 mt-3 border'>
								{moreProducts &&
									moreProducts.map((item, index) => (
										<Link to={`/product/details/${item?.slug}`} key={index} className=''>
											<div className='flex flex-col gap-3 md-lg:flex-row md-lg:items-center sm:flex-col sm:items-start '>
												<div className='relative overflow-hidden'>
													<div className='relative h-[300px] lg:h-[200px] lg:w-[200px] sm:w-full sm:h-full'>
														<img className='w-full h-full object-contain' src={item?.images[0].url} alt={item?.name} />
														<div className='absolute h-full w-full top-0 left-0 bg-[#000] opacity-25'></div>
													</div>
													{item.discount > 0 ? <div className='z-50 flex justify-center items-center absolute text-white w-[38px] h-[38px] rounded-full bg-red-500 font-semibold text-xs left-2 top-2'>-{item?.discount}%</div> : null}
												</div>
												<div className='flex flex-col'>
													<h2 className='text-slate-600 py-1'>{truncateText(item?.name)}</h2>
													<p className='mb-3 text-base]'>Price:{item?.price}</p>
													<div className='flex items-center gap-2 text-xl'>
														<Rattings rattings={item?.ratting} />
													</div>
												</div>
											</div>
										</Link>
									))}
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Related Product */}
			<section>
				<div className='customContainer'>
					{relatedProducts.length > 0 ? <h2 className='text-2xl py-8 text-slate-600'>Related Product</h2> : null}
					<div>
						<Swiper
							slidesPerView={"auto"}
							breakpoints={{
								1280: {
									slidesPerView: 4,
								},
								1024: {
									slidesPerView: 3,
								},
								768: {
									slidesPerView: 2,
								},
								565: {
									slidesPerView: 2,
								},
							}}
							spaceBetween={25}
							loop={true}
							pagination={{
								clickable: true,
								el: ".customBullet",
								bulletActiveClass: "bg-indigo-500 opacity-100",
								// bulletClass: "myBullet",
							}}
							modules={[Pagination]}
							className='mySwiper'>
							{relatedProducts &&
								relatedProducts.map((item, index) => {
									return (
										<SwiperSlide key={index}>
											<Link to={`/product/details/${item?.slug}`} className='block'>
												<div className='relative h-[270px]'>
													<div className='w-full h-full'>
														<img className='w-full h-full object-contain' src={item?.images[0].url} alt={item?.name} />
														<div className='absolute h-full w-full top-0 left-0 bg-[#000] opacity-25 hover:opacity-50 transition-all duration-500'></div>
													</div>
													{item.discount ? <div className='z-50 flex justify-center items-center absolute text-white w-[38px] h-[38px] rounded-full bg-red-500 font-semibold text-xs left-2 top-2'>-{item?.discount}%</div> : null}
												</div>
												<div className='px-2  py-4 flex flex-col gap-1'>
													<h2 className='text-slate-600 text-lg font-semibold'>{truncateText(item?.name)}</h2>
													<div className='flex justify-start items-center gap-3'>
														<h2 className='text-[#6699ff] text-xl font-bold'>${item?.price}</h2>
														<div className='flex'>
															<Rattings rattings={item?.ratting} />
														</div>
													</div>
												</div>
											</Link>
										</SwiperSlide>
									);
								})}
						</Swiper>
					</div>
					<div className='w-full flex justify-center items-center py-10'>
						<div className='customBullet justify-center gap-3 !w-auto'></div>
					</div>
				</div>
			</section>
			<Footer />
		</div>
	);
};
export default Details;
