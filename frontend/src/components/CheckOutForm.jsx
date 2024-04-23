import {LinkAuthenticationElement, PaymentElement, useElements, useStripe} from "@stripe/react-stripe-js";
import {useState} from "react";

const CheckOutForm = ({orderId}) => {
	localStorage.setItem("orderId", orderId);
	const stripe = useStripe();
	const elements = useElements();
	const [email, setEmail] = useState();
	const [message, setMessage] = useState(null);
	const [isLoading, setIsLoading] = useState(false);

	const paymentElementOption = {
		layout: "tabs",
	};

	const handlePaymentSubmit = async (e) => {
		e.preventDefault();
		if (!stripe || !elements) {
			return;
		}
		setIsLoading(true);
		const {error} = await stripe.confirmPayment({
			elements,
			confirmParams: {
				return_url: "http://localhost:5174/order/confirm",
			},
		});

		if (error.type === "card_error" || error.type === "validation_error" || error.type === "api_error") {
			setMessage(error.message);
		} else {
			setMessage("an error occured, please try again later");
		}
		setIsLoading(false);
	};

	return (
		<form id='paymnt-form' onSubmit={(e) => handlePaymentSubmit(e)}>
			<LinkAuthenticationElement id='link-authentication-element' />
			<PaymentElement id='payment-element' options={paymentElementOption} />
			<button disabled={isLoading || !stripe || !elements} id='submit' className='px-10 mt-2 py-[6px] rounded-sm hover:shadow-orange-500/20 hover:shadow-lg bg-orange-500 text-white'>
				<span id='button-text'>{isLoading ? <div>Loading...</div> : "Pay Now"}</span>
			</button>
			{message && <div>{message}</div>}
		</form>
	);
};
export default CheckOutForm;
