import Header from "./Header.jsx";
import Sidebar from "./Sidebar.jsx";
import {Outlet} from "react-router-dom";
import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {socket} from "../utils/utils.js";

const MainLayout = () => {
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
