import Headers from "../components/Headers.jsx";
import {Link} from "react-router-dom";
import {MdOutlineKeyboardArrowRight} from "react-icons/md";
import Footer from "../components/Footer.jsx";
import {useEffect, useState} from "react";
import {Range} from "react-range";
import {AiFillStar} from "react-icons/ai";
import {CiStar} from "react-icons/ci";
import Products from "../components/products/Products.jsx";
import {BsFillGridFill} from "react-icons/bs";
import {FaThList} from "react-icons/fa";
import ShopProduct from "../components/products/ShopProduct.jsx";
import Pagination from "../components/Pagination.jsx";
import {useDispatch, useSelector} from "react-redux";
import {getPriceRangeLatestProduct} from "../store/reducers/homeReducer.js";


const Shop = () => {
    const {categories} = useSelector(state => state.home)
    const dispatch = useDispatch();
    
    
    
    const [filter, setFilter] = useState(true)
    // const categories = ["clothing", "sports", "phones", "laptops", "monitors", "tablets", "audio", "bags", "television"]
    // const [state, setState] = useState({
    //     values: [50, 2000],
    // })
    
    const [priceRange, setPriceRange] = useState({
        values: [50, 2000],
    })
    
    const [style, setStyle] = useState("grid")
    const [pageNumber, setPageNumber] = useState(1)
    const [parPage, setParPage] = useState(3)
    
    
    // ! Fetching Price Range and Latest Product
    useEffect(() => {
        dispatch(getPriceRangeLatestProduct())
    }, []);
    
    
    
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
                            
                            <div className="py-2 max-h-[400px] overflow-y-auto mb-2">
                                {
                                  categories &&  categories.map((category, index) => (
                                        <div key={index} className="flex justify-start items-center gap-2 py-1">
                                            <input type="checkbox" id={category.name} className="cursor-pointer"/>
                                            <label htmlFor={category.name} className="text-slate-600 block cursor-pointer capitalize">{category.name}</label>
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
                                    renderTrack={({props, children}) => (
                                        <div {...props} className="w-full h-[6px] bg-slate-200 rounded-full cursor-pointer">
                                            {children}
                                        </div>
                                    )}
                                    renderThumb={({props}) => (
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
                                {/*<Products title={"Latest Product"}/>*/}
                            </div>
                        </div>
                        
                        
                        {/*  All Products    */}
                        <div className="w-9/12 md-lg:w-8/12 md:w-full">
                            <div className="pl-8 md:pl-0">
                                {/* All Product Heading */}
                                <div className="py-4 bg-white mb-10 px-3 rounded-md flex justify-between items-center border">
                                    <h2 className="text-lg sm:text-sm font-medium  text-slate-600">All Product</h2>
                                    <div className="flex justify-center items-center gap-3">
                                        <select name="" defaultValue={"sort by"} id="" className="p-1 border sm:text-sm outline-0 text-slate-600 font-semibold ">
                                            <option  value="sort by">Sort By</option>
                                            <option value="low to high price">Low to High Price</option>
                                            <option value="high to low price">High to Low Price</option>
                                        </select>
                                        {/*  Grid view and List view option   */}
                                        <div className="flex justify-center items-center gap-4 md-lg:hidden">
                                            <div onClick={() => setStyle("grid")} className={`p-2 ${style === "grid" && "bg-slate-300"} text-slate-600 hover:bg-slate-300 cursor-pointer rounded-sm`}>
                                                <BsFillGridFill/></div>
                                            <div onClick={() => setStyle("list")} className={`p-2 ${style === "list" && "bg-slate-300"} text-slate-600 hover:bg-slate-300 cursor-pointer rounded-sm`}>
                                                <FaThList/></div>
                                        </div>
                                    </div>
                                </div>
                                
                                {/*  Product Grid and list view   */}
                                <div className="pb-8">
                                    <ShopProduct style={style}/>
                                </div>
                                <div className="my-3">
                                    <Pagination pageNumber={pageNumber} setPageNumber={setPageNumber} totalItem={20} parPage={parPage} showItem={Math.floor(20 / 3)}/>
                                </div>
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
