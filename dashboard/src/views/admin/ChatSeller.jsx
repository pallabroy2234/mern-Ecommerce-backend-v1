import {useEffect, useRef, useState} from "react";
import {IoMdClose} from "react-icons/io";
import {FaList} from "react-icons/fa";
import {useDispatch, useSelector} from "react-redux";
import {
	getCurrentAdminMessages,
	getSellers, messageClear,
	sendMessageToSeller, updateAdminMessages
} from "../../store/Reducers/chatReducer.js";
import {Link, useParams} from "react-router-dom";
import {BsEmojiSmile} from "react-icons/bs";
import {socket} from "../../utils/utils.js";
import toast from "react-hot-toast";


const ChatSeller = () => {
	const {sellerId} = useParams();
	const dispatch = useDispatch();
	const {
		sellers,
		activeSellers,
		sellerAdminMessages,
		currentSeller,
		successMessage
	} = useSelector((state) => state.chat);
	const {userInfo} = useSelector((state) => state.auth);
	const [show, setShow] = useState(true);
	const [text, setText] = useState("");
	const [receiveMessage, setReceiveMessage] = useState([]);
	const lastMessageRef = useRef(null);
	// * Scroll to bottom
	useEffect(() => {
		if (lastMessageRef.current) {
			lastMessageRef.current.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"});
		}
	}, [sellerAdminMessages]);
	
	useEffect(() => {
		dispatch(getSellers());
	}, []);
	
	const handleInputSubmit = (e) => {
		e.preventDefault();
		dispatch(sendMessageToSeller({
			receiverId: sellerId,
			message: text,
			senderName: "admin"
		}));
		setText("");
	};
	useEffect(() => {
		if (sellerId) {
			dispatch(getCurrentAdminMessages(sellerId));
		}
		
	}, [sellerId]);
	
	// * REAL TIME SEND MESSAGE ADMIN TO SELLER
	useEffect(() => {
		if (successMessage) {
			socket.emit("send-message-admin-to-seller", sellerAdminMessages[sellerAdminMessages.length - 1]);
			dispatch(messageClear());
		}
	}, [successMessage]);
	
	// * REAL TIME GET MESSAGE FROM SELLER
	useEffect(() => {
		socket.on("receive-seller-message", (message) => {
		
			setReceiveMessage(message);
		});
	}, []);
	
	
	// * UPDATE SELLER MESSAGE WITH REAL TIME
	useEffect(() => {
		if (receiveMessage.length !== 0) {
			if (receiveMessage.senderId === sellerId && receiveMessage.receiverId === userInfo._id) {
				dispatch(updateAdminMessages(receiveMessage));
			} else {
				// * Notification
				toast.success(receiveMessage.senderName + " " + "send a message");
			}
		}
	}, [receiveMessage]);
	
	
	return (
		<div className="px-2 lg:px-7 pt-5">
			<div className="w-full bg-secondary px-4 py-4 rounded-md h-[calc(100vh-140px)]">
				<div className="flex w-full h-full relative gap-10">
					{/* Side Bar */}
					<div className={`w-[300px] h-full absolute z-10 ${show ? "-left-[16px] " : "-left-[336PX]"} md:left-0 md:relative transition-all`}>
						<div className="w-full h-[calc(100vh-177px)] bg-[#252b3b] md:bg-transparent overflow-y-auto ">
							<div className="flex text-xl justify-between items-center p-4 md:p-0 md:px-3 md:pb-3 text-white">
								<h1>Sellers</h1>
								<span onClick={() => setShow(false)} className="block cursor-pointer md:hidden "><IoMdClose /></span>
							</div>
							{
								sellers && sellers.map((seller, index) => (
									<Link to={`/admin/dashboard/chat-sellers/${seller._id}`} key={index} className={` ${seller._id === sellerId ? "bg-slate-700" : ""} h-[60px] flex justify-start gap-2 items-center text-white px-2 py-8 mb-4 rounded-sm cursor-pointer `}>
										<div className="relative">
											<div className="w-[50px] h-[50px] overflow-hidden ring-[2px] ring-white ring-offset-[2px]  rounded-full">
												<img className="w-full h-full object-cover" src={seller?.image || "/public/images/admin.jpg"} alt={seller?.name} />
											</div>
											{
												activeSellers.some((item) => item.sellerId === seller._id) && (
													<div className="w-[10px] h-[10px] bg-green-500 rounded-full absolute right-0 bottom-0"></div>
												)
											}
										</div>
										<div className="flex flex-col justify-center items-start w-full">
											<div className="flex flex-col justify-center items-start w-full">
												<h2 className="text-base font-semibold">{seller?.name}</h2>
											</div>
										</div>
									</Link>
								))
							}
						</div>
					</div>
					
					
					{/*  message options */}
					<div className="w-full md:w-[calc(100%-200px)] md:pl-4">
						<div className="flex justify-between items-center">
							{
								sellerId && (
									<div className="flex justify-start items-center gap-3">
										<div className="relative">
											<div className="w-[54px] h-[54px] rounded-full overflow-hidden ring-2  ring-green-500">
												<img src={currentSeller?.image ? currentSeller?.image : "/public/images/admin.jpg"} alt="" className="w-full h-full   object-cover" />
											</div>
											{
												activeSellers.some((item) => item.sellerId === sellerId) && (
													<div className="w-[10px] h-[10px] bg-green-500 rounded-full absolute right-0 bottom-0"></div>
												)
											}
										</div>
										<span className="text-white">{currentSeller?.name}</span>
									</div>
								)
							}
							
							<div onClick={() => setShow(true)} className="w-[35px] flex md:hidden h-[35px] rounded-sm bg-blue-500 shadow-lg hover:shadow-blue-500/50 justify-center cursor-pointer items-center text-white">
								<span><FaList /></span>
							</div>
						</div>
						
						<div className="py-4">
							<div className="bg-slate-800 h-[calc(100vh-310px)] px-2 rounded-md overflow-y-auto">
								{
									sellerId ? sellerAdminMessages.map((item, index) => {
											if (item.senderId === sellerId) {
												return (
													<div key={index} ref={lastMessageRef} className="w-full flex justify-start items-center">
														<div className="flex justify-start items-center gap-2 md:px-3 py-2 max-w-full lg:max-w-[85%]">
															<div>
																<img className="w-[38px] h-[38px] ring-[2px] ring-white  max-w-[38px] p-[2px] rounded-full" src="/public/images/admin.jpg" alt="" />
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
																<img className="w-[38px] h-[38px] ring-[2px] ring-white  max-w-[38px] p-[2px] rounded-full" src="/public/images/admin.jpg" alt="" />
															</div>
														</div>
													</div>
												);
											}
										}) :
										<div className="w-full h-full flex justify-center items-center flex-col  gap-2 text-white">
											<span><BsEmojiSmile /></span>
											<span>Select seller</span>
										</div>
								}
							</div>
						</div>
						{/* Write Message */}
						<form onSubmit={(e) => handleInputSubmit(e)} className="flex gap-3  items-center">
							<input readOnly={sellerId ? false : true} onChange={(e) => setText(e.target.value)} value={text} className="w-full flex justify-between px-3 border-slate-500 border items-center py-[8px] focus:border-blue-500 rounded-md outline-none bg-transparent text-white" type="text" placeholder="Input your message" />
							<button disabled={sellerId ? false : true} className="bg-cyan-500 shadow-lg hover:shadow-cyan-500/50 font-semibold w-[75px] h-[35px] rounded-md text-white flex justify-center items-center transition-all duration-300">Send</button>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};
export default ChatSeller;
