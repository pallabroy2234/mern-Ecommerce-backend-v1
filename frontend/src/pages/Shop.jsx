import Headers from "../components/Headers.jsx";
import {Link} from "react-router-dom";
import {MdOutlineKeyboardArrowRight} from "react-icons/md";
import Footer from "../components/Footer.jsx";
import {useState} from "react";
import {retry} from "@reduxjs/toolkit/query";


const Shop = () => {
    const [filter, setFilter] = useState(true)
    const categories = ["clothing", "sports", "phones", "laptops" , "monitors" ,"tablets", "audio" , "bags", "television"]
    
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
                        <div className={`w-3/12 md-lg:w-4/12 md:w-full pr-8 ${filter ? 'md:h-0 md:overflow-hidden md:mb-6' : 'md:h-auto md:overflow-auto md:mb-0'}`}>
                            <h2 className="text-2xl font-bold mb-3 text-slate-600">Category</h2>
                            <div className="py-2">
                                {
                                    categories.map((category,index)=> (
                                   <div key={index} className="flex justify-start items-center gap-2 py-1">
                                            <input type="checkbox" id={category} className="cursor-pointer"/>
                                            <label htmlFor={category} className="text-slate-600 block cursor-pointer capitalize">{category}</label>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    
                    </div>
                </div>
            </div>
            
            <Footer/>
        </div>
    )
}
export default Shop
