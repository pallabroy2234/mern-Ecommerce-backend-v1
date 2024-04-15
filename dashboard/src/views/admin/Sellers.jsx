import {Link} from "react-router-dom";
import {FaEye} from "react-icons/fa";
import Pagination from "../Pagination.jsx";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getActiveSellers} from "../../store/Reducers/sellerReducer.js";


const Sellers = () => {
	const dispatch = useDispatch();
	const {userInfo} = useSelector(state => state.auth);
	const {activeSellers, pagination} = useSelector((state) => state.sellers);
	const [currentPage, setCurrentPage] = useState(1);
	const [searchValue, setSearchValue] = useState("");
	const [parPage, setParPage] = useState(5);
	const [show, setShow] = useState(false);
	
	
	useEffect(() => {
		if (userInfo) {
			const obj = {
				parPage: parseInt(parPage),
				currentPage: parseInt(currentPage),
				searchValue: searchValue
			};
			dispatch(getActiveSellers(obj));
		}
	}, [searchValue, parPage, currentPage, userInfo]);
	
	
	return (
		<div className="px-2 lg:px-7 pt-5">
			<div className="w-full bg-[#283046] p-4 rounded-md">
				{/* Search Options */}
				<div className="flex justify-between items-center ">
					<select onChange={(e) => setParPage(parseInt(e.target.value))} className="px-4 py-2 hover:border-indigo-500 border outline-none  bg-[#283046] border-slate-700 rounded-md text-white">
						<option value="5">5</option>
						<option value="15">15</option>
						<option value="25">25</option>
					</select>
					<input onChange={(e) => setSearchValue(e.target.value)} value={searchValue} type="text" placeholder="Search" className="px-4 py-2 focus:border-indigo-500 border outline-none  bg-[#283046] border-slate-700 rounded-md text-white" />
				</div>
				
				{/* table  */}
				<div className="relative overflow-x-auto mt-3">
					<table className="w-full text-sm text-white text-left">
						<thead className="text-sm text-white uppercase border-slate-700 border-b">
						<tr>
							<th scope="col" className="py-2 px-4 whitespace-nowrap">No</th>
							<th scope="col" className="py-2 px-4 whitespace-nowrap">Images</th>
							<th scope="col" className="py-2 px-4 whitespace-nowrap">Name</th>
							<th scope="col" className="py-2 px-4 whitespace-nowrap">Shop Name</th>
							<th scope="col" className="py-2 px-4 whitespace-nowrap">Payment Status</th>
							<th scope="col" className="py-2 px-4 whitespace-nowrap">Email</th>
							<th scope="col" className="py-2 px-4 whitespace-nowrap">Division</th>
							<th scope="col" className="py-2 px-4 whitespace-nowrap">District</th>
							<th scope="col" className="py-2 px-4 whitespace-nowrap">Action</th>
						</tr>
						</thead>
						<tbody>
						{
							activeSellers && activeSellers.map((item, index) => (
								<tr key={index}>
									<td scope="row" className="px-4 py-2 font-medium whitespace-nowrap">{index + 1}</td>
									<td scope="row" className="px-4 py-2 font-medium whitespace-nowrap">
										<img className="w-[45px] h-[45px] object-cover" src={item?.image ? item?.image : "/public/images/seller.png"} alt={item?.name} />
									</td>
									<td scope="row" className="px-4 py-2 font-medium whitespace-nowrap">
										<span>{item?.name}</span>
									</td>
									<td scope="row" className="px-4 py-2 font-medium whitespace-nowrap">
										<span>{item?.shopInfo?.shopName}</span>
									</td>
									<td scope="row" className="px-4 py-2 font-medium whitespace-nowrap">
										<span>{item?.payment}</span>
									</td>
									<td scope="row" className="px-4 py-2 font-medium whitespace-nowrap">
										<span>{item?.email}</span>
									</td>
									<td scope="row" className="px-4 py-2 font-medium whitespace-nowrap">
										<span>{item?.shopInfo?.division}</span>
									</td>
									<td scope="row" className="px-4 py-2 font-medium whitespace-nowrap">
										<span>{item?.shopInfo?.district}</span>
									</td>
									<td scope="row" className="px-4 py-2 font-medium whitespace-nowrap">
										<div className="flex justify-start items-center gap-4">
											<Link to={`/admin/dashboard/seller/details/${item?._id}`} className="p-[6px] bg-green-500 rounded-sm hover:shadow-lg hover:shadow-green-500/50"><FaEye /></Link>
										</div>
									</td>
								</tr>
							))
						}
						</tbody>
					</table>
				</div>
				
				{/* pagination */}
				<div className="w-full flex justify-end mt-4 bottom-4 right-4">
					{
						pagination.totalNumberOfSellers >= parPage ? (
							<Pagination pageNumber={currentPage} setPageNumber={setCurrentPage} totalItem={pagination.totalNumberOfSellers} parPage={parPage} showItem={pagination.totalPages} />
						) : null
					}
				</div>
			</div>
		</div>
	);
};
export default Sellers;
