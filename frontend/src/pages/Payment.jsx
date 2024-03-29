import {useLocation} from "react-router-dom";
import Headers from "../components/Headers.jsx";
import Footer from "../components/Footer.jsx";
import {useState} from "react";
import * as stripe from "stripe";
import Stripe from "../components/Stripe.jsx";

const Payment = () => {
	const location = useLocation();
	const [paymentMethod, setPaymentMethod] = useState("stripe");
	console.log(location);

	return (
		<div>
			<Headers />
			<section className='bg-[#eeeeee]'>
				<div className='customContainer py-16 mt-4'>
					<div className='flex flex-wrap md:flex-col-reverse'>
						<div className='w-7/12 md:w-full'>
							<div className='pr-2 md:pr-2'>
								<div className='flex flex-wrap justify-between'>
									{/* Stripe */}
									<div onClick={() => setPaymentMethod("stripe")} className={`w-[20%] border border-r cursor-pointer py-8 px-12 ${paymentMethod === "stripe" ? "bg-white" : "bg-slate-100"}`}>
										<div className='flex flex-col gap-[3px] justify-center items-center'>
											<div className=''>
												<img src={"images/payment/stripe.png"} className='w-full h-full object-cover' alt={"stripe"} />
											</div>
											<span className='text-slate-600'>Stripe</span>
										</div>
									</div>
									{/* Bkash */}
									<div onClick={() => setPaymentMethod("bkash")} className={`w-[20%] border border-r cursor-pointer py-8 px-12 ${paymentMethod === "bkash" ? "bg-white" : "bg-slate-100"}`}>
										<div className='flex flex-col gap-[3px] justify-center items-center'>
											<div className=''>
												<img src={"images/payment/bkash.png"} className='w-full h-full object-cover' alt={"bkash"} />
											</div>
											<span className='text-slate-600'>Bkash</span>
										</div>
									</div>
									{/* Nogod */}
									<div onClick={() => setPaymentMethod("nogod")} className={`w-[20%] border border-r cursor-pointer py-8 px-12 ${paymentMethod === "nogod" ? "bg-white" : "bg-slate-100"}`}>
										<div className='flex flex-col gap-[3px] justify-center items-center'>
											<div className=''>
												<img src={"images/payment/nogod.png"} className='w-full h-full object-cover' alt={"nogod"} />
											</div>
											<span className='text-slate-600'>Nogod</span>
										</div>
									</div>
									{/* Roket */}
									<div onClick={() => setPaymentMethod("roket")} className={`w-[20%] border border-r cursor-pointer py-8 px-12 ${paymentMethod === "roket" ? "bg-white" : "bg-slate-100"}`}>
										<div className='flex flex-col gap-[3px] justify-center items-center'>
											<div className=''>
												<img src={"images/payment/roket.png"} className='w-full h-full object-cover' alt={"roket"} />
											</div>
											<span className='text-slate-600'>Roket</span>
										</div>
									</div>
								</div>

								{/* Payment Method 	*/}
								{paymentMethod === "stripe" && (
									<div>
										<Stripe />
									</div>
								)}

								{paymentMethod === "bkash" && (
									<div className='mt-3'>
										<div className='w-full px-4 py-8 bg-white shadow-sm'>
											<button className='px-10 py-[6px] rounded-sm hover:shadow-orange-500/20 bg-orange-500 text-white'>Pay Now</button>
										</div>
									</div>
								)}
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
