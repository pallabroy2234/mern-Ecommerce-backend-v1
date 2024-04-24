import {AiOutlineShopping} from "react-icons/ai";
import {Link, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {getRecentOrders} from "../../store/reducers/dashboardReducer.js";

const Index = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const {userInfo} = useSelector((state) => state.auth);
	const {totalOrders, recentOrders, cancelledOrders, pendingOrders} = useSelector((state) => state.dashboard);

	useEffect(() => {
		dispatch(getRecentOrders(userInfo.id));
	}, []);

	const handleRedirect = (item) => {
		let items = 0;
		for (let i = 0; i < item.length; i++) {
			items = items + item[i].quantity;
		}
		navigate("/payment", {
			state: {
				price: item.price,
				items,
				orderId: item._id,
			},
		});
	};

	return (
		<div>
			{/* Dashboard Card Section */}
			<div className='grid grid-cols-3 md:grid-cols-1 gap-5'>
				{/* First Column */}
				<div className='flex justify-center items-center p-5  bg-white rounded-md gap-5'>
					<div className='bg-green-100 w-[47px] h-[47px] rounded-full flex justify-center items-center text-xl'>
						<span className='text-xl text-green-800'>
							<AiOutlineShopping />
						</span>
					</div>
					<div className='flex flex-col justify-start items-start text-slate-600'>
						<h2 className='text-3xl font-bold'>{totalOrders}</h2>
						<span>Orders</span>
					</div>
				</div>

				{/* Second Column */}
				<div className='flex justify-center items-center p-5  bg-white rounded-md gap-5'>
					<div className='bg-blue-100 w-[47px] h-[47px] rounded-full flex justify-center items-center text-xl'>
						<span className='text-xl text-blue-800'>
							<AiOutlineShopping />
						</span>
					</div>
					<div className='flex flex-col justify-start items-start text-slate-600'>
						<h2 className='text-3xl font-bold'>{pendingOrders}</h2>
						<span>Pending Orders</span>
					</div>
				</div>

				{/* Third Column */}
				<div className='flex justify-center items-center p-5  bg-white rounded-md gap-5'>
					<div className='bg-red-100 w-[47px] h-[47px] rounded-full flex justify-center items-center text-xl'>
						<span className='text-xl text-red-800'>
							<AiOutlineShopping />
						</span>
					</div>
					<div className='flex flex-col justify-start items-start text-slate-600'>
						<h2 className='text-3xl font-bold'>{cancelledOrders}</h2>
						<span>Cancelled Orders</span>
					</div>
				</div>
			</div>

			{/*	*/}
			<div className='bg-white p-4 mt-5 rounded-md'>
				<h2 className='text-lg font-semibold text-slate-600'>Recent Orders</h2>
				<div className='pt-4'>
					<div className='relative overflow-x-auto'>
						<table className='w-full text-sm text-left text-gray-500'>
							<thead className='text-xs text-gray-700 uppercase bg-gray-50'>
								<tr>
									<th scope='col' className='px-6 py-3'>
										Order Id
									</th>
									<th scope='col' className='px-6 py-3'>
										Price
									</th>
									<th scope='col' className='px-6 py-3'>
										Payment Status
									</th>
									<th scope='col' className='px-6 py-3'>
										Order Status
									</th>
									<th scope='col' className='px-6 py-3'>
										Action
									</th>
								</tr>
							</thead>
							<tbody>
								{recentOrders &&
									recentOrders.map((item, index) => (
										<tr key={index} className='bg-white border-b'>
											<td scope='row' className='px-6 py-4 font-medium whitespace-nowrap text-ellipsis'>
												{item?._id}
											</td>
											<td scope='row' className='px-6 py-4 font-medium whitespace-nowrap text-ellipsis'>
												${item?.price}
											</td>
											<td scope='row' className='px-6 py-4 font-medium whitespace-nowrap text-ellipsis capitalize'>
												{item?.paymentStatus}
											</td>
											<td scope='row' className='px-6 py-4 font-medium whitespace-nowrap text-ellipsis'>
												{item?.deliveryStatus}
											</td>
											<td scope='row' className='px-6 py-4'>
												<div className='flex flex-row flex-nowrap'>
													<Link to={`/dashboard/order/details/${item?._id}`}>
														<span className='bg-green-100 text-green-800 text-sm font-normal mr-2 px-2.5 py-[1px] rounded'>View</span>
													</Link>
													{item?.paymentStatus !== "paid" && (
														<button onClick={() => handleRedirect(item)} className='bg-green-100 text-green-800 text-sm font-normal mr-2 px-2.5 py-[1px] rounded cursor-pointer'>
															Pay Now
														</button>
													)}
												</div>
											</td>
										</tr>
									))}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	);
};
export default Index;
