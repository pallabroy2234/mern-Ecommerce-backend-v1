import {loadStripe} from "@stripe/stripe-js";
import {Elements} from "@stripe/react-stripe-js";
import {useState} from "react";
import axios from "axios";
import CheckOutForm from "./CheckOutForm.jsx";

const stripePromise = loadStripe(import.meta.env.VITE_PUBLICHABLE_KEY);

const Stripe = ({price, orderId}) => {
	const [clientSecret, setClientSecret] = useState("");
	const appearance = {
		theme: "stripe",
	};

	const options = {
		appearance,
		clientSecret,
	};

	const handleCreatePayment = async () => {
		try {
			const {data} = await axios.post(
				"http://localhost:3000/api/frontend/product/order/create-payment",
				{
					price,
				},
				{withCredentials: true},
			);
			setClientSecret(data.payload);
		} catch (e) {
			console.log(e.response.data);
		}
	};

	return (
		<div className='mt-2'>
			{clientSecret ? (
				<div>
					<Elements options={options} stripe={stripePromise}>
						<CheckOutForm orderId={orderId} />
					</Elements>
				</div>
			) : (
				<div>
					<button onClick={handleCreatePayment} className='px-10 py-[6px] rounded-sm hover:shadow-orange-500/20 hover:shadow-lg bg-orange-500 text-white'>
						Start Payment
					</button>
				</div>
			)}
		</div>
	);
};
export default Stripe;
