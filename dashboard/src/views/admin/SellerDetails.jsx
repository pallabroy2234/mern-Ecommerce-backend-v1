import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import {get_sellerById, messageClear, update_sellerStatus} from "../../store/Reducers/sellerReducer.js";
import toast from "react-hot-toast";
import {PropagateLoader} from "react-spinners";
import {overrideStyle} from "../../utils/utils.js";


const SellerDetails = () => {
    const dispatch = useDispatch()
    const {sellerId} = useParams()
    const {seller,stateChangeLoader, successMessage,errorMessage} =useSelector(state => state.sellers)
    
    const [status, setStatus] = useState("")
    useEffect(() => {
        dispatch(get_sellerById(sellerId))
    }, [sellerId]);
    
    
    const statusChanger = (e)=> {
        setStatus(e.target.value)
    }
    
    const statusUpdateHandler = (e)=>{
        e.preventDefault()
        dispatch(update_sellerStatus({sellerId,status}))
    }
    
    useEffect(() => {
        if(successMessage){
            toast.success(successMessage)
            dispatch(messageClear())
        }
        if(errorMessage){
            toast.error(errorMessage)
            dispatch(messageClear())
        }
    }, [successMessage,errorMessage]);
    
    useEffect(()=>{
        setStatus(seller?.status)
    },[seller])
   
    return (
        <div className="px-2 lg:px-7 pt-5">
            <div className="w-full bg-secondary  p-4 rounded-md">
                
                <div className="w-full flex flex-wrap gap-4 text-white">
                    {/*  Image  */}
                    <div className="md:w-3/12  flex justify-center items-center py-3">
                        {
                            seller?.image ?
                                <img src={seller?.image} className="w-[200px] h-[200px] object-contain" alt=""/> : <span>Image not uploaded</span>
                        }
                    </div>
                    
                    {/* Basic Info */}
                    
                    <div className="md:w-4/12 w-full">
                        <div className="px-0 md:px-5 py-2">
                            <div className="py-2 text-lg">
                                <h2>Basic Info</h2>
                            </div>
                            <div className="flex justify-between text-sm flex-col gap-2 p-4 bg-slate-800 rounded-md">
                                <div className="flex gap-2">
                                    <span>Name : </span>
                                    <span>{seller?.name}</span>
                                </div>
                                
                                <div className="flex gap-2">
                                    <span>Email : </span>
                                    <span>{seller?.email}</span>
                                </div>
                                
                                <div className="flex gap-2">
                                    <span>Role : </span>
                                    <span>{seller?.role}</span>
                                </div>
                                
                                <div className="flex gap-2">
                                    <span>Status : </span>
                                    <span>{seller?.status}</span>
                                </div>
                                
                                <div className="flex gap-2">
                                    <span>Payment Account : </span>
                                    <span>{seller?.payment}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    {/* Address */}
                    <div className="md:w-4/12 w-full">
                        <div className="px-0 md:px-5 py-2">
                            <div className="py-2 text-lg">
                                <h2>Address</h2>
                            </div>
                            <div className="flex justify-between text-sm flex-col gap-2 p-4 bg-slate-800 rounded-md">
                                
                                <div className="flex gap-2">
                                    <span>Shop Name : </span>
                                    <span>{seller?.shopInfo?.shopName}</span>
                                </div>
                                
                                <div className="flex gap-2">
                                    <span>Division : </span>
                                    <span>{seller?.shopInfo?.division}</span>
                                </div>
                                
                                <div className="flex gap-2">
                                    <span>District : </span>
                                    <span>{seller?.shopInfo?.district}</span>
                                </div>
                                
                                <div className="flex gap-2">
                                    <span>Thana : </span>
                                    <span>{seller?.shopInfo?.thana}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                {/*  Select Option */}
                <div>
                    <form className="mb-24  md:mb-0" onSubmit={statusUpdateHandler}>
                        <div className="flex gap-4 py-3 ">
                            <select name="" id="" onChange={statusChanger} value={status} className="px-4 py-2 hover:border-indigo-500 border outline-none  bg-[#283046] border-slate-700 rounded-md text-white">
                                <option value="">--Select status--</option>
                                <option value="active">Active</option>
                                <option value="deactive">Deactive</option>
                                <option value="pending">Pending</option>
                            </select>
                            <button disabled={stateChangeLoader ? true : false} className="bg-blue-500  hover:shadow-blue-500/50 hover:shadow-lg rounded-md px-8 text-white  w-[170px]  text-center">
                                    {stateChangeLoader ?
                                            <PropagateLoader color="#fff" cssOverride={overrideStyle}/> : "Submit"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
export default SellerDetails
