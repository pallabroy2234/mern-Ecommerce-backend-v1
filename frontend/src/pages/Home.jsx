import Headers from "../components/Headers";
import Banner from "../components/Banner.jsx";
import Categories from "../components/Categories.jsx";
import FeatureProducts from "../components/products/FeatureProducts.jsx";
import Products from "../components/products/Products.jsx";
import Footer from "../components/Footer.jsx";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getBanners, getCarouselLatestProducts, getCarouselProducts, getFeatureProducts} from "../store/reducers/homeReducer.js";

const Home = () => {
	const dispatch = useDispatch();
	const {featureProducts, topRatedProducts, latestProducts, discountProducts} = useSelector((state) => state.home);

	//  Fetching Categories
	useEffect(() => {
		dispatch(getFeatureProducts());
		dispatch(getCarouselLatestProducts());
		dispatch(getCarouselProducts());
		dispatch(getBanners());
	}, []);

	return (
		<div className='w-full'>
			<Headers />
			<Banner />
			<div className='my-4'>
				<Categories />
			</div>
			<div className='py-[45px]'>
				<FeatureProducts featureProducts={featureProducts} />
			</div>
			<div className='py-[10px]'>
				<div className='w-[85%] flex flex-wrap mx-auto'>
					<div className='grid w-full grid-cols-3 md-lg:grid-cols-2 md:grid-cols-1 gap-7'>
						<div className='overflow-hidden'>
							<Products title={"Latest Product"} products={latestProducts} />
						</div>
						<div className='overflow-hidden'>
							<Products title={"Top Rated Product"} products={topRatedProducts} />
						</div>
						<div className='overflow-hidden'>
							<Products title={"Discount Product"} products={discountProducts} />
						</div>
					</div>
				</div>
			</div>

			<Footer />
		</div>
	);
};
export default Home;
