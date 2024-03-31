import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {useParams} from "react-router-dom";
import {getOrderDetails} from "../../store/reducers/orderReducer.js";

const OrderDetails = () => {
	const dispatch = useDispatch();
	const {orderId} = useParams();

	const {myOrder} = useSelector((state) => state.order);

	useEffect(() => {
		dispatch(getOrderDetails(orderId));
	}, [orderId]);

	return (
		<div className='bg-white p-5 rounded-md'>
			<h2>Order</h2>
		</div>
	);
};
export default OrderDetails;
