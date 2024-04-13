import {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {
	getSellerMessages,
	messageClear,
	sendMessageToAdmin,
	updateSellerMessages,
} from "../../store/Reducers/chatReducer.js";
import {socket} from "../../utils/utils.js";


const SellerToAdmin = () => {
	const dispatch = useDispatch();
	const {sellerAdminMessages, successMessage ,activeAdmin} = useSelector((state) => state.chat);
	const {userInfo} = useSelector((state) => state.auth);
	const [text, setText] = useState("");
	const lastMessageRef = useRef(null);
	
	
	// * Scroll to bottom
	useEffect(() => {
		if (lastMessageRef.current) {
			lastMessageRef.current.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"});
		}
	}, [sellerAdminMessages]);
	
	
	useEffect(() => {
		if (userInfo) {
			dispatch(getSellerMessages());
		}
	}, []);
	
	const handleInputSubmit = (e) => {
		e.preventDefault();
		dispatch(sendMessageToAdmin({
			message: text
		}));
		setText("");
	};
	
	// * REAL TIME GET MESSAGE FROM ADMIN
	useEffect(() => {
		socket.on("admin-message", (message) => {
			dispatch(updateSellerMessages(message));
		});
	}, []);
	
	// * REAL TIME SEND MESSAGE SELLER TO ADMIN
	useEffect(() => {
		if (successMessage) {
			socket.emit("send-message-seller-to-admin", sellerAdminMessages[sellerAdminMessages.length - 1]);
			dispatch(messageClear());
		}
	}, [successMessage]);
	
	
	return (
		<div className="px-2 lg:px-7 pt-5">
			<div className="w-full bg-secondary px-4 py-4 rounded-md h-[calc(100vh-140px)]">
				<div className="flex w-full h-full relative gap-10">
					
					{/*  message options */}
					<div className="w-full  md:pl-4">
						<div className="flex justify-between items-center">
							<div className="flex justify-start items-center gap-3">
								<div className="relative">
									<img className="w-[54px] h-[54px] ring-[3px] ring-green-500  max-w-[55px] p-[2px] rounded-full" src="http://localhost:5173//public/images/admin.jpg" alt="" />
									{/* Active Admin */}
									{
										activeAdmin &&
										<div className="w-[12px] h-[12px] bg-green-500 rounded-full absolute right-0 bottom-0"></div>
									}
								</div>
								<h2 className="text-white font-semibold">Support</h2>
							</div>
						</div>
						
						<div className="py-4">
							<div className="bg-slate-800 h-[calc(100vh-310px)] px-2 rounded-md overflow-y-auto">
								{/* Received message */}
								{
									sellerAdminMessages && sellerAdminMessages.map((item, index) => {
										if (userInfo._id !== item.senderId) {
											return (
												<div key={index} ref={lastMessageRef} className="w-full flex justify-start items-center">
													<div className="flex justify-start items-center gap-2 md:px-3 py-2 max-w-full lg:max-w-[85%]">
														<div>
															<img className="w-[38px] h-[38px] ring-[2px] ring-white  max-w-[38px] p-[2px] rounded-full" src="/public/images/admin.jpg" alt="admin" />
														</div>
														<div className="flex justify-center items-start flex-col bg-orange-500 shadow-lg shadow-orange-500/50  text-white py-1 px-2 rounded-sm">
															<span>{item?.message}</span>
														</div>
													</div>
												</div>
											);
										} else {
											return (
												<div key={index} ref={lastMessageRef} className="w-full flex justify-end items-center">
													<div className="flex justify-start items-center gap-2 md:px-3 py-2 max-w-full lg:max-w-[85%]">
														<div className="flex justify-center items-center flex-col bg-blue-500 shadow-lg shadow-blue-500/50  text-white py-1 px-2 rounded-sm">
															<span>{item?.message}</span>
														</div>
														<div>
															<img src={userInfo?.image ? userInfo?.image : "/public/images/admin.jpg"} alt={userInfo?.name} className="w-[38px] h-[38px] ring-[2px] ring-white  max-w-[38px] p-[2px] rounded-full" />
														</div>
													</div>
												</div>
											);
										}
									})
								}
							</div>
						</div>
						
						{/* Write Message */}
						<form onSubmit={(e) => handleInputSubmit(e)} className="flex gap-3  items-center">
							<input onChange={(e) => setText(e.target.value)} value={text} className="w-full flex justify-between px-3 border-slate-500 border items-center py-[8px] focus:border-blue-500 rounded-md outline-none bg-transparent text-white" type="text" placeholder="Input your message" />
							<button className="bg-cyan-500 shadow-lg hover:shadow-cyan-500/50 font-semibold w-[75px] h-[35px] rounded-md text-white flex justify-center items-center transition-all duration-300">Send</button>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};
export default SellerToAdmin;
