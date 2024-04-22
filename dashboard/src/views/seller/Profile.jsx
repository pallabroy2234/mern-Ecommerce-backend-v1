import React, {useEffect, useState} from "react";
import {BsImage} from "react-icons/bs";
import {FadeLoader, PropagateLoader} from "react-spinners";
import {FaEdit} from "react-icons/fa";
import {useDispatch, useSelector} from "react-redux";
import {messageClear, profile_image_upload, profile_info_add} from "../../store/Reducers/authReducer.js";
import {overrideStyle} from "../../utils/utils.js";
import toast from "react-hot-toast";
import {createStripeConnectAccount} from "../../store/Reducers/sellerReducer.js";


const Profile = () => {
	const dispatch = useDispatch();
	const {userInfo, loader, successMessage, errorMessage} = useSelector(state => state.auth);
	const [state, setState] = useState({
		shopName: "",
		division: "",
		district: "",
		thana: ""
	});
	
	const inputHandleChange = (e) => {
		setState({...state, [e.target.name]: e.target.value});
	};
	
	const inputHandleSubmit = (e) => {
		e.preventDefault();
		dispatch(profile_info_add(state));
	};
	
	//   ! Seller Image upload
	const handleImageChange = (e) => {
		if (e.target.files.length > 0) {
			const formData = new FormData();
			formData.append("image", e.target.files[0]);
			dispatch(profile_image_upload(formData));
		}
	};
	
	useEffect(() => {
		if (errorMessage) {
			toast.error(errorMessage);
			dispatch(messageClear());
		}
		if (successMessage) {
			toast.success(successMessage);
			dispatch(messageClear());
		}
	}, [errorMessage, successMessage]);
	
	
	// * HANDLE PAYMENT ACTIVE
	const handlePaymentActive = () => {
		dispatch(createStripeConnectAccount());
	};
	
	
	return (
		<div className="px-2 lg:px-7 py-5">
			<div className="w-full flex flex-wrap">
				<div className="w-full md:w-6/12">
					<div className="w-full bg-secondary rounded-md text-white p-2">
						
						<div className="flex justify-center items-center py-3">
							<div>
								{userInfo.image ? <div>
									<label htmlFor="img" className="flex justify-center items-center flex-col h-[210px] w-[300px] cursor-pointer relative">
										<img className="w-full h-full object-contain" src={userInfo?.image} alt="" />
										{loader &&
											<div className="absolute  grid place-content-center p-10 opacity-80 top-0 right-0 bottom-0 left-0 bg-gray-500/60  z-20">
                                               <span>
                                                   <FadeLoader cssOverride={overrideStyle} />
                                               </span>
											</div>}
									</label>
								</div> : <div>
									<label htmlFor="img" className="flex justify-center items-center flex-col h-[210px] w-[300px] cursor-pointer border border-dashed hover:border-indigo-500 border-white relative">
										<span><BsImage /></span>
										<span>Select Image</span>
										{loader &&
											<div className="bg-slate-600 absolute left-0 top-0 w-full h-full opacity-70 flex justify-center items-center z-20">
                                               <span>
                                                   <FadeLoader />
                                               </span>
											</div>}
									</label>
								</div>}
								<input onChange={handleImageChange} type="file" className="hidden" id="img" />
							</div>
						</div>
						
						<div className="px-0 md:px-5 py-2">
							<div className="flex justify-between text-sm flex-col gap-2 p-4 bg-slate-800 rounded-md relative">
								<span className="p-[6px] bg-yellow-500 rounded hover:shadow-lg hover:shadow-yellow-500/50 absolute right-2 top-2 cursor-pointer"><FaEdit /></span>
								<div className="flex gap-2">
									<span>Name : </span>
									<span>{userInfo?.name}</span>
								</div>
								<div className="flex gap-2">
									<span>Email : </span>
									<span>{userInfo?.email}</span>
								</div>
								<div className="flex gap-2">
									<span>Role : </span>
									<span>{userInfo?.role}</span>
								</div>
								<div className="flex gap-2">
									<span>Status : </span>
									<span>{userInfo?.status}</span>
								</div>
								
								<div className="flex gap-2">
									<span>Payment Account : </span>
									<p>
										{userInfo?.payment === "active" ?
											<span className="text-white text-xs cursor-pointer font-normal bg-green-500 ml-2 px-2 py-0.5 rounded">{userInfo?.payment}</span> :
											<button onClick={handlePaymentActive} type="button" className="text-white text-xs cursor-pointer font-normal bg-blue-500 ml-2 px-2 py-0.5 rounded">click active</button>}
									</p>
								</div>
							</div>
						</div>
						<div className="px-0 md:px-5 py-2">
							{
								userInfo?.shopInfo ?
									<div className="flex justify-between text-sm flex-col gap-2 p-4 bg-slate-800 rounded-md relative">
										<span className="p-[6px] bg-yellow-500 rounded hover:shadow-lg hover:shadow-yellow-500/50 absolute right-2 top-2 cursor-pointer"><FaEdit /></span>
										<div className="flex gap-2">
											<span>Shop Name : </span>
											<span>{userInfo?.shopInfo?.shopName}</span>
										</div>
										<div className="flex gap-2">
											<span>Division : </span>
											<span>{userInfo?.shopInfo?.division}</span>
										</div>
										<div className="flex gap-2">
											<span>District : </span>
											<span>{userInfo?.shopInfo?.district}</span>
										</div>
										<div className="flex gap-2">
											<span>Thana : </span>
											<span>{userInfo?.shopInfo?.thana}</span>
										</div>
									
									</div> : <form onSubmit={inputHandleSubmit}>
										<div className="flex flex-col w-full gap-1 mb-3">
											<label htmlFor="shopName">Shop Name</label>
											<input type="text" onChange={inputHandleChange} value={state.shopName} name="shopName" required className="px-4 py-2 focus:border-indigo-500 border outline-none  bg-[#283046] border-slate-700 rounded-md text-white my-3" placeholder="Shop Name" id="shopName" />
										</div>
										
										<div className="flex flex-col w-full gap-1 mb-3">
											<label htmlFor="division">Division</label>
											<input type="text" onChange={inputHandleChange} value={state.division} name="division" required className="px-4 py-2 focus:border-indigo-500 border outline-none  bg-[#283046] border-slate-700 rounded-md text-white my-3" placeholder="Division" id="division" />
										</div>
										
										<div className="flex flex-col w-full gap-1 mb-3">
											<label htmlFor="district">District</label>
											<input type="text" onChange={inputHandleChange} value={state.district} name="district" required className="px-4 py-2 focus:border-indigo-500 border outline-none  bg-[#283046] border-slate-700 rounded-md text-white my-3" placeholder="District" id="district" />
										</div>
										
										<div className="flex flex-col w-full gap-1 mb-3">
											<label htmlFor="thana">Thana</label>
											<input type="text" onChange={inputHandleChange} value={state.thana} name="thana" required className="px-4 py-2 focus:border-indigo-500 border outline-none  bg-[#283046] border-slate-700 rounded-md text-white my-3" placeholder="Thana" id="thana" />
										</div>
										
										<button disabled={loader ? true : false} type="submit" className="bg-blue-500 w-[200px] hover:shadow-blue-500/20 hover:shadow-lg text-white rounded-md px-7 py-2 mb-3">
											{loader ?
												<PropagateLoader color="#fff" cssOverride={overrideStyle} /> : "Update Info"}
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
							<form className="">
								<div className="flex flex-col w-full gap-1 mb-3">
									<label htmlFor="email">Email</label>
									<input type="text" className="px-4 py-2 focus:border-indigo-500 border outline-none  bg-[#283046] border-slate-700 rounded-md text-white my-3" placeholder="Email" id="email" />
								</div>
								
								<div className="flex flex-col w-full gap-1 mb-3">
									<label htmlFor="oldPassword">Old Password</label>
									<input type="password" className="px-4 py-2 focus:border-indigo-500 border outline-none  bg-[#283046] border-slate-700 rounded-md text-white my-3" placeholder="Old Password" id="oldPassword" />
								</div>
								
								<div className="flex flex-col w-full gap-1 mb-3">
									<label htmlFor="newPassword">New Password</label>
									<input type="password" className="px-4 py-2 focus:border-indigo-500 border outline-none  bg-[#283046] border-slate-700 rounded-md text-white my-3" placeholder="New Password" id="newPassword" />
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

