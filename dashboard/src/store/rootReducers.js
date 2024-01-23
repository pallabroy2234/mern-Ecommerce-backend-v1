import authReducer from "./Reducers/authReducer";
import categoryReducer from "./Reducers/categoryReducer.js";
import productReducer from "./Reducers/productReducer.js";
import sellerReducer from "./Reducers/sellerReducer.js";

const rootReducer = {
  auth: authReducer,
  category:categoryReducer,
  product:productReducer,
  sellers:sellerReducer,
};

export default rootReducer;
