import {useState} from "react";
import {IoMdClose} from "react-icons/io";


const ChatSeller = () => {
    const [show, setShow] = useState(true)
    
    return (
        <div className="px-2 lg:px-7 pt-5">
            <div className="w-full bg-secondary px-4 py-4 rounded-md h-[calc(100vh-140px)]">
              <div className="flex w-full h-full relative">
                  {/* Side Bar */}
                  <div className={`w-[300px] h-full absolute z-10 ${show ? "-left-[16px] ": "-left-[336PX]"} md:left-0 md:relative transition-all`}>
                      <div className="w-full h-[calc(100vh-177px)] bg-[#252b3b] md:bg-transparent overflow-y-auto ">
                        <div className="flex text-xl justify-between items-center p-4 md:p-0 md:px-3 md:pb-3 text-white">
                            <h1>Sellers</h1>
                            <span onClick={()=> setShow(false)} className="block cursor-pointer md:hidden "><IoMdClose/></span>
                        </div>
                          
                          <div className={`h-[60px] flex justify-start gap-2 items-center text-white px-2 py-2 mb-2 rounded-sm cursor-pointer`}>
                               <div className="relative">
                                   <img className="w-[50px] h-[50px] border-white border-2 max-w-[55px] p-[2px] rounded-full" src="http://localhost:5173//public/images/admin.jpg"  alt=""/>
                                   <div className="w-[10px] h-[10px] bg-green-500 rounded-full absolute right-1 bottom-1"></div>
                               </div>
                                 <div className="flex flex-col justify-center items-start w-full">
                                       <div className="flex flex-col justify-center items-start w-full">
                                           <h2 className="text-base font-semibold">Pallab Roy Tushar</h2>
                                       </div>
                                 </div>
                          </div>
                          
                          
                          <div className={`h-[60px] flex justify-start gap-2 items-center text-white px-2 py-2 mb-2 rounded-sm cursor-pointer`}>
                              <div className="relative">
                                  <img className="w-[50px] h-[50px] border-white border-2 max-w-[55px] p-[2px] rounded-full" src="http://localhost:5173//public/images/admin.jpg"  alt=""/>
                                  <div className="w-[10px] h-[10px] bg-green-500 rounded-full absolute right-1 bottom-1"></div>
                              </div>
                              <div className="flex flex-col justify-center items-start w-full">
                                  <div className="flex flex-col justify-center items-start w-full">
                                      <h2 className="text-base font-semibold">Pallab Roy Tushar</h2>
                                  </div>
                              </div>
                          </div>
                          
                          
                          
                          <div className={`h-[60px] flex justify-start gap-2 items-center text-white px-2 py-2 mb-2 rounded-sm cursor-pointer`}>
                              <div className="relative">
                                  <img className="w-[50px] h-[50px] border-white border-2 max-w-[55px] p-[2px] rounded-full" src="http://localhost:5173//public/images/admin.jpg"  alt=""/>
                                  <div className="w-[10px] h-[10px] bg-green-500 rounded-full absolute right-1 bottom-1"></div>
                              </div>
                              <div className="flex flex-col justify-center items-start w-full">
                                  <div className="flex flex-col justify-center items-start w-full">
                                      <h2 className="text-base font-semibold">Pallab Roy Tushar</h2>
                                  </div>
                              </div>
                          </div>
                          
                          
                          <div className={`h-[60px] flex justify-start gap-2 items-center text-white px-2 py-2 mb-2 rounded-sm cursor-pointer`}>
                              <div className="relative">
                                  <img className="w-[50px] h-[50px] border-white border-2 max-w-[55px] p-[2px] rounded-full" src="http://localhost:5173//public/images/admin.jpg"  alt=""/>
                                  <div className="w-[10px] h-[10px] bg-green-500 rounded-full absolute right-1 bottom-1"></div>
                              </div>
                              <div className="flex flex-col justify-center items-start w-full">
                                  <div className="flex flex-col justify-center items-start w-full">
                                      <h2 className="text-base font-semibold">Pallab Roy Tushar</h2>
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
export default ChatSeller
