import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {
    getAdminOrderDetails,
    getSellerOrderDetails,
    messageClear,
    updateAdminOrderStatus, updateSellerOrderStatus
} from "../../store/Reducers/orderReducer.js";
import toast from "react-hot-toast";


const OrderDetails = () => {
    const {orderId} = useParams();
    const dispatch = useDispatch();
    const {userInfo} = useSelector((state) => state.auth);
    const {order, successMessage, errorMessage} = useSelector((state) => state.order);
    const [status, setStatus] = useState("");
    
    console.log(orderId);
    
    useEffect(() => {
        if (userInfo) {
            dispatch(getSellerOrderDetails(orderId));
        }
    }, [orderId]);
    
    // const handleTruncText = (text) => {
    //     if (text.length > 40) {
    //         return text.slice(0, 40) + "...";
    //     }
    //     return name;
    // };
    
    useEffect(() => {
        if (order) {
            setStatus(order?.deliveryStatus);
        }
    }, [order]);
    
    const handleChangeStatus = (e) => {
        dispatch(updateSellerOrderStatus({orderId, info: {status: e.target.value}}));
        setStatus(e.target.value);
    };
    
    useEffect(() => {
        if (successMessage) {
            toast.success(successMessage);
            dispatch(messageClear());
        }
        if (errorMessage) {
            toast.error(errorMessage);
            dispatch(messageClear());
        }
        
    }, [successMessage, errorMessage]);
    
    
    
    return (
        <div className="px-2 lg:px-7 pt-5">
            <div className="w-full bg-[#283046] p-4 rounded-md">
                <div className="flex justify-between items-center p-4">
                    <h2 className="text-xl text-white">Order Details</h2>
                    <select onChange={(e)=> handleChangeStatus(e)} value={status} name="" id="" className="px-4 py-2 hover:border-indigo-500 border outline-none  bg-[#283046] border-slate-700 rounded-md text-white">
                        <option value="pending">pending</option>
                        <option value="processing">processing</option>
                        <option value="warehouse">warehouse</option>
                        <option value="cancelled">cancelled</option>
                    </select>
                </div>
                
                <div className="p-4">
                    <div className="flex gap-2 text-lg text-white">
                        <h2>#102719832917</h2>
                        <span>23 Nov 2023</span>
                    </div>
                    <div className="flex  flex-wrap">
                        <div className="w-[32%]">
                            <div className="pr-3 text-white text-lg">
                                
                                <div className="flex flex-col gap-2">
                                    <h2 className="pb-2 font-semibold">Deliver  to: Warehouse</h2>
                                </div>
                                
                                <div className="flex justify-start items-center gap-3">
                                    <h2>Payment status : </h2>
                                    <span className="text-base my-2">paid</span>
                                </div>
                                <span>Price : $12312</span>
                                <div className="mt-4 flex flex-col gap-4">
                                    <div className="text-white space-y-3">
                                        
                                        {/* Product -  1 */}
                                        <div className="flex gap-3 text-md">
                                            <img className="w-[70x] h-[70px]" src="http://localhost:5173/public/images/category/1.jpg" alt=""/>
                                            <div>
                                                <h2>Long T-shirt</h2>
                                                <p >
                                                    <span>Brand : </span>
                                                    <span>Easy </span>
                                                    <span  className="text-lg">Quantity : 2</span>
                                                </p>
                                            </div>
                                        </div>
                                        
                                        {/* Product -  2 */}
                                        
                                        <div className="flex gap-3 text-md">
                                            <img className="w-[70x] h-[70px]" src="http://localhost:5173/public/images/category/1.jpg" alt=""/>
                                            <div>
                                                <h2>Long T-shirt</h2>
                                                <p >
                                                    <span>Brand : </span>
                                                    <span>Easy </span>
                                                    <span  className="text-lg">Quantity : 2</span>
                                                </p>
                                            </div>
                                        </div>
                                        
                                        
                                        {/* Product -  3 */}
                                        
                                        <div className="flex gap-3 text-md">
                                            <img className="w-[70x] h-[70px]" src="http://localhost:5173/public/images/category/1.jpg" alt=""/>
                                            <div>
                                                <h2>Long T-shirt</h2>
                                                <p >
                                                    <span>Brand : </span>
                                                    <span>Easy </span>
                                                    <span  className="text-lg">Quantity : 2</span>
                                                </p>
                                            </div>
                                        </div>
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
export default OrderDetails
