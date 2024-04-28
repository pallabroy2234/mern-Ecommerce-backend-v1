import Search from "../components/Search.jsx";
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {FaEdit, FaEye, FaTrash} from "react-icons/fa";
import Pagination from "../Pagination.jsx";
import {useDispatch, useSelector} from "react-redux";
import { get_products} from "../../store/Reducers/productReducer.js";
import {GiKnightBanner} from "react-icons/gi";


const Products = () => {
    const dispatch = useDispatch();
    const {products, totalProducts} = useSelector(state => state.product);
    const [currentPage, setCurrentPage] = useState(1)
    const [searchValue, setSearchValue] = useState("");
    const [parPage, setParPage] = useState(10);
    
    
    useEffect(() => {
        const obj ={
            parPage:parseInt(parPage),
            page:parseInt(currentPage),
            searchValue,
        }
        dispatch(get_products(obj))
    }, [searchValue,currentPage,parPage]);
    
    
    
    return (
        <div className="px-2 md:px-7 py-5">
            <div className="w-full bg-secondary p-4 rounded-md pb-4">
                <Search setParPage={setParPage} setSearchValue={setSearchValue} searchValue={searchValue}/>
                
                {/* table   */}
                <div className="relative overflow-x-auto mt-5 max-h-[75vh] overflow-y-auto">
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
                            products?.map((item, index) => (
                                <tr key={index}>
                                    <td scope="row" className="px-4 py-2 font-medium whitespace-nowrap">{index + 1}</td>
                                    <td scope="row" className="px-4 py-2 font-medium whitespace-nowrap">
                                        <img className="w-[45px] h-[45px] object-contain" src={item?.images[0]?.url} alt={item?.name}/>
                                    </td>
                                    <td scope="row" className="px-4 py-2 font-medium whitespace-nowrap">
                                        {item?.name.length > 30 ? (
                                            <span title={item?.name}>{item?.name.slice(0, 30)}...</span>
                                        ) : (
                                            <span title={item?.name}>{item?.name}</span>
                                        )}
                                    </td>
                                    <td scope="row" className="px-4 py-2 font-medium whitespace-nowrap">
                                        <span>{item?.category}</span>
                                    </td>
                                    <td scope="row" className="px-4 py-2 font-medium whitespace-nowrap">
                                        <span>{item?.brand}</span>
                                    </td>
                                    <td scope="row" className="px-4 py-2 font-medium whitespace-nowrap">
                                        <span>${item?.price}</span>
                                    </td>
                                    <td scope="row" className="px-4 py-2 font-medium whitespace-nowrap">
                                        {
                                            item?.discount === 0 ? <span>No discount</span> : <span>{item?.discount}%</span>
                                        }
                                    </td>
                                    <td scope="row" className="px-4 py-2 font-medium whitespace-nowrap">
                                        <span>{item?.stock}</span>
                                    </td>
                                    <td scope="row" className="px-4 py-2 font-medium whitespace-nowrap">
                                        <div className="flex justify-start items-center gap-4">
                                            <Link to={`/seller/dashboard/edit-product/${item?._id}`} className="p-[6px] bg-yellow-500 rounded-sm hover:shadow-lg hover:shadow-yellow-500/50"><FaEdit/></Link>
                                            <div className="p-[6px] bg-green-500 rounded-sm hover:shadow-lg hover:shadow-yellow-500/50"><FaEye/></div>
                                            <button className="p-[6px] bg-red-500 rounded-sm hover:shadow-lg hover:shadow-red-500/50">
                                                <FaTrash/>
                                            </button>
                                            <Link to={`/seller/dashboard/add-banner/${item?._id}`} className="p-[6px] bg-cyan-500 rounded-sm hover:shadow-lg hover:shadow-cyan-500/50">
                                                <GiKnightBanner/>
                                            </Link>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        }
                        </tbody>
                    </table>
                </div>
                
                {/* pagination */}
                {
                    totalProducts <= parPage ? "": (
                        <div className="w-full flex justify-end mt-4 bottom-4 right-4">
                            <Pagination pageNumber={currentPage} setPageNumber={setCurrentPage} totalItem={totalProducts} parPage={parPage} showItem={5}/>
                        </div>
                    )
                }
            </div>
        </div>
    );
};

export default Products;