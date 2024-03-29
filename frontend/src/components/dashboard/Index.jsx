import {AiOutlineShopping} from "react-icons/ai";
import {Link} from "react-router-dom";

const Index = () => {
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
						<h2 className='text-3xl font-bold'>20</h2>
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
						<h2 className='text-3xl font-bold'>20</h2>
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
						<h2 className='text-3xl font-bold'>20</h2>
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
								{[1, 2, 3].map((item, index) => (
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
										<td scope='row' className='px-6 py-4 font-medium whitespace-nowrap text-ellipsis'>
											Pending
										</td>
										<td scope='row' className='px-6 py-4'>
											<Link to={`/dashboard/order/details/123123`}>
												<span className='bg-green-100 text-green-800 text-sm font-normal mr-2 px-2.5 py-[1px] rounded'>View</span>
											</Link>
											<span className='bg-green-100 text-green-800 text-sm font-normal mr-2 px-2.5 py-[1px] rounded cursor-pointer'>Pay Now</span>
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
