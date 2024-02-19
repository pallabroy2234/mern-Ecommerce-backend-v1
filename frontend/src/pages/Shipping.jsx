import Headers from "../components/Headers.jsx";
import Footer from "../components/Footer.jsx";
import {Link, useLocation} from "react-router-dom";
import {MdOutlineKeyboardArrowRight} from "react-icons/md";
import {useState} from "react";


const Shipping = () => {
    const {state} = useLocation();
    // console.log(state);
    const [formData, setFormData] = useState({
        name: "",
        address: "",
        phone: "",
        post: "",
        province: "",
        city: "",
        area: ""
    });
    const [res, setRes] = useState(false)
    
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }
    const handleSubmit = (e) => {
        e.preventDefault();
       const { name, address, phone, post, province, city, area } = formData;
         if(name && address  && phone  && post  && province  && city  && area ){
              setRes(true);
             console.log(formData)
         }else {
                alert("Please fill all the fields")
         }
       
    }
    
    return (
        <div>
            <Headers/>
            {/* Banner Section */}
            <section className="bg-[url('/images/banner/order.jpg')] h-[220px] mt-6 bg-cover bg-no-repeat relative bg-left">
                <div className="absolute left-0 top-0 w-full h-full bg-[#2422228a]">
                    <div className="wrapper h-full text-white">
                        <div className="flex flex-col justify-center gap-1 items-center h-full w-full text-white">
                            <h2 className="text-3xl sm:text-xl font-bold">Shop.my</h2>
                            <div className="flex justify-center items-center gap-2 text-2xl sm:text-sm w-full">
                                <Link to={"/"}>Home</Link>
                                <span className="pt-2"><MdOutlineKeyboardArrowRight/></span>
                                <span>Place Order</span>
                            </div>
                        </div>
                    
                    </div>
                </div>
            </section>
            
            {/* Order Section */}
            <section className="bg-[#eeeeee]">
                <div className="customContainer py-16">
                    <div className="w-full flex flex-wrap">
                        <div className="w-[67%] md-lg:w-full transition-all duration-300">
                            <div className="flex flex-col gap-3">
                                <div className="bg-white p-6 shadow-sm rounded-md">
                                    {
                                        !res && (
                                            <>
                                                <h2 className="text-slate-600 font-bold pb-3">Shipping Information</h2>
                                                <form onSubmit={(e) => handleSubmit(e)}>
                                                    <div className="flex md:flex-col md:gap-2 w-full gap-5 text-slate-600">
                                                        <div className="flex flex-col gap-1 mb-3 w-full">
                                                            <label htmlFor="name">Name</label>
                                                            <input onChange={(e) => handleChange(e)} type="text" name="name" id="name" placeholder="Name" className="w-full px-3 py-2 border border-slate-200 outline-0 focus:border-indigo-500 rounded-md"/>
                                                        </div>
                                                        <div className="flex flex-col gap-1 mb-3 w-full">
                                                            <label htmlFor="address">Address</label>
                                                            <input onChange={(e) => handleChange(e)} type="text" name="address" id="address" placeholder="House no /building /street /area" className="w-full px-3 py-2 border border-slate-200 outline-0 focus:border-indigo-500 rounded-md"/>
                                                        </div>
                                                    </div>
                                                    <div className="flex md:flex-col md:gap-2 w-full gap-5 text-slate-600">
                                                        <div className="flex flex-col gap-1 mb-3 w-full">
                                                            <label htmlFor="phone">Phone</label>
                                                            <input onChange={(e) => handleChange(e)} type="text" name="phone" id="phone" placeholder="Phone" className="w-full px-3 py-2 border border-slate-200 outline-0 focus:border-indigo-500 rounded-md"/>
                                                        </div>
                                                        <div className="flex flex-col gap-1 mb-3 w-full">
                                                            <label htmlFor="post">Post</label>
                                                            <input onChange={(e) => handleChange(e)} type="text" name="post" id="post" placeholder="Post" className="w-full px-3 py-2 border border-slate-200 outline-0 focus:border-indigo-500 rounded-md"/>
                                                        </div>
                                                    </div>
                                                    <div className="flex md:flex-col md:gap-2 w-full gap-5 text-slate-600">
                                                        <div className="flex flex-col gap-1 mb-3 w-full">
                                                            <label htmlFor="province">Province</label>
                                                            <input onChange={(e) => handleChange(e)} type="text" name="province" id="province" placeholder="Province" className="w-full px-3 py-2 border border-slate-200 outline-0 focus:border-indigo-500 rounded-md"/>
                                                        </div>
                                                        <div className="flex flex-col gap-1 mb-3 w-full">
                                                            <label htmlFor="city">City</label>
                                                            <input onChange={(e) => handleChange(e)} type="text" name="city" id="city" placeholder="City" className="w-full px-3 py-2 border border-slate-200 outline-0 focus:border-indigo-500 rounded-md"/>
                                                        </div>
                                                    </div>
                                                    <div className="flex md:flex-col md:gap-2 w-full gap-5 text-slate-600">
                                                        <div className="flex flex-col gap-1 mb-3 w-full">
                                                            <label htmlFor="area">Area</label>
                                                            <input onChange={(e) => handleChange(e)} type="text" name="area" id="area" placeholder="Area" className="w-full px-3 py-2 border border-slate-200 outline-0 focus:border-indigo-500 rounded-md"/>
                                                        </div>
                                                    </div>
                                                    <div className="mt-3">
                                                        <button  className="px-8 py-2 rounded-md hover:shadow hover:shadow-indigo-500/30 bg-indigo-500 text-white">Save</button>
                                                    </div>
                                                </form>
                                            </>
                                        )
                                    }
                                    
                                    {
                                        res && (
                                            <>
                                                <div className="flex flex-col gap-1 mt-2">
                                                    <h2>Deliver to {formData.name}</h2>
                                                    <p>
                                                        <span>Home</span>
                                                        <span></span>
                                                    </p>
                                                </div>
                                            </>
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                        
                        <div className="w-[33%] md-lg:w-full">
                        
                        </div>
                    
                    </div>
                </div>
            </section>
            
            <Footer/>
        </div>
    )
}
export default Shipping
