import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {FaEdit, FaTrash} from "react-icons/fa";
import Pagination from "../Pagination.jsx";
import {BsImage} from "react-icons/bs";
import {GrClose} from "react-icons/gr";
import {PropagateLoader} from "react-spinners";
import {overrideStyle} from "../../utils/utils.js";
import {useDispatch, useSelector} from "react-redux";
import {categoryAdd, messageClear, get_categories, stateClear} from "../../store/Reducers/categoryReducer.js";
import toast from "react-hot-toast";
import Search from "../components/Search.jsx";


const Category = () => {
    const dispatch = useDispatch()
    const {loader ,successMessage,errorMessage,categories,totalCategories}= useSelector((state)=> state.category)
    const [currentPage, setCurrentPage] = useState(1)
    const [searchValue, setSearchValue] = useState("");
    const [parPage, setParPage] = useState(10);
    const [show, setShow] = useState(false);
   const [imageShow,setImageShow]=useState("");
    
    
    const [state, setState] = useState({
        name: "",
        image: "",
    })
    
    const imageHandle= (e)=> {
        let file = e.target.files
        if(file.length> 0){
            setImageShow(URL.createObjectURL(file[0]));
            setState({
                ...state,
                image:file[0]
            })
        }
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(categoryAdd(state));
    }
    
    
    useEffect(() => {
        if (successMessage) {
            toast.success(successMessage);
            dispatch(messageClear());
           setState({name: "",image:""})
            setImageShow("")
        }
        if (errorMessage) {
            toast.error(errorMessage);
            dispatch(messageClear());
        }
    }, [successMessage,errorMessage]);
    
    
    useEffect(()=> {
         const obj = {
             page:parseInt(currentPage),
             parPage:parseInt(parPage),
                searchValue,
         }
         dispatch(get_categories(obj))
    },[searchValue,currentPage,parPage])

    
    return (
        <div className="px-2 lg:px-7 pt-5">
            <div className="flex lg:hidden justify-between items-center mb-5 p-4 bg-[#283046] rounded-md">
                <h1 className="text-white font-semibold text-lg">Category</h1>
                <button onClick={() => setShow(true)} className="bg-indigo-500 shadow-lg hover:shadow-indigo-500/50 px-4 py-2 cursor-pointer text-white rounded-md  text-sm">Add</button>
            </div>
            
            <div className="flex flex-wrap w-full ">
                
                <div className="w-full lg:w-7/12">
                    <div className="w-full bg-[#283046] p-4 rounded-md">
                        <Search setParPage={setParPage} searchValue={searchValue} setSearchValue={setSearchValue}/>
                        
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
                                    categories?.map((item,index)=> {
                                       return (
                                           <tr key={index}>
                                               <td scope="row" className="px-4 py-2 font-medium whitespace-nowrap">{index + 1}</td>
                                               <td scope="row" className="px-4 py-2 font-medium whitespace-nowrap">
                                                   <img className="w-[45px] h-[45px] object-contain" src={item?.image} alt={item?.name}/>
                                               </td>
                                               <td scope="row" className="px-4 py-2 font-medium whitespace-nowrap">
                                                   <span>{item?.name}</span>
                                               </td>
                                               <td scope="row" className="px-4 py-2 font-medium whitespace-nowrap">
                                                   <div className="flex justify-start items-center gap-4">
                                                       <Link className="p-[6px] bg-yellow-500 rounded-sm hover:shadow-lg hover:shadow-yellow-500/50"><FaEdit/></Link>
                                                       
                                                       <Link className="p-[6px] bg-red-500 rounded-sm hover:shadow-lg hover:shadow-red-500/50"><FaTrash/></Link>
                                                   </div>
                                               </td>
                                           </tr>
                                       )
                                   })
                                }
                                </tbody>
                            </table>
                        </div>
                        
                        {/* pagination */}
                        <div className="w-full flex justify-end mt-4 bottom-4 right-4">
                            <Pagination pageNumber={currentPage} setPageNumber={setCurrentPage} totalItem={totalCategories} parPage={parPage} showItem={3}/>
                        </div>
                    </div>
                </div>
                
                {/* category input */}
                <div className={`w-[320px]  lg:w-5/12 translate-x-100 lg:relative lg:right-0  fixed ${show ? "right-0" : "-right-[340px]"} z-[999] top-0 transition-all duration-500`}>
                    <div className="w-full pl-5">
                        <div className="bg-[#283046] h-screen lg:h-auto px-3 py-2 lg:rounded-md text-white">
                            <div className="flex justify-between items-center mb-4">
                                <h1 className="text-white font-semibold  text-xl">Add Category</h1>
                                <div onClick={() => setShow(false)} className="block lg:hidden text-white cursor-pointer">
                                    <GrClose/>
                                </div>
                            </div>
                            
                            <form onSubmit={handleSubmit}>
                                <div className="flex flex-col w-full gap-4 mb-3">
                                    <label htmlFor="name">Category Name</label>
                                    <input onChange={(e)=> setState({...state,name:e.target.value})} value={state.name} required type="text" placeholder="Category name" id="name"  className="px-4 py-2 focus:border-indigo-500 border outline-none  bg-[#283046] border-slate-700 rounded-md text-white"/>
                                </div>
                                
                                <div>
                                    
                                    <label className="flex justify-center items-center flex-col  h-[238px] cursor-pointer border border-dashed hover:border-indigo-500 w-full border-white" htmlFor="image">
                                        {
                                            imageShow ? <img className="w-full h-full object-contain" src={imageShow} alt=""/> : <>
                                                <span><BsImage/></span>
                                                <span>select image</span>
                                            </>
                                        }
                                    </label>
                                    
                                    <input onChange={imageHandle} required  type="file" id="image" className="hidden"/>
                                </div>
                                <div>
                                    <button  type="submit" className="w-full mt-6 py-2 mb-3 text-lg bg-blue-500 rounded-md hover:shadow-blue-500/20 hover:shadow-lg px-7 py7">
                                        {loader ?
                                            <PropagateLoader color="#fff" cssOverride={overrideStyle}/> : "Add Category"}
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
