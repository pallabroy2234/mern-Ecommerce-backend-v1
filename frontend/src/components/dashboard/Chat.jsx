import {AiOutlineMessage, AiOutlinePlus} from "react-icons/ai";
import {Link, useParams} from "react-router-dom";
import {GrEmoji} from "react-icons/gr";
import {IoSend} from "react-icons/io5";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useRef, useState} from "react";
import io from "socket.io-client";
import {addFriend, messageClear, sendMessageSeller, updateMessage} from "../../store/reducers/chatReducer.js";
import toast from "react-hot-toast";
import {FaList} from "react-icons/fa";

const socket = io("http://localhost:3000");
const Chat = () => {
	const dispatch = useDispatch();
	const {sellerId} = useParams();
	const {userInfo} = useSelector((state) => state.auth);
	const {myFriends, currentFriend, friendMessages, successMessage, activeSeller} = useSelector((state) => state.chat);
	const [text, setText] = useState("");
	const [receiverMessage, setReceiverMessage] = useState("");
	// const [activeSeller, setActiveSeller] = useState([]);
	const lastMessageRef = useRef(null);
	const [show, setShow] = useState(false);

	// * Scroll to bottom
	useEffect(() => {
		if (lastMessageRef.current) {
			lastMessageRef.current.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"});
		}
	}, [friendMessages]);

	// * Socket connection and send data to socket server
	useEffect(() => {
		socket.emit("addUser", userInfo.id, userInfo);
	}, []);

	// * Add Friend
	useEffect(() => {
		dispatch(
			addFriend({
				sellerId: sellerId || "",
			}),
		);
	}, [sellerId]);

	// * Send message
	const handleSubmit = (e) => {
		e.preventDefault();
		if (text) {
			dispatch(
				sendMessageSeller({
					message: text,
					receiverId: sellerId,
				}),
			);
			setText("");
		}
	};

	// * For get message from seller  and active seller
	useEffect(() => {
		socket.on("seller-message", (message) => {
			setReceiverMessage(message);
		});
		// socket.on("active-seller", (allSellers) => {
		// 	setActiveSeller(allSellers);
		// });
	}, []);

	// * Update message
	useEffect(() => {
		if (receiverMessage) {
			if (sellerId === receiverMessage.senderId && userInfo.id === receiverMessage.receiverId) {
				dispatch(updateMessage(receiverMessage));
			} else {
				toast.success(receiverMessage.senderName + " " + "send a message");
				dispatch(messageClear());
			}
		}
	}, [receiverMessage]);

	// * FOR REAL TIME MESSAGE SEND TO MESSAGE SOCKET SERVER
	useEffect(() => {
		if (successMessage) {
			socket.emit("send-user-message", friendMessages[friendMessages.length - 1]);
			dispatch(messageClear());
		}
	}, [successMessage]);

	return (
		<div className='bg-white p-3 rounded-md'>
			<div className='w-full flex relative'>
				<div className={`${show ? "-left-2 shadow-lg bottom-0 " : "-left-[350px]"} w-[230px] md-lg:absolute z-[999] md-lg:bg-white md-lg:h-full transition-all duration-300`}>
					<div className='flex justify-start pl-1 gap-3 items-center text-slate-600 text-xl h-[50px]'>
						<span>
							<AiOutlineMessage />
						</span>
						<span className=''>Message</span>
					</div>
					<div className='w-full flex flex-col text-slate-600 py-4 gap-1 h-[400px] pr-3 overflow-y-auto'>
						{myFriends &&
							myFriends.map((item, index) => (
								<Link key={index} to={`/dashboard/chat/${item?.friendId}`} className={`flex gap-2 relative justify-start items-center pl-2 py-[8px] border border-cyan-500 rounded-md hover:mr-4  transition-all duration-300 ${item.friendId === sellerId ? "mr-4" : "mr-0"} `}>
									<div className='w-[40px] h-[40px] rounded-full relative overflow-hidden ring-2 ring-cyan-500 ring-offset-2'>
										<img className='w-full h-full object-cover' src={item?.image} alt={item?.sellerName} />
									</div>
									{activeSeller.some((seller) => seller.sellerId === item.friendId) && <div className='w-[10px] h-[10px] rounded-full bg-green-500 absolute bottom-2 left-[38px] z-20'></div>}
									<span className='text-nowrap text-ellipsis'>{item?.sellerName}</span>
								</Link>
							))}
					</div>
				</div>

				<div className='w-[calc(100%-230px)] md-lg:w-full'>
					{currentFriend ? (
						<div className='w-full h-full'>
							<div className='flex relative justify-between items-center text-slate-600 text-xl h-[60px]'>
								<div className='flex justify-between items-center gap-3'>
									<div className='w-[40px] h-[40px] rounded-full relative overflow-hidden ring-2 ring-offset-2 ring-cyan-500'>
										<img className='w-full h-full object-cover' src={currentFriend?.image} alt='' />
									</div>
									{activeSeller.some((seller) => seller.sellerId === currentFriend.friendId) && <div className='w-[10px] h-[10px] rounded-full bg-green-500 absolute bottom-2 left-[32px] z-20'></div>}
									<span className='text-base'>{currentFriend?.sellerName}</span>
								</div>
								<button onClick={() => setShow(!show)} className='w-[40px] h-[40px] md-lg:flex hidden justify-center items-center rounded-md bg-sky-600 text-white cursor-pointer'>
									<FaList />
								</button>
							</div>
							<div className='h-[400px] w-full bg-slate-100 p-3 rounded-md overflow-y-auto'>
								<div className='h-full w-full flex  flex-col gap-5'>
									{/* seller message */}
									{friendMessages.map((item, index) => {
										// * True but return false
										if (currentFriend?.friendId !== item.receiverId) {
											return (
												<div key={index} ref={lastMessageRef} className='w-full flex  gap-2 justify-start items-start text-[14px]'>
													<img className='w[30px] h-[30px] rounded-full' src={"../../public/images/user.png"} alt='' />
													<div className='p-2 bg-purple-500 text-white rounded-md flex w-[calc((100%-50px)]'>
														<span>{item?.message}</span>
													</div>
												</div>
											);
										}
										//  True and return true
										if (sellerId === item.receiverId) {
											return (
												<div key={index} ref={lastMessageRef} className='w-full flex gap-2 justify-end items-center text-[14px]'>
													<div className='p-2 bg-blue-500 text-white rounded-md'>
														<span>{item?.message}</span>
													</div>
													<img className='w[30px] h-[30px] rounded-full' src={"../../public/images/user.png"} alt='' />
												</div>
											);
										}
									})}
								</div>
							</div>
							<form onSubmit={(e) => handleSubmit(e)} className='flex p-2 justify-between items-center w-full'>
								<div className='w-[40px] h-[40px] border p-2 justify-center items-center flex rounded-full'>
									<label htmlFor='' className='cursor-pointer'>
										<AiOutlinePlus />
									</label>
									<input type='file' className='hidden' />
								</div>
								<div className='border h-[40px] p-0 ml-2 w-[calc(100%-90px)] rounded-full relative'>
									<input onChange={(e) => setText(e.target.value)} value={text} type='text' placeholder='Enter Message' className='w-full rounded-full h-full outline-none p-3' />
									<div className='text-2xl right-2 top-2 absolute cursor-pointer'>
										<span>
											<GrEmoji />
										</span>
									</div>
								</div>

								<div className='w-[40px] p-2 justify-center items-center rounded-full'>
									<button type='submit' className='text-2xl cursor-pointer'>
										<IoSend />
									</button>
								</div>
							</form>
						</div>
					) : (
						<button onClick={() => setShow(!show)} className='w-full h-[400px] flex justify-center items-center text-xl font-bold  text-slate-600'>
							<span>Select seller</span>
						</button>
					)}
				</div>
			</div>
		</div>
	);
};
export default Chat;
