import Footer from "../components/Footer.jsx";
import Headers from "../components/Headers.jsx";
import {Link} from "react-router-dom";
import {MdOutlineKeyboardArrowRight} from "react-icons/md";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import {GoArrowLeft, GoArrowRight} from "react-icons/go";
import {useState} from "react";
import Rattings from "../components/Rattings.jsx";
import {AiFillGithub, AiFillHeart, AiOutlineTwitter} from "react-icons/ai";
import {FaFacebookF, FaLinkedin} from "react-icons/fa";


const Details = () => {
    
    const [image, setImage] = useState("")
    
    const responsive = {
        superLargeDesktop: {
            breakpoint: {max: 4000, min: 3000},
            items: 5,
        },
        desktop: {
            breakpoint: {max: 3000, min: 1024},
            items: 5,
        },
        tablet: {
            breakpoint: {max: 1024, min: 464},
            items: 3,
            // optional, default to 1.
        },
        mdTablet: {
            breakpoint: {max: 991, min: 464},
            items: 3,
            // optional, default to 1.
        },
        mobile: {
            breakpoint: {max: 768, min: 0},
            items: 4,
            // optional, default to 1.
        },
        smMobile: {
            breakpoint: {max: 640, min: 0},
            items: 3,
            // optional, default to 1.
        },
        xsMobile: {
            breakpoint: {max: 440, min: 0},
            items: 2,
            // optional, default to 1.
        }
        
    };
    
    const CustomLeftArrow = ({onClick}) => {
        return (
            <button className="bg-transparent border border-black hover:bg-black/50 hover:border-0 hover:text-white text-black w-[40px] h-[40px] text-lg flex justify-center items-center absolute top-1/2 left-2 transform -translate-y-1/2" onClick={() => onClick()}>
                <GoArrowLeft/>
            </button>
        )
    }
    
    const CustomRightArrow = ({onClick}) => {
        return (
            <button className="bg-transparent border border-black hover:bg-black/50 hover:border-0 hover:text-white text-black w-[40px] h-[40px] text-lg flex justify-center items-center absolute top-1/2 right-2 transform -translate-y-1/2" onClick={() => onClick()}>
                <GoArrowRight/>
            </button>
        )
    }
    
    const images = [2, 3, 4, 2, 5, 7, 8]
    const discount = 5
    const stock = 10
    
    return (
        <div>
            <Headers/>
            {/* Banner Section */}
            <div className="bg-[url('/images/banner/order.jpg')] h-[220px] mt-6 bg-cover bg-no-repeat relative bg-left">
                <div className="absolute left-0 top-0 w-full h-full bg-[#2422228a]">
                    <div className="wrapper h-full text-white">
                        <div className="flex flex-col justify-center gap-1 items-center h-full w-full text-white">
                            <h2 className="text-3xl sm:text-xl font-bold">Shop.my</h2>
                        </div>
                    
                    </div>
                </div>
            </div>
            
            
            <div className="bg-slate-100 py-5 mb-5">
                <div className="customContainer">
                    {/* Product Details */}
                    <div className="flex justify-start items-center text-md text-slate-600 w-full">
                        <Link to={"/"}>Home</Link>
                        <span className="pt-1"><MdOutlineKeyboardArrowRight/></span>
                        <Link to={"/"}>Sports</Link>
                        <span className="pt-1"><MdOutlineKeyboardArrowRight/></span>
                        <Link className="whitespace-nowrap text-ellipsis overflow-hidden" to={"/"}>Long Sleeve casua Shirt for man</Link>
                    </div>
                </div>
            </div>
            
            {/* Product and product details section  */}
            <section className="customContainer pb-16">
                <div className="grid grid-cols-2  md:grid-cols-1 gap-8">
                    <div className="">
                        <div className="p-5 border ">
                            <div className="h-[450px]">
                                <img className="w-full h-full object-contain" src={image ? `/images/products/${image}.jpg` : `/images/products/${images[3]}.jpg`} alt=""/>
                            </div>
                        </div>
                        
                        <div className="py-3">
                            {
                                images && <Carousel
                                    autoPlay={true}
                                    infinite={true}
                                    responsive={responsive}
                                    transitionDuration={500}
                                    mouseTracking={false}
                                    keyBoardControl={false}
                                    customLeftArrow={<CustomLeftArrow/>}
                                    customRightArrow={<CustomRightArrow/>}
                                >
                                    {
                                        images.map((item, index) => (
                                            <div onClick={() => setImage(item)} key={index} className={`w-[100px] h-[100px]  gap-6 ${item === image ? "border border-black transition-all duration-300" : ""}`}>
                                                <img src={`/images/products/${item}.jpg`} className={`w-full h-full object-contain cursor-pointer ${item === image ? "scale-[0.8] transition-all duration-300" : ""}`} alt=""/>
                                            </div>
                                        
                                        ))
                                    }
                                </Carousel>
                            }
                        </div>
                    </div>
                    
                    <div className="flex flex-col gap-5">
                        {/* Product Heading */}
                        <div className="text-3xl md:text-xl  text-slate-600 font-bold">
                            <h2 title="Long Sleeve casua Shirt for man" className="overflow-hidden whitespace-nowrap text-ellipsis">Long Sleeve casua Shirt for man</h2>
                        </div>
                        
                        {/* Product Ratting */}
                        <div className="flex justify-start items-center gap-4">
                            <div className="flex text-xl">
                                <Rattings rattings={4.5}/>
                            </div>
                            <span className="text-green-500">(23 reviews)</span>
                        </div>
                        {/* Discount Section */}
                        <div className="text-2xl sm:text-xl text-red-500 font-bold flex gap-3">
                            {
                                discount ? (
                                    <>
                                        <h2 className="line-through">$500</h2>
                                        <h2>${500 - Math.floor(500 * discount) / 100}(-{discount}%)</h2>
                                    </>
                                
                                ) : (
                                    <h2>Price : $500</h2>
                                )
                            }
                        </div>
                        {/*  Description   */}
                        <div className="text-slate-600">
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque autem deleniti ea exercitationem illo iste, iure laudantium officiis pariatur, quis quod ratione recusandae reiciendis sint veritatis? Cupiditate fuga illum quae. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis dolorum itaque possimus sed. Eaque eligendi exercitationem itaque iure, labore, magni obcaecati odit pariatur perspiciatis praesentium quae quia, quod vitae? Officiis?</p>
                        </div>
                        {/*   Quantity  , stock and Favorite Item */}
                        <div className="flex gap-3 pb-10 border-b flex-wrap">
                            {
                                stock && stock ? (
                                        <>
                                            <div className="flex justify-start items-start gap-4 sm:flex-col ">
                                                <div className="flex bg-slate-200 h-[50px] justify-center items-center text-xl rounded-sm">
                                                    <div className="px-6 cursor-pointer">-</div>
                                                    <div className="px-5">5</div>
                                                    <div className="px-6 cursor-pointer">+</div>
                                                </div>
                                                <div className="w-full">
                                                    <button className="px-9 py-3 h-[50px] whitespace-nowrap sm:w-full cursor-pointer hover:shadow-lg hover:shadow-purple-500/40 bg-purple-500 text-white rounded-sm">Add to Cart</button>
                                                </div>
                                            </div>
                                        </>
                                    )
                                    : null
                            }
                            <div>
                                <div className="h-[50px] w-[50px] flex justify-center items-center cursor-pointer text-xl hover:shadow-lg hover:shadow-cyan-500/40 bg-cyan-500 text-white">
                                    <AiFillHeart/>
                                </div>
                            </div>
                        </div>
                        
                        {/* Availability and Share on    */}
                        <div className="flex flex-col gap-6 py-5">
                            <div className="flex items-center justify-start gap-14">
                                <span className="text-black font-bold text-xl sm:text-lg">Availability</span>
                                <span className={`text-${stock ? "green" : "red"}-500`}>
                                    {
                                        stock ? `In Stock(${stock})` : "Out of Stock"
                                    }
                                  </span>
                            </div>
                            <div className="flex items-center justify-start gap-20 md-lg:gap-10 md:gap-20 sm:items-start sm:flex-col sm:gap-5 ">
                                <span className="text-black font-bold text-xl sm:text-lg">Share on</span>
                                <ul className="flex justify-start items-center gap-3">
                                    <li>
                                        <Link to={"#"} className="w-[38px] h-[38px] hover:bg-[#7fad39] hover:text-white flex justify-center items-center bg-indigo-500 text-white  rounded-full"><FaFacebookF/></Link>
                                    </li>
                                    <li>
                                        <Link to={"#"} className="w-[38px] h-[38px] hover:bg-[#7fad39] hover:text-white flex justify-center items-center bg-cyan-500 text-white rounded-full"><AiOutlineTwitter/></Link>
                                    </li>
                                    <li>
                                        <Link to={"#"} className="w-[38px] h-[38px] hover:bg-[#7fad39] hover:text-white flex justify-center items-center bg-purple-500 text-white rounded-full"><FaLinkedin/></Link>
                                    </li>
                                    <li>
                                        <Link to={"#"} className="w-[38px] h-[38px] hover:bg-[#7fad39] hover:text-white flex justify-center items-center bg-blue-500 text-white rounded-full"><AiFillGithub/></Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    
                    {/*  Chatting Option  */}
                        <div className={`flex py-5 gap-3 flex-wrap`}>
                            {
                                stock ? (
                                    <button className="px-9 py-3  whitespace-nowrap sm:w-full  cursor-pointer hover:shadow-lg hover:shadow-emerald-500/40 bg-emerald-500 text-white rounded-sm capitalize">Buy Now</button>
                                ) : null
                            }
                            
                            <button className="px-9 py-3  whitespace-nowrap sm:w-full cursor-pointer hover:shadow-lg hover:shadow-lime-500/40 bg-lime-500 text-white rounded-sm capitalize">Chat Seller</button>
                        </div>
                    </div>
                </div>
            </section>
            
            
            <Footer/>
        </div>
    )
}
export default Details
