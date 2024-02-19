import Headers from "../components/Headers.jsx";
import Footer from "../components/Footer.jsx";
import {FaFacebookF} from "react-icons/fa";
import {AiOutlineGooglePlus} from "react-icons/ai";
import {Link} from "react-router-dom";


const Register = () => {
    return (
        <div>
            <Headers/>
            {/* Register */}
            <div className="bg-slate-200 mt-4">
                <div className="w-full justify-center items-center p-10 sm:p-5">
                    <div className="w-[500px] md:w-auto sm:w-full mx-auto bg-white rounded-md">
                      <div className="p-8 ">
                          <h2 className=" text-center w-full text-xl text-slate-600 font-bold">Register</h2>
                          {/* Register Section */}
                          <div>
                              <form>
                                  <div className="flex flex-col gap-1 mb-2">
                                      <label htmlFor="name">Name</label>
                                      <input type="text" id="name" name="name" placeholder="Name" className="w-full px-3 py-2 border border-slate-200 outline-0 focus:border-indigo-500 rounded-md"/>
                                  </div>
                                  
                                  <div className="flex flex-col gap-1 mb-3">
                                      <label htmlFor="email">Email</label>
                                      <input type="email" id="email" name="email" placeholder="Email" className="w-full px-3 py-2 border border-slate-200 outline-0 focus:border-indigo-500 rounded-md"/>
                                  </div>
                                  
                                  <div className="flex flex-col gap-1 mb-4">
                                      <label htmlFor="password">Password</label>
                                      <input type="password" id="password" name="password" placeholder="Password" className="w-full px-3 py-2 border border-slate-200 outline-0 focus:border-indigo-500 rounded-md"/>
                                  </div>
                                  
                                  <button className="px-8 w-full py-2 bg-purple-500 shadow-lg hover:shadow-purple-500/30 text-white rounded-md">Register</button>
                              </form>
                              <div className="flex justify-center items-center py-2">
                                  <div className="h-[1px] bg-slate-300 w-[95%]"></div>
                                  <span className="px-3 text-slate-600">or</span>
                                  <div className="h-[1px] bg-slate-300 w-[95%]"></div>
                              </div>
                              
                              {/* Login with facebook */}
                              <button className="px-8 w-full py-2 bg-indigo-500 shadow-lg hover:shadow-indigo-500/30 text-white rounded-md flex justify-center items-center gap-2 mb-4">
                                  <span><FaFacebookF/></span>
                                  <span className="capitalize text-base sm:text-sm  whitespace-nowrap text-ellipsis overflow-hidden">Login With Facebook</span>
                              </button>
                              {/* Login with google */}
                              <button className="px-8 w-full py-2  bg-orange-500 shadow-lg hover:shadow-orange-500/30 text-white rounded-md flex justify-center items-center gap-2 mb-4">
                                  <span><AiOutlineGooglePlus/></span>
                                  <span className="capitalize text-base sm:text-sm whitespace-nowrap text-ellipsis overflow-hidden">Login With Google</span>
                              </button>
                          </div>
                          
                      {/*  Already Account redirect to user login page   */}
                          <div className="text-center text-slate-600 pt-1">
                              <p>You have already an account? <Link to={"/login"} className="text-blue-500">Login</Link> </p>
                          </div>
                      </div>
                
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    )
}
export default Register
