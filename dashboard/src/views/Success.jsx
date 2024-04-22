import {useNavigate, useParams, useSearchParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {activeSellerStripeAccount, messageClear} from "../store/Reducers/sellerReducer.js";
import {FadeLoader} from "react-spinners";


const Success = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const {userInfo} = useSelector((state) => state.auth);
	const {loader, errorMessage, successMessage} = useSelector((state) => state.sellers);
	const [searchParams] = useSearchParams();
	const activecode = searchParams.get("activecode");
	
	
	useEffect(() => {
		if (userInfo !== "") {
			dispatch(activeSellerStripeAccount(activecode));
		}
	}, [activecode, userInfo]);

	
	const handleRedirectDashboard = () => {
		dispatch(messageClear());
		navigate("/");
	};
	
	return (
		<div className="w-screen h-screen flex justify-center items-center flex-col gap-4">
			{
				loader ? <FadeLoader /> : errorMessage ? <div className="flex flex-col justify-center items-center">
					<img src={"./public/images/error.png"} alt="error" />
					<button onClick={handleRedirectDashboard} className="px-5 py-2 bg-green-500 rounded-sm text-white">Back to Dashboard</button>
				</div> : successMessage && <div className="flex flex-col justify-center items-center">
					<img src={"./public/images/success.png"} alt="success" />
					<button onClick={handleRedirectDashboard} className="px-5 mt-3 py-2 bg-green-500 rounded-sm text-white">Back to Dashboard</button>
				</div>
			}
		</div>
	);
};
export default Success;
