import Carousel from "react-multi-carousel";
import {Link} from "react-router-dom";
import "react-multi-carousel/lib/styles.css";
import {GoArrowLeft, GoArrowRight} from "react-icons/go";
import React from "react";
import {useSelector} from "react-redux";

const Categories = () => {
    const {categories} = useSelector(state => state.home)
    
    const responsive = {
        superLargeDesktop:{
            breakpoint: { max: 4000, min: 3000 },
            items: 6,
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 6,
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
    
    const CustomLeftArrow = ({onClick}) => {
        return (
            <button className="bg-transparent border border-black hover:bg-black/50 hover:border-0 hover:text-white text-black w-[40px] h-[40px] text-lg flex justify-center items-center absolute top-1/2 left-2 transform -translate-y-1/2" onClick={() => onClick()}>
                <GoArrowLeft/>
            </button>
        )
    }
    
    const CustomRightArrow = ({onClick}) => {
        return (
            <button className="bg-transparent border border-black hover:bg-black/50 hover:border-0 hover:text-white text-black w-[40px] h-[40px] text-lg flex justify-center items-center absolute top-1/2 right-2 transform -translate-y-1/2" onClick={() => onClick()}>
                <GoArrowRight/>
            </button>
        )
    }

    
    return (
        <div className="w-[87%] mx-auto relative">
            <Carousel responsive={responsive}
                      autoPlay={true}
                      infinite={true}
                      keyBoardControl={true}
                      transitionDuration={500}
                      customLeftArrow={<CustomLeftArrow/>}
                      customRightArrow={<CustomRightArrow/>}
            >
                {
                 categories && categories?.map((item,index)=> (
                        <Link to={"#"} key={index} className="h-[185px] border block">
                            <div className="w-full h-full relative">
                                <img src={item?.image} className="w-full h-full object-contain" alt={item?.name}/>
                                <div className="absolute bottom-6 w-full mx-auto font-bold left-0 flex justify-center items?-center">
                                    <span className="py-[2px] px-6 bg-[#3330305d] text-white">{item?.name}</span>
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
