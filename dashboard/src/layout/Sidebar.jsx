import {Link, useLocation} from "react-router-dom";
import {useEffect, useState} from "react";
import {getNavs} from "../navigation/index.jsx";
import {BiLogOutCircle} from "react-icons/bi";

const Sidebar = ({showSidebar, setShowSidebar}) => {
    const {pathname} = useLocation()
    const [allNav, setAllNav] = useState("")
    
    useEffect(() => {
        const navs = getNavs("seller")
        setAllNav(navs)
    }, []);

    return (
        <div>
            <div onClick={() => setShowSidebar(!showSidebar)} className={`fixed duration-200 ${showSidebar ? "visible" : "invisible"} w-screen h-screen bg-[#22292f80] top-0 left-0  z-10`}></div>
            <div className={`w-[260px] fixed bg-[#283046] z-50 top-0 h-screen shadow-[0_0_15px_0_rgb(34_41_47_/_5%)] transition-all ${showSidebar ? "left-0" : "-left-[260px] lg:left-0"}`}>
                {/* Logo */}
                <div className="h-[70px] flex justify-center items-center">
                    <Link to={"/"} className="w-[180px] h-[50px]">
                        <img className="w-full h-full" src="http://localhost:5173/public/images/logo.png" alt=""/>
                    </Link>
                </div>
                
                <div className="px-[16px]">
                    <ul>
                        {
                            allNav && allNav.map((item) => (
                                <li key={item.id}>
                                    <Link className={`${pathname === item.path ? "bg-slate-600 shadow-indigo-500/30 text-white duration-500" : "text-white font-normal duration-200"} px-[12px] py-[9px] flex justify-start  items-center gap-[16px] hover:pl-4 transition-all w-full mb-1 `} to={item.path}>
                                        <span>{item.icon}</span>
                                        <span>{item.title}</span>
                                    </Link>
                                </li>
                            ))
                        }
                        <li>
                            <button className="text-white font-normal duration-200 px-[12px] py-[9px] flex justify-start  items-center gap-[16px] hover:pl-4 transition-all w-full mb-1">
                                <span>
                                    <BiLogOutCircle/>
                                </span>
                                <span>
                                    Log Out
                                </span>
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}
export default Sidebar
