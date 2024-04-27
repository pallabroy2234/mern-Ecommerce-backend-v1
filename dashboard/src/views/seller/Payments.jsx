import React, {forwardRef, useEffect, useState} from "react";
import {BsCurrencyDollar} from "react-icons/bs";
import {FixedSizeList as List} from "react-window";
import {useDispatch, useSelector} from "react-redux";
import {getSellerPaymentDetails, messageClear, sendWithdrawRequest} from "../../store/Reducers/paymentReducer.js";
import toast from "react-hot-toast";
import moment from "moment";


const handleOnWheel = ({deltaY}) => {
	console.log("handleOnWheel", deltaY);
};

const outerElementType = forwardRef((props, ref) => (
	<div ref={ref} onWheel={handleOnWheel} {...props}></div>
));

const Payments = () => {
	const dispatch = useDispatch();
	const {
		successMessage,
		errorMessage,
		loader,
		pendingWithdraw,
		successWithdraw,
		totalAmount,
		withdrawAmount,
		pendingAmount,
		availableAmount
	} = useSelector(state => state.payment);
	const {userInfo} = useSelector(state => state.auth);
	const [amount, setAmount] = useState("");
	
	useEffect(() => {
		if (userInfo) {
			dispatch(getSellerPaymentDetails());
		}
	}, []);
	
	
	// * HANDLE PAYMENT REQUEST
	const handlePaymentRequest = (e) => {
		e.preventDefault();
		if (userInfo) {
			if (availableAmount < 20) {
				dispatch(sendWithdrawRequest(amount));
				setAmount("");
			} else {
				toast.error("You can't withdraw less than $20");
			}
		}
	};
	
	// * SUCCESS MESSAGE OR ERROR MESSAGE
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
	
	
	const cardContent = [
		{amount: totalAmount, label: "Total Sales", color: "#28c76f", bg: "#28c76f"},
		{amount: availableAmount, label: "Available Amount", color: "#cd00e8", bg: "#e000e8"},
		{amount: withdrawAmount, label: "Withdraw Amount", color: "#00cfe8", bg: "#7367f0"},
		{amount: pendingAmount, label: "Pending Amount", color: "#7367f0", bg: "#7367f0"}
	];
	const Card = ({amount, label, color, bg}) => (
		<div className={`flex justify-between items-center p-5 bg-${bg} rounded-md gap-3`}>
			<div className="flex flex-col justify-start items-start text-white">
				<h2 className="text-lg font-bold mb-2">${amount}</h2>
				<span className="text-sm font-normal">{label}</span>
			</div>
			<div className={`w-[46px] h-[47px] rounded-full bg-[${bg}1f] flex justify-center items-center text-xl`}>
				<BsCurrencyDollar className={`text-[${color}] shadow-lg`} />
			</div>
		</div>
	);
	
	const Row = ({index, style}) => {
		return (
			<div style={style} className="flex text-sm">
				<div className="w-[25%] p-2 whitespace-nowrap">{index + 1}</div>
				<div className="w-[25%] p-2 whitespace-nowrap">${pendingWithdraw[index]?.amount}</div>
				<div className="w-[25%] p-2 whitespace-nowrap">
					<span className="py-[1px] px-[5px] bg-slate-700 text-blue-500 rounded-md text-xs">{pendingWithdraw[index]?.status}</span>
				</div>
				<div className="w-[25%] p-2 whitespace-nowrap">{moment(pendingWithdraw[index]?.createdAt).format("LL")}</div>
			</div>
		);
	};
	
	
	const SuccessRow = ({index, style}) => {
		return (
			<div style={style} className="flex text-sm">
				<div className="w-[25%] p-2 whitespace-nowrap">{index + 1}</div>
				<div className="w-[25%] p-2 whitespace-nowrap">${successWithdraw[index]?.amount}</div>
				<div className="w-[25%] p-2 whitespace-nowrap">
					<span className="py-[1px] px-[5px] bg-slate-700 text-blue-500 rounded-md text-xs">{successWithdraw[index]?.status}</span>
				</div>
				<div className="w-[25%] p-2 whitespace-nowrap">{moment(successWithdraw[index]?.createdAt).format("LL")}</div>
			</div>
		);
	};
	
	return (
		<div className="px-2 md:px-7 py-5">
			{/* card */}
			<div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-7 mb-5">
				{
					cardContent && cardContent.map((amount, index) => (
						<div key={index} className="bg-[#283046] rounded-md">
							<Card key={index} {...amount} />
						</div>
					))
				}
			</div>
			
			{/* send Request and success withdraw  */}
			<div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-3 pb-4">
				
				<div className="bg-secondary text-white rounded-md p-5">
					<h2 className="text-lg">Send Request</h2>
					<div className="pt-5">
						<form onSubmit={(e) => handlePaymentRequest(e)}>
							<div className="flex gap-3 flex-wrap">
								<input onChange={(e) => setAmount(e.target.value)} value={amount} required type="number" min="0" className="md:w-[79%] px-4 py-2 hover:border-indigo-500 border outline-none  bg-[#283046] border-slate-700 rounded-md text-white" name="amount" />
								<button disabled={loader} type="submit" className="bg-indigo-500 disabled:cursor-not-allowed  hover:shadow-blue-500/50 hover:shadow-lg rounded-md px-8 py-2 text-sm">
									{loader ? "Loading..." : "Send"}
								</button>
							</div>
						</form>
					</div>
					
					{/* pending request   */}
					<div>
						<h2 className="text-lg pb-4 text-white pt-4">Pending Request</h2>
						<div className="w-full overflow-x-auto text-white">
							<div className="flex bg-[#161d31] uppercase min-w-[340px]">
								<div className="w-[25%] p-2 text-white">No</div>
								<div className="w-[25%] p-2 text-white">Amount</div>
								<div className="w-[25%] p-2 text-white">Status</div>
								<div className="w-[25%] p-2 text-white">Date</div>
							</div>
							{
								<List style={{
									minWidth: "340px"
								}} className="List" height={450} itemCount={pendingWithdraw.length} itemSize={35} outerElementType={outerElementType}>
									{Row}
								</List>
							}
						</div>
					</div>
				</div>
				
				{/* Success withdraw section */}
				<div className="bg-secondary text-white rounded-md p-5">
					<div>
						<h2 className="text-lg pb-4 text-white">Success Withdraw</h2>
						<div className="w-full overflow-x-auto text-white">
							<div className="flex bg-[#161d31] uppercase min-w-[340px]">
								<div className="w-[25%] p-2 text-white">No</div>
								<div className="w-[25%] p-2 text-white">Amount</div>
								<div className="w-[25%] p-2 text-white">Status</div>
								<div className="w-[25%] p-2 text-white">Date</div>
							</div>
							{
								<List style={{
									minWidth: "340px",
									overflowY: "auto"
								}} className="List" height={550} itemCount={successWithdraw.length} itemSize={35} outerElementType={outerElementType}>
									{SuccessRow}
								</List>
							}
						</div>
					</div>
				</div>
			
			</div>
		
		
		</div>
	);
};

export default Payments;