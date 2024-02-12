import Headers from "../components/Headers"
import Banner from "../components/Banner.jsx";
import Categories from "../components/Categories.jsx";
import FeatureProducts from "../components/products/FeatureProducts.jsx";
import Products from "../components/products/Products.jsx";
import Footer from "../components/Footer.jsx";

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
            <div className="py-[10px]">
             <div className="w-[85%] flex flex-wrap mx-auto">
                 <div className="grid w-full grid-cols-3 md-lg:grid-cols-2 md:grid-cols-1 gap-7">
                     <div className="overflow-hidden">
                         <Products title={"Latest Product"}/>
                     </div>
                     <div className="overflow-hidden">
                         <Products title={"Top Rated Product"}/>
                     </div>
                     <div className="overflow-hidden">
                         <Products title={"Discount Product"}/>
                     </div>
                 </div>
             </div>
            </div>
            
            <Footer/>
        </div>
    )
}
export default Home

