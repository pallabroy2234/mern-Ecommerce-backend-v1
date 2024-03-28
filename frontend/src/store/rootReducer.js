import homeReducer from "./reducers/homeReducer.js";
import authReducer from "./reducers/authReducer.js";
import cartReducer from "./reducers/cartReducer.js";
import orderReducer from "./reducers/orderReducer.js";

const rootReducer = {
	home: homeReducer,
	auth: authReducer,
	cart: cartReducer,
	order: orderReducer,
};

export default rootReducer;
