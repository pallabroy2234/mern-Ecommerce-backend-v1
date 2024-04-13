import Header from "./Header.jsx";
import Sidebar from "./Sidebar.jsx";
import {Outlet} from "react-router-dom";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {socket} from "../utils/utils.js";
import {updateActiveAdminStatus, updateSellers, updateUser} from "../store/Reducers/chatReducer.js";

const MainLayout = () => {
	const dispatch = useDispatch()
	const {userInfo} = useSelector(state => state.auth);
	const [showSidebar, setShowSidebar] = useState(false);
	//
	
	useEffect(() => {
	     if (userInfo && userInfo.role === "seller"){
			 socket.emit("addSeller", userInfo._id, userInfo)
		 }else if(userInfo && userInfo.role === "admin"){
			 socket.emit("addAdmin", userInfo)
		 }
	}, [userInfo]);
	
	useEffect(() => {
		socket.on("active-user", (user)=> {
			dispatch(updateUser(user))
		})
		socket.on("active-seller", (sellers)=> {
			dispatch(updateSellers(sellers))
		})
		socket.on("active-admin", (data)=> {
			dispatch(updateActiveAdminStatus(data))
		})
	}, []);
	
	
	
	return (
		<div className="bg-[#161d31]  w-full min-h-screen ">
			<Header showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
			<Sidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
			<div className="ml-0 lg:ml-[260px] pt-[95px] transition-all">
				<Outlet />
			</div>
		</div>
	);
};
export default MainLayout;
