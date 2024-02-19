import {AiFillStar} from "react-icons/ai";
import {CiStar} from "react-icons/ci";


const RattingTemp = ({ratting}) => {
    
     if(ratting === 5) {
         return  (
             <>
                 <span className="text-ratting"><AiFillStar/></span>
                 <span className="text-ratting"><AiFillStar/></span>
                 <span className="text-ratting"><AiFillStar/></span>
                 <span className="text-ratting"><AiFillStar/></span>
                 <span className="text-ratting"><AiFillStar/></span>
             </>
         )
     }else if (ratting === 4){
         return (
             <>
                 <span className="text-ratting"><AiFillStar/></span>
                 <span className="text-ratting"><AiFillStar/></span>
                 <span className="text-ratting"><AiFillStar/></span>
                 <span className="text-ratting"><AiFillStar/></span>
                 <span className="text-ratting"><CiStar/></span>
             </>
         )
     }else if (ratting === 3){
         return (
             <>
                 <span className="text-ratting"><AiFillStar/></span>
                 <span className="text-ratting"><AiFillStar/></span>
                 <span className="text-ratting"><AiFillStar/></span>
                 <span className="text-ratting"><CiStar/></span>
                 <span className="text-ratting"><CiStar/></span>
             </>
         )
         }else if (ratting === 2) {
         return (
             <>
                 <span className="text-[#edbb0e]"><AiFillStar/></span>
                 <span className="text-[#edbb0e]"><AiFillStar/></span>
                 <span className="text-[#edbb0e]"><CiStar/></span>
                 <span className="text-[#edbb0e]"><CiStar/></span>
                 <span className="text-[#edbb0e]"><CiStar/></span>
             </>
         )
         
     }else if (ratting === 1) {
         return (
             <>
                 <span className="text-[#edbb0e]"><AiFillStar/></span>
                 <span className="text-[#edbb0e]"><CiStar/></span>
                 <span className="text-[#edbb0e]"><CiStar/></span>
                 <span className="text-[#edbb0e]"><CiStar/></span>
                 <span className="text-[#edbb0e]"><CiStar/></span>
             </>
         )
     }else {
         return (
             <>
                 <span className="text-[#edbb0e]"><CiStar/></span>
                 <span className="text-[#edbb0e]"><CiStar/></span>
                 <span className="text-[#edbb0e]"><CiStar/></span>
                 <span className="text-[#edbb0e]"><CiStar/></span>
                 <span className="text-[#edbb0e]"><CiStar/></span>
             </>
         )
     }
}
export default RattingTemp
