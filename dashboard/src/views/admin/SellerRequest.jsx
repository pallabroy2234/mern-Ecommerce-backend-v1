import {Link} from "react-router-dom";
import {FaEye} from "react-icons/fa";
import Pagination from "../Pagination.jsx";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {get_request_sellers} from "../../store/Reducers/sellerReducer.js";
import Search from "../components/Search.jsx";


const SellerRequest = () => {
    const dispatch = useDispatch();
    const {sellers, totalSellers, successMessage, errorMessage, loader} = useSelector(state => state.sellers)
    const [currentPage, setCurrentPage] = useState(1)
    const [searchValue, setSearchValue] = useState("");
    const [parPage, setParPage] = useState(5);
    const [show, setShow] = useState(false)
    
    useEffect(() => {
        const obj = {
            currentPage: parseInt(currentPage),
            parPage: parseInt(parPage),
            searchValue: searchValue
        }
        dispatch(get_request_sellers(obj))
    }, [searchValue, currentPage, parPage]);
    
    
    return (
        <div className="px-2 lg:px-7 pt-5">
            <div className="w-full bg-[#283046] p-4 rounded-md">
                {/* Search Options */}
                <Search setParPage={setParPage} searchValue={searchValue} setSearchValue={setSearchValue}/>
                
                {/* table  */}
                <div className="relative overflow-x-auto mt-3">
                    <table className="w-full text-sm text-white text-left">
                        <thead className="text-sm text-white uppercase border-slate-700 border-b">
                        <tr className="">
                            <th scope="col" className="py-2 px-4">No</th>
                            <th scope="col" className="py-2 px-4">Name</th>
                            <th scope="col" className="py-2 px-4">Email</th>
                            <th scope="col" className="py-2 px-4 whitespace-nowrap text-ellipsis">Payment Status</th>
                            <th scope="col" className="py-2 px-4">Status</th>
                            <th scope="col" className="py-2 px-4">Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            sellers?.map((item, index) => {
                                return <tr className="border-b border-slate-700" key={index}>
                                    <td scope="row" className="py-2 px-4 font-normal whitespace-nowrap">{index}</td>
                                    <td scope="row" className="py-2 px-4 font-normal whitespace-nowrap">
                                        <span>{item?.name}</span>
                                    </td>
                                    <td scope="row" className="py-2 px-4 font-normal whitespace-nowrap">
                                        <span>{item?.email}</span>
                                    </td>
                                    <td scope="row" className="py-2 px-4 font-normal whitespace-nowrap">
                                        <span>{item?.payment}</span>
                                    </td>
                                    <td scope="row" className="py-2 px-4 font-normal whitespace-nowrap">
                                        <span>{item?.status}</span>
                                    </td>
                                    <td scope="row" className="px-4 py-2 font-normal whitespace-nowrap">
                                        <div className="flex justify-start items-center gap-4">
                                            <Link to={`/admin/dashboard/seller/details/${item._id}`} className="p-[6px] bg-green-500 rounded-sm hover:shadow-lg hover:shadow-green-500/50"><FaEye/></Link>
                                        
                                        </div>
                                    </td>
                                </tr>
                            })
                        }
                        </tbody>
                    </table>
                </div>
                {
                    totalSellers <= parPage ? "": <div className="w-full flex justify-end mt-4 bottom-4 right-4">
                        <Pagination pageNumber={currentPage} setPageNumber={setCurrentPage} totalItem={totalSellers} parPage={parPage} showItem={5}/>
                    </div>
                }
            </div>
        </div>
    )
}
export default SellerRequest

