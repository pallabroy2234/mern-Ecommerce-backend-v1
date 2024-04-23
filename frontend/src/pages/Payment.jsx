import {useLocation, useNavigate} from "react-router-dom";
import Headers from "../components/Headers.jsx";
import Footer from "../components/Footer.jsx";
import {useEffect, useState} from "react";
import Stripe from "../components/Stripe.jsx";

const Payment = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const [paymentMethod, setPaymentMethod] = useState("stripe");
	const {
		state: {items, price, userId, orderId},
	} = location;

	return (
		<div>
			<Headers />
			<section className='bg-[#eeeeee]'>
				<div className='customContainer py-16 mt-4'>
					<div className='flex flex-wrap md:flex-col-reverse'>
						{/* left section */}
						<div className='w-7/12 md:w-full md:mt-4'>
							<div className='pr-2 md:pr-0'>
								<div className='flex flex-wrap justify-between'>
									{/* Stripe */}
									<div onClick={() => setPaymentMethod("stripe")} className={`w-[20%]  mb-3 border border-r cursor-pointer py-8 px-12 ${paymentMethod === "stripe" ? "bg-white" : "bg-slate-100"}`}>
										<div className='flex flex-col gap-[3px] justify-center items-center'>
											<div className='w-[40px] h-[40px]'>
												<img src={"images/payment/stripe.png"} className='w-full h-full object-cover' alt={"stripe"} />
											</div>
											<span className='text-slate-600'>Stripe</span>
										</div>
									</div>
									{/* Bkash */}
									<div onClick={() => setPaymentMethod("bkash")} className={`w-[20%]  mb-3 border border-r cursor-pointer py-8 px-12 ${paymentMethod === "bkash" ? "bg-white" : "bg-slate-100"}`}>
										<div className='flex flex-col gap-[3px] justify-center items-center'>
											<div className='w-[40px] h-[40px]'>
												<img src={"images/payment/bkash.png"} className='w-full h-full object-cover' alt={"bkash"} />
											</div>
											<span className='text-slate-600'>Bkash</span>
										</div>
									</div>
									{/* Nogod */}
									<div onClick={() => setPaymentMethod("nogod")} className={`w-[20%] mb-3 border border-r cursor-pointer py-8 px-12 ${paymentMethod === "nogod" ? "bg-white" : "bg-slate-100"}`}>
										<div className='flex flex-col gap-[3px] justify-center items-center'>
											<div className=''>
												<div className='w-[40px] h-[40px]'>
													<img src={"images/payment/nogod.png"} className='w-full h-full object-cover' alt={"nagad"} />
												</div>
											</div>
											<span className='text-slate-600'>Nogod</span>
										</div>
									</div>
									{/* Roket */}
									<div onClick={() => setPaymentMethod("rocket")} className={`w-[20%]  mb-3 border border-r cursor-pointer py-8 px-12 ${paymentMethod === "rocket" ? "bg-white" : "bg-slate-100"}`}>
										<div className='flex flex-col gap-[3px] justify-center items-center'>
											<div className='w-[40px] h-[40px]'>
												<img src={"images/payment/rocket.png"} className='w-full h-full object-cover' alt={"rocket"} />
											</div>
											<span className='text-slate-600'>Rocket</span>
										</div>
									</div>
								</div>

								{/* Payment Method 	*/}
								{paymentMethod === "stripe" && (
									<div>
										<Stripe orderId={orderId || ""} price={price} />
									</div>
								)}

								{paymentMethod === "bkash" && (
									<div className='mt-3'>
										<div className='w-full px-4 py-8 bg-white shadow-sm'>
											<button className='px-10 py-[6px] rounded-sm hover:shadow-orange-500/20 bg-orange-500 text-white'>Pay Now</button>
										</div>
									</div>
								)}

								{paymentMethod === "nogod" && (
									<div className='mt-3'>
										<div className='w-full px-4 py-8 bg-white shadow-sm'>
											<button className='px-10 py-[6px] rounded-sm hover:shadow-orange-500/20 bg-orange-500 text-white'>Pay Now</button>
										</div>
									</div>
								)}
								{paymentMethod === "rocket" && (
									<div className='mt-3'>
										<div className='w-full px-4 py-8 bg-white shadow-sm'>
											<button className='px-10 py-[6px] rounded-sm hover:shadow-orange-500/20 bg-orange-500 text-white'>Pay Now</button>
										</div>
									</div>
								)}
							</div>
						</div>

						{/* right section */}
						<div className='w-5/12 md:w-full'>
							<div className='pl-2 md:pl-0 md:mb-0'>
								<div className='bg-white shadow p-5 text-slate-600 flex flex-col gap-3'>
									<h2>Order Summery</h2>
									<div className='flex justify-between items-center gap-2'>
										<span>{items || ""} items and shipping fee included</span>
										<span>{price || ""}</span>
									</div>
									<div className='flex justify-between items-center gap-2 font-semibold'>
										<span>Total Amount</span>
										<span className='text-lg text-orange-500'>{price || ""}</span>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
			<Footer />
		</div>
	);
};
export default Payment;
