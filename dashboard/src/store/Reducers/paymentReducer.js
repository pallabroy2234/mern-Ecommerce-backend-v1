import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import api from "../../api/api.js";

// * GET SELLER PAYMENT DETAILS || GET || /api/payment/seller/get-payment-details
export const getSellerPaymentDetails = createAsyncThunk(
	"payment/getSellerPaymentDetails",
	async (_, {rejectWithValue, fulfillWithValue}) => {
		try {
			const {data} = await api.get("/payment/seller/get-payment-details", {
				withCredentials: true
			});
			return fulfillWithValue(data);
		} catch (e) {
			return rejectWithValue(e.response.data);
		}
	}
);

export const paymentReducer = createSlice({
	name: "payment",
	initialState: {
		successMessage: "",
		errorMessage: "",
		loader: false,
		pendingWithdraw: [],
		successWithdraw: [],
		totalAmount: 0,
		withdrawAmount: 0,
		pendingAmount: 0,
		availableAmount: 0
	},
	reducers: {
		messageClear: (state) => {
			state.successMessage = "";
			state.errorMessage = "";
		}
		
	},
	extraReducers: builder => {
		//  * GET SELLER PAYMENT DETAILS
		builder.addCase(getSellerPaymentDetails.fulfilled, (state, {payload}) => {
			state.loader = false;
			state.pendingWithdraw = payload.payload.pendingWithdraw;
			state.successWithdraw = payload.payload.successWithdraw;
			state.totalAmount = payload.payload.totalAmount;
			state.withdrawAmount = payload.payload.withdrawAmount;
			state.pendingAmount = payload.payload.pendingAmount;
			state.availableAmount = payload.payload.availableAmount;
		});
		builder.addCase(getSellerPaymentDetails.pending, (state, _) => {
			state.loader = true;
		});
		builder.addCase(getSellerPaymentDetails.rejected, (state, {payload}) => {
			state.loader = false;
			state.errorMessage = payload.message;
		});
	}
	
});


export const {messageClear} = paymentReducer.actions;
export default paymentReducer.reducer;