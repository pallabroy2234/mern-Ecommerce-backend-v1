import {Link} from "react-router-dom";
import {FaEdit, FaEye, FaTrash} from "react-icons/fa";
import Pagination from "../seller/Pagination.jsx";
import {useState} from "react";


const Sellers = () => {
    const [currentPage, setCurrentPage] = useState(1)
    const [searchValue, setSearchValue] = useState("");
    const [parPage, setParPage] = useState(5);
    const [show, setShow] = useState(false)
    
    return (
        <div  className="px-2 lg:px-7 pt-5">
         <div className="w-full bg-[#283046] p-4 rounded-md">
             {/* Search Options */}
             <div className="flex justify-between items-center ">
                 <select onChange={(e) => setParPage(parseInt(e.target.value))} className="px-4 py-2 hover:border-indigo-500 border outline-none  bg-[#283046] border-slate-700 rounded-md text-white">
                     <option value="5">5</option>
                     <option value="15">15</option>
                     <option value="25">25</option>
                 </select>
                 <input type="text" placeholder="Search" className="px-4 py-2 focus:border-indigo-500 border outline-none  bg-[#283046] border-slate-700 rounded-md text-white"/>
             </div>
             
             {/* table  */}
             <div className="relative overflow-x-auto mt-3">
                 <table className="w-full text-sm text-white text-left">
                     <thead className="text-sm text-white uppercase border-slate-700 border-b">
                     <tr>
                         <th scope="col" className="py-2 px-4">No</th>
                         <th scope="col" className="py-2 px-4">Images</th>
                         <th scope="col" className="py-2 px-4">Name</th>
                         <th scope="col" className="py-2 px-4">Shop Name</th>
                         <th scope="col" className="py-2 px-4">Payment Status</th>
                         <th scope="col" className="py-2 px-4">Email</th>
                         <th scope="col" className="py-2 px-4">Division</th>
                         <th scope="col" className="py-2 px-4">District</th>
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
                                     <span>Pallab Roy</span>
                                 </td>
                                 <td scope="row" className="px-4 py-2 font-medium whitespace-nowrap">
                                     <span>Pallab Fashion</span>
                                 </td>
                                 <td scope="row" className="px-4 py-2 font-medium whitespace-nowrap">
                                     <span>pending</span>
                                 </td>
                                 <td scope="row" className="px-4 py-2 font-medium whitespace-nowrap">
                                     <span>pallab@gamil.com</span>
                                 </td>
                                 <td scope="row" className="px-4 py-2 font-medium whitespace-nowrap">
                                     <span>Rangpur</span>
                                 </td>
                                 <td scope="row" className="px-4 py-2 font-medium whitespace-nowrap">
                                     <span>Thakurgaon</span>
                                 </td>
                                 <td scope="row" className="px-4 py-2 font-medium whitespace-nowrap">
                                     <div className="flex justify-start items-center gap-4">
                                         <Link className="p-[6px] bg-green-500 rounded-sm hover:shadow-lg hover:shadow-green-500/50"><FaEye/></Link>
                                         
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
    )
}
export default Sellers
