import {AiOutlineMessage, AiOutlinePlus} from "react-icons/ai";
import {Link, useParams} from "react-router-dom";
import {GrEmoji} from "react-icons/gr";
import {IoSend} from "react-icons/io5";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import io from "socket.io-client";
import {addFriend, sendMessageSeller} from "../../store/reducers/chatReducer.js";

const socket = io("http://localhost:3000");
const Chat = () => {
	const dispatch = useDispatch();
	const {sellerId} = useParams();
	const {userInfo} = useSelector((state) => state.auth);
	const {myFriends, currentFriend, friendMessages} = useSelector((state) => state.chat);
	const [text, setText] = useState("");
	console.log(currentFriend);
	useEffect(() => {
		socket.emit("addUser", userInfo.id, userInfo);
	}, []);

	useEffect(() => {
		dispatch(
			addFriend({
				sellerId: sellerId || "",
			}),
		);
	}, [sellerId]);

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

	return (
		<div className='bg-white p-3 rounded-md'>
			<div className='w-full flex'>
				<div className='w-[230px]'>
					<div className='flex justify-start gap-3 items-center text-slate-600 text-xl h-[50px]'>
						<span>
							<AiOutlineMessage />
						</span>
						<span>Message</span>
					</div>
					<div className='w-full flex flex-col text-slate-600 py-4 gap-1 h-[400px] pr-3'>
						{myFriends &&
							myFriends.map((item, index) => (
								<Link key={index} to={`/dashboard/chat/${item?.friendId}`} className={`flex gap-2 relative justify-start items-center pl-2 py-[8px] border border-cyan-500 rounded-md hover:mr-4  transition-all duration-300 ${item.friendId === sellerId ? "mr-4" : "mr-0"} `}>
									<div className='w-[40px] h-[40px] rounded-full relative overflow-hidden ring-2 ring-cyan-500 ring-offset-2'>
										<img className='w-full h-full object-cover' src={item?.image} alt={item?.sellerName} />
									</div>
									<div className='w-[10px] h-[10px] rounded-full bg-green-500 absolute bottom-2 left-[38px] z-20'></div>
									<span className='text-nowrap text-ellipsis'>{item?.sellerName}</span>
								</Link>
							))}
					</div>
				</div>

				<div className='w-[calc(100%-230px)]'>
					{currentFriend ? (
						<div className='w-full h-full'>
							<div className='flex justify-start gap-3 items-center text-slate-600 text-xl h-[50px]'>
								<div className='w-[40px] h-[40px] rounded-full relative overflow-hidden ring-2 ring-offset-2 ring-cyan-500'>
									<div className='w-[10px] h-[10px] rounded-full bg-green-500 absolute right-0 bottom-0'></div>
									<img className='w-full h-full object-cover' src={currentFriend?.image} alt='' />
								</div>
								<span className='text-base'>{currentFriend?.sellerName}</span>
							</div>
							<div className='h-[400px] w-full bg-slate-100 p-3 rounded-md'>
								<div className='w-full h-full overflow-y-auto flex flex-col gap-3'>
									{/* seller message */}
									{friendMessages.map((item, index) => {
										// * True but return false
										if (currentFriend?.friendId !== item.receiverId) {
											console.log(currentFriend.friendId, item.receiverId, "receiver");
											return (
												<div key={index} className='w-full flex gap-2 justify-start items-center text-[14px]'>
													<div className='p-2 bg-purple-500 text-white rounded-md'>
														<span>{item?.message}</span>
													</div>
													<img className='w[30px] h-[30px] rounded-full' src={"../../public/images/user.png"} alt='' />
												</div>
											);
										}
										//  True and return true
										if (sellerId === item.receiverId) {
											console.log(sellerId === item.receiverId, "sender");
											return (
												<div key={index} className='w-full flex gap-2 justify-end items-center text-[14px]'>
													<div className='p-2 bg-cyan-500 text-white rounded-md'>
														<span>{item?.message}</span>
													</div>
													<img className='w[30px] h-[30px] rounded-full' src={"../../public/images/user.png"} alt='' />
												</div>
											);
										}
									})}

									{/* user Message */}
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
						<div className='w-full h-full flex justify-center items-center text-xl font-bold  text-slate-600'>
							<span>Select seller</span>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};
export default Chat;
