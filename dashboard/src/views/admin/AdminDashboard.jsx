import {BsCurrencyDollar} from "react-icons/bs";
import {RiProductHuntLine} from "react-icons/ri";
import {FaShoppingCart, FaUsers} from "react-icons/fa";
import {AiOutlineShoppingCart} from "react-icons/ai";
import Chart from "react-apexcharts";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {getAdminDashboardData} from "../../store/Reducers/dashboardReducer.js";
import {FadeLoader} from "react-spinners";
import moment from "moment";

const AdminDashboard = () => {
	const dispatch = useDispatch();
	const {userInfo} = useSelector(state => state.auth);
	const {
		loader,
		totalSales,
		totalOrders,
		totalProducts,
		totalSellers,
		recentOrders,
		recentMessages
	} = useSelector(state => state.dashboard);
	
	useEffect(() => {
		if (userInfo) {
			if (userInfo.role === "admin") {
				dispatch(getAdminDashboardData());
			}
		}
	}, []);
	
	
	const state = {
		series: [
			{
				name: "Orders",
				data: [44, 55, 57, 56, 61, 58, 63, 60, 66, 20, 80, 40]
			},
			{
				name: "Revenue",
				data: [44, 35, 57, 26, 91, 38, 13, 40, 76, 60, 20, 77]
			},
			{
				name: "Sellers",
				data: [16, 30, 22, 21, 20, 45, 43, 32, 89, 60, 20, 77]
			}
		],
		options: {
			color: ["#181ee8", "#181ee8"],
			plotOptions: {
				radius: 30
			},
			chart: {
				background: "transparent",
				foreColor: "#fff"
			},
			dataLabels: {
				enabled: false
			},
			stroke: {
				show: true,
				curve: "smooth",
				lineCap: "butt",
				width: .5,
				strokeDasharray: 0
			},
			xaxis: {
				categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
			},
			legend: {
				position: "top"
			},
			responsive: [
				{
					breakpoint: 565,
					yaxis: {
						categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
					},
					options: {
						plotOptions: {
							bar: {
								horizontal: true
							},
							chart: {
								height: 550
							}
						}
					}
				}
			]
		}
	};
	
	
	const metrics = [
		{
			value: totalSales,
			label: "Total Sales",
			icon: <BsCurrencyDollar className="text-[#28c76f] shadow-lg" />,
			bgColor: "#28c76f1f"
		},
		{
			value: totalProducts,
			label: "Total Products",
			icon: <RiProductHuntLine className="text-[#cd00e8] shadow-lg" />,
			bgColor: "#e000e81f"
		},
		{
			value: totalSellers,
			label: "Total Sellers",
			icon: <FaUsers className="text-[#00cfe8] shadow-lg" />,
			bgColor: "#00cfe81f"
		},
		{
			value: totalOrders,
			label: "Orders",
			icon: <AiOutlineShoppingCart className="text-[#7367f0] shadow-lg" />,
			bgColor: "#7367f01f"
		}
	];
	
	
	return (
		<div className="px-2 md:px-7 py-5">
			{
				loader &&
				<div className="w-screen h-screen flex justify-center items-center fixed left-0 top-0 bg-black opacity-40 z-[999]">
					<FadeLoader color="#ffff" />
				</div>
			}
			<div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-7">
				{/* Card */}
				{
					metrics && metrics.map((metric, index) => (
						<div key={index} className="flex justify-between items-center p-5 bg-[#283046] rounded-md gap-3">
							<div className="flex flex-col justify-start items-start text-white">
								<h2 className="text-3xl font-bold mb-2">{metric.value}</h2>
								<span className="text-md font-medium">{metric.label}</span>
							</div>
							<div className={`w-[46px] h-[47px] rounded-full bg-[${metric.bgColor}] flex justify-center items-center text-xl`}>
								{metric.icon}
							</div>
						</div>
					))}
			</div>
			
			{/*   chart and message section    */}
			<div className="w-full flex flex-wrap mt-7">
				{/*  chart    */}
				<div className="w-full lg:w-7/12 lg:pr-3">
					<div className="bg-[#283046] p-4 rounded-md">
						<Chart options={state.options} series={state.series} type="bar" height={350} />
					</div>
				</div>
				{/* Chat/message option   */}
				<div className="w-full lg:w-5/12 lg:pl-4 mt-6 lg:mt-0">
					<div className="w-full bg-[#283046] p-4 rounded-md text-white">
						<div className="flex justify-between items-center">
							<h2 className="font-semibold text-lg text-white pb-3">Recent seller message</h2>
							{
								recentMessages.length > 0 ? (
									<Link to={`/admin/dashboard/chat-sellers/${recentMessages[0]?.senderId}`} className="font-semibold text-sm  text-white">View all</Link>
								) : (
									<Link to="/admin/dashboard/chat-sellers" className="font-semibold text-sm  text-white">View all</Link>
								)
							}
						</div>
						<div className="flex flex-col gap-2 pt-6 text-white">
							<ol className="relative border-1 border-slate-600 ml-4">
								{
									recentMessages && recentMessages?.map((item, index) => (
										<li key={index} className="mb-3 ml-6">
											<div className="flex absolute -left-5 shadow-lg justify-center items-center w-10 h-10 p-[6px] bg-[#00d1e848] rounded-full z-10">
												{
													item.senderId === userInfo?._id ? (
														<img src={"../../../public/images/admin.jpg"} className="rounded-full w-full h-full shadow-lg" alt="" />
													) : (
														<img src="../../../public/images/seller.png" className="rounded-full w-full h-full shadow-lg" alt="" />
													)
												}
											</div>
											<div className="p-3 bg-slate-800 rounded-lg border border-slate-600 shadow-md">
												<div className="flex justify-between items-center mb-2">
													{
														item.senderId === userInfo?._id ? (
															<Link to={`/admin/dashboard/chat-sellers/${item?.receiverId}`} className="text-md font-normal">
																{item.senderName}
															</Link>
														) : (
															<Link to={`/admin/dashboard/chat-sellers/${item?.senderId}`} className="text-md font-normal">
																{item.senderName}
															</Link>)
													}
													<time className="mb-1 text-sm font-normal sm:order-last sm:mb-0">
														{moment(item?.createdAt).fromNow()}
													</time>
												</div>
												<div className="p-2 text-xs font-normal bg-slate-700 rounded-lg border border-slate-800">
													{item?.message}
												</div>
											</div>
										</li>
									))
								}
							</ol>
						</div>
					</div>
				</div>
			</div>
			
			{/* recent orders section */}
			<div className="w-full bg-[#283046] p-4 rounded-md mt-6">
				<div className="flex justify-between items-center">
					<h2 className="font-semibold text-lg text-white pb-3">Recent Orders</h2>
					<Link to={"/admin/dashboard/orders"} className="font-semibold text-sm  text-white">View all</Link>
				</div>
				
				{/* table */}
				<div className="relative overflow-x-auto">
					<table className="w-full text-sm text-white text-left">
						<thead className="text-sm text-white uppercase border-slate-700 border-b">
						<tr>
							<th scope="col" className="py-3 px-4">Order Id</th>
							<th scope="col" className="py-3 px-4">Price</th>
							<th scope="col" className="py-3 px-4">Payment Status</th>
							<th scope="col" className="py-3 px-4">Order Status</th>
							<th scope="col" className="py-3 px-4">Action</th>
						</tr>
						</thead>
						<tbody>
						{
							recentOrders && recentOrders?.map((item, index) => (
								<tr key={index}>
									<td scope="row" className="px-4 py-4 font-medium whitespace-nowrap">{item?._id}</td>
									<td scope="row" className="px-4 py-4 font-medium whitespace-nowrap">${item?.price}</td>
									<td scope="row" className="px-4 py-4 font-medium whitespace-nowrap">
										<span>{item?.paymentStatus}</span>
									</td>
									<td scope="row" className="px-4 py-4 font-medium whitespace-nowrap">
										<span>{item?.deliveryStatus}</span>
									</td>
									<td scope="row" className="px-4 py-4 font-medium whitespace-nowrap">
										<Link to={`/admin/dashboard/order/details/${item?._id}`}>View</Link>
									</td>
								</tr>
							))
						}
						</tbody>
					</table>
				</div>
			</div>
		
		
		</div>);
};
export default AdminDashboard;
