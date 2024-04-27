import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {getAdminOrderDetails, messageClear, updateAdminOrderStatus} from "../../store/Reducers/orderReducer.js";
import toast from "react-hot-toast";


const OrderDetails = () => {
	const {orderId} = useParams();
	const dispatch = useDispatch();
	const {userInfo} = useSelector((state) => state.auth);
	const {order, successMessage, errorMessage} = useSelector((state) => state.order);
	const [status, setStatus] = useState("");
	
	
	useEffect(() => {
		if (userInfo) {
			dispatch(getAdminOrderDetails(orderId));
		}
	}, [orderId]);
	
	const handleTruncText = (text) => {
		if (text.length > 40) {
			return text.slice(0, 40) + "...";
		}
		return name;
	};
	
	useEffect(() => {
		if (order) {
			setStatus(order?.deliveryStatus);
		}
	}, [order]);
	
	const handleChangeStatus = (e) => {
		dispatch(updateAdminOrderStatus({orderId, info: {status: e.target.value}}));
		setStatus(e.target.value);
	};
	
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
	
	
	return (
		<div className="px-2 lg:px-7 pt-5">
			<div className="w-full bg-[#283046] p-4 rounded-md">
				<div className="flex justify-between items-center p-4">
					<h2 className="text-xl text-white">Order Details</h2>
					<select onChange={(e) => handleChangeStatus(e)} value={status} name="" id="" className="px-4 py-2 hover:border-indigo-500 border outline-none  bg-[#283046] border-slate-700 rounded-md text-white">
						<option value="pending">pending</option>
						<option value="processing">processing</option>
						<option value="warehouse">warehouse</option>
						<option value="placed">placed</option>
						<option value="cancelled">cancelled</option>
					</select>
				</div>
				
				<div className="p-4">
					<div className="flex gap-2 flex-col md:flex-row text-lg text-white">
						<h2>#{order?._id}</h2>
						<span>{order?.date}</span>
					</div>
					<div className="flex  flex-wrap">
						<div className="md:w-[32%] w-full">
							<div className="pr-3 text-white text-lg">
								
								<div className="flex flex-col gap-2">
									<h2 className="pb-2 font-semibold">Deliver to: {order?.shippingInfo?.name}</h2>
									<p>
										<span className="text-sm">{order?.shippingInfo?.address},{order?.shippingInfo?.province}, {order?.shippingInfo?.city} {order?.shippingInfo?.area}.</span>
									</p>
								</div>
								
								<div className="flex justify-start items-center gap-3">
									<h2>Payment status : </h2>
									<span className="text-base my-2">{order?.paymentStatus}</span>
								</div>
								<span>Price : ${order?.price}</span>
								<div className="mt-4 flex flex-col gap-4">
									<div className="text-white space-y-3">
										{
											order?.products && order?.products?.map((item, index) => (
												<div key={index} className="flex gap-3 text-md">
													<div className="w-[100px] h-[70px]">
														<img className="w-full h-full object-cover" src={item?.images[0].url} alt="" />
													</div>
													<div>
														<h2 className="text-[14px] sm:text-lg">{handleTruncText(item?.name)}</h2>
														<p>
															<span className="text-[14px] sm:text-lg">Brand : </span>
															<span className="text-[14px] sm:text-lg">{item?.brand} </span>
															<span className="text-[14px] sm:text-lg">Quantity : {item?.quantity}</span>
														</p>
													</div>
												</div>
											))
										}
									</div>
								</div>
							</div>
						</div>
						
						<div className="md:w-[68%] w-full">
							<div className="md:pl-3 pl-0">
								<div className="mt-4 flex flex-col">
									{
										order?.subOrders && order?.subOrders?.map((item, index) => (
											<div key={index} className="text-white mb-3">
												<div className="flex justify-start items-center gap-3">
													<h2>Seller {index + 1} order : </h2>
													<span>{item?.deliveryStatus}</span>
												</div>
												{
													item?.products && item?.products?.map((product, index) => (
														<div key={index} className="flex gap-3 text-md mt-3">
															<div className="w-[100px] h-[70px]">
																<img className="w-full h-full object-cover" src={product?.images[0].url} alt="" />
															</div>
															<div>
																<h2 className="text-[14px] sm:text-base">{handleTruncText(product?.name)}</h2>
																<p>
																	<span className="text-[14px] sm:text-lg">Brand : </span>
																	<span className="text-[14px] sm:text-lg">{product?.brand} </span>
																	<span className="text-[14px] sm:text-lg">Quantity : {product?.quantity}</span>
																</p>
															</div>
														</div>
													))
												}
											</div>
										))
									}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
export default OrderDetails;
