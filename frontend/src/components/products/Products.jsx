import {Link} from "react-router-dom";
import Carousel from "react-multi-carousel";
import {FiChevronLeft, FiChevronRight} from "react-icons/fi";


const Products = ({title}) => {
    const products =[
        [1,2,3],
        [4,5,6],
    ]
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
    
    const ButtonGroup = ({next, previous, })=> {
        return (
            <div className="flex justify-between items-center">
                <div className="text-xl font-bold text-slate-700">{title}</div>
                <div className="flex justify-center items-center gap-3 text-slate-600">
                    <button onClick={()=> previous()} className="w-[30px] h-[30px] flex justify-center items-center bg-slate-300 border border-slate-200">
                        <span><FiChevronLeft/></span>
                    </button>
                    <button onClick={()=> next()} className="w-[30px] h-[30px] flex justify-center items-center bg-slate-300 border border-slate-200">
                        <span><FiChevronRight/></span>
                    </button>
                </div>
            </div>
        )
    }
    
    return (
        <div className="flex gap-8 flex-col flex-col-reverse">
            <Carousel responsive={responsive}
                      autoPlay={true}
                      infinite={true}
                      arrows={false}
                      draggable={false}
                      keyBoardControl={true}
                      transitionDuration={500}
                      renderButtonGroupOutside={true}
                      customButtonGroup={<ButtonGroup/>}
            >
                {
                    products.map((item,index)=> (
                        <div key={index} className="flex flex-col justify-start gap-2">
                            {
                                item.map((items,index)=> (
                                    <Link key={index} to={"/"} className="flex justify-start">
                                        <img src={`/images/products/${items}.webp`} className="w-[110px]  h-[110px] object-cover" alt=""/>
                                        <div className="px-3 flex justify-start items-start gap-1 flex-col text-slate-600">
                                            <h2>HH Fashion Long Sleeve ocean blue Shirt for men</h2>
                                            <span className="text-lg font-bold">$564</span>
                                        </div>
                                    </Link>
                                ))
                            }
                        </div>
                    ))
                }
            </Carousel>
        </div>
    )
}
export default Products
