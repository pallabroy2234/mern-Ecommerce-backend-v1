import {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getMyOrders, messageClear} from "../../store/reducers/orderReducer.js";
import toast from "react-hot-toast";
import {FadeLoader} from "react-spinners";

const Orders = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const {userInfo} = useSelector((state) => state.auth);
	const {myOrders, myOrder, errorMessage, loader} = useSelector((state) => state.order);
	const [state, setState] = useState("all");

	useEffect(() => {
		dispatch(
			getMyOrders({
				userId: userInfo.id,
				status: state,
			}),
		);
	}, [state]);

	useEffect(() => {
		if (errorMessage) {
			toast.error(errorMessage);
			dispatch(messageClear());
		}
	}, [errorMessage]);

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
		<div className='bg-white p-4 rounded-md'>
			{loader && (
				<div className='w-screen h-screen flex justify-center items-center fixed left-0 top-0 bg-[#38303033] z-[999]'>
					<FadeLoader />
				</div>
			)}
			<div className='flex justify-between items-center'>
				<h2 className='text-xl font-semibold text-slate-600'>My Orders</h2>
				<select name='' id='' value={state} onChange={(e) => setState(e.target.value)} className='outline-0 px-3 cursor-pointer py-1 border rounded-md text-slate-600'>
					<option value='all'>--Order Status--</option>
					<option value='placed'>Placed</option>
					<option value='pending'>Pending</option>
					<option value='cancelled'>Cancelled</option>
					<option value='warehouse'>Ware House</option>
				</select>
			</div>

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
							{myOrders &&
								myOrders?.map((item, index) => (
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
										<td scope='row' className='px-6 py-4 font-medium whitespace-nowrap'>
											{item?.deliveryStatus}
										</td>
										<td scope='row' className='px-6 py-4'>
											<div className='flex flex-row flex-nowrap'>
												<Link to={`/dashboard/order/details/${item?._id}`}>
													<span className='bg-green-100 text-green-800 text-sm font-normal mr-2 px-2.5 py-[1px] whitespace-nowrap rounded'>View</span>
												</Link>
												{item?.paymentStatus !== "paid" && (
													<button onClick={() => handleRedirect(item)} className='bg-green-100 text-green-800 text-sm font-normal mr-2 px-2.5 py-[1px] whitespace-nowrap rounded cursor-pointer'>
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
	);
};
export default Orders;
