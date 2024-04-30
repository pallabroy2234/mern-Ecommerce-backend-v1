import Headers from "../components/Headers.jsx";
import {Link} from "react-router-dom";
import {MdOutlineKeyboardArrowRight} from "react-icons/md";
import Footer from "../components/Footer.jsx";
import {useEffect, useState} from "react";
import {Range} from "react-range";
import {AiFillStar} from "react-icons/ai";
import {CiStar} from "react-icons/ci";
import {BsFillGridFill} from "react-icons/bs";
import {FaThList} from "react-icons/fa";
import ShopProduct from "../components/products/ShopProduct.jsx";
import Pagination from "../components/Pagination.jsx";
import {useDispatch, useSelector} from "react-redux";
import {getCarouselLatestProducts, getPriceRange, getQueryProducts, messageClear} from "../store/reducers/homeReducer.js";
import LatestProduct from "../components/products/LatestProduct.jsx";

import {BeatLoader, FadeLoader} from "react-spinners";

const Shop = () => {
	const {categories, products, pagination, priceRange, latestProducts, errorMessage, loading} = useSelector((state) => state.home);
	const dispatch = useDispatch();

	const [style, setStyle] = useState("grid");
	const [pageNumber, setPageNumber] = useState(1);
	const [parPage, setParPage] = useState(12);

	const [filter, setFilter] = useState(true);
	// const categories = ["clothing", "sports", "phones", "laptops", "monitors", "tablets", "audio", "bags", "television"]
	const [state, setState] = useState({
		values: [50, 100],
	});

	const [ratting, setRatting] = useState("");
	const [sortPrice, setSortPrice] = useState("");

	// ! Fetching Price Range and Latest Product
	useEffect(() => {
		dispatch(getPriceRange());
		dispatch(getCarouselLatestProducts());
	}, []);

	// ! Set Price Range
	useEffect(() => {
		setState({
			values: [priceRange.low, priceRange.high],
		});
	}, [priceRange]);

	// ! Query Category
	const [category, setCategory] = useState("");
	const queryCategory = (e, value) => {
		if (e.target.checked) {
			setCategory(value);
		} else {
			setCategory("");
		}
	};

	useEffect(() => {
		dispatch(
			getQueryProducts({
				low: parseInt(state.values[0]),
				high: parseInt(state.values[1]),
				category: category,
				ratting: parseInt(ratting),
				sortPrice: sortPrice,
				pageNumber: parseInt(pageNumber),
				parPage: parseInt(parPage),
			}),
		);
	}, [state.values[0], state.values[1], category, ratting, pageNumber, sortPrice]);

	const resetRatting = () => {
		setRatting("");
		dispatch(
			getQueryProducts({
				low: parseInt(state.values[0]),
				high: parseInt(state.values[1]),
				category: category,
				ratting: "",
				sortPrice: sortPrice,
				pageNumber: parseInt(pageNumber),
				parPage: parseInt(parPage),
			}),
		);
	};

	return (
		<div className='w-full'>
			{loading && (
				<div className='w-screen h-screen flex justify-center items-center fixed left-0 top-0 bg-[#38303033] z-[999]'>
					<FadeLoader />
				</div>
			)}
			<Headers />
			<div className="bg-[url('/images/banner/shop.gif')] h-[220px] mt-6 bg-cover bg-no-repeat relative bg-left">
				<div className='absolute left-0 top-0 w-full h-full bg-[#2422228a]'>
					<div className='wrapper h-full text-white'>
						<div className='flex flex-col justify-center gap-1 items-center h-full w-full text-white'>
							<h2 className='text-3xl sm:text-xl font-bold'>Shop.my</h2>
							<div className='flex justify-center items-center gap-2 text-2xl sm:text-sm w-full'>
								<Link to={"/"}>Home</Link>
								<span className='pt-1'>
									<MdOutlineKeyboardArrowRight />
								</span>
								<span>Products</span>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Filter Section */}
			<div className='py-16'>
				<div className='wrapper'>
					<div className={`md:block hidden ${!filter ? "mb-6" : "mb-0"}`}>
						<button onClick={() => setFilter(!filter)} className='text-center w-full py-2 px-3 bg-indigo-500 text-white'>
							Filter Product
						</button>
					</div>
					<div>
						<div className='w-full flex flex-wrap'>
							{/* Category  */}
							<div className={`w-3/12 md-lg:w-4/12 md:w-full pr-8  ${filter ? "md:h-0 md:overflow-hidden md:mb-6" : "md:h-auto  md:overflow-auto md:mb-0"}]`}>
								<h2 className='text-2xl font-bold mb-3 text-slate-600'>Category</h2>

								<div className='py-2 max-h-[400px] overflow-y-auto mb-2'>
									{categories &&
										categories.map((item, index) => (
											<div key={index} className='flex justify-start items-center gap-2 py-1'>
												<input checked={category === item.name ? true : false} onChange={(e) => queryCategory(e, item.name)} type='checkbox' id={item.name} className='cursor-pointer' />
												<label htmlFor={item.name} className='text-slate-600 block cursor-pointer capitalize'>
													{item.name}
												</label>
											</div>
										))}
								</div>

								{/* Range */}
								<div className='py-2 flex flex-col gap-3'>
									<h2 className='text-2xl font-bold mb-3 text-slate-600'>Price</h2>
									<Range
										step={30}
										min={priceRange.low}
										max={priceRange.high}
										// values={state.values}
										values={state.values.sort((a, b) => a - b)}
										onChange={(values) => setState({values})}
										renderTrack={({props, children}) => (
											<div {...props} className='w-full h-[6px] bg-slate-200 rounded-full cursor-pointer'>
												{children}
											</div>
										)}
										renderThumb={({props}) => <div {...props} className='w-5 h-5 bg-indigo-500 rounded-full cursor-pointer focus:outline-0' />}
									/>
									<div>
										<span className=' font-bold text-lg'>
											${Math.floor(state.values[0])} - ${Math.floor(state.values[1])}
										</span>
									</div>
								</div>

								{/* Ratting   */}

								<div className='py-3 flex flex-col gap-4'>
									<h2 className='text-2xl font-bold mb-3 text-slate-600'>Ratting</h2>
									<div className='flex flex-col gap-3 '>
										<div
											onClick={() => setRatting(parseInt(5))}
											className={`${ratting === 5 ? "bg-slate-300/50 px-4 " : "bg-transparent"} pr-4 hover:pl-4 py-2 hover:bg-slate-300/50 transition-all duration-300 rounded-sm flex flex-row text-orange-500 justify-start items-center gap-2 text-xl cursor-pointer`}>
											<span>
												<AiFillStar />
											</span>
											<span>
												<AiFillStar />
											</span>
											<span>
												<AiFillStar />
											</span>
											<span>
												<AiFillStar />
											</span>
											<span>
												<AiFillStar />
											</span>
										</div>
										<div
											onClick={() => setRatting(parseInt(4))}
											className={`${ratting === 4 ? "bg-slate-300/50 px-4 " : "bg-transparent"} pr-4 hover:pl-4 py-2 hover:bg-slate-300/50 transition-all duration-300 cursor-pointer flex flex-row text-orange-500 justify-start items-center gap-2 text-xl`}>
											<span>
												<AiFillStar />
											</span>
											<span>
												<AiFillStar />
											</span>
											<span>
												<AiFillStar />
											</span>
											<span>
												<AiFillStar />
											</span>
											<span>
												<CiStar />
											</span>
										</div>
										<div
											onClick={() => setRatting(3)}
											className={`${ratting === 3 ? "bg-slate-300/50 px-4 " : "bg-transparent"} pr-4 hover:pl-4 py-2 hover:bg-slate-300/50 transition-all duration-300 cursor-pointer flex flex-row text-orange-500 justify-start items-center gap-2 text-xl`}>
											<span>
												<AiFillStar />
											</span>
											<span>
												<AiFillStar />
											</span>
											<span>
												<AiFillStar />
											</span>
											<span>
												<CiStar />
											</span>
											<span>
												<CiStar />
											</span>
										</div>
										<div
											onClick={() => setRatting(parseInt(2))}
											className={`${ratting === 2 ? "bg-slate-300/50 px-4 " : "bg-transparent"} pr-4 hover:pl-4 py-2 hover:bg-slate-300/50 transition-all duration-300 cursor-pointer  flex flex-row text-orange-500 justify-start items-center gap-2 text-xl`}>
											<span>
												<AiFillStar />
											</span>
											<span>
												<AiFillStar />
											</span>
											<span>
												<CiStar />
											</span>
											<span>
												<CiStar />
											</span>
											<span>
												<CiStar />
											</span>
										</div>
										<div
											onClick={() => setRatting(parseInt(1))}
											className={`${ratting === 1 ? "bg-slate-300/50 px-4 " : "bg-transparent"} pr-4 hover:pl-4 py-2 hover:bg-slate-300/50 transition-all duration-300 cursor-pointer  flex flex-row text-orange-500 justify-start items-center gap-2 text-xl`}>
											<span>
												<AiFillStar />
											</span>
											<span>
												<CiStar />
											</span>
											<span>
												<CiStar />
											</span>
											<span>
												<CiStar />
											</span>
											<span>
												<CiStar />
											</span>
										</div>
										<div
											onClick={resetRatting}
											className={`${ratting === 0 ? "bg-slate-300/50 px-4 " : "bg-transparent"} pr-4 hover:pl-4 py-2 hover:bg-slate-300/50 transition-all duration-300 cursor-pointer flex flex-row text-orange-500 justify-start items-center gap-2 text-xl`}>
											<span>
												<CiStar />
											</span>
											<span>
												<CiStar />
											</span>
											<span>
												<CiStar />
											</span>
											<span>
												<CiStar />
											</span>
											<span>
												<CiStar />
											</span>
										</div>
									</div>
								</div>

								{/* Latest Product    */}
								<div className='py-5 flex flex-col gap-4'>
									<LatestProduct title={"Latest Product"} products={latestProducts} />
								</div>
							</div>

							{/*  All Products    */}
							<div className='w-9/12 md-lg:w-8/12 md:w-full'>
								<div className='pl-8 md:pl-0'>
									{/* All Product Heading */}
									<div className='py-4 bg-white mb-10 px-3 rounded-md flex justify-between items-center border'>
										<h2 className='text-lg sm:text-sm font-medium  text-slate-600'>{pagination.totalProduct > 0 ? `${pagination.totalProduct} Products` : "No Product Found"}</h2>
										<div className='flex justify-center items-center gap-3'>
											<select onChange={(e) => setSortPrice(e.target.value)} name='' defaultValue={"sort by"} id='' className='p-1 border sm:text-sm outline-0 text-slate-600 font-semibold '>
												<option value=''>Sort By</option>
												<option value='low'>Low to High Price</option>
												<option value='high'>High to Low Price</option>
											</select>
											{/*  Grid view and List view option   */}
											<div className='flex justify-center items-center gap-4 md-lg:hidden'>
												<div onClick={() => setStyle("grid")} className={`p-2 ${style === "grid" && "bg-slate-300"} text-slate-600 hover:bg-slate-300 cursor-pointer rounded-sm`}>
													<BsFillGridFill />
												</div>
												<div onClick={() => setStyle("list")} className={`p-2 ${style === "list" && "bg-slate-300"} text-slate-600 hover:bg-slate-300 cursor-pointer rounded-sm`}>
													<FaThList />
												</div>
											</div>
										</div>
									</div>

									{/*  Product Grid and list view   */}
									<div className='pb-8'>{products.length > 0 ? <ShopProduct style={style} products={products} /> : <div className='text-xl font-bold text-center'>No Product Found</div>}</div>
									<div className={`my-3 ${pagination.totalProduct ? "visible" : "hidden"}`}>
										{pagination.totalProduct && pagination.totalProduct <= parPage ? "" : <Pagination pageNumber={pageNumber} setPageNumber={setPageNumber} totalItem={pagination.totalProduct} parPage={parPage} showItem={Math.floor(pagination.totalProduct / parPage)} />}
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<Footer />
		</div>
	);
};
export default Shop;
