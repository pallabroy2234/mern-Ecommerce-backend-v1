import Headers from "../components/Headers.jsx";
import {Link, redirect, useNavigate} from "react-router-dom";
import {MdOutlineKeyboardArrowRight} from "react-icons/md";
import Footer from "../components/Footer.jsx";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {getCartProducts} from "../store/reducers/cartReducer.js";

const Cart = () => {
    const dispatch = useDispatch();
    const {} = useSelector(state => state.cart)
    const {userInfo} = useSelector(state => state.auth)
    
    const navigate = useNavigate();
    const cardProducts = [1, 2];
    const outOfStockProducts = [1, 2];
    const redirect = () => {
        navigate("/shipping", {
            state: {
                products: [],
                price: 232,
                shippingFee: 23,
                items: 3
            }
            
        })
    }
    
    
    useEffect(() => {
        dispatch(getCartProducts({
            userId: userInfo.id
        }))
    }, []);
    
    
    return (
        <div>
            <Headers/>
            {/* Banner Section */}
            <div className="bg-[url('/images/banner/card.jpg')] h-[220px] mt-6 bg-cover bg-no-repeat relative bg-left">
                <div className="absolute left-0 top-0 w-full h-full bg-[#2422228a]">
                    <div className="wrapper h-full text-white">
                        <div className="flex flex-col justify-center gap-1 items-center h-full w-full text-white">
                            <h2 className="text-3xl sm:text-xl font-bold">Shop.my</h2>
                            <div className="flex justify-center items-center gap-2 text-2xl sm:text-sm w-full">
                                <Link to={"/"}>Home</Link>
                                <span className="pt-2"><MdOutlineKeyboardArrowRight/></span>
                                <span>Card</span>
                            </div>
                        </div>
                    
                    </div>
                </div>
            </div>
            
            
            <div className="bg-bright-gray">
                <div className="customContainer py-16">
                    {
                        cardProducts.length > 0 || outOfStockProducts.length > 0 ? (
                            <div className="flex flex-wrap">
                                {/* Left Section */}
                                <div className="w-[67%] md-lg:w-full">
                                    <div className="pr-3 md-lg:pr-0">
                                        <div className="flex flex-col gap-3">
                                            <div className="bg-white p-4 ">
                                                <h2 className="text-md text-green-500 font-semibold">Stock Products {cardProducts.length - outOfStockProducts.length}</h2>
                                            </div>
                                            {
                                                cardProducts.map((product, index) => (
                                                    <div key={index} className="flex bg-white p-4 flex-col gap-2">
                                                        <div className="flex justify-start items-center">
                                                            {/* Shop Name */}
                                                            <h2 className="text-md text-slate-600">Pallab's Fashion</h2>
                                                        </div>
                                                        {
                                                            [1, 2].map((item, index) => (
                                                                <div key={index} className="w-full flex flex-wrap  sm:mb-10">
                                                                    <div className="flex sm:w-full gap-2 w-7/12">
                                                                        <div className="flex gap-2 justify-start items-center">
                                                                            <img className="w-[80px] h-[80px] object-cover" src={`/images/products/${index + 1}.webp`} alt="product image"/>
                                                                            <div className="pr-4 text-slate-600">
                                                                                <h2 className="text-md">Long Sleeve casua Shirt for Man</h2>
                                                                                <span className="text-sm">Brand : Eazy</span>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    
                                                                    <div className="flex justify-between w-5/12 sm:w-full sm:mt-3">
                                                                        {/*  Price */}
                                                                        <div className="pl-4 sm:pl-0">
                                                                            <h2 className="text-lg text-orange-500">$12341</h2>
                                                                            <p className="line-through">$12131</p>
                                                                            <p>-10%</p>
                                                                        </div>
                                                                        {/* Quantity */}
                                                                        <div className="flex gap-2 flex-col">
                                                                            <div className="flex bg-slate-200 h-[30px] justify-center items-center text-xl">
                                                                                <div className="px-3 cursor-pointer">-</div>
                                                                                <div className="px-3">5</div>
                                                                                <div className="px-3 cursor-pointer">+</div>
                                                                            </div>
                                                                            <button className="px-5 py-[3px] bg-red-500 text-white">Delete</button>
                                                                        </div>
                                                                    
                                                                    </div>
                                                                </div>
                                                            ))
                                                        }
                                                    </div>
                                                ))
                                            }
                                            {
                                                outOfStockProducts.length > 0 && (
                                                    <div className="flex flex-col gap-3">
                                                        <div className="bg-white p-4 ">
                                                            <h2 className="text-md text-red-500 font-semibold">Out Of Stock {outOfStockProducts.length}</h2>
                                                        </div>
                                                        <div className="bg-white p-4">
                                                            {
                                                                [1, 2].map((item, index) => (
                                                                    <div key={index} className="w-full flex flex-wrap">
                                                                        <div className="flex sm:w-full gap-2 w-7/12">
                                                                            <div className="flex gap-2 justify-start items-center">
                                                                                <img className="w-[80px] h-[80px] object-cover" src={`/images/products/${index + 1}.webp`} alt="product image"/>
                                                                                <div className="pr-4 text-slate-600">
                                                                                    <h2 className="text-md">Long Sleeve casua Shirt for Man</h2>
                                                                                    <span className="text-sm">Brand : Eazy</span>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        
                                                                        <div className="flex justify-between w-5/12 sm:w-full sm:mt-3">
                                                                            {/*  Price */}
                                                                            <div className="pl-4 sm:pl-0">
                                                                                <h2 className="text-lg text-orange-500">$12341</h2>
                                                                                <p className="line-through">$12131</p>
                                                                                <p>-10%</p>
                                                                            </div>
                                                                            {/* Quantity */}
                                                                            <div className="flex gap-2 flex-col">
                                                                                <div className="flex bg-slate-200 h-[30px] justify-center items-center text-xl">
                                                                                    <div className="px-3 cursor-pointer">-</div>
                                                                                    <div className="px-3">5</div>
                                                                                    <div className="px-3 cursor-pointer">+</div>
                                                                                </div>
                                                                                <button className="px-5 py-[3px] bg-red-500 text-white">Delete</button>
                                                                            </div>
                                                                        
                                                                        </div>
                                                                    </div>
                                                                ))
                                                            }
                                                        </div>
                                                    </div>
                                                )
                                            }
                                        
                                        </div>
                                    </div>
                                </div>
                                
                                {/*  Right Section   */}
                                
                                <div className="w-[33%] md-lg:w-full">
                                    <div className="pl-3 md-lg:pl-0 md-lg:mt-5">
                                        {
                                            cardProducts.length > 0 && (
                                                <div className="bg-white p-3 text-slate-600 flex flex-col gap-3">
                                                    <h2 className="text-xl font-bold capitalize">Order Summary</h2>
                                                    <div className="flex justify-between items-center">
                                                        <span>4 Item</span>
                                                        <span>$655</span>
                                                    </div>
                                                    
                                                    <div className="flex justify-between items-center">
                                                        <span>Shipping Fee</span>
                                                        <span>$85</span>
                                                    </div>
                                                    
                                                    <div className="flex gap-2">
                                                        <input type="text" className="w-full px-3 border border-slate-200 outline-0 focus:border-orange-500 rounded-sm py-2" placeholder="Coupon"/>
                                                        <button className="px-5 py-[1px] bg-blue-500 text-white rounded-sm uppercase text-sm">Apply</button>
                                                    </div>
                                                    
                                                    <div className="flex justify-between items-center">
                                                        <span className="capitalize">Total</span>
                                                        <span className="text-lg text-orange-500 font-medium">$85</span>
                                                    </div>
                                                    <button onClick={redirect} className="px-5 py-[8px] rounded-sm hover:shadow-orange-500/20 hover:shadow-lg bg-orange-500 text-sm text-white uppercase">Process to checkout 4</button>
                                                </div>
                                            )
                                        }
                                    </div>
                                </div>
                            
                            </div>
                        ) : (
                            <div>
                                <Link to={"/shop"} className="px-4 py-2 border border-indigo-500 bg-indigo-500 text-white rounded-md hover:border hover:border-indigo-500 hover:bg-transparent hover:text-indigo-500 transition-all duration-300 ">Shop Now</Link>
                            </div>
                        )
                    }
                </div>
            </div>
            
            <Footer/>
        </div>
    )
}
export default Cart
