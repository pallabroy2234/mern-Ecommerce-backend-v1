import {GrMail} from "react-icons/gr";
import {FaFacebook, FaLinkedin, FaList, FaLock, FaUser} from "react-icons/fa";
import {AiFillGithub, AiFillHeart, AiFillShopping, AiOutlineTwitter} from "react-icons/ai";
import {MdOutlineKeyboardArrowDown} from "react-icons/md";
import {useState} from "react";
import {Link, useLocation} from "react-router-dom";
import {IoIosCall} from "react-icons/io";

const Headers = () => {
    const {pathname} = useLocation()
    const [showLanguage, setShowLanguage] = useState(false)
    const user = true
    const [showSideBar, setShowSideBar] = useState(true)
    const [showCategory, setShowCategory] = useState(true)
    const [height, setHeight] = useState()
    const [searchValue, setSearchValue] = useState("")
    const [category, setCategory] = useState()
    const wishlist = 4
    const categories = ["clothing", "sports", "phones", "laptops" , "monitors" ,"tablets", "audio" , "bags", "television"]
    
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
                      
                      <div className="md-lg:w-full w-3/12 md-lg:pt-4">
                          <div className="flex justify-between items-center">
                              <Link to="/">
                                  <img src="http://localhost:5173/images/logo.png" alt="logo"/>
                              </Link>
                              <div onClick={()=> setShowSideBar(false)} className="justify-center items-center w-[30px] h-[30px] bg-white text-slate-600 border border-slate-600 rounded-sm cursor-pointer md-lg:flex lg:hidden xl:hidden 2xl:hidden">
                                  <span><FaList/></span>
                              </div>
                          </div>
                      </div>
                      
                      
                      <div className="md-lg:w-full w-9/12">
                          <div className="flex justify-between md-lg:justify-center items-center flex-wrap pl-8">
                              <ul className="flex justify-start items-start gap-8 text-sm font-bold uppercase md-lg:hidden">
                                  <li>
                                      <Link to={"/"} className={`p-2 block ${pathname === "/" ? "text-dark-moderate-green" : "text-slate-600"}`}>Home</Link>
                                  </li>
                                  <li>
                                      <Link to={"/"} className={`p-2 block ${pathname === "/shop" ? "text-dark-moderate-green" : "text-slate-600"}`}>Shop</Link>
                                  </li>
                                  <li>
                                      <Link to={"/"} className={`p-2 block ${pathname === "/block" ? "text-dark-moderate-green" : "text-slate-600"}`}>Blog</Link>
                                  </li>
                                  <li>
                                      <Link to={"/"} className={`p-2 block ${pathname === "/about" ? "text-dark-moderate-green" : "text-slate-600"}`}>About</Link>
                                  </li>
                                  <li>
                                      <Link to={"/"} className={`p-2 block ${pathname === "/contact" ? "text-dark-moderate-green" : "text-slate-600"}`}>Contact</Link>
                                  </li>
                              </ul>
                              <div className="flex md-lg:hidden justify-center items-center gap-5">
                                  <div className="relative flex justify-center items-center cursor-pointer w-[35px] h-[35px] rounded-full bg-[#e2e2e2]">
                                      <span className="text-xl text-red-500"><AiFillHeart/></span>
                                      <div className="w-[20px] h-[20px] absolute bg-green-500 rounded-full text-white flex justify-center items-center -top-[3px] -right-[5px]">
                                          {wishlist}
                                      </div>
                                  </div>
                                  <div className="relative flex justify-center items-center cursor-pointer w-[35px] h-[35px] rounded-full bg-[#e2e2e2]">
                                      <span className="text-xl text-orange-500"><AiFillShopping/></span>
                                      <div className="w-[20px] h-[20px] absolute bg-green-500 rounded-full text-white flex justify-center items-center -top-[3px] -right-[5px]">
                                          {wishlist}
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>
                  
                  </div>
                </div>
            </div>
            
            
            {/* Small Device Navigation bar */}
           
            
            
            {/*  Category Option   */}
            <div className="customContainer  mt-3">
                <div className="flex w-full flex-wrap md-lg:gap-8">
                    <div className="w-3/12 md-lg:w-full">
                        <div className="bg-white relative">
                            <div onClick={() => setShowCategory(!showCategory)} className="h-[50px] bg-violet-400 text-white flex justify-center md-lg:justify-between md-lg:px-6 items-center gap-3 font-bold text-md cursor-pointer">
                                 <div className="flex justify-center items-center gap-3">
                                     <span><FaList/></span>
                                     <span>All Category</span>
                                 </div>
                                 <span className="pt-1"><MdOutlineKeyboardArrowDown/></span>
                             </div>
                             
                             <div className={`${showCategory ? "h-0" : "h-[400px]"} overflow-hidden  transition-all md-lg:relative duration-500 absolute z-[99999] bg-white w-full border-x`}>
                             <ul className="py-2 text-slate-600 font-medium">
                                 {
                                     categories.map((item, index) => (
                                         <li key={index} className="flex justify-start items-center px-[24px] py-[6px] border-b">
                                             <Link to="/" className="capitalize">{item}</Link>
                                         </li>
                                     ))
                                 }
                             </ul>
                             </div>
                         </div>
                    </div>
                    
                {/*  select and search Option   */}
                    <div className="w-9/12 pl-8 md-lg:pl-0 md-lg:w-full">
                        <div className="flex flex-wrap w-full justify-between items-center md-lg:gap-6">
                            <div className="w-8/12 md-lg:w-full">
                                <div className="flex border h-[50px] items-center relative gap-5">
                                    <div className="relative after:absolute after:h-[25px] after:w-[1px] after:bg-[#afafaf] after:-right-[15px] md:hidden">
                                        <select  onChange={(e)=> setCategory(e.target.value)} className="w-[170px] capitalize text-slate-600 font-semibold bg-transparent px-2 h-full outline-0 border-none cursor-pointer">
                                            <option value="">Select Categories</option>
                                            {
                                                categories.map((item, index) => (
                                                    <option key={index} value={item}>{item}</option>
                                                ))
                                            }
                                        </select>
                                    </div>
                                    <input type="text" onChange={(e)=> setSearchValue(e.target.value)} className="w-full relative bg-transparent text-slate-500 outline-0 px-3 h-full" placeholder="What do you need" />
                                    <button className="bg-violet-400 absolute right-0 px-8 h-full font-semibold uppercase text-white">Search</button>
                                </div>
                            </div>
                            
                            <div className="w-4/12 block md-lg:hidden pl-2 md-lg:w-full md-lg:p-0 ">
                                <div className="w-full flex justify-end md-lg:justify-start gap-3 items-center">
                                    <div className="w-[48px] h-[48px] rounded-full flex bg-[#f5f5f5] justify-center items-center">
                                        <span><IoIosCall/></span>
                                    </div>
                                    <div className="flex justify-end flex-col gap-1">
                                        <h2 className="text-md font-medium text-slate-700">+8801836197540</h2>
                                        <span className="text-sm">support 33/45 time</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Headers
