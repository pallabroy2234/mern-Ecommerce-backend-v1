import {FaStar, FaStarHalfAlt} from "react-icons/fa";
import {CiStar} from "react-icons/ci";

const Rattings = ({rattings}) => {
    return (
        <>
            {
                rattings >= 1 ? <span className="text-[#edbb0e]"><FaStar/> </span>: rattings >= 0.5 ? <span className="text-[#edbb0e]"><FaStarHalfAlt/> </span>: <span className="text-slate-600"><CiStar/></span>
            }
            {
                rattings >= 2 ? <span className="text-[#edbb0e]"><FaStar/></span> : rattings >= 1.5 ? <span className="text-[#edbb0e]"><FaStarHalfAlt/></span>: <span className="text-slate-600"><CiStar/></span>
            }
            {
                rattings >= 3 ? <span className="text-[#edbb0e]"><FaStar/></span> : rattings >= 2.5 ? <span className="text-[#edbb0e]"><FaStarHalfAlt/></span>: <span className="text-slate-600"><CiStar/></span>
            }
            {
                rattings >= 4? <span className="text-[#edbb0e]"><FaStar/></span> : rattings >= 3.5 ? <span className="text-[#edbb0e]"><FaStarHalfAlt/></span>: <span className="text-slate-600"><CiStar/></span>
            }
            {
                rattings >= 5 ? <span className="text-[#edbb0e]"><FaStar/></span> : rattings >= 4.5 ? <span className="text-[#edbb0e]"><FaStarHalfAlt/></span>: <span className="text-slate-600"><CiStar/></span>
            }
        </>
    )
}
export default Rattings
