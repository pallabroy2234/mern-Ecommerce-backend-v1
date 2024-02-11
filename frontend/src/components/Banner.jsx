import Carousel from "react-multi-carousel";
import {Link} from "react-router-dom";
import "react-multi-carousel/lib/styles.css";

const Banner = () => {
    
    const responsive = {
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 1,
            // optional, default to 1.
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 1,
            // optional, default to 1.
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1,
            // optional, default to 1.
        }
    };
    
    return (
        <div className="w-full">
            <div className="customContainer">
                <div className="w-full flex flex-wrap md-lg:gap-8">
                    <div className="w-full">
                        <div className="my-8">
                            <Carousel responsive={responsive}
                                      autoPlay={true}
                                      infinite={true}
                                      arrows={true}
                                      showDots={true}
                                      dotListClass={"custom-dot-list-style-bannerSection"}
                                      draggable={false}
                                      keyBoardControl={true}
                                      transitionDuration={500}>
                                {
                                    [1,2,3,4,5,6,7].map((item,index)=> (
                                        <Link to={"/"} key={index} className="md-lg:h-[440px] h-auto w-full">
                                            <img src={`/images/banner/${item}.jpg`} className="w-full h-full object-contain" alt=""/>
                                        </Link>
                                    ))
                                }
                            </Carousel>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Banner
