import React, {forwardRef} from 'react';
import {BsCurrencyDollar} from "react-icons/bs";
import {FixedSizeList as List} from "react-window";


const handleOnWheel = ({deltaY}) => {
    console.log("handleOnWheel", deltaY)
}

const outerElementType = forwardRef((props, ref) => (
    <div ref={ref} onWheel={handleOnWheel} {...props}></div>
))

const Payments = () => {
    
    const Row = ({index, style}) => {
        return (
            <div style={style} className="flex text-sm">
                <div className="w-[25%] p-2 whitespace-nowrap">{index + 1}</div>
                <div className="w-[25%] p-2 whitespace-nowrap">$1212</div>
                <div className="w-[25%] p-2 whitespace-nowrap">
                    <span className="py-[1px] px-[5px] bg-slate-700 text-blue-500 rounded-md text-xs">pending</span>
                </div>
                <div className="w-[25%] p-2 whitespace-nowrap">19 Nov 2023</div>
            </div>
        )
    }
    
    
    return (
        <div className="px-2 md:px-7 py-5">
            {/* card */}
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-7 mb-5">
                {/* column-1 */}
                <div className="flex justify-between items-center p-5 bg-[#283046] rounded-md gap-3">
                    <div className="flex flex-col justify-start items-start text-white">
                        <h2 className="text-lg font-bold mb-2">$6543</h2>
                        <span className="text-sm font-normal">Total Sales</span>
                    </div>
                    <div className="w-[46px] h-[47px] rounded-full bg-[#28c76f1f] flex justify-center items-center text-xl">
                        <BsCurrencyDollar className="text-[#28c76f] shadow-lg"/>
                    </div>
                </div>
                
                {/* column -2 */}
                <div className="flex justify-between items-center p-5 bg-[#283046] rounded-md gap-3">
                    <div className="flex flex-col justify-start items-start text-white">
                        <h2 className="text-lg font-bold mb-2">$20</h2>
                        <span className="text-sm font-normal">Available Amount</span>
                    </div>
                    <div className="w-[46px] h-[47px] rounded-full bg-[#e000e81f] flex justify-center items-center text-xl">
                        <BsCurrencyDollar className="text-[#cd00e8] shadow-lg"/>
                    </div>
                </div>
                
                {/* column -3 */}
                <div className="flex justify-between items-center p-5 bg-[#283046] rounded-md gap-3">
                    <div className="flex flex-col justify-start items-start text-white">
                        <h2 className="text-lg font-bold mb-2">$50</h2>
                        <span className="text-sm font-normal">Withdraw Amount</span>
                    </div>
                    <div className="w-[46px] h-[47px] rounded-full bg-[#00cfe81f] flex justify-center items-center text-xl">
                        <BsCurrencyDollar className="text-[#00cfe8] shadow-lg"/>
                    </div>
                </div>
                
                {/* column -4 */}
                <div className="flex justify-between items-center p-5 bg-[#283046] rounded-md gap-3">
                    <div className="flex flex-col justify-start items-start text-white">
                        <h2 className="text-lg font-bold mb-2">$12</h2>
                        <span className="text-sm font-normal">Pending Amount</span>
                    </div>
                    <div className="w-[46px] h-[47px] rounded-full bg-[#7367f01f] flex justify-center items-center text-xl">
                        <BsCurrencyDollar className="text-[#7367f0] shadow-lg"/>
                    </div>
                </div>
            </div>
            
        {/* send Request and success withdraw  */}
            <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-3 pb-4">
                
                <div className="bg-secondary text-white rounded-md p-5">
                    <h2 className="text-lg">Send Request</h2>
                    <div className="pt-5">
                        <form>
                            <div className="flex gap-3 flex-wrap">
                                <input type="number" min="0" className="md:w-[79%] px-4 py-2 hover:border-indigo-500 border outline-none  bg-[#283046] border-slate-700 rounded-md text-white" name="amount"/>
                                <button type="submit" className="bg-indigo-500  hover:shadow-blue-500/50 hover:shadow-lg rounded-md px-8 py-2 text-sm">
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                    
                    {/* pending request   */}
                    <div>
                        <h2 className="text-lg pb-4 text-white pt-4">Pending Request</h2>
                        <div className="w-full overflow-x-auto text-white">
                            <div className="flex bg-[#161d31] uppercase min-w-[340px]">
                                <div className="w-[25%] p-2 text-white">No</div>
                                <div className="w-[25%] p-2 text-white">Amount</div>
                                <div className="w-[25%] p-2 text-white">Status</div>
                                <div className="w-[25%] p-2 text-white">Date</div>
                            </div>
                            {
                                <List style={{
                                    minWidth: "340px",
                                }} className="List" height={450} itemCount={100} itemSize={35} outerElementType={outerElementType}>
                                    {Row}
                                </List>
                            }
                        </div>
                    </div>
                </div>
                
                {/* Success withdraw section */}
                <div className="bg-secondary text-white rounded-md p-5">
                    <div>
                        <h2 className="text-lg pb-4 text-white">Success Withdraw</h2>
                        <div className="w-full overflow-x-auto text-white">
                            <div className="flex bg-[#161d31] uppercase min-w-[340px]">
                                <div className="w-[25%] p-2 text-white">No</div>
                                <div className="w-[25%] p-2 text-white">Amount</div>
                                <div className="w-[25%] p-2 text-white">Status</div>
                                <div className="w-[25%] p-2 text-white">Date</div>
                            </div>
                            {
                                <List style={{
                                    minWidth: "340px",
                                    overflowY: "auto"
                                }} className="List" height={550} itemCount={100} itemSize={35} outerElementType={outerElementType}>
                                    {Row}
                                </List>
                            }
                        </div>
                    </div>
                </div>
            
            </div>
        
        
        </div>
    );
};

export default Payments;