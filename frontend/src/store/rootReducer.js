import homeReducer from "./reducers/homeReducer.js";
import authReducer from "./reducers/authReducer.js";


const rootReducer = {
    home : homeReducer,
    auth : authReducer,
    
}

export default rootReducer;