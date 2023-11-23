import {useState} from "react";
import {Link} from "react-router-dom";
import {FaEdit, FaTrash} from "react-icons/fa";
import Pagination from "../Pagination.jsx";
import {BsImage} from "react-icons/bs";
import {GrClose} from "react-icons/gr";

const Category = () => {
    const [currentPage, setCurrentPage] = useState(1)
    const [searchValue, setSearchValue] = useState("");
    const [parPage, setParPage] = useState(5);
    const [show, setShow] = useState(false)
    return (
        <div className="px-2 lg:px-7 pt-5">
            <div className="flex lg:hidden justify-between items-center mb-5 p-4 bg-[#283046] rounded-md">
                <h1 className="text-white font-semibold text-lg">Category</h1>
                <button onClick={() => setShow(true)} className="bg-indigo-500 shadow-lg hover:shadow-indigo-500/50 px-4 py-2 cursor-pointer text-white rounded-md  text-sm">Add</button>
            </div>
            
            <div className="flex flex-wrap w-full ">
                
                <div className="w-full lg:w-7/12">
                    <div className="w-full bg-[#283046] p-4 rounded-md">
                        <div className="flex justify-between items-center ">
                            <select onChange={(e) => setParPage(parseInt(e.target.value))} className="px-4 py-2 hover:border-indigo-500 border outline-none  bg-[#283046] border-slate-700 rounded-md text-white">
                                <option value="5">5</option>
                                <option value="15">15</option>
                                <option value="25">25</option>
                            </select>
                            <input type="text" placeholder="Search" className="px-4 py-2 focus:border-indigo-500 border outline-none  bg-[#283046] border-slate-700 rounded-md text-white"/>
                        </div>
                        
                        {/* table */}
                        <div className="relative overflow-x-auto mt-3">
                            <table className="w-full text-sm text-white text-left">
                                <thead className="text-sm text-white uppercase border-slate-700 border-b">
                                <tr>
                                    <th scope="col" className="py-2 px-4">No</th>
                                    <th scope="col" className="py-2 px-4">Images</th>
                                    <th scope="col" className="py-2 px-4">Name</th>
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
                                                <span>Sports</span>
                                            </td>
                                            <td scope="row" className="px-4 py-2 font-medium whitespace-nowrap">
                                                <div className="flex justify-start items-center gap-4">
                                                    <Link className="p-[6px] bg-yellow-500 rounded-sm hover:shadow-lg hover:shadow-yellow-500/50"><FaEdit/></Link>
                                                    
                                                    <Link className="p-[6px] bg-red-500 rounded-sm hover:shadow-lg hover:shadow-red-500/50"><FaTrash/></Link>
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
                            <Pagination pageNumber={currentPage} setPageNumber={setCurrentPage} totalItem={50} parPage={parPage} showItem={3}/>
                        </div>
                    </div>
                </div>
                
                {/* category input */}
                <div className={`w-[320px]  lg:w-5/12 translate-x-100 lg:relative lg:right-0  fixed ${show ? "right-0" : "-right-[340px]"} z-[999] top-0 transition-all duration-500`}>
                    <div className="w-full pl-5">
                        <div className="bg-[#283046] h-screen lg:h-auto px-3 py-2 lg:rounded-md text-white">
                            <div className="flex justify-between items-center mb-4">
                                <h1 className="text-white font-semibold  text-xl">Add Category</h1>
                                <div onClick={()=>setShow(false)} className="block lg:hidden text-white cursor-pointer">
                                    <GrClose/>
                                </div>
                            </div>
                            
                            <form>
                                <div className="flex flex-col w-full gap-4 mb-3">
                                    <label htmlFor="name">Category Name</label>
                                    <input type="text" placeholder="Category name" id="name" name="category_name" className="px-4 py-2 focus:border-indigo-500 border outline-none  bg-[#283046] border-slate-700 rounded-md text-white"/>
                                </div>
                                
                                <div>
                                    <label className="flex justify-center items-center flex-col  h-[238px] cursor-pointer border border-dashed hover:border-indigo-500 w-full border-white" htmlFor="image">
                                        <span><BsImage/></span>
                                        <span>select image</span>
                                    </label>
                                    <input type="file" name="image" id="image" className="hidden"/>
                                </div>
                                <div>
                                    <button className="bg-blue-500 w-full hover:shadow-blue-500/50 hover:shadow-lg rounded-md px-7 py-2 my-4  text-center">
                                        Add Category
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Category
