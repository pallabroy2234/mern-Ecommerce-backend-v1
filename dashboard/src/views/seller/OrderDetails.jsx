import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {
	getAdminOrderDetails,
	getSellerOrderDetails,
	messageClear,
	updateAdminOrderStatus, updateSellerOrderStatus
} from "../../store/Reducers/orderReducer.js";
import toast from "react-hot-toast";


const OrderDetails = () => {
	const {orderId} = useParams();
	const dispatch = useDispatch();
	const {userInfo} = useSelector((state) => state.auth);
	const {order, successMessage, errorMessage} = useSelector((state) => state.order);
	const [status, setStatus] = useState("");
	
	
	useEffect(() => {
		if (userInfo) {
			dispatch(getSellerOrderDetails(orderId));
		}
	}, [orderId]);
	
	const handleTruncText = (text) => {
		if (text.length > 60) {
			return text.slice(0, 60) + "...";
		}
		return text;
	};
	
	useEffect(() => {
		if (order) {
			setStatus(order?.deliveryStatus);
		}
	}, [order]);
	
	const handleChangeStatus = (e) => {
		dispatch(updateSellerOrderStatus({orderId, info: {status: e.target.value}}));
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
					<h2 className="text-xl text-white whitespace-nowrap">Order Details</h2>
					<select onChange={(e) => handleChangeStatus(e)} value={status} name="" id="" className="px-4 py-2 hover:border-indigo-500 border outline-none  bg-[#283046] border-slate-700 rounded-md text-white">
						<option value="pending">pending</option>
						<option value="processing">processing</option>
						<option value="warehouse">warehouse</option>
						<option value="cancelled">cancelled</option>
					</select>
				</div>
				
				<div className="p-4">
					<div className="flex md:flex-row  flex-col md:gap-4  text-lg text-white">
						<h2 className="text-sm md:text-lg">#{order?._id}</h2>
						<span className="text-sm md:text-lg">{order?.date}</span>
					</div>
					<div className="flex  flex-wrap w-full">
						<div className="w-full">
							<div className="pr-3 text-white text-lg">
								
								<div className="flex flex-col gap-2">
									<h2 className="pb-2 font-semibold text-sm md:text-lg">Deliver to: {order?.shippingInfo}</h2>
								</div>
								
								<div className="flex justify-start items-center gap-3">
									<h2 className="text-sm md:text-lg">Payment status : </h2>
									<span className="text-sm md:text-lg my-2">{order?.paymentStatus}</span>
								</div>
								<span className="text-sm md:text-lg">Price : ${order?.price}</span>
								<div className="mt-4 flex flex-col gap-4">
									<div className="text-white space-y-3">
										{
											order?.products && order?.products.map((item, index) => (
												<div key={index} className="flex gap-3 text-md mb-2">
													<div className="w-[100px] h-[100px]">
														<img className="w-full h-full object-contain" src={item?.images[0].url} alt={item?.name} />
													</div>
													<div>
														<h2 className="text-sm md:text-lg">{handleTruncText(item?.name)}</h2>
														<p className="flex mt-2 flex-col gap-2 md:flex-row md:gap-2">
															<span className="text-sm md:text-lg">Brand : {item?.brand}</span>
															<span className="text-sm md:text-lg">Quantity : {item?.quantity}</span>
														</p>
													</div>
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
		</div>
	);
};
export default OrderDetails;
