

const OrderDetails = () => {
    return (
        <div className="px-2 lg:px-7 pt-5">
           <div className="w-full bg-[#283046] p-4 rounded-md">
               <div className="flex justify-between items-center p-4">
                <h2 className="text-xl text-white">Order Details</h2>
                   <select name="" id="" className="px-4 py-2 hover:border-indigo-500 border outline-none  bg-[#283046] border-slate-700 rounded-md text-white">
                       <option value="">pending</option>
                       <option value="">processing</option>
                       <option value="">warehouse</option>
                       <option value="">placed</option>
                       <option value="">cancelled</option>
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
                                       <h2 className="pb-2 font-semibold">Deliver  to: Pallab Roy Tushar</h2>
                                      <p><span className="text-sm">Rangupr, Thakurgaon Shantinagar. House no: 1231</span></p>
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
                       
                       
                       <div className="w-[68%]">
                            <div className="pl-3">
                                 <div className="mt-4 flex flex-col">
                                      {/* seller 1 */}
                                      <div className="text-white mb-3">
                                         <div className="flex justify-start items-center gap-3">
                                             <h2>Seller 1 order : </h2>
                                             <span>pending</span>
                                         </div>
                                          {/* product 1 */}
                                          <div className="flex gap-3 text-md mt-3">
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
                                      
                                     {/* seller -2 */}
                                     <div className="text-white mb-3">
                                         <div className="flex justify-start items-center gap-3">
                                             <h2>Seller 2 order : </h2>
                                             <span>pending</span>
                                         </div>
                                         {/* product 1 */}
                                         <div className="flex gap-3 text-md mt-3">
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
