import homeReducer from "./reducers/homeReducer.js";
import authReducer from "./reducers/authReducer.js";
import cartReducer from "./reducers/cartReducer.js";
import orderReducer from "./reducers/orderReducer.js";
import dashboardReducer from "./reducers/dashboardReducer.js";

const rootReducer = {
	home: homeReducer,
	auth: authReducer,
	cart: cartReducer,
	order: orderReducer,
	dashboard: dashboardReducer,
};

export default rootReducer;
