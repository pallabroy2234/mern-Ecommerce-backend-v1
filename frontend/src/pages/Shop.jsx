import Headers from "../components/Headers.jsx";
import {Link} from "react-router-dom";
import {MdOutlineKeyboardArrowRight} from "react-icons/md";
import Footer from "../components/Footer.jsx";
import {useState} from "react";
import {Range} from "react-range";
import {AiFillStar} from "react-icons/ai";
import {CiStar} from "react-icons/ci";
import Products from "../components/products/Products.jsx";


const Shop = () => {
    const [filter, setFilter] = useState(true)
    const categories = ["clothing", "sports", "phones", "laptops" , "monitors" ,"tablets", "audio" , "bags", "television"]
    const [state, setState] = useState({
        values: [50, 2000],
    })
    return (
        <div className="w-full">
            <Headers/>
            <div className="bg-[url('/images/banner/shop.gif')] h-[220px] mt-6 bg-cover bg-no-repeat relative bg-left">
                <div className="absolute left-0 top-0 w-full h-full bg-[#2422228a]">
                    <div className="wrapper h-full text-white">
                        <div className="flex flex-col justify-center gap-1 items-center h-full w-full text-white">
                            <h2 className="text-3xl sm:text-xl font-bold">Shop.my</h2>
                            <div className="flex justify-center items-center gap-2 text-2xl sm:text-sm w-full">
                                <Link to={"/"}>Home</Link>
                                <span className="pt-1"><MdOutlineKeyboardArrowRight/></span>
                                <span>Products</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Filter Section */}
            <div className="py-16">
                <div className="wrapper">
                    <div className={`md:block hidden ${!filter ? "mb-6" : "mb-0"}`}>
                        <button onClick={() => setFilter(!filter)} className="text-center w-full py-2 px-3 bg-indigo-500 text-white">Filter Product</button>
                    </div>
                    <div className="w-full flex flex-wrap">
                        {/* Category  */}
                        <div className={`w-3/12 md-lg:w-4/12 md:w-full pr-8  ${filter ? 'md:h-0 md:overflow-hidden md:mb-6' : 'md:h-auto  md:overflow-auto md:mb-0'}`}>
                            <h2 className="text-2xl font-bold mb-3 text-slate-600">Category</h2>
                            
                            <div className="py-2">
                                {
                                    categories.map((category, index) => (
                                        <div key={index} className="flex justify-start items-center gap-2 py-1">
                                            <input type="checkbox" id={category} className="cursor-pointer"/>
                                            <label htmlFor={category} className="text-slate-600 block cursor-pointer capitalize">{category}</label>
                                        </div>
                                    ))
                                }
                            </div>
                            
                            {/* Range */}
                            <div className="py-2 flex flex-col gap-3">
                                <h2 className="text-2xl font-bold mb-3 text-slate-600">Price</h2>
                                <Range
                                    step={5}
                                    min={50}
                                    max={2000}
                                    values={state.values}
                                    onChange={values => setState({values})}
                                    renderTrack={({props, children})=> (
                                    <div {...props} className="w-full h-[6px] bg-slate-200 rounded-full cursor-pointer">
                                        {children}
                                    </div>
                                ) }
                                    renderThumb={({props})=> (
                                    <div {...props} className="w-5 h-5 bg-indigo-500 rounded-full cursor-pointer focus:outline-0"/>
                                    )}
                                />
                                <div>
                                    <span className=" font-bold text-lg">${Math.floor(state.values[0])} - ${Math.floor(state.values[1])}</span>
                                </div>
                            </div>
                            
                        {/* Ratting   */}
                            <div className="py-3 flex flex-col gap-4">
                                <h2 className="text-2xl font-bold mb-3 text-slate-600">Ratting</h2>
                                <div className="flex flex-col gap-3">
                                    <div className="flex flex-row text-orange-500 justify-start items-center gap-2 text-xl cursor-pointer">
                                        <span><AiFillStar/></span>
                                        <span><AiFillStar/></span>
                                        <span><AiFillStar/></span>
                                        <span><AiFillStar/></span>
                                        <span><AiFillStar/></span>
                                    </div>
                                    <div className="flex flex-row text-orange-500 justify-start items-center gap-2 text-xl cursor-pointer">
                                        <span><AiFillStar/></span>
                                        <span><AiFillStar/></span>
                                        <span><AiFillStar/></span>
                                        <span><AiFillStar/></span>
                                        <span><CiStar/></span>
                                    </div>
                                    <div className="flex flex-row text-orange-500 justify-start items-center gap-2 text-xl cursor-pointer">
                                        <span><AiFillStar/></span>
                                        <span><AiFillStar/></span>
                                        <span><AiFillStar/></span>
                                        <span><CiStar/></span>
                                        <span><CiStar/></span>
                                    </div>
                                    <div className="flex flex-row text-orange-500 justify-start items-center gap-2 text-xl cursor-pointer">
                                        <span><AiFillStar/></span>
                                        <span><AiFillStar/></span>
                                        <span><CiStar/></span>
                                        <span><CiStar/></span>
                                        <span><CiStar/></span>
                                    </div>
                                    <div className="flex flex-row text-orange-500 justify-start items-center gap-2 text-xl cursor-pointer">
                                        <span><AiFillStar/></span>
                                        <span><CiStar/></span>
                                        <span><CiStar/></span>
                                        <span><CiStar/></span>
                                        <span><CiStar/></span>
                                    </div>
                                    <div className="flex flex-row text-orange-500 justify-start items-center gap-2 text-xl cursor-pointer">
                                        <span><CiStar/></span>
                                        <span><CiStar/></span>
                                        <span><CiStar/></span>
                                        <span><CiStar/></span>
                                        <span><CiStar/></span>
                                    </div>
                                </div>
                            </div>
                        
                        {/* Latest Product    */}
                         <div className="py-5 flex flex-col gap-4 md-lg:hidden">
                             <Products title={"Latest Product"}/>
                         </div>
                        </div>
                    
                        
                        
                    {/*  All Products    */}
                    
                    </div>
                </div>
            </div>
            
            <Footer/>
        </div>
    
    )
}
export default Shop
