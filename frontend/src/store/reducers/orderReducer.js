import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import api from "../../api/api.js";

export const placeOrder = createAsyncThunk("order/placeOrder", async ({price, products, shippingFee, shippingInfo, userId, items}, {rejectWithValue, fulfillWithValue}) => {
	try {
		const {data} = await api.post(`frontend/product/order/place-order`, {
			price,
			products,
			shippingFee,
			shippingInfo,
			userId,
			items,
		});
		return fulfillWithValue(data);
	} catch (e) {
		return rejectWithValue(e.response.data);
	}
});

// * GET MY ORDERS
export const getMyOrders = createAsyncThunk("order/getMyOrders", async ({userId, status}, {rejectWithValue, fulfillWithValue}) => {
	try {
		const {data} = await api.get(`frontend/product/order/get-myOrders/${userId}/${status}`);
		return fulfillWithValue(data);
	} catch (e) {
		return rejectWithValue(e.response.data);
	}
});

// * GET ORDER DETAILS
export const getOrderDetails = createAsyncThunk("order/getOrderDetails", async (orderId, {rejectWithValue, fulfillWithValue}) => {
	try {
		const {data} = await api.get(`frontend/product/order/get-orderDetails/${orderId}`);
		console.log(data);
		return fulfillWithValue(data);
	} catch (e) {
		return rejectWithValue(e.response.data);
	}
});

export const orderReducer = createSlice({
	name: "order",
	initialState: {
		loader: false,
		errorMessage: "",
		successMessage: "",
		myOrders: [],
		myOrder: {},
		orderId: "",
	},
	reducers: {
		messageClear: (state, _) => {
			state.successMessage = "";
			state.errorMessage = "";
		},
	},
	extraReducers: (builder) => {
		builder.addCase(placeOrder.pending, (state, _) => {
			state.loader = true;
		});
		builder.addCase(placeOrder.fulfilled, (state, {payload}) => {
			state.loader = false;
			state.successMessage = payload.message;
			state.orderId = payload.payload._id;
		});
		builder.addCase(placeOrder.rejected, (state, {payload}) => {
			state.loader = false;
			state.errorMessage = payload.message;
		});

		// 	* My Orders
		builder.addCase(getMyOrders.pending, (state, _) => {
			state.loader = true;
		});
		builder.addCase(getMyOrders.fulfilled, (state, {payload}) => {
			state.loader = false;
			state.myOrders = payload.payload;
		});
		builder.addCase(getMyOrders.rejected, (state, {payload}) => {
			state.loader = false;
			state.errorMessage = payload.message;
		});
	},
});

export const {messageClear} = orderReducer.actions;
export default orderReducer.reducer;
