import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {Link, useParams} from "react-router-dom";
import {getOrderDetails} from "../../store/reducers/orderReducer.js";

const OrderDetails = () => {
	const dispatch = useDispatch();
	const {orderId} = useParams();
	const {myOrder} = useSelector((state) => state.order);
	const {userInfo} = useSelector((state) => state.auth);

	useEffect(() => {
		dispatch(getOrderDetails(orderId));
	}, [orderId]);

	// * HANDLE TRUNCATE TEXT
	const truncateName = (name) => {
		if (name.length > 50) {
			return name.substring(0, 50) + "...";
		}
		return name;
	};

	return (
		<div className='bg-white p-5 rounded-md'>
			<h2 className='text-slate-600 font-semibold'>
				#{myOrder._id} <span className='pl-3'>{myOrder.date}</span>
			</h2>
			<div className='grid grid-cols-2  gap-3'>
				{/*	First Column  */}
				<div className='flex flex-col gap-1'>
					<h2 className='text-slate-600 font-semibold'>Delivery to : {myOrder?.shippingInfo?.name}</h2>
					<p className='mt-1'>
						<span className='bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5'>Home</span>
						<span className='text-slate-600 text-sm'>
							{myOrder?.shippingInfo?.address} {myOrder?.shippingInfo?.province} {myOrder?.shippingInfo?.city} {myOrder?.shippingInfo?.area}
						</span>
					</p>
					<p className='my-2 text-slate-600 text-sm font-semibold'>Email : {userInfo?.email}</p>
				</div>
				{/* Second Column */}
				<div className='text-slate-600'>
					<h2>Price: ${myOrder?.price} (Include Shipping Fee)</h2>
					<p>
						Payment Status: <span className={`py-[1px] text-xs px-3 capitalize  rounded ${myOrder?.paymentStatus === "paid" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>{myOrder?.paymentStatus}</span>
					</p>

					<p>
						Delivery Status: <span className={`py-[1px] text-xs px-3 capitalize  rounded ${myOrder?.deliveryStatus === "running" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>{myOrder?.deliveryStatus}</span>
					</p>
				</div>
			</div>

			{/* Product Section	*/}
			<div className='mt-3'>
				<h2 className='text-slate-600 text-lg pb-2'>Products</h2>
				<div className='flex gap-5 flex-col'>
					{myOrder &&
						myOrder?.products?.map((item, index) => (
							<div key={index}>
								<div className='flex gap-5 justify-start items-center text-slate-600'>
									<div className='flex- gap-2'>
										<div className='w-[60px] h-[60px]'>
											<img className='w-full h-full object-contain' src={item?.images[0].url} alt={item?.name} />
										</div>
										<div className='flex text-sm  flex-col justify-start items-start'>
											<Link to={"#"}>{truncateName(item?.name)}</Link>
											<p className='flex flex-row gap-3'>
												<span>Brand: {item?.brand}</span>
												<span>Stock : {item?.stock}</span>
											</p>
										</div>
									</div>
									<div className='pl-4'>
										<h2 className='text-md text-orange-500'>${item?.price - Math.floor((item?.price * item?.discount) / 100)}</h2>
										<p className='line-through'>${item?.price}</p>
										<p>-{item?.discount}%</p>
									</div>
								</div>
							</div>
						))}
				</div>
			</div>
		</div>
	);
};
export default OrderDetails;
