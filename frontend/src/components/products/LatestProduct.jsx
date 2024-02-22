import {Link} from "react-router-dom";
import Carousel from "react-multi-carousel";
import {FiChevronLeft, FiChevronRight} from "react-icons/fi";


const LatestProduct = ({title,products }) => {
    
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
    const truncateName = (name) => {
        const letter = name.split('');
        if(letter.length > 35){
            return letter.slice(0,35).join('') + '...'
        }
        return name
    };
    
    
    const ButtonGroup = ({next, previous, })=> {
        return (
            <div className="flex justify-between items-center flex-wrap gap-3">
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
                    products && products?.map((items,index)=> (
                        <div key={index} className="flex flex-col justify-start gap-8">
                            {
                                items?.map((item,index)=> (
                                    <Link key={index} to={"#"} className="flex 2xl:flex-col 2xl:gap-2 md:flex-row   justify-start">
                                        <img src={item?.images[0]?.url} className="w-[110px]  h-[110px] object-contain" alt={truncateName(item?.name)}/>
                                        <div className="px-3 2xl:pl-0 2xl:pr-3 md:px-3 flex justify-start items-start gap-1 flex-col text-slate-600 ">
                                            <h2 className="">{truncateName(item?.name)}</h2>
                                            <span className="text-lg font-bold">${item?.price}</span>
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
export default LatestProduct
