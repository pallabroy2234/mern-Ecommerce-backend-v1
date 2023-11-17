import Header from "./Header.jsx";
import Sidebar from "./Sidebar.jsx";
import {Outlet} from "react-router-dom";
import {useState} from "react";

const MainLayout = () => {
    const [showSidebar, setShowSidebar] = useState(false)
    return (
        <div className="bg-[#161d31]  w-full min-h-screen ">
            <Header showSidebar={showSidebar} setShowSidebar={setShowSidebar}/>
            <Sidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar}/>
            <div className="ml-0 lg:ml-[260px] pt-[95px] transition-all">
                <Outlet/>
            </div>
        </div>
    )
}
export default MainLayout
