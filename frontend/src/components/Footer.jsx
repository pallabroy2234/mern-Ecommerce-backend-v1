import {Link} from "react-router-dom";
import {FaFacebookF, FaLinkedin} from "react-icons/fa";
import {AiFillGithub, AiOutlineTwitter} from "react-icons/ai";


const Footer = () => {
    return (
        <footer className="bg-[#f3f6fa]">
            <div className="customContainer flex flex-wrap border-b py-16 md-lg:pb-10 sm:pb-6">
                 {/* 1st Section */}
                 <div className="w-3/12 lg:w-4/12 sm:w-full">
                  <div className="flex flex-col gap-3">
                      <img src="/images/logo.png" className="w-[190px] h-[70px]" alt="logo"/>
                      <ul className="flex flex-col gap-2 text-slate-600">
                          <li>Address : Thakurgaon, Shantinagar</li>
                          <li>Phone : 01700000000</li>
                          <li>Email : pallab@gmail.com</li>
                      </ul>
                  </div>
                 </div>
            {/*  2nd Section   */}
                <div className="w-5/12 lg:w-8/12 sm:w-full">
                    <div className="flex justify-center sm:justify-start sm:mt-6 w-full">
                        <div>
                            <h2 className="font-bold text-lg mb-2">Useful link</h2>
                            <div className="flex justify-between gap-[80px] lg:gap-[40px]">
                                <ul className="flex flex-col gap-2 text-slate-600 text-sm ">
                                    <li><Link to={"/"}>About Us</Link></li>
                                    <li><Link to={"/"}>About our shop</Link></li>
                                    <li><Link to={"/"}>Delivery information</Link></li>
                                    <li><Link to={"/"}>Privacy Policy</Link></li>
                                    <li><Link to={"/"}>Blogs</Link></li>
                                    <li><Link to={"/"}>Our Sitemap</Link></li>
                                </ul>
                                <ul className="flex flex-col gap-2 text-slate-600 text-sm ">
                                    <li><Link to={"/"}>Who We Are</Link></li>
                                    <li><Link to={"/"}>Our Services</Link></li>
                                    <li><Link to={"/"}>Projects</Link></li>
                                    <li><Link to={"/"}>Contact</Link></li>
                                    <li><Link to={"/"}>Information</Link></li>
                                    <li><Link to={"/"}>Testimonials</Link></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            {/*  3rd Section   */}
                <div className="w-4/12 lg:w-full lg:mt-6">
                    <div className="w-full flex flex-col justify-start gap-5">
                        <h2 className="font-bold text-lg mb-2 capitalize">Join Our Newsletter Now</h2>
                        <span>Get E-mail updates about our latest shop and special offers.</span>
                        <div className="relative h-[50px] w-full bg-white border">
                            <input placeholder="Enter Your mail" type="text" className="h-full bg-transparent w-full pl-3 pr-[125px] outline-0"/>
                            <button className="h-full absolute right-0 bg-indigo-500 text-white uppercase px-4 font-bold text-sm">Subscribe</button>
                        </div>
                        <ul className="flex justify-start items-center gap-3">
                            <li>
                                <Link to={"/"} className="w-[38px] h-[38px] hover:bg-[#7fad39] hover:text-white flex justify-center items-center bg-white rounded-full"><FaFacebookF/></Link>
                            </li>
                            <li>
                                <Link to={"/"} className="w-[38px] h-[38px] hover:bg-[#7fad39] hover:text-white flex justify-center items-center bg-white rounded-full"><AiOutlineTwitter/></Link>
                            </li>
                            <li>
                                <Link to={"/"} className="w-[38px] h-[38px] hover:bg-[#7fad39] hover:text-white flex justify-center items-center bg-white rounded-full"><FaLinkedin/></Link>
                            </li>
                            <li>
                                <Link to={"/"} className="w-[38px] h-[38px] hover:bg-[#7fad39] hover:text-white flex justify-center items-center bg-white rounded-full"><AiFillGithub/></Link>
                            </li>
                        </ul>
                    </div>
                
                </div>
            </div>
            
            
        {/*  CopyRight section   */}
            <div className="customContainer flex flex-wrap justify-center items-center text-slate-600  py-5 text-center">
                <span>Copyright &copy;2024 All rights reserved | made by <Link to={"/"} className="text-blue-500 underline">Roy Devs</Link></span>
            </div>
        </footer>
    )
}
export default Footer
