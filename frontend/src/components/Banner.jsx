import Carousel from "react-multi-carousel";
import {Link} from "react-router-dom";
import "react-multi-carousel/lib/styles.css";
import React from "react";
import {GoArrowLeft, GoArrowRight} from "react-icons/go";
import {useSelector} from "react-redux";

const Banner = () => {
	const {banners} = useSelector((state) => state.home);

	const responsive = {
		desktop: {
			breakpoint: {max: 3000, min: 1024},
			items: 1,
			// optional, default to 1.
		},
		tablet: {
			breakpoint: {max: 1024, min: 464},
			items: 1,
			// optional, default to 1.
		},
		mobile: {
			breakpoint: {max: 464, min: 0},
			items: 1,
			// optional, default to 1.
		},
	};

	const CustomLeftArrow = ({onClick}) => {
		return (
			<button
				className='bg-transparent border border-black hover:bg-black/50 hover:border-0 hover:text-white text-black w-[40px] h-[40px] text-lg flex justify-center items-center absolute top-1/2 left-2 group-hover:left-10 transition-all duration-500 transform -translate-y-1/2'
				onClick={() => onClick()}>
				<GoArrowLeft />
			</button>
		);
	};

	const CustomRightArrow = ({onClick}) => {
		return (
			<button
				className='bg-transparent border border-black hover:bg-black/50 hover:border-0 hover:text-white text-black w-[40px] h-[40px] text-lg flex justify-center items-center absolute top-1/2 right-2 group-hover:right-10 transition-all duration-500 transform -translate-y-1/2'
				onClick={() => onClick()}>
				<GoArrowRight />
			</button>
		);
	};

	return (
		<div className='w-full'>
			<div className='customContainer'>
				<div className='w-full flex flex-wrap md-lg:gap-8'>
					<div className='w-full'>
						<div className='my-8'>
							<Carousel
								responsive={responsive}
								className='group '
								autoPlay={true}
								infinite={true}
								arrows={true}
								showDots={true}
								dotListClass={"custom-dot-list-style-bannerSection"}
								draggable={false}
								keyBoardControl={true}
								transitionDuration={500}
								customLeftArrow={<CustomLeftArrow />}
								customRightArrow={<CustomRightArrow />}>
								{banners &&
									banners?.map((item, index) => (
										<Link to={`/product/details/${item?.link}`} key={index} className='md-lg:h-[440px] h-auto w-full'>
											<img src={item?.banner} className='w-full h-full object-contain' alt='' />
										</Link>
									))}
							</Carousel>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
export default Banner;
