import {configureStore} from "@reduxjs/toolkit";
import rootReducer from "./rootReducer.js";
import logger from "redux-logger";

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware)=> getDefaultMiddleware({
        serializableCheck:false,
    }),
    devTools:true,
    
})
export default store;

// .concat(logger),