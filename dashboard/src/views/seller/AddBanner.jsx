import {Link, useParams} from "react-router-dom";
import {BiSolidCloudUpload} from "react-icons/bi";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {addBanner, deleteBanner, getBanner, messageClear} from "../../store/Reducers/bannerReducer.js";
import {toast} from "react-hot-toast";
import {PropagateLoader} from "react-spinners";
import {overrideStyle} from "../../utils/utils.js";

const AddBanner = () => {
	const dispatch = useDispatch();
	const {productId} = useParams();
	const [imageShow, setImageShow] = useState("");
	const [image, setImage] = useState("");
	const {userInfo} = useSelector(state => state.auth);
	const {banner, successMessage, errorMessage, loader, deleteLoader} = useSelector(state => state.banner);
	
	
	const handleImage = (e) => {
		const files = e.target.files;
		const length = files.length;
		if (length > 0) {
			setImage(files[0]);
			setImageShow(URL.createObjectURL(files[0]));
		}
	};
	
	const handleSubmitBanner = (e) => {
		e.preventDefault();
		if (userInfo) {
			const formData = new FormData();
			formData.append("productId", productId);
			formData.append("image", image);
			dispatch(addBanner(formData));
		} else {
			toast.error("Please login first");
		}
	};
	
	const handleDeleteBanner = () => {
		console.log("delete");
		if (userInfo && banner?._id && productId) {
			const obj = {
				productId: productId,
				bannerId: banner._id
			};
			dispatch(deleteBanner(obj));
		}
	};
	
	
	useEffect(() => {
		if (successMessage) {
			toast.success(successMessage);
			dispatch(messageClear());
			setImageShow("");
			setImage("");
		}
		if (errorMessage) {
			toast.error(errorMessage);
			dispatch(messageClear());
			
		}
	}, [errorMessage, successMessage]);
	
	
	// * GET BANNER BY PRODUCT ID
	useEffect(() => {
		if (userInfo) {
			dispatch(getBanner(productId));
		}
		
	}, [productId]);
	
	
	return (<div className="px-2 md:px-7 py-5">
		{/* Heading */}
		<div className="w-full bg-secondary p-4 rounded-md pb-4">
			<div className="flex  justify-between items-center pb-4">
				<h1 className="text-white text-xl font-semibold">Add Banner</h1>
				<Link to={"/seller/dashboard/banners"} className="bg-blue-500  hover:shadow-blue-500/50 hover:shadow-lg rounded-md px-7 py-2 text-white text-center">Banners</Link>
			</div>
			
			<div>
				<form onSubmit={(e) => handleSubmitBanner(e)}>
					<div className=" text-white mb-6">
						<label htmlFor="image" className="flex justify-center items-center flex-col h-[180px] cursor-pointer border border-dashed hover:border-indigo-500 w-full text-white">
							<span className="text-4xl"><BiSolidCloudUpload /></span>
							<span>Select Banner Image</span>
						</label>
						<input onChange={(e) => handleImage(e)} type="file" id="image" name="image" className="hidden" accept="image" />
					</div>
					
					{
						banner?.banner ? (<div className="mb-4">
								<img className="w-full h-auto object-contain" src={imageShow ? imageShow : banner?.banner} alt="image" />
							</div>
						) : imageShow ? (
							<div className="mb-4">
								<img className="w-full h-auto object-contain" src={imageShow} alt="image" />
							</div>
						) : null
					}
					
					<div className="text-white pt-8 flex gap-2">
						<button disabled={loader} type="submit" className="bg-blue-500 w-[200px] hover:shadow-blue-500/20 hover:shadow-lg text-white rounded-md px-7 py-2 mb-3">
							{loader ?
								<PropagateLoader color="#fff" cssOverride={overrideStyle} /> : "Upload Banner"}
						</button>
						{
							banner.banner ? imageShow ? null : (
								<button onClick={handleDeleteBanner} disabled={deleteLoader} type="button" className="bg-red-500 w-[200px] hover:shadow-red-500/20 hover:shadow-lg text-white rounded-md px-7 py-2 mb-3">
									{deleteLoader ?
										<PropagateLoader color="#fff" cssOverride={overrideStyle} /> : "Delete Banner"}
								</button>
							) : null
						}
					</div>
				</form>
			
			</div>
		</div>
	</div>);
};
export default AddBanner;
