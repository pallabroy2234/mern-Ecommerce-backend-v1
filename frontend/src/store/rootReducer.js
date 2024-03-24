import homeReducer from "./reducers/homeReducer.js";
import authReducer from "./reducers/authReducer.js";
import cartReducer from "./reducers/cartReducer.js";


const rootReducer = {
    home : homeReducer,
    auth : authReducer,
    cart : cartReducer
    
}

export default rootReducer;