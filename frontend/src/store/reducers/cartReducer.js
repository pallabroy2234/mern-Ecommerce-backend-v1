import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import api from "../../api/api.js";


export const userLogin = createAsyncThunk("auth/userLogin", async (info, {rejectWithValue, fulfillWithValue}) => {
    try {
        const {data} = await api.post("frontend/user/user-login", info)
        localStorage.setItem("userAuthorization", data.payload)
        return fulfillWithValue(data)
    } catch (e) {
        return rejectWithValue(e.response.data)
    }
})


export const cartReducer = createSlice({
    name: "cart",
    initialState: {
        cartProducts: [],
        cartProductCount: 0,
        wishListProducts: [],
        wishListCount: 0,
        price: 0,
        successMessage: "",
        errorMessage: "",
        shippingFee: 0,
        outOfStockProducts: [],
        
    }, reducers: {
        messageClear: (state, _) => {
            state.successMessage = "";
            state.errorMessage = "";
        },
    }, extraReducers: builder => {
    
    }
    
})


export const {messageClear} = cartReducer.actions
export default cartReducer.reducer;