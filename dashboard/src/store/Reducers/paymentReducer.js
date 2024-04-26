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

// * SEND WITHDRAW REQUEST || POST || /api/payment/seller/send-withdraw-request
export const sendWithdrawRequest = createAsyncThunk(
	"payment/sendWithdrawRequest",
	async (amount, {rejectWithValue, fulfillWithValue}) => {
		try {
			const {data} = await api.post("/payment/seller/send-withdraw-request", {amount}, {
				withCredentials: true
			});
			return fulfillWithValue(data);
		} catch (e) {
			console.log(e.response.data);
			return rejectWithValue(e.response.data);
		}
	}
);

// * GET ADMIN-SELLER'S PAYMENT REQUEST || GET || /api/payment/admin/get-payment-request
export const getAdminSellerPaymentRequest = createAsyncThunk(
	"payment/getAdminSellerPaymentRequest",
	async (_, {rejectWithValue, fulfillWithValue}) => {
		try {
			const {data} = await api.get("/payment/admin/get-payment-request", {
				withCredentials: true
			});
			return fulfillWithValue(data);
		} catch (e) {
			return rejectWithValue(e.response.data);
		}
	}
);

// * ADMIN -> CONFIRM PAYMENT REQUEST || POST || /api/payment/admin/confirm-payment-request
export const confirmPaymentRequest = createAsyncThunk(
	"payment/confirmPaymentRequest",
	async (paymentId, {rejectWithValue, fulfillWithValue}) => {
		try {
			const {data} = await api.post("/payment/admin/confirm-payment-request", {paymentId}, {
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
		// 	* SEND WITHDRAW REQUEST
		builder.addCase(sendWithdrawRequest.fulfilled, (state, {payload}) => {
			const newPendingWithdraw = [payload.payload.withdraw, ...state.pendingWithdraw];
			state.loader = false;
			state.successMessage = payload.message;
			state.pendingWithdraw = newPendingWithdraw;
			// state.pendingWithdraw.unshift(payload.payload.withdraw)
			state.availableAmount = state.availableAmount - payload.payload.withdraw.amount;
			state.pendingAmount = state.pendingAmount + payload.payload.withdraw.amount;
		});
		builder.addCase(sendWithdrawRequest.pending, (state, _) => {
			state.loader = true;
		});
		builder.addCase(sendWithdrawRequest.rejected, (state, {payload}) => {
			state.loader = false;
			state.errorMessage = payload.message;
		});
		
		// 	* ADMIN -> GET SELLER'S PAYMENT REQUEST
		builder.addCase(getAdminSellerPaymentRequest.fulfilled, (state, {payload}) => {
			state.loader = false;
			state.pendingWithdraw = payload.payload.withdrawRequest || [];
		});
		builder.addCase(getAdminSellerPaymentRequest.pending, (state, _) => {
			state.loader = true;
		});
		builder.addCase(getAdminSellerPaymentRequest.rejected, (state, {payload}) => {
			state.loader = false;
			state.errorMessage = payload.message;
		});
		// 	* ADMIN -> CONFIRM PAYMENT REQUEST
		builder.addCase(confirmPaymentRequest.fulfilled, (state, {payload}) => {
			state.loader = false;
			state.successMessage = payload.message;
			state.pendingWithdraw = state.pendingWithdraw.filter(pending => pending._id !== payload.payload.payment._id);
		});
		builder.addCase(confirmPaymentRequest.pending, (state, _) => {
			state.loader = true;
		});
		builder.addCase(confirmPaymentRequest.rejected, (state, {payload}) => {
			state.loader = false;
			state.errorMessage = payload.message;
		});
	}
	
});


export const {messageClear} = paymentReducer.actions;
export default paymentReducer.reducer;