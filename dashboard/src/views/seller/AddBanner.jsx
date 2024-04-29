import {Link, useParams} from "react-router-dom";
import {BiSolidCloudUpload} from "react-icons/bi";
import {useState} from "react";
import {useDispatch} from "react-redux";
import {addBanner} from "../../store/Reducers/bannerReducer.js";

const AddBanner = () => {
    const dispatch = useDispatch();
	const {productId} = useParams();
	const [imageShow, setImageShow] = useState("");
	const [banner, setBanner] = useState("");
	
	
	const handleImage = (e) => {
		const files = e.target.files;
		const length = files.length;
		if (length > 0) {
			setBanner(files[0]);
			setImageShow(URL.createObjectURL(files[0]));
		}
		
	};
	
	const handleSubmitBanner = (e)=> {
		e.preventDefault();
		const formData = new FormData();
		formData.append("productId", productId);
		formData.append("banner", banner);
		dispatch(addBanner(formData));
	}
	
	
	
	
	return (
		<div className="px-2 md:px-7 py-5">
			{/* Heading */}
			<div className="w-full bg-secondary p-4 rounded-md pb-4">
				<div className="flex  justify-between items-center pb-4">
					<h1 className="text-white text-xl font-semibold">Add Banner</h1>
					<Link to={"/seller/dashboard/banners"} className="bg-blue-500  hover:shadow-blue-500/50 hover:shadow-lg rounded-md px-7 py-2 text-white text-center">Banners</Link>
				</div>
				
				<div>
					<form onSubmit={(e)=> handleSubmitBanner(e)}>
						<div className=" text-white mb-6">
							<label htmlFor="image" className="flex justify-center items-center flex-col h-[180px] cursor-pointer border border-dashed hover:border-indigo-500 w-full text-white">
								<span className="text-4xl"><BiSolidCloudUpload /></span>
								<span>Select Banner Image</span>
							</label>
							<input onChange={(e) => handleImage(e)} type="file" id="image" name="image" className="hidden" accept="image" />
						</div>
						
						{
							imageShow && (
								<div className="mb-4">
									<img className="w-full h-auto" src={imageShow} alt="image" />
								</div>
							)
						}
						<button type="submit" className="bg-blue-500  hover:shadow-blue-500/50 hover:shadow-lg rounded-md px-7 py-2 text-white text-center">
							Upload Banner
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};
export default AddBanner;
