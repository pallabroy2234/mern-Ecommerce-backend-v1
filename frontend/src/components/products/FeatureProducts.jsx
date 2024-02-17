import React from 'react'
import {Link} from "react-router-dom";
import {AiFillHeart, AiOutlineShoppingCart} from "react-icons/ai";
import {FaEye} from "react-icons/fa";
import Rattings from "../Rattings.jsx";

const FeatureProducts = () => {
    return (
        <div className="customContainer">
            <div className="w-full">
                <div className="text-center flex justify-center items-center flex-col text-4xl text-slate-600 font-bold relative pb-[45px]">
                    <h2>Feature Products</h2>
                    <div className="w-[100px] h-[4px] bg-dark-moderate-green mt-[4px]"></div>
                </div>
            </div>
            
            <div className="w-full grid 3xl:grid-cols-6 2xl:grid-cols-5  xl:grid-cols-5 lg:grid-cols-4 md-lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-5">
                {
                    [1, 2, 3, 4, 5, 6, 7].map((item, index) => (
                        <div key={index} className="group border transition-all duration-300 shadow-md hover:-translate-y-2  z-50 rounded-md">
                            {/* Product Image and Link */}
                            <div className="relative overflow-hidden">
                                <div className="z-50 flex justify-center items-center absolute text-white w-[38px] h-[38px] rounded-full bg-red-500 font-semibold text-xs left-2 top-2">6%</div>
                                <div className="sm:w-full w-full ">
                                    <img className="w-full h-full object-fill" src={`images/products/${index + 1}.webp`} alt="produtImage"/>
                                </div>
                                <ul className="z-50 flex transition-all duration-300 -bottom-10 justify-center items-center gap-3 absolute w-full group-hover:bottom-3 ">
                                    <li className="w-[38px] h-[38px] cursor-pointer bg-white flex justify-center items-center rounded-full hover:bg-dark-moderate-green hover:text-white hover:rotate-[720deg] transition-all duration-200">
                                        <AiFillHeart/>
                                    </li>
                                    <Link to="/product/details/asdjf" className="w-[38px] h-[38px] cursor-pointer bg-white flex justify-center items-center rounded-full hover:bg-dark-moderate-green hover:text-white hover:rotate-[720deg] transition-all duration-200">
                                        <FaEye/>
                                    </Link>
                                    <li className="w-[38px] h-[38px] cursor-pointer bg-white flex justify-center items-center rounded-full hover:bg-dark-moderate-green hover:text-white hover:rotate-[720deg] transition-all duration-200">
                                        <AiOutlineShoppingCart/>
                                    </li>
                                </ul>
                                <div className="z-40 absolute w-full h-full top-0 bottom-0 left-0 right-0 bg-black  opacity-0 group-hover:opacity-20 transition-all"></div>
                            </div>
                            
                            {/* Product Content */}
                            <div className="py-3 text-slate-600 px-2">
                                <h2>HH Fashion Long Sleeve ocean blue Shirt for men</h2>
                                <div className="flex justify-start items-center gap-3">
                                    <span className="text-lg font-bold">$654</span>
                                    <div className="flex">
                                        <Rattings rattings={4.5}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}
export default FeatureProducts
