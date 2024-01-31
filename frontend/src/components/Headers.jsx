import {GrMail} from "react-icons/gr";
import {FaFacebook, FaLinkedin, FaLock, FaUser} from "react-icons/fa";
import {AiFillGithub, AiOutlineTwitter} from "react-icons/ai";
import {MdOutlineKeyboardArrowDown} from "react-icons/md";
import {useState} from "react";
import {Link} from "react-router-dom";

const Headers = () => {
    const [showLanguage, setShowLanguage] = useState(false)
    const user = true
    
    
    return (
        <div className="w-full bg-white">
            
            {/* Top Header  */}
            <div className="header-top bg-bright-gray md-lg:hidden">
                <div className="w-[85%] lg:w-[90%] mx-auto">
                    <div className="flex w-full justify-between items-center h-[50px] text-slate-500">
                        <ul className="flex justify-start items-center gap-8">
                            <li className="flex justify-center items-center gap-2  text-sm relative after:absolute after:h-[18px] after:w-[1px] after:bg-[#afafaf] after:-right-[16px]">
                                <span className="mt-1"><GrMail/></span>
                                <span>pallabtushar2234@gmail.com</span>
                            </li>
                            <li>Multi vendor E-commerce</li>
                        </ul>
                        
                        <div>
                            <div className="flex justify-center items-center gap-10">
                                <div className="flex justify-center items-center gap-4">
                                    <a href="#"><FaFacebook/></a>
                                    <a href="#"><AiOutlineTwitter/></a>
                                    <a href="#"><FaLinkedin/></a>
                                    <a href="#"><AiFillGithub/></a>
                                </div>
                                <div className="flex cursor-pointer text-slate-800 text-sm relative  justify-center items-center gap-1 border-x-[1.5px] border-[#afafaf] px-5" onClick={()=> setShowLanguage(!showLanguage)}>
                                    <img src="http://localhost:5173/images/language.png" alt=""/>
                                    <span><MdOutlineKeyboardArrowDown/></span>
                                        <ul className={`${showLanguage ? "visible top-8 transition-all duration-300" : "invisible"} z-10 absolute  top-12 rounded-sm  text-white p-2 w-[100px] flex flex-col gap-3 bg-black`}>
                                        <li>Bangla</li>
                                        <li>English</li>
                                    </ul>
                                </div>
                                {
                                    user ? <Link className="flex cursor-pointer justify-center items-center gap-2 text-sm" to="/dashboard">
                                         <span><FaUser/></span>
                                         <span>Pallab Roy Tushar</span>
                                    </Link>: <div className="flex cursor-pointer justify-center items-center gap-2 text-sm">
                                        <span><FaLock/></span>
                                        <span>Login</span>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Navigation Header */}
            <div className="bg-white">
                <div className="w-[85%] lg:w-[90%] mx-auto">
                  <div className="h-[80px] md-lg:h-[100px] flex justify-between items-center flex-wrap">
                  
                  </div>
                </div>
            </div>
        </div>
    )
}
export default Headers
