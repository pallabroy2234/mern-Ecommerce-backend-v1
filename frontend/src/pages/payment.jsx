import {useLocation} from "react-router-dom";
import Headers from "../components/Headers.jsx";
import Footer from "../components/Footer.jsx";

const Payment = () => {
	const location = useLocation();
	console.log(location);

	return (
		<div>
			<Headers />
			<section className='bg-[#eeeeee]'>
				<div className='customContainer py-16 mt-4'>
					<div className='flex flex-wrap md:flex-col-reverse'>
						<div className='w-7/12 md:w-full'>
							<div className='pr-2 md:pr-2'></div>
						</div>
					</div>
				</div>
			</section>
			<Footer />
		</div>
	);
};
export default Payment;
