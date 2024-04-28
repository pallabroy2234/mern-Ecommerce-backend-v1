import {Link} from "react-router-dom";
import {useState} from "react";
import {BiSolidCloudUpload} from "react-icons/bi";

const AddBanner = () => {

	
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
					</form>
				</div>
			</div>
		</div>
	);
};
export default AddBanner;
