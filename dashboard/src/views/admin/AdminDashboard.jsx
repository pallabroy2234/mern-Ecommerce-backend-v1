import {BsCurrencyDollar} from "react-icons/bs";
import {RiProductHuntLine} from "react-icons/ri";
import {FaUsers} from "react-icons/fa";
import {AiOutlineShoppingCart} from "react-icons/ai";
import Chart from "react-apexcharts";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {getAdminDashboardData} from "../../store/Reducers/dashboardReducer.js";

const AdminDashboard = () => {
    const dispatch = useDispatch();
    const {userInfo} = useSelector(state => state.auth);
    const {
        loader,
        totalSales,
        totalOrders,
        totalProducts,
        totalPendingOrders,
        recentOrders,
        recentMessages
    } = useSelector(state => state.dashboard);
    
    useEffect(() => {
        if(userInfo){
            if(userInfo.role === "admin"){
                dispatch(getAdminDashboardData())
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
            },
        ],
        options: {
            color: ["#181ee8", "#181ee8"],
            plotOptions: {
                radius: 30,
            },
            chart: {
                background: "transparent",
                foreColor: "#fff",
            },
            dataLabels: {
                enabled: false,
            },
            stroke: {
                show: true,
                curve: 'smooth',
                lineCap: 'butt',
                width: .5,
                strokeDasharray: 0
            },
            xaxis: {
                categories: ["Jan", 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            },
            legend: {
                position: 'top',
            },
            responsive: [
                {
                    breakpoint: 565,
                    yaxis: {
                        categories: ["Jan", 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
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
    }
    
    return (
        <div className="px-2 md:px-7 py-5">
            {/*  card   */}
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-7">
                {/* column-1 */}
                <div className="flex justify-between items-center p-5 bg-[#283046] rounded-md gap-3">
                    <div className="flex flex-col justify-start items-start text-white">
                        <h2 className="text-3xl font-bold mb-2">$6543</h2>
                        <span className="text-md font-medium">Total Sales</span>
                    </div>
                    <div className="w-[46px] h-[47px] rounded-full bg-[#28c76f1f] flex justify-center items-center text-xl">
                        <BsCurrencyDollar className="text-[#28c76f] shadow-lg"/>
                    </div>
                </div>
                {/* column -2 */}
                
                <div className="flex justify-between items-center p-5 bg-[#283046] rounded-md gap-3">
                    <div className="flex flex-col justify-start items-start text-white">
                        <h2 className="text-3xl font-bold mb-2">20</h2>
                        <span className="text-md font-medium">Total Products</span>
                    </div>
                    <div className="w-[46px] h-[47px] rounded-full bg-[#e000e81f] flex justify-center items-center text-xl">
                        <RiProductHuntLine className="text-[#cd00e8] shadow-lg"/>
                    </div>
                </div>
                
                {/* column -3 */}
                
                <div className="flex justify-between items-center p-5 bg-[#283046] rounded-md gap-3">
                    <div className="flex flex-col justify-start items-start text-white">
                        <h2 className="text-3xl font-bold mb-2">50</h2>
                        <span className="text-md font-medium">Total Sellers</span>
                    </div>
                    <div className="w-[46px] h-[47px] rounded-full bg-[#00cfe81f] flex justify-center items-center text-xl">
                        <FaUsers className="text-[#00cfe8] shadow-lg"/>
                    </div>
                </div>
                
                {/* column -4 */}
                
                <div className="flex justify-between items-center p-5 bg-[#283046] rounded-md gap-3">
                    <div className="flex flex-col justify-start items-start text-white">
                        <h2 className="text-3xl font-bold mb-2">12</h2>
                        <span className="text-md font-medium">Orders</span>
                    </div>
                    <div className="w-[46px] h-[47px] rounded-full bg-[#7367f01f] flex justify-center items-center text-xl">
                        <AiOutlineShoppingCart className="text-[#7367f0] shadow-lg"/>
                    </div>
                </div>
            
            </div>
            
            {/*   chart and message section    */}
            <div className="w-full flex flex-wrap mt-7">
                {/*  chart    */}
                <div className="w-full lg:w-7/12 lg:pr-3">
                    <div className="bg-[#283046] p-4 rounded-md">
                        <Chart options={state.options} series={state.series} type="bar" height={350}/>
                    </div>
                </div>
                {/* Chat/message option   */}
                <div className="w-full lg:w-5/12 lg:pl-4 mt-6 lg:mt-0">
                    <div className="w-full bg-[#283046] p-4 rounded-md text-white">
                        <div className="flex justify-between items-center">
                            <h2 className="font-semibold text-lg text-white pb-3">Recent seller message</h2>
                            <Link className="font-semibold text-sm  text-white">View all</Link>
                        </div>
                        <div className="flex flex-col gap-2 pt-6 text-white">
                            <ol className="relative border-1 border-slate-600 ml-4">
                                <li className="mb-3 ml-6">
                                    <div className="flex absolute -left-5 shadow-lg justify-center items-center w-10 h-10 p-[6px] bg-[#00d1e848] rounded-full z-10">
                                        <img src="../../../public/images/admin.jpg" className="rounded-full w-full h-full shadow-lg" alt=""/>
                                    </div>
                                    <div className="p-3 bg-slate-800 rounded-lg border border-slate-600 shadow-md">
                                        <div className="flex justify-between items-center mb-2">
                                            <Link className="text-md font-normal">Admin</Link>
                                            <time className="mb-1 text-sm font-normal sm:order-last sm:mb-0">4 days ago</time>
                                        </div>
                                        <div className="p-2 text-xs font-normal bg-slate-700 rounded-lg border border-slate-800">
                                            How are you?
                                        </div>
                                    </div>
                                </li>
                                
                                <li className="mb-3 ml-6">
                                    <div className="flex absolute -left-5 shadow-lg justify-center items-center w-10 h-10 p-[6px] bg-[#00d1e848] rounded-full z-10">
                                        <img src="../../../public/images/admin.jpg" className="rounded-full w-full h-full shadow-lg" alt=""/>
                                    </div>
                                    <div className="p-3 bg-slate-800 rounded-lg border border-slate-600 shadow-md">
                                        <div className="flex justify-between items-center mb-2">
                                            <Link className="text-md font-normal">Admin</Link>
                                            <time className="mb-1 text-sm font-normal sm:order-last sm:mb-0">4 days ago</time>
                                        </div>
                                        <div className="p-2 text-xs font-normal bg-slate-700 rounded-lg border border-slate-800">
                                            How are you?
                                        </div>
                                    </div>
                                </li>
                                
                                
                                <li className="mb-3 ml-6">
                                    <div className="flex absolute -left-5 shadow-lg justify-center items-center w-10 h-10 p-[6px] bg-[#00d1e848] rounded-full z-10">
                                        <img src="../../../public/images/admin.jpg" className="rounded-full w-full h-full shadow-lg" alt=""/>
                                    </div>
                                    <div className="p-3 bg-slate-800 rounded-lg border border-slate-600 shadow-md">
                                        <div className="flex justify-between items-center mb-2">
                                            <Link className="text-md font-normal">Admin</Link>
                                            <time className="mb-1 text-sm font-normal sm:order-last sm:mb-0">4 days ago</time>
                                        </div>
                                        <div className="p-2 text-xs font-normal bg-slate-700 rounded-lg border border-slate-800">
                                            How are you?
                                        </div>
                                    </div>
                                </li>
                            </ol>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* recent orders section */}
            <div className="w-full bg-[#283046] p-4 rounded-md mt-6">
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-lg text-white pb-3">Recent Orders</h2>
                    <Link className="font-semibold text-sm  text-white">View all</Link>
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
                            [1, 2, 3, 4, 5].map((item, index) => (
                                <tr key={index}>
                                    <td scope="row" className="px-4 py-4 font-medium whitespace-nowrap">6555021a8c3cbf2c56421e31</td>
                                    <td scope="row" className="px-4 py-4 font-medium whitespace-nowrap">$1231</td>
                                    <td scope="row" className="px-4 py-4 font-medium whitespace-nowrap">
                                        <span>Pending</span>
                                    </td>
                                    <td scope="row" className="px-4 py-4 font-medium whitespace-nowrap">
                                        <span>Pending</span>
                                    </td>
                                    <td scope="row" className="px-4 py-4 font-medium whitespace-nowrap">
                                        <Link>View</Link>
                                    </td>
                                </tr>
                            ))
                        }
                        </tbody>
                    </table>
                </div>
            </div>
        
        
        </div>)
}
export default AdminDashboard
