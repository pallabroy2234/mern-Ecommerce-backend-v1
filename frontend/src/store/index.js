import {configureStore} from "@reduxjs/toolkit";
import rootReducer from "./rootReducer.js";
import logger from "redux-logger";

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware)=> getDefaultMiddleware({
        serializableCheck:false,
    }).concat(logger),
    devTools:true,
    
})
export default store;