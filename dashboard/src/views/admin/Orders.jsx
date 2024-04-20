import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import Pagination from "../Pagination.jsx";
import {useDispatch, useSelector} from "react-redux";
import {getAdminOrders} from "../../store/Reducers/orderReducer.js";
import {MdKeyboardArrowDown, MdKeyboardArrowUp} from "react-icons/md";

const Orders = () => {
	const dispatch = useDispatch();
	const {userInfo} = useSelector((state) => state.auth);
	const {orders, pagination} = useSelector((state) => state.order);
	const [currentPage, setCurrentPage] = useState(1);
	const [searchValue, setSearchValue] = useState("");
	const [parPage, setParPage] = useState(5);
	const [show, setShow] = useState("");
	
	useEffect(() => {
		if (userInfo) {
			dispatch(getAdminOrders({
				currentPage: parseInt(currentPage), parPage: parseInt(parPage), searchValue: searchValue
			}));
		}
	}, [currentPage, parPage, searchValue]);
	
	const toggleDetails = (orderId) => {
		setShow((prevShow) => (prevShow === orderId ? "" : orderId));
	};
	
	return (<div className="px-2 lg:px-7 pt-5">
		<div className="w-full bg-[#283046] p-4 rounded-md">
			{/* search Option */}
			<div className="flex justify-between items-center">
				<select
					onChange={(e) => setParPage(parseInt(e.target.value))}
					defaultValue={5}
					className="px-4 py-2 hover:border-indigo-500 border outline-none  bg-[#283046] border-slate-700 rounded-md text-white"
				>
					<option value="5">5</option>
					<option value="15">15</option>
					<option value="25">25</option>
				</select>
				<input
					type="text"
					placeholder="Search"
					className="px-4 py-2 focus:border-indigo-500 border outline-none  bg-[#283046] border-slate-700 rounded-md text-white"
				/>
			</div>
			
			{/*  Order items   */}
			<div className="relative mt-10 overflow-x-auto">
				<div className="w-full text-sm text-left text-white">
					{/* table Heading */}
					<div className="text-sm text-white uppercase border-b  border-slate-700">
						<div className="flex justify-between items-start">
							<div className="py-3 w-[25%]">Order Id</div>
							<div className="py-3 w-[13%]">Price</div>
							<div className="py-3 w-[18%]">Payment Status</div>
							<div className="py-3 w-[18%]">Order Status</div>
							<div className="py-3 w-[18%]">Action</div>
							<div className="py-3 w-[8%]">
								{show ? (<MdKeyboardArrowUp onClick={() => toggleDetails("")} />) : (
									<MdKeyboardArrowDown onClick={() => toggleDetails("")} />)}
							</div>
						</div>
					</div>
					{/* Table Body */}
					<div>
						{orders && orders.map((order, index) => (<div key={index} className="text-white">
							<div className="flex justify-between items-start border-b border-slate-700">
								<div className="py-4 w-[25%] font-medium whitespace-nowrap">
									{order?._id}
								</div>
								<div className="py-4 w-[13%]">${order?.price}</div>
								<div className="py-4 w-[18%]">{order?.paymentStatus}</div>
								<div className="py-4 w-[18%]">{order?.deliveryStatus}</div>
								<div className="py-4 w-[18%]">
									<Link to={`/admin/dashboard/order/details/${order?._id}`}>View</Link>
								</div>
								<div className="py-4 w-[8%] cursor-pointer">
									{show === order._id ? (
										<MdKeyboardArrowUp onClick={() => toggleDetails(order._id)} />) : (
										<MdKeyboardArrowDown onClick={() => toggleDetails(order._id)} />)}
								</div>
							</div>
							
							<div className={`${show === order._id ? "block border-b border-slate-700 bg-slate-800" : "hidden"}`}>
								{order.subOrders && order.subOrders.map((subOrder, index) => (
									<div key={index} className="flex justify-between items-start border-b border-slate-700">
									<div className="py-4 w-[25%] font-medium whitespace-nowrap pl-3 ">
										{subOrder?._id}
									</div>
									<div className="py-4 w-[13%]">${subOrder?.price}</div>
									<div className="py-4 w-[18%]">{subOrder?.paymentStatus}</div>
									<div className="py-4 w-[18%]">{subOrder?.deliveryStatus}</div>
									<div className="py-4 w-[18%]"></div>
									<div className="py-4 w-[8%]"></div>
									<div></div>
								</div>))}
							</div>
						</div>))}
					</div>
				</div>
			</div>
			
			{/* pagination   */}
			<div className="w-full flex justify-end mt-4 bottom-4 right-4">
				{pagination.totalNumberOfOrders >= parPage ? (
					<Pagination
					pageNumber={currentPage}
					setPageNumber={setCurrentPage}
					totalItem={pagination.totalNumberOfOrders}
					parPage={parPage}
					showItem={pagination.totalPages}
				/>) : null}
			</div>
		</div>
	</div>);
};
export default Orders;
