import React, {useState} from 'react';
import {BsImage} from "react-icons/bs";
import {FadeLoader} from "react-spinners";
import {FaEdit} from "react-icons/fa";
import {useForm} from "react-hook-form";

const Profile = () => {
    const sellerInfoForm = useForm({
        defaultValues: {
                shopName: '', division: '', district: '', thana: ''
            },
            
    })
    const {register:sellerInfoRegister, handleSubmit:sellerInfoSubmit} = sellerInfoForm
    
    const sellerFormHandler = (data) => {
        console.log(data)
    }
    const passwordForm = useForm({
        defaultValues: {
            email: '', oldPassword: '', newPassword: ''
        }
    })
    const {register: registerPassword, handleSubmit: handleSubmitPassword} = passwordForm
    
    
    
    const changePasswordHandler = (data) => {
        console.log(data)
    }
    
    const image = true;
    const loader = false;
    const status = "active";
    const userInfo = true;
    
    
    return (
        <div className="px-2 lg:px-7 py-5">
            <div className="w-full flex flex-wrap">
                <div className="w-full md:w-6/12">
                    <div className="w-full bg-secondary rounded-md text-white p-2">
                        
                        <div className="flex justify-center items-center py-3">
                            <div>
                                {image ? <div>
                                    <label htmlFor="img" className="flex justify-center items-center flex-col h-[210px] w-[300px] cursor-pointer relative">
                                        <img className="w-full h-full object-contain" src="http://localhost:5173/public/images/admin.jpg" alt=""/>
                                        {loader &&
                                            <div className="absolute  grid place-content-center p-10 opacity-70  z-20">
                                               <span>
                                                   <FadeLoader cssOverride={override}/>
                                               </span>
                                            </div>}
                                    </label>
                                </div> : <div>
                                    <label htmlFor="img" className="flex justify-center items-center flex-col h-[210px] w-[300px] cursor-pointer border border-dashed hover:border-indigo-500 border-white relative">
                                        <span><BsImage/></span>
                                        <span>Select Image</span>
                                        {loader &&
                                            <div className="bg-slate-600 absolute left-0 top-0 w-full h-full opacity-70 flex justify-center items-center z-20">
                                               <span>
                                                   <FadeLoader/>
                                               </span>
                                            </div>}
                                    </label>
                                </div>}
                                <input type="file" className="hidden" id="img"/>
                            </div>
                        </div>
                        
                        <div className="px-0 md:px-5 py-2">
                            <div className="flex justify-between text-sm flex-col gap-2 p-4 bg-slate-800 rounded-md relative">
                                <span className="p-[6px] bg-yellow-500 rounded hover:shadow-lg hover:shadow-yellow-500/50 absolute right-2 top-2 cursor-pointer"><FaEdit/></span>
                                <div className="flex gap-2">
                                    <span>Name : </span>
                                    <span>Pallab Roy Tushar</span>
                                </div>
                                <div className="flex gap-2">
                                    <span>Email : </span>
                                    <span>pallab@gamil.com</span>
                                </div>
                                <div className="flex gap-2">
                                    <span>Role : </span>
                                    <span>Seller</span>
                                </div>
                                <div className="flex gap-2">
                                    <span>Status : </span>
                                    <span>Active</span>
                                </div>
                                
                                <div className="flex gap-2">
                                    <span>Payment Account : </span>
                                    <p>
                                        {status === "active" ?
                                            <span className="text-white text-xs cursor-pointer font-normal bg-green-500 ml-2 px-2 py-0.5 rounded">pending</span> :
                                            <span className="text-white text-xs cursor-pointer font-normal bg-blue-500 ml-2 px-2 py-0.5 rounded">click active</span>}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="px-0 md:px-5 py-2">
                            {
                                userInfo ?
                                <div className="flex justify-between text-sm flex-col gap-2 p-4 bg-slate-800 rounded-md relative">
                                    <span className="p-[6px] bg-yellow-500 rounded hover:shadow-lg hover:shadow-yellow-500/50 absolute right-2 top-2 cursor-pointer"><FaEdit/></span>
                                    <div className="flex gap-2">
                                        <span>Shop Name : </span>
                                        <span>Pallab Fashion</span>
                                    </div>
                                    <div className="flex gap-2">
                                        <span>Division : </span>
                                        <span>Rangpur</span>
                                    </div>
                                    <div className="flex gap-2">
                                        <span>District : </span>
                                        <span>Thakurgon</span>
                                    </div>
                                    <div className="flex gap-2">
                                        <span>Thana : </span>
                                        <span>Thakurgon</span>
                                    </div>
                                
                                </div> : <form onSubmit={sellerInfoSubmit(sellerFormHandler)}>
                                    <div className="flex flex-col w-full gap-1 mb-3">
                                        <label htmlFor="shopName">Shop Name</label>
                                        <input {...sellerInfoRegister("shopName")} type="text" className="px-4 py-2 focus:border-indigo-500 border outline-none  bg-[#283046] border-slate-700 rounded-md text-white my-3" placeholder="Shop Name" id="shopName"/>
                                    </div>
                                    
                                    <div className="flex flex-col w-full gap-1 mb-3">
                                        <label htmlFor="division">Division</label>
                                        <input type="text" {...sellerInfoRegister("division")} className="px-4 py-2 focus:border-indigo-500 border outline-none  bg-[#283046] border-slate-700 rounded-md text-white my-3" placeholder="Division" id="division"/>
                                    </div>
                                    
                                    <div className="flex flex-col w-full gap-1 mb-3">
                                        <label htmlFor="district">District</label>
                                        <input type="text" {...sellerInfoRegister("district")} className="px-4 py-2 focus:border-indigo-500 border outline-none  bg-[#283046] border-slate-700 rounded-md text-white my-3" placeholder="District" id="district"/>
                                    </div>
                                    
                                    <div className="flex flex-col w-full gap-1 mb-3">
                                        <label htmlFor="thana">Thana</label>
                                        <input type="text" {...sellerInfoRegister("thana")} className="px-4 py-2 focus:border-indigo-500 border outline-none  bg-[#283046] border-slate-700 rounded-md text-white my-3" placeholder="Thana" id="thana"/>
                                    </div>
                                    
                                    <button type="submit" className="bg-blue-500  hover:shadow-blue-500/50 hover:shadow-lg rounded-md px-7 py-2 my-4  text-center">
                                        Submit
                                    </button>
                                </form>
                            }
                        </div>
                    
                    </div>
                </div>
                
                <div className="w-full md:w-6/12">
                    <div className="w-full  text-white pl-0 md:pl-7 mt-6 md:mt-0">
                        <div className="bg-secondary rounded-md p-4">
                            <h1 className="text-white text-lg mb-3 font-semibold">Change Password</h1>
                            <form onSubmit={handleSubmitPassword(changePasswordHandler)} className="">
                                <div className="flex flex-col w-full gap-1 mb-3">
                                    <label htmlFor="email">Email</label>
                                    <input {...registerPassword("email")} type="text" className="px-4 py-2 focus:border-indigo-500 border outline-none  bg-[#283046] border-slate-700 rounded-md text-white my-3" placeholder="Email" id="email"/>
                                </div>
                                
                                <div className="flex flex-col w-full gap-1 mb-3">
                                    <label htmlFor="oldPassword">Old Password</label>
                                    <input type="password" {...registerPassword("oldPassword")} className="px-4 py-2 focus:border-indigo-500 border outline-none  bg-[#283046] border-slate-700 rounded-md text-white my-3" placeholder="Old Password" id="oldPassword"/>
                                </div>
                                
                                <div className="flex flex-col w-full gap-1 mb-3">
                                    <label htmlFor="newPassword">New Password</label>
                                    <input type="password" {...registerPassword("newPassword")} className="px-4 py-2 focus:border-indigo-500 border outline-none  bg-[#283046] border-slate-700 rounded-md text-white my-3" placeholder="New Password" id="newPassword"/>
                                </div>
                                
                                
                                <button type="submit" className="bg-blue-500  hover:shadow-blue-500/50 hover:shadow-lg rounded-md px-7 py-2 my-4  text-center">
                                    Submit
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;

