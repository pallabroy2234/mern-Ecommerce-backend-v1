import Rattings from "./Rattings.jsx";
import RattingTemp from "./RattingTemp.jsx";
import Pagination from "./Pagination.jsx";
import {useEffect, useState} from "react";
import ReactRatting from "react-rating";
import {CiStar} from "react-icons/ci";
import {AiFillStar} from "react-icons/ai";
import {Link, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getProductDetails, getProductReviews, messageClear, submitUserReview} from "../store/reducers/homeReducer.js";
import toast from "react-hot-toast";
import ReactPaginate from "react-paginate";
import {FaChevronLeft} from "react-icons/fa6";
import {FaChevronRight} from "react-icons/fa";
import {BsArrowLeft, BsArrowRight} from "react-icons/bs";
import rattings from "./Rattings.jsx";

const Review = ({product}) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const {userInfo} = useSelector((state) => state.auth);
	const {submitSuccessMessage, submitErrorMessage, loading, ratings, reviews, reviewPagination} = useSelector((state) => state.home);
	const [pageNumber, setPageNumber] = useState(reviewPagination.currentPage || 1);
	const [parPage, setParPage] = useState(5);
	const [limit, setLimit] = useState(5);
	const [reactRatting, setReactRatting] = useState();
	const [review, setReview] = useState("");
	const [currentPage, setCurrentPage] = useState(0);

	const handlePageChange = (selectedPage) => {
		setPageNumber(selectedPage.selected + 1);
	};

	// * Handle Submit Review
	const handleSubmitReview = (e) => {
		e.preventDefault();
		if (userInfo) {
			const data = {
				name: userInfo?.name,
				review: review,
				ratting: reactRatting,
				productId: product?._id,
			};
			dispatch(submitUserReview(data));
		} else {
			navigate("/login");
		}
	};

	useEffect(() => {
		if (submitSuccessMessage) {
			toast.success(submitSuccessMessage);
			dispatch(messageClear());
			setReview("");
			setReactRatting(0);
			dispatch(
				getProductReviews({
					productId: product?._id,
					pageNumber: pageNumber,
				}),
			);
			dispatch(getProductDetails(product.slug));
		}
		if (submitErrorMessage) {
			toast.error(submitErrorMessage);
			dispatch(messageClear());
		}
	}, [submitSuccessMessage, submitErrorMessage]);

	// * GET USER REVIEWS
	useEffect(() => {
		if (product?._id) {
			dispatch(
				getProductReviews({
					productId: product?._id,
					pageNumber: pageNumber,
				}),
			);
		}
	}, [pageNumber, product]);

	return (
		<div className='mt-8'>
			{/* Ratting */}
			<div className='flex gap-10 md:flex-col'>
				<div className='flex flex-col gap-2 justify-start items-start py-4'>
					<div>
						<span className='text-6xl md:text-3xl font-semibold'>{product?.ratting}</span>
						<span className='text-3xl md:text-xl font-semibold text-slate-600'>/5</span>
					</div>
					<div className='flex text-4xl md:text-lg gap-1'>
						<Rattings rattings={product?.ratting} />
					</div>
					<p className='text-sm text-slate-600'>{reviewPagination?.totalNumberOfReviews} Ratting</p>
				</div>

				{/* Product All Ratting */}
				<div className='flex gap-2 flex-col py-4'>
					{/* Ratings */}
					{[5, 4, 3, 2, 1, 0].map((rating, index) => {
						const ratingData = ratings?.find((item) => item.ratting === rating) || {rating: 0, count: 0};
						const maxWidth = 100;
						const barWidth = reviewPagination.totalNumberOfReviews !== 0 ? (ratingData.count / reviewPagination.totalNumberOfReviews) * maxWidth : 0;
						// Ensure barWidth is a number and not NaN
						const validBarWidth = Number.isFinite(barWidth) ? barWidth : 0;
						let validBar = validBarWidth.toFixed(0);

						const bar = "{validBar}%";
						return (
							<div key={index} className='flex justify-start items-center gap-5'>
								<div className='text-md flex gap-1 w-[93px]'>
									<RattingTemp ratting={rating} />
								</div>
								<div className='w-[200px] h-[14px] bg-slate-200 relative'>
									<div style={{width: `${validBar}%`}} className={`h-full bg-ratting transition-all duration-300`}></div>
								</div>
								<p className={`text-sm text-slate-600 w-[0%]`}>{ratingData.count}</p>
							</div>
						);
					})}
				</div>
			</div>

			<h2 className='text-slate-600 text-xl font-bold py-5'>Product Reviews {reviewPagination?.totalNumberOfReviews || 0}</h2>

			<div className='flex flex-col gap-8 pb-10 pt-4'>
				{reviews &&
					reviews?.map((item, index) => (
						<div key={index} className='flex flex-col gap-1'>
							<div className='flex justify-between items-center'>
								<div className='flex gap-1 text-xl'>
									<RattingTemp ratting={item?.ratting} />
								</div>
								<span className='text-slate-600'>{item?.date}</span>
							</div>
							<span className='text-slate-600 text-lg font-semibold'>{item?.name}</span>
							<p className='text-base text-slate-600'>{item?.review}</p>
						</div>
					))}
				<div className='flex justify-end'>
					{reviewPagination.totalNumberOfReviews && reviewPagination.totalNumberOfReviews > parPage ? (
						<ReactPaginate
							className='flex flex-row gap-3 justify-center items-center'
							pageCount={reviewPagination.totalPages}
							pageRangeDisplayed={0}
							marginPagesDisplayed={1}
							onPageChange={handlePageChange}
							containerClassName={"pagination-container"}
							activeClassName={"active"}
							pageClassName={"page"}
							breakAriaLabels={"..."}
							nextLabel={<BsArrowRight />}
							previousLabel={<BsArrowLeft />}
							nextClassName='arrow'
							previousClassName='arrow'
							disabledClassName={"arrow-disabled"}
						/>
					) : null}
				</div>
			</div>

			<div className='md-lg:mb-5 mb-0'>
				{userInfo ? (
					<div className='flex flex-col gap-3'>
						{/* React Ratting */}
						<div className='flex gap-1'>
							<ReactRatting
								onChange={(e) => setReactRatting(e)}
								initialRating={0 || reactRatting}
								emptySymbol={
									<span className='text-slate-600 text-4xl'>
										<CiStar />
									</span>
								}
								fullSymbol={
									<span className='text-ratting text-4xl'>
										<AiFillStar />
									</span>
								}
							/>
						</div>
						<form onSubmit={(e) => handleSubmitReview(e)}>
							<textarea onChange={(e) => setReview(e.target.value)} required name='review' id='review' value={review} rows='5' className='border outline-0 p-3 w-full rounded-md'></textarea>
							<div className='mt-2'>
								<button className='py-2 px-8 bg-indigo-500 text-white rounded-sm'>Submit</button>
							</div>
						</form>
					</div>
				) : (
					<div>
						<Link className='py-2 px-8 bg-indigo-500 text-white rounded-sm' to={"/login"}>
							Login
						</Link>
					</div>
				)}
			</div>
		</div>
	);
};
export default Review;
