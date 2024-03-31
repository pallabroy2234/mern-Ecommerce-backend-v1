import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getMyOrders} from "../../store/reducers/orderReducer.js";

const Orders = () => {
	const dispatch = useDispatch();
	const {userInfo} = useSelector((state) => state.auth);
	const [state, setState] = useState("all");

	useEffect(() => {
		console.log(userInfo.id);
		dispatch(
			getMyOrders({
				userId: userInfo.id,
				status: state,
			}),
		);
	}, [state]);

	return (
		<div className='bg-white p-4 rounded-md'>
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
							{[1, 2, 3, 4].map((item, index) => (
								<tr key={index} className='bg-white border-b'>
									<td scope='row' className='px-6 py-4 font-medium whitespace-nowrap text-ellipsis'>
										234234nihh2342
									</td>
									<td scope='row' className='px-6 py-4 font-medium whitespace-nowrap text-ellipsis'>
										$12312
									</td>
									<td scope='row' className='px-6 py-4 font-medium whitespace-nowrap text-ellipsis capitalize'>
										Pending
									</td>
									<td scope='row' className='px-6 py-4 font-medium whitespace-nowrap  text-ellipsis'>
										Pending
									</td>
									<td scope='row' className='px-6 py-4'>
										<Link to={`/dashboard/order/details/123123`}>
											<span className='bg-green-100 text-green-800 text-sm font-normal mr-2 px-2.5 py-[1px] whitespace-nowrap rounded'>View</span>
										</Link>
										<span className='bg-green-100 text-green-800 text-sm font-normal mr-2 px-2.5 py-[1px] whitespace-nowrap rounded cursor-pointer'>Pay Now</span>
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
