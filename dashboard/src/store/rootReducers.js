import authReducer from "./Reducers/authReducer";
import categoryReducer from "./Reducers/categoryReducer.js";
import productReducer from "./Reducers/productReducer.js";
import sellerReducer from "./Reducers/sellerReducer.js";
import chatReducer from "./Reducers/chatReducer.js";
import orderReducer from "./Reducers/orderReducer.js";

const rootReducer = {
  auth: authReducer,
  category:categoryReducer,
  product:productReducer,
  sellers:sellerReducer,
  chat: chatReducer,
  order: orderReducer,
};

export default rootReducer;
