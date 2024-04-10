import {useEffect, useRef, useState} from "react";
import {IoMdClose} from "react-icons/io";
import {FaList} from "react-icons/fa";
import {Link, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {
	getUserMessages,
	getUsers,
	messageClear,
	sendSellerMessage,
	updateMessage
} from "../../store/Reducers/chatReducer.js";
import {socket} from "../../utils/utils.js";
import toast from "react-hot-toast";
import {BsEmojiSmile} from "react-icons/bs";


const SellerToCustomer = () => {
	const {customerId} = useParams();
	const dispatch = useDispatch();
	const {userInfo} = useSelector(state => state.auth);
	const {
		sellerFriends,
		sellerUserMessages,
		currentUser,
		successMessage,
		activeUser
	} = useSelector(state => state.chat);
	const [show, setShow] = useState(true);
	const [text, setText] = useState("");
	const [receiveMessage, setReceiveMessage] = useState("");
	const lastMessageRef = useRef(null);
	
	// * Scroll to bottom
	useEffect(() => {
		if (lastMessageRef.current) {
			lastMessageRef.current.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"});
		}
	}, [sellerUserMessages]);
	
	useEffect(() => {
		if (userInfo) {
			// * USER INFO MEANS SELLER INFO
			// dispatch(getUsers(userInfo._id))
			dispatch(getUsers());
		}
	}, [userInfo]);
	
	
	useEffect(() => {
		if (customerId) {
			dispatch(getUserMessages(customerId));
		}
	}, [customerId]);
	
	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(sendSellerMessage({
			message: text, receiverId: customerId
		}));
		setText("");
	};
	
	useEffect(() => {
		if (successMessage) {
			socket.emit("send-seller-message", sellerUserMessages[sellerUserMessages.length - 1]);
			dispatch(messageClear());
		}
	}, [successMessage]);
	
	// * GET REALTIME USER MESSAGE
	useEffect(() => {
		socket.on("user-message", (message) => {
			setReceiveMessage(message);
		});
	}, []);
	
	
	// * UPDATE MESSAGE
	useEffect(() => {
		if (receiveMessage) {
			if (customerId === receiveMessage.senderId && userInfo._id === receiveMessage.receiverId) {
				dispatch(updateMessage(receiveMessage));
			} else {
				toast.success(receiveMessage.senderName + " " + "send a message");
				dispatch(messageClear());
			}
		}
	}, [receiveMessage]);
	
	
	return (<div className="px-2 lg:px-7 pt-5">
		<div className="w-full bg-secondary px-4 py-4 rounded-md h-[calc(100vh-140px)]">
			<div className="flex w-full h-full relative gap-10">
				{/* Side Bar */}
				<div className={`w-[300px] h-full absolute z-10 ${show ? "-left-[16px] " : "-left-[336PX]"} md:left-0 md:relative transition-all`}>
					<div className="w-full h-[calc(100vh-177px)] bg-[#252b3b] md:bg-transparent overflow-y-auto ">
						<div className="flex text-xl justify-between items-center p-4 md:p-0 md:px-3 md:pb-3 text-white">
							<h1>Customers</h1>
							<span onClick={() => setShow(false)} className="block cursor-pointer md:hidden "><IoMdClose /></span>
						</div>
						
						{sellerFriends && sellerFriends.map((friend, index) => (
							<Link to={`/seller/dashboard/chat-customer/${friend?.friendId}`} key={index} className={`h-[60px] flex justify-start gap-2 items-center text-white px-2 py-8 mb-4 rounded-sm cursor-pointer bg-slate-700`}>
								<div className="relative">
									<img className="w-[50px] h-[50px] ring-[3px] ring-white  max-w-[55px] p-[2px] rounded-full" src={friend?.image ? friend?.image : "/public/images/admin.jpg"} alt={friend?.userName} />
									{
										activeUser.some((user) => user.userId === friend.friendId) &&
										<div className="w-[10px] h-[10px] bg-green-500 rounded-full absolute right-0 bottom-0"></div>
									}
								</div>
								<div className="flex flex-col justify-center items-start w-full">
									<div className="flex flex-col justify-center items-start w-full">
										<h2 className="text-base font-semibold">{friend?.userName}</h2>
									</div>
								</div>
							</Link>))}
					</div>
				</div>
				{/*  message body */}
				<div className="w-full md:w-[calc(100%-200px)] md:pl-4">
					<div className="flex justify-between items-center">
						{customerId && (<div className="flex justify-start items-center gap-3">
							<div className="relative">
								<img className="w-[54px] h-[54px] ring-[3px] ring-green-500  max-w-[55px] p-[2px] rounded-full" src="/public/images/admin.jpg" alt="" />
								{
									activeUser.some((user) => user.userId === customerId) &&
									<div className="w-[12px] h-[12px] bg-green-500 rounded-full absolute right-0 bottom-0"></div>
								}
							</div>
							<h2 className="text-white font-semibold">{currentUser?.name}</h2>
						</div>)}
						<div onClick={() => setShow(true)} className="w-[35px] flex md:hidden h-[35px] rounded-sm bg-blue-500 shadow-lg hover:shadow-blue-500/50 justify-center cursor-pointer items-center text-white">
							<span><FaList /></span>
						</div>
					</div>
					
					<div className="py-4">
						<div className="bg-slate-800 h-[calc(100vh-310px)] px-2 rounded-md overflow-y-auto">
							{customerId ? sellerUserMessages.map((message, index) => {
									// * True but return false
									if (message.receiverId !== customerId) {
										return (
											<div key={index} ref={lastMessageRef} className="w-full flex justify-start items-center">
												<div className="flex justify-start items-center gap-2 md:px-3 py-2 max-w-full lg:max-w-[85%]">
													<div>
														<img src={message?.image ? message?.image : "/public/images/admin.jpg"} className="w-[38px] h-[38px] ring-[2px] ring-white  max-w-[38px] p-[2px] rounded-full" alt={message?.senderName} />
													</div>
													<div className="flex justify-center items-start flex-col bg-orange-500 shadow-lg shadow-orange-500/50  text-white py-1 px-2 rounded-sm">
														<span>{message.message}</span>
													</div>
												</div>
											</div>
										);
									}
									// * True return true
									if (message.senderId === userInfo._id) {
										return (
											<div key={index} ref={lastMessageRef} className="w-full flex justify-end items-center">
												<div className="flex justify-end items-center gap-2 md:px-3 py-2 max-w-full lg:max-w-[85%]">
													<div className="flex justify-center items-center flex-col bg-blue-500 shadow-lg shadow-blue-500/50  text-white py-1 px-2 rounded-sm">
														<span>{message.message}</span>
													</div>
													<div>
														<img src={message?.image ? message?.image : "/public/images/admin.jpg"} className="w-[38px] h-[38px] ring-[2px] ring-white  max-w-[38px] p-[2px] rounded-full" alt={message?.senderName} />
													</div>
												</div>
											</div>
										);
									}
								}) :
								<div className="w-full h-full flex justify-center items-center flex-col  gap-2 text-white">
									<span><BsEmojiSmile /></span>
									<span>Select User</span>
								</div>}
						</div>
					</div>
					
					{/* Write Message */}
					<form onSubmit={(e) => handleSubmit(e)} className="flex gap-3  items-center">
						<input value={text} readOnly={customerId ? false : true} onChange={(e) => setText(e.target.value)} className="w-full flex justify-between px-3 border-slate-500 border items-center py-[8px] focus:border-blue-500 rounded-md outline-none bg-transparent text-white" type="text" placeholder="Input your message" />
						<button disabled={customerId ? false : true} type="submit" className="bg-cyan-500 shadow-lg hover:shadow-cyan-500/50 font-semibold w-[75px] h-[35px] rounded-md text-white flex justify-center items-center transition-all duration-300">Send</button>
					</form>
				</div>
			</div>
		</div>
	</div>);
};
export default SellerToCustomer;
