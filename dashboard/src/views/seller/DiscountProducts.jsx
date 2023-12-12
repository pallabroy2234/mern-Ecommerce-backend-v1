import React, {useState} from 'react';
import Search from "../components/Search.jsx";
import {Link} from "react-router-dom";
import {FaEdit, FaEye, FaTrash} from "react-icons/fa";
import Pagination from "../Pagination.jsx";

const DiscountProducts = () => {
    
    const [currentPage, setCurrentPage] = useState(1)
    const [searchValue, setSearchValue] = useState("");
    const [parPage, setParPage] = useState(5);
    return (
        <div className="px-2 md:px-7 py-5">
            <div className="w-full bg-secondary p-4 rounded-md pb-4">
                <Search setParPage={setParPage} setSearchValue={setSearchValue} searchValue={searchValue}/>
                
                {/* table   */}
                <div className="relative overflow-x-auto mt-5">
                    <table className="w-full text-sm text-white text-left">
                        <thead className="text-sm text-white uppercase border-slate-700 border-b">
                        <tr>
                            <th scope="col" className="py-2 px-4">No</th>
                            <th scope="col" className="py-2 px-4">Images</th>
                            <th scope="col" className="py-2 px-4">Name</th>
                            <th scope="col" className="py-2 px-4">Category</th>
                            <th scope="col" className="py-2 px-4">Brand</th>
                            <th scope="col" className="py-2 px-4">Price</th>
                            <th scope="col" className="py-2 px-4">Discount</th>
                            <th scope="col" className="py-2 px-4">Stock</th>
                            <th scope="col" className="py-2 px-4">Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            [1, 2, 3, 4, 5].map((item, index) => (
                                <tr key={index}>
                                    <td scope="row" className="px-4 py-2 font-medium whitespace-nowrap">{item}</td>
                                    <td scope="row" className="px-4 py-2 font-medium whitespace-nowrap">
                                        <img className="w-[45px] h-[45px]" src={`../../../public/images/category/${item}.jpg`} alt=""/>
                                    </td>
                                    <td scope="row" className="px-4 py-2 font-medium whitespace-nowrap">
                                        <span>Men's Premium soft and comfortable</span>
                                    </td>
                                    <td scope="row" className="px-4 py-2 font-medium whitespace-nowrap">
                                        <span>Sports</span>
                                    </td>
                                    <td scope="row" className="px-4 py-2 font-medium whitespace-nowrap">
                                        <span>Easy</span>
                                    </td>
                                    <td scope="row" className="px-4 py-2 font-medium whitespace-nowrap">
                                        <span>$5454</span>
                                    </td>
                                    <td scope="row" className="px-4 py-2 font-medium whitespace-nowrap">
                                        <span>5%</span>
                                    </td>
                                    <td scope="row" className="px-4 py-2 font-medium whitespace-nowrap">
                                        <span>10</span>
                                    </td>
                                    <td scope="row" className="px-4 py-2 font-medium whitespace-nowrap">
                                        <div className="flex justify-start items-center gap-4">
                                            <Link className="p-[6px] bg-yellow-500 rounded-sm hover:shadow-lg hover:shadow-yellow-500/50"><FaEdit/></Link>
                                            <Link className="p-[6px] bg-green-500 rounded-sm hover:shadow-lg hover:shadow-green-500/50"><FaEye/></Link>
                                            <button className="p-[6px] bg-red-500 rounded-sm hover:shadow-lg hover:shadow-red-500/50">
                                                <FaTrash/>
                                            </button>
                                        </div>
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

export default DiscountProducts;