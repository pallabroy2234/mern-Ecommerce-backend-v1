import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import api from "../../api/api.js";

// * GET SELLER PAYMENT DETAILS || GET || /api/payment/seller/get-seller-payment-details
export const getSellerPaymentDetails = createAsyncThunk("payment/getSellerPaymentDetails", async (orderId, {rejectWithValue, fulfillWithValue}) => {
	try {
		const {data} = await api.get(`/api/payment/seller/get-seller-payment-details`);
		return fulfillWithValue(data);
	} catch (e) {
		return rejectWithValue(e.response.data);
	}
});

export const paymentReducer = createSlice({
	name: "payment",
	initialState: {},
	reducers: {
		messageClear: (state, _) => {
			state.successMessage = "";
			state.errorMessage = "";
		},
	},
	extraReducers: (builder) => {},
});

export const {messageClear} = paymentReducer.actions;
export default paymentReducer.reducer;
