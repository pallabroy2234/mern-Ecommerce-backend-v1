import {loadStripe} from "@stripe/stripe-js";
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {FadeLoader} from "react-spinners";
import axios from "axios";

const load = async () => {
	return await loadStripe(import.meta.env.VITE_PUBLICHABLE_KEY);
};

const ConfirmOrder = () => {
	const [loader, setLoader] = useState(true);
	const [stripe, setStripe] = useState("");
	const [message, setMessage] = useState(null);

	useEffect(() => {
		if (!stripe) return;

		const clientSecret = new URLSearchParams(window.location.search).get("payment_intent_client_secret");
		if (!clientSecret) {
			return;
		}
		stripe.retrievePaymentIntent(clientSecret).then((paymentIntent) => {
			switch (paymentIntent.status) {
				case "success":
					setMessage("Payment was successful");
					break;
				case "processing":
					setMessage("Payment is processing");
					break;
				case "requires_payment_method":
					setMessage("Payment was failed");
					break;
				case "failed":
					setMessage("Payment was failed");
					break;
				default:
					setMessage("Payment was failed");
			}
		});
	}, [stripe]);

	const handleConfirmOrder = async () => {
		const tempStripe = await load();
		setStripe(tempStripe);
	};

	useEffect(() => {
		handleConfirmOrder();
	}, []);

	// * CALL API

	const handleConfirmPayment = async () => {
		try {
			const orderId = localStorage.getItem("orderId");
			const {data} = await axios.get(`http://localhost:3000/api/frontend/product/order/confirm-payment/${orderId}`, {withCredentials: true});
			localStorage.removeItem("orderId");
			setLoader(false);
		} catch (e) {
			console.log(e.response.data);
			setLoader(false);
		}
	};

	useEffect(() => {
		if (message === "success") {
			handleConfirmPayment();
		}
	}, [message]);

	return (
		<div className='w-screen h-screen flex justify-center items-center flex-col gap-4'>
			{message === "failed" || message === "processing" ? (
				<div className='flex flex-col justify-center items-center'>
					<img src={"./public/images/error.png"} alt='error' />
					<Link to={"/dashboard/orders"} className='px-5 py-2 bg-green-500 rounded-sm text-white mt-2'>
						Back to Dashboard
					</Link>
				</div>
			) : message === "success" ? (
				loader ? (
					<FadeLoader />
				) : (
					<div className='flex flex-col justify-center items-center'>
						<img src={"./public/images/success.png"} alt='success' />
						<Link to={"/dashboard/orders"} className='px-5 py-2 bg-green-500 rounded-sm text-white mt-2'>
							Back to Dashboard
						</Link>
					</div>
				)
			) : (
				<FadeLoader />
			)}
		</div>
	);
};
export default ConfirmOrder;
