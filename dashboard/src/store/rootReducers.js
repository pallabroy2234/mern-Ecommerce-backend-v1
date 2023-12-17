import authReducer from "./Reducers/authReducer";
import categoryReducer from "./Reducers/categoryReducer.js";
import productReducer from "./Reducers/productReducer.js";

const rootReducer = {
  auth: authReducer,
  category:categoryReducer,
  product:productReducer
};

export default rootReducer;
