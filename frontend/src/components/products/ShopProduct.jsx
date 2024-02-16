import {AiFillHeart, AiOutlineShoppingCart} from "react-icons/ai";
import {Link} from "react-router-dom";
import {FaEye} from "react-icons/fa";
import Rattings from "../Rattings.jsx";


const ShopProduct = ({style}) => {
    

    
    return (
        
      <div className={`grid ${style === "grid" ? "2xl:grid-cols-4 xl:grid-cols-3 md-lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 gap-4" : "grid-cols-1 md-lg:grid-cols-2 sm:grid-cols-1  gap-3"}`}>
          {
              [1,2,3,4,5,6,7].map((item, index)=> (
                      <div key={index} className={`shadow-md rounded-md group z-50 transition-all duration-500 hover:-translate-y-2`}>
                          <div className={`${style === "grid" ? "flex flex-col gap-2" : "flex flex-row gap-2 md-lg:flex-col gap-2"}`}>
                              <div className={`${style === "grid" ? "w-full h-full " : "w-[200px] h-[200px]"} relative overflow-hidden`}>
                                  <div>
                                      <img className="w-full h-full object-cover" src={`/images/products/${index + 1}.webp`} alt=""/>
                                  </div>
                                  <ul className={`z-50 flex transition-all duration-500 -bottom-10 justify-center items-center opacity-0 group-hover:opacity-100 gap-3 absolute w-full group-hover:bottom-8`}>
                                      <li className="w-[38px] h-[38px] cursor-pointer bg-white flex justify-center items-center rounded-full hover:bg-dark-moderate-green hover:text-white hover:rotate-[720deg] transition-all duration-200">
                                          <AiFillHeart/>
                                      </li>
                                      <Link to={"/"} className="w-[38px] h-[38px] cursor-pointer bg-white flex justify-center items-center rounded-full hover:bg-dark-moderate-green hover:text-white hover:rotate-[720deg] transition-all duration-200">
                                          <FaEye/>
                                      </Link>
                                      <li className="w-[38px] h-[38px] cursor-pointer bg-white flex justify-center items-center rounded-full hover:bg-dark-moderate-green hover:text-white hover:rotate-[720deg] transition-all duration-200">
                                          <AiOutlineShoppingCart/>
                                      </li>
                                  </ul>
                                  <div className="z-40 absolute w-full h-full top-0 bottom-0 left-0 right-0 bg-black  opacity-0 group-hover:opacity-20 transition-all"></div>
                              </div>
                              <div className="flex justify-start items-start flex-col gap-1 p-2 -z-50">
                                  <h2 className="text-md  text-slate-700 font-medium">HH Fashion Long Sleeve ocean blue Shirt for </h2>
                                  <div className="flex justify-start items-center gap-3">
                                      <span className="text-md font-bold text-slate-700">$654</span>
                                      <div className="flex text-lg">
                                          <Rattings rattings={4.5}/>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>
              ))
          }
      </div>
    )
}
export default ShopProduct
