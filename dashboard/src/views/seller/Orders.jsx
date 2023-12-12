import Search from "../components/Search.jsx";
import React, {useState} from "react";
import {Link} from "react-router-dom";
import {FaEye} from "react-icons/fa";
import Pagination from "../Pagination.jsx";

const Orders = () => {
    
    const [currentPage, setCurrentPage] = useState(1)
    const [searchValue, setSearchValue] = useState("");
    const [parPage, setParPage] = useState(5);
    return (
        <div className="px-2 md:px-7 py-5">
            <div className="w-full bg-secondary p-4 rounded-md pb-4">
                {/* search */}
                <Search setParPage={setParPage} setSearchValue={setSearchValue} searchValue={searchValue}/>
                
                {/* orders   */}
                <div className="relative overflow-x-auto">
                    <table className="w-full text-sm text-white text-left">
                        <thead className="text-sm text-white uppercase border-slate-700 border-b">
                        <tr>
                            <th scope="col" className="py-3 px-4 whitespace-nowrap text-ellipsis">Order Id</th>
                            <th scope="col" className="py-3 px-4 whitespace-nowrap text-ellipsis">Price</th>
                            <th scope="col" className="py-3 px-4 whitespace-nowrap text-ellipsis">Payment Status</th>
                            <th scope="col" className="py-3 px-4 whitespace-nowrap text-ellipsis">Order Status</th>
                            <th scope="col" className="py-3 px-4 whitespace-nowrap text-ellipsis">Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            [1, 2, 3, 4, 5].map((item, index) => (
                                <tr key={index}>
                                    <td scope="row" className="px-4 py-4 font-medium whitespace-nowrap">6555021a8c3cbf2c56421e31</td>
                                    <td scope="row" className="px-4 py-4 font-medium whitespace-nowrap">$1231</td>
                                    <td scope="row" className="px-4 py-4 font-medium whitespace-nowrap">
                                        <span>Pending</span>
                                    </td>
                                    <td scope="row" className="px-4 py-4 font-medium whitespace-nowrap">
                                        <span>Pending</span>
                                    </td>
                                    <td scope="row" className="px-4 py-4 font-medium whitespace-nowrap">
                                        <Link className="p-[6px] bg-green-500 rounded-sm hover:shadow-lg hover:shadow-green-500/50 flex justify-center items-center w-[30px]"><FaEye/></Link>
                                    </td>
                                </tr>
                            ))
                        }
                        </tbody>
                    </table>
                </div>
                
                {/* pagination */}
                <div className="w-full flex justify-end mt-4 bottom-4 right-4">
                    <Pagination pageNumber={currentPage} setPageNumber={setCurrentPage} totalItem={50} parPage={parPage} showItem={5}/>
                </div>
            </div>
        </div>
    );
};

export default Orders;