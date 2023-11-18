import {useState} from "react";
import {BsArrowBarDown} from "react-icons/bs";
import {Link} from "react-router-dom";
import Pagination from "../seller/Pagination.jsx";


const Orders = () => {
    const [currentPage, setCurrentPage] = useState(1)
    const [searchValue, setSearchValue] = useState("");
    const [parPage, setParPage] = useState(5);
    const [show, setShow] = useState(false)
    
    return (
        <div className="px-2 lg:px-7 pt-5">
            <div className="w-full bg-[#283046] p-4 rounded-md">
                {/* search Option */}
                <div className="flex justify-between items-center">
                    <select onChange={(e) => setParPage(parseInt(e.target.value))} className="px-4 py-2 hover:border-indigo-500 border outline-none  bg-[#283046] border-slate-700 rounded-md text-white">
                        <option value="5">5</option>
                        <option value="15">15</option>
                        <option value="25">25</option>
                    </select>
                    <input type="text" placeholder="Search" className="px-4 py-2 focus:border-indigo-500 border outline-none  bg-[#283046] border-slate-700 rounded-md text-white"/>
                </div>
                
                {/*  Order items   */}
                <div className="relative mt-10 overflow-x-auto">
                    <div className="w-full text-sm text-left text-white">
                        {/* table Heading */}
                        <div className="text-sm text-white uppercase border-b  border-slate-700">
                            <div className="flex justify-between items-start">
                                <div className="py-3 w-[25%]">Order Id</div>
                                <div className="py-3 w-[13%]">Price</div>
                                <div className="py-3 w-[18%]">Payment Status</div>
                                <div className="py-3 w-[18%]">Order Status</div>
                                <div className="py-3 w-[18%]">Action</div>
                                <div className="py-3 w-[8%]"><BsArrowBarDown/></div>
                            </div>
                        </div>
                        {/* Table Body */}
                        <div>
                            <div className="flex justify-between items-start border-b border-slate-700">
                                <div className="py-4 w-[25%] font-medium whitespace-nowrap">6555021a8c3cbf2c56421e31</div>
                                <div className="py-4 w-[13%]">$560</div>
                                <div className="py-4 w-[18%]">pending</div>
                                <div className="py-4 w-[18%]">pending</div>
                                <div className="py-4 w-[18%]"><Link>View</Link></div>
                                <div className="py-4 w-[8%] cursor-pointer" onClick={() => setShow(!show)}>
                                    <BsArrowBarDown/></div>
                            </div>
                            {/* sub order */}
                            <div className={`${show ? "block border-b border-slate-700 bg-slate-800 rounded" : "hidden"}`}>
                                <div className="flex justify-start items-start border-b border-slate-700">
                                    <div className="py-4 w-[25%] font-medium whitespace-nowrap pl-3">6555021a8c3cbf2c56421e31</div>
                                    <div className="py-4 w-[13%]">$560</div>
                                    <div className="py-4 w-[18%]">pending</div>
                                    <div className="py-4 w-[18%]">pending</div>
                                </div>
                            </div>
                            
                            {/*main */}
                            <div className="flex justify-between items-start border-b border-slate-700">
                                <div className="py-4 w-[25%] font-medium whitespace-nowrap">6555021a8c3cbf2c56421e31</div>
                                <div className="py-4 w-[13%]">$560</div>
                                <div className="py-4 w-[18%]">pending</div>
                                <div className="py-4 w-[18%]">pending</div>
                                <div className="py-4 w-[18%]"><Link>View</Link></div>
                                <div className="py-4 w-[8%] cursor-pointer" onClick={() => setShow(!show)}>
                                    <BsArrowBarDown/></div>
                            </div>
                            {/* sub order */}
                            <div className={`${show ? "block border-b border-slate-700 bg-slate-800 rounded" : "hidden"}`}>
                                <div className="flex justify-start items-start border-b border-slate-700">
                                    <div className="py-4 w-[25%] font-medium whitespace-nowrap pl-3">6555021a8c3cbf2c56421e31</div>
                                    <div className="py-4 w-[13%]">$560</div>
                                    <div className="py-4 w-[18%]">pending</div>
                                    <div className="py-4 w-[18%]">pending</div>
                                </div>
                            </div>
                            
                            
                            {/*main */}
                            <div className="flex justify-between items-start border-b border-slate-700">
                                <div className="py-4 w-[25%] font-medium whitespace-nowrap">6555021a8c3cbf2c56421e31</div>
                                <div className="py-4 w-[13%]">$560</div>
                                <div className="py-4 w-[18%]">pending</div>
                                <div className="py-4 w-[18%]">pending</div>
                                <div className="py-4 w-[18%]"><Link>View</Link></div>
                                <div className="py-4 w-[8%] cursor-pointer" onClick={() => setShow(!show)}>
                                    <BsArrowBarDown/></div>
                            </div>
                            {/* sub order */}
                            <div className={`${show ? "block border-b border-slate-700 bg-slate-800 rounded" : "hidden"}`}>
                                <div className="flex justify-start items-start border-b border-slate-700">
                                    <div className="py-4 w-[25%] font-medium whitespace-nowrap pl-3">6555021a8c3cbf2c56421e31</div>
                                    <div className="py-4 w-[13%]">$560</div>
                                    <div className="py-4 w-[18%]">pending</div>
                                    <div className="py-4 w-[18%]">pending</div>
                                </div>
                            </div>
                            
                            
                            {/*main */}
                            <div className="flex justify-between items-start border-b border-slate-700">
                                <div className="py-4 w-[25%] font-medium whitespace-nowrap">6555021a8c3cbf2c56421e31</div>
                                <div className="py-4 w-[13%]">$560</div>
                                <div className="py-4 w-[18%]">pending</div>
                                <div className="py-4 w-[18%]">pending</div>
                                <div className="py-4 w-[18%]"><Link>View</Link></div>
                                <div className="py-4 w-[8%] cursor-pointer" onClick={() => setShow(!show)}>
                                    <BsArrowBarDown/></div>
                            </div>
                            {/* sub order */}
                            <div className={`${show ? "block border-b border-slate-700 bg-slate-800 rounded" : "hidden"}`}>
                                <div className="flex justify-start items-start border-b border-slate-700">
                                    <div className="py-4 w-[25%] font-medium whitespace-nowrap pl-3">6555021a8c3cbf2c56421e31</div>
                                    <div className="py-4 w-[13%]">$560</div>
                                    <div className="py-4 w-[18%]">pending</div>
                                    <div className="py-4 w-[18%]">pending</div>
                                </div>
                            </div>
                            
                            
                            {/*main */}
                            <div className="flex justify-between items-start border-b border-slate-700">
                                <div className="py-4 w-[25%] font-medium whitespace-nowrap">6555021a8c3cbf2c56421e31</div>
                                <div className="py-4 w-[13%]">$560</div>
                                <div className="py-4 w-[18%]">pending</div>
                                <div className="py-4 w-[18%]">pending</div>
                                <div className="py-4 w-[18%]"><Link>View</Link></div>
                                <div className="py-4 w-[8%] cursor-pointer" onClick={() => setShow(!show)}>
                                    <BsArrowBarDown/></div>
                            </div>
                            {/* sub order */}
                            <div className={`${show ? "block border-b border-slate-700 bg-slate-800 rounded" : "hidden"}`}>
                                <div className="flex justify-start items-start border-b border-slate-700">
                                    <div className="py-4 w-[25%] font-medium whitespace-nowrap pl-3">6555021a8c3cbf2c56421e31</div>
                                    <div className="py-4 w-[13%]">$560</div>
                                    <div className="py-4 w-[18%]">pending</div>
                                    <div className="py-4 w-[18%]">pending</div>
                                </div>
                            </div>
                            
                            
                            {/*main */}
                            <div className="flex justify-between items-start border-b border-slate-700">
                                <div className="py-4 w-[25%] font-medium whitespace-nowrap">6555021a8c3cbf2c56421e31</div>
                                <div className="py-4 w-[13%]">$560</div>
                                <div className="py-4 w-[18%]">pending</div>
                                <div className="py-4 w-[18%]">pending</div>
                                <div className="py-4 w-[18%]"><Link>View</Link></div>
                                <div className="py-4 w-[8%] cursor-pointer" onClick={() => setShow(!show)}>
                                    <BsArrowBarDown/></div>
                            </div>
                            {/* sub order */}
                            <div className={`${show ? "block border-b border-slate-700 bg-slate-800 rounded" : "hidden"}`}>
                                <div className="flex justify-start items-start border-b border-slate-700">
                                    <div className="py-4 w-[25%] font-medium whitespace-nowrap pl-3">6555021a8c3cbf2c56421e31</div>
                                    <div className="py-4 w-[13%]">$560</div>
                                    <div className="py-4 w-[18%]">pending</div>
                                    <div className="py-4 w-[18%]">pending</div>
                                </div>
                            </div>
                            
                            
                            {/*main */}
                            <div className="flex justify-between items-start border-b border-slate-700">
                                <div className="py-4 w-[25%] font-medium whitespace-nowrap">6555021a8c3cbf2c56421e31</div>
                                <div className="py-4 w-[13%]">$560</div>
                                <div className="py-4 w-[18%]">pending</div>
                                <div className="py-4 w-[18%]">pending</div>
                                <div className="py-4 w-[18%]"><Link>View</Link></div>
                                <div className="py-4 w-[8%] cursor-pointer" onClick={() => setShow(!show)}>
                                    <BsArrowBarDown/></div>
                            </div>
                            {/* sub order */}
                            <div className={`${show ? "block border-b border-slate-700 bg-slate-800 rounded" : "hidden"}`}>
                                <div className="flex justify-start items-start border-b border-slate-700">
                                    <div className="py-4 w-[25%] font-medium whitespace-nowrap pl-3">6555021a8c3cbf2c56421e31</div>
                                    <div className="py-4 w-[13%]">$560</div>
                                    <div className="py-4 w-[18%]">pending</div>
                                    <div className="py-4 w-[18%]">pending</div>
                                </div>
                            </div>
                            
                            
                            {/*main */}
                            <div className="flex justify-between items-start border-b border-slate-700">
                                <div className="py-4 w-[25%] font-medium whitespace-nowrap">6555021a8c3cbf2c56421e31</div>
                                <div className="py-4 w-[13%]">$560</div>
                                <div className="py-4 w-[18%]">pending</div>
                                <div className="py-4 w-[18%]">pending</div>
                                <div className="py-4 w-[18%]"><Link>View</Link></div>
                                <div className="py-4 w-[8%] cursor-pointer" onClick={() => setShow(!show)}>
                                    <BsArrowBarDown/></div>
                            </div>
                            {/* sub order */}
                            <div className={`${show ? "block border-b border-slate-700 bg-slate-800 rounded" : "hidden"}`}>
                                <div className="flex justify-start items-start border-b border-slate-700">
                                    <div className="py-4 w-[25%] font-medium whitespace-nowrap pl-3">6555021a8c3cbf2c56421e31</div>
                                    <div className="py-4 w-[13%]">$560</div>
                                    <div className="py-4 w-[18%]">pending</div>
                                    <div className="py-4 w-[18%]">pending</div>
                                </div>
                            </div>
                            
                            
                            {/*main */}
                            <div className="flex justify-between items-start border-b border-slate-700">
                                <div className="py-4 w-[25%] font-medium whitespace-nowrap">6555021a8c3cbf2c56421e31</div>
                                <div className="py-4 w-[13%]">$560</div>
                                <div className="py-4 w-[18%]">pending</div>
                                <div className="py-4 w-[18%]">pending</div>
                                <div className="py-4 w-[18%]"><Link>View</Link></div>
                                <div className="py-4 w-[8%] cursor-pointer" onClick={() => setShow(!show)}>
                                    <BsArrowBarDown/></div>
                            </div>
                            {/* sub order */}
                            <div className={`${show ? "block border-b border-slate-700 bg-slate-800 rounded" : "hidden"}`}>
                                <div className="flex justify-start items-start border-b border-slate-700">
                                    <div className="py-4 w-[25%] font-medium whitespace-nowrap pl-3">6555021a8c3cbf2c56421e31</div>
                                    <div className="py-4 w-[13%]">$560</div>
                                    <div className="py-4 w-[18%]">pending</div>
                                    <div className="py-4 w-[18%]">pending</div>
                                </div>
                            </div>
                            
                            
                            {/*main */}
                            <div className="flex justify-between items-start border-b border-slate-700">
                                <div className="py-4 w-[25%] font-medium whitespace-nowrap">6555021a8c3cbf2c56421e31</div>
                                <div className="py-4 w-[13%]">$560</div>
                                <div className="py-4 w-[18%]">pending</div>
                                <div className="py-4 w-[18%]">pending</div>
                                <div className="py-4 w-[18%]"><Link>View</Link></div>
                                <div className="py-4 w-[8%] cursor-pointer" onClick={() => setShow(!show)}>
                                    <BsArrowBarDown/></div>
                            </div>
                            {/* sub order */}
                            <div className={`${show ? "block border-b border-slate-700 bg-slate-800 rounded" : "hidden"}`}>
                                <div className="flex justify-start items-start border-b border-slate-700">
                                    <div className="py-4 w-[25%] font-medium whitespace-nowrap pl-3">6555021a8c3cbf2c56421e31</div>
                                    <div className="py-4 w-[13%]">$560</div>
                                    <div className="py-4 w-[18%]">pending</div>
                                    <div className="py-4 w-[18%]">pending</div>
                                </div>
                            </div>
                        </div>
                    </div>
                
                
                </div>
                
                {/* pagination   */}
                <div className="w-full flex justify-end mt-4 bottom-4 right-4">
                    <Pagination pageNumber={currentPage} setPageNumber={setCurrentPage} totalItem={50} parPage={parPage} showItem={4}/>
                </div>
            </div>
        
        
        </div>)
}
export default Orders
