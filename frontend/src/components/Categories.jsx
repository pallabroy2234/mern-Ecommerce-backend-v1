import Carousel from "react-multi-carousel";
import {Link} from "react-router-dom";
import "react-multi-carousel/lib/styles.css";

const Categories = () => {
    
    const responsive = {
        superLargeDesktop:{
            breakpoint: { max: 4000, min: 3000 },
            items: 6,
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 6,
            // optional, default to 1.
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 6,
            // optional, default to 1.
        },
        mdTablet: {
            breakpoint: { max: 991, min: 464 },
            items: 3,
            // optional, default to 1.
        },
        mobile: {
            breakpoint: { max: 768, min: 0 },
            items: 2,
            // optional, default to 1.
        },
        smMobile: {
            breakpoint: { max: 640, min: 0 },
            items: 2,
            // optional, default to 1.
        },
        xsMobile: {
            breakpoint: { max: 440, min: 0 },
            items: 1,
            // optional, default to 1.
        }
        
    };
    const categories = ["clothing", "sports", "phones", "laptops" , "monitors" ,"tablets", "audio" , "bags", "television"]
    return (
        <div className="w-[87%] mx-auto relative">
            <Carousel responsive={responsive}
                      autoPlay={true}
                      infinite={true}
                      arrows={true}
                      draggable={false}
                      keyBoardControl={true}
                      transitionDuration={500}>
                {
                    categories.map((item,index)=> (
                        <Link to={"/"} key={index} className="h-[185px] border block">
                            <div className="w-full h-full relative">
                                <img src="images/admin.png" className="w-full h-full object-contain" alt="image"/>
                                <div className="absolute bottom-6 w-full mx-auto font-bold left-0 flex justify-center items-center">
                                    <span className="py-[2px] px-6 bg-[#330305d] text-white">{item}</span>
                                </div>
                            </div>
                        </Link>
                    ))
                }
            </Carousel>
        </div>
    )
}
export default Categories
