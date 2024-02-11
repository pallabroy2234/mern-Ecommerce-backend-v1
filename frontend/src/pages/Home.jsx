import Headers from "../components/Headers"
import Banner from "../components/Banner.jsx";
import Categories from "../components/Categories.jsx";
import FeatureProducts from "../components/products/FeatureProducts.jsx";

const Home = () => {
    return (
        <div className="w-full">
            <Headers/>
            <Banner/>
            <div className="my-4">
                <Categories/>
            </div>
            <div className="py-[45px]">
             <FeatureProducts/>
            </div>
        </div>
    )
}
export default Home

