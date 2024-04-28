import {Link} from "react-router-dom";
import {IoCloseSharp} from "react-icons/io5";
import {BsImages} from "react-icons/bs";
import React, {useState} from "react";
import {BiSolidCloudUpload} from "react-icons/bi";

const AddBanner = () => {
	const [show, setShow] = useState(false);
	
	return (
		<div className="px-2 md:px-7 py-5">
			{/* Heading */}
			<div className="w-full bg-secondary p-4 rounded-md pb-4">
				<div className="flex  justify-between items-center pb-4">
					<h1 className="text-white text-xl font-semibold">Add Banner</h1>
					<Link to={"/seller/dashboard/banners"} className="bg-blue-500  hover:shadow-blue-500/50 hover:shadow-lg rounded-md px-7 py-2 text-white text-center">Banners</Link>
				</div>
				
				<div>
					<form>
						<div className=" text-white mb-6">
							<label htmlFor="image" className="flex justify-center items-center flex-col h-[180px] cursor-pointer border border-dashed hover:border-indigo-500 w-full text-white">
								<span className="text-4xl"><BiSolidCloudUpload /></span>
								<span>Select Banner Image</span>
							</label>
							<input type="file" id="image" name="image" className="hidden" accept="image" />
						</div>
						
						<div className="w-full mb-4 relative">
							<div onClick={() => setShow(!show)} className="w-full  h-[50px] border border-slate-700 rounded-md cursor-pointer flex justify-start items-center px-4 text-white">
								<span>Select Product</span>
							</div>
							
							{/*  Search Option */}
							<div className={`${show ? "h-[300px] transition-all duration-300 opacity-100" : "h-0 opacity-0"} w-full  bg-slate-800 relative transition-all duration-300`}>
								<div className="p-4">
									<input className="px-4 py-2 w-full focus:border-indigo-500 border outline-none  bg-transparent border-slate-700 rounded-md text-white my-3" type="text" placeholder="Search" />
								</div>
								<div>
								
								</div>
							</div>
						
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};
export default AddBanner;
