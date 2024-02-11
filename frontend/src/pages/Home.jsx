import Headers from "../components/Headers"
import Banner from "../components/Banner.jsx";
import Categories from "../components/Categories.jsx";

const Home = () => {
    return (
        <div className="w-full">
            <Headers/>
            <Banner/>
            <div className="my-4">
                <Categories/>
            </div>
        </div>
    )
}
export default Home

