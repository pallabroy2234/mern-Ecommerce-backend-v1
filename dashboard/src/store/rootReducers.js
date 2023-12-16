import authReducer from "./Reducers/authReducer";
import categoryReducer from "./Reducers/categoryReducer.js";

const rootReducer = {
  auth: authReducer,
  category:categoryReducer,
};

export default rootReducer;
