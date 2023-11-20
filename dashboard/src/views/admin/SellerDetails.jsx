const SellerDetails = () => {
    return (
        <div className="px-2 lg:px-7 pt-5">
            <div className="w-full bg-secondary  p-4 rounded-md">
                
                <div className="w-full flex flex-wrap text-white">
                    {/*  Image  */}
                    <div className="w-3/12 flex justify-center items-center py-3">
                        <div className="">
                            <img src="http://localhost:5173/public/images/admin.jpg" className="w-full h-[230px]" alt=""/>
                        </div>
                    </div>
                    
                    {/* Basic Info */}
                    
                    <div className="w-4/12">
                        <div className="px-0 md:px-5 py-2">
                            <div className="py-2 text-lg">
                                <h2>Basic Info</h2>
                            </div>
                            <div className="flex justify-between text-sm flex-col gap-2 p-4 bg-slate-800 rounded-md">
                                <div className="flex gap-2">
                                    <span>Name : </span>
                                    <span>Pallab Roy Tushar</span>
                                </div>
                                
                                <div className="flex gap-2">
                                    <span>Email : </span>
                                    <span>pallab@gmail.com</span>
                                </div>
                                
                                <div className="flex gap-2">
                                    <span>Role : </span>
                                    <span>Seller</span>
                                </div>
                                
                                <div className="flex gap-2">
                                    <span>Status : </span>
                                    <span>Pending</span>
                                </div>
                                
                                <div className="flex gap-2">
                                    <span>Payment Account : </span>
                                    <span>Deactive</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    {/* Address */}
                    <div className="w-4/12">
                        <div className="px-0 md:px-5 py-2">
                            <div className="py-2 text-lg">
                                <h2>Address</h2>
                            </div>
                            <div className="flex justify-between text-sm flex-col gap-2 p-4 bg-slate-800 rounded-md">
                                
                                <div className="flex gap-2">
                                    <span>Shop Name : </span>
                                    <span>Pallab Fashion</span>
                                </div>
                                
                                <div className="flex gap-2">
                                    <span>Division : </span>
                                    <span>Rangpur</span>
                                </div>
                                
                                <div className="flex gap-2">
                                    <span>District : </span>
                                    <span>Thakurgaon</span>
                                </div>
                                
                                <div className="flex gap-2">
                                    <span>Sub District : </span>
                                    <span>Shantinagar</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                {/*  Select Option */}
                <div>
                    <form>
                        <div className="flex gap-4 py-3 ">
                            <select name="" id="" className="px-4 py-2 hover:border-indigo-500 border outline-none  bg-[#283046] border-slate-700 rounded-md text-white">
                                <option value="">--Select status--</option>
                                <option value="">Active</option>
                                <option value="">Deactive</option>
                            </select>
                            <button className="bg-blue-500  hover:shadow-blue-500/50 hover:shadow-lg rounded-md px-8 text-white  w-[170px]  text-center">
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
export default SellerDetails
