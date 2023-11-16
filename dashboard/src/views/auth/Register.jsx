import React from 'react'
import {Link} from "react-router-dom";
import {AiOutlineGithub, AiOutlineGooglePlus} from "react-icons/ai";
import {FiFacebook} from "react-icons/fi";
import {CiTwitter} from "react-icons/ci";
import {useForm} from "react-hook-form";

const Register = () => {
    const form = useForm({
        defaultValues: {
            name: "",
            email: "",
            password: "",
        }
    })
    const {register, handleSubmit} = form
    
    const submit = (data) => {
        console.log(data)
    }
    
    
    return (
        <div className="w-full min-h-screen bg-[#161d31] flex justify-center items-center">
            <div className="w-[400px] text-[#d0d2d6] p-2">
                <div className="bg-[#283046] p-4 rounded-md">
                    <h2 className="text-xl mb-3">Welcome to e-commerce</h2>
                    <p className="text-sm mb-3">Please register to your account and start your business</p>
                    <form action="" onSubmit={handleSubmit(submit)}>
                        <div className="flex flex-col w-full gap-3 mb-3">
                            <label htmlFor="name">Name</label>
                            <input {...register("name")} type="text" id="name" placeholder="Name" className="px-3 py-2 outline-none border border-slate-700 bg-transparent rounded-md text-[#d0d2d6] focus:border-indigo-500 overflow-hidden"/>
                        </div>
                        
                        <div className="flex flex-col w-full gap-3 mb-3">
                            <label htmlFor="email">Email</label>
                            <input {...register("email")} type="email" id="email" placeholder="Email" className="px-3 py-2 outline-none border border-slate-700 bg-transparent rounded-md text-[#d0d2d6] focus:border-indigo-500 overflow-hidden"/>
                        </div>
                        
                        <div className="flex flex-col w-full gap-3 mb-3">
                            <label htmlFor="password">Password</label>
                            <input {...register("password")} type="text" id="password" placeholder="Password" className="px-3 py-2 outline-none border border-slate-700 bg-transparent rounded-md text-[#d0d2d6] focus:border-indigo-500 overflow-hidden"/>
                        </div>
                        
                        
                        <div className="flex items-center  w-full gap-3 mb-3">
                            <input type="checkbox" id="password" className="w-4 h-4 cursor-pointer text-blue-600 overflow-hidden bg-gray-100 rounded border-gray-300 focus:ring-blue-500"/>
                            <label htmlFor="password">I agree to privacy and policy terms</label>
                        </div>
                        
                        <div>
                            <button type="submit" className="bg-blue-500 w-full hover:shadow-blue-500/50 hover:shadow-lg text-lg px-7 py7 py-2 mb-3 rounded-md">Sign Up</button>
                        </div>
                        
                        <div className="flex items-center mb-3 gap-3 justify-center">
                            <p>Already have an account ? <Link to={"/login"} className="underline">Sign in here</Link>
                            </p>
                        </div>
                        
                        <div className="w-full flex justify-center items-center mb-3">
                            <div className="w-[45%] bg-slate-700 h-[1px]"></div>
                            <div className="w-[10%] justify-center items-center flex"><span className="pb-1">Or</span>
                            </div>
                            <div className="w-[45%] bg-slate-700 h-[1px]"></div>
                        </div>
                        
                        <div className="flex justify-center items-center gap-6">
                            <div className="w-[35px] h-[35px] flex rounded-md bg-orange-500 items-center justify-center shadow-lg hover:shadow-orange-700/50  cursor-pointer overflow-hidden">
                                <span><AiOutlineGooglePlus size={24}/> </span>
                            </div>
                            
                            <div className="w-[35px] h-[35px] flex rounded-md bg-indigo-500 items-center justify-center shadow-lg hover:shadow-indigo-700/50  cursor-pointer overflow-hidden">
                                <span><FiFacebook size={24}/> </span>
                            </div>
                            
                            <div className="w-[35px] h-[35px] flex rounded-md bg-cyan-500 items-center justify-center shadow-lg hover:shadow-cyan-700/50  cursor-pointer overflow-hidden">
                                <span><CiTwitter size={24}/> </span>
                            </div>
                            
                            <div className="w-[35px] h-[35px] flex rounded-md bg-purple-500 items-center justify-center shadow-lg hover:shadow-purple-700/50  cursor-pointer overflow-hidden">
                                <span><AiOutlineGithub size={24}/> </span>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
export default Register
