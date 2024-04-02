import Rattings from "./Rattings.jsx";
import RattingTemp from "./RattingTemp.jsx";
import Pagination from "./Pagination.jsx";
import {useState} from "react";
import ReactRatting from "react-rating";
import {CiStar} from "react-icons/ci";
import {AiFillStar} from "react-icons/ai";
import {Link, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {submitUserReview} from "../store/reducers/homeReducer.js";

const Review = ({product}) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const {userInfo} = useSelector((state) => state.auth);
	const [pageNumber, setPageNumber] = useState(1);
	const [parPage, setParPage] = useState(5);
	const [reactRatting, setReactRatting] = useState();
	const [review, setReview] = useState("");

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

	return (
		<div className='mt-8'>
			{/* Ratting */}
			<div className='flex gap-10 md:flex-col'>
				<div className='flex flex-col gap-2 justify-start items-start py-4'>
					<div>
						<span className='text-6xl md:text-3xl font-semibold'>4.5</span>
						<span className='text-3xl md:text-xl font-semibold text-slate-600'>/5</span>
					</div>
					<div className='flex text-4xl md:text-lg gap-1'>
						<Rattings rattings={4.5} />
					</div>
					<p className='text-sm text-slate-600'>23 Ratting</p>
				</div>

				{/* Product All Ratting */}
				<div className='flex gap-2 flex-col py-4'>
					{/* 5 star review */}
					<div className='flex justify-start items-center gap-5'>
						<div className='text-md flex gap-1 w-[93px]'>
							<RattingTemp ratting={5} />
						</div>
						<div className='w-[200px] h-[14px] bg-slate-200 relative'>
							<div className='h-full bg-ratting w-[60%]'></div>
						</div>
						<p className='text-sm text-slate-600 w-[0%]'>10</p>
					</div>
					{/* 4 star review */}
					<div className='flex justify-start items-center gap-5'>
						<div className='text-md flex gap-1 w-[93px]'>
							<RattingTemp ratting={4} />
						</div>
						<div className='w-[200px] h-[14px] bg-slate-200 relative'>
							<div className='h-full bg-ratting w-[70%]'></div>
						</div>
						<p className='text-sm text-slate-600 w-[0%]'>20</p>
					</div>
					{/* 3 star review */}
					<div className='flex justify-start items-center gap-5'>
						<div className='text-md flex gap-1 w-[93px]'>
							<RattingTemp ratting={3} />
						</div>
						<div className='w-[200px] h-[14px] bg-slate-200 relative'>
							<div className='h-full bg-ratting w-[40%]'></div>
						</div>
						<p className='text-sm text-slate-600 w-[0%]'>8</p>
					</div>
					{/* 2 star review */}
					<div className='flex justify-start items-center gap-5'>
						<div className='text-md flex gap-1 w-[93px]'>
							<RattingTemp ratting={2} />
						</div>
						<div className='w-[200px] h-[14px] bg-slate-200 relative'>
							<div className='h-full bg-ratting w-[30%]'></div>
						</div>
						<p className='text-sm text-slate-600 w-[0%]'>5</p>
					</div>
					{/* 1 star review */}
					<div className='flex justify-start items-center gap-5'>
						<div className='text-md flex gap-1 w-[93px]'>
							<RattingTemp ratting={1} />
						</div>
						<div className='w-[200px] h-[14px] bg-slate-200 relative'>
							<div className='h-full bg-ratting w-[10%]'></div>
						</div>
						<p className='text-sm text-slate-600 w-[0%]'>3</p>
					</div>
					{/* 0 star review */}
					<div className='flex justify-start items-center gap-5'>
						<div className='text-md flex gap-1 w-[93px]'>
							<RattingTemp ratting={0} />
						</div>
						<div className='w-[200px] h-[14px] bg-slate-200 relative'>
							<div className='h-full bg-ratting w-[0%]'></div>
						</div>
						<p className='text-sm text-slate-600 w-[0%]'>0</p>
					</div>
				</div>
			</div>

			<h2 className='text-slate-600 text-xl font-bold py-5'>Product Reviews 30</h2>

			<div className='flex flex-col gap-8 pb-10 pt-4'>
				{[1, 2, 3, 4, 5, 6].map((item, index) => (
					<div key={index} className='flex flex-col gap-1'>
						<div className='flex justify-between items-center'>
							<div className='flex gap-1 text-xl'>
								<RattingTemp ratting={4} />
							</div>
							<span className='text-slate-600'>19 Feb 2024</span>
						</div>
						<span className='text-slate-600 text-lg font-semibold'>Pallab Roy Tushar</span>
						<p className='text-base text-slate-600'>
							Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque autem deleniti ea exercitationem illo iste, iure laudantium officiis pariatur, quis quod ratione recusandae reiciendis sint veritatis? Cupiditate fuga illum quae. Lorem ipsum dolor sit amet, consectetur
							adipisicing elit. Blanditiis dolorum itaque possimus sed. Eaque eligendi exercitationem itaque iure, labore, magni obcaecati odit pariatur perspiciatis praesentium quae quia, quod vitae? Officiis?
						</p>
					</div>
				))}

				<div className='flex justify-end'>
					<Pagination pageNumber={pageNumber} setPageNumber={setPageNumber} totalItem={20} parPage={parPage} showItem={Math.floor(20 / 3)} />
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
							<textarea onChange={(e) => setReview(e.target.value)} required name='' id='' rows='5' className='border outline-0 p-3 w-full rounded-md'></textarea>
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
