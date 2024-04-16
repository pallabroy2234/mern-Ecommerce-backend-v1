import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import api from "../../api/api.js";


// * GET ADMIN ORDERS || GET || /api/order/admin/get-orders
export const getAdminOrders = createAsyncThunk(
	"order/getAdminOrders",
	async ({parPage, currentPage, searchValue}, {rejectWithValue, fulfillWithValue}) => {
		try {
			const {data} = await api.get(`/dashboard/order/admin/get-orders?currentPage=${currentPage || 1}&&parPage=${parPage || 5}&&searchValue=${searchValue}`, {
				withCredentials: true
			});
			return fulfillWithValue(data);
		} catch (e) {
			return rejectWithValue(e.response.data);
		}
	}
);


// * GET ADMIN ORDER DETAILS || GET || /api/order/admin/get-order-details/:orderId
export const getAdminOrderDetails = createAsyncThunk(
	"order/getAdminOrderDetails",
	async (orderId, {rejectWithValue, fulfillWithValue}) => {
		try {
			const {data} = await api.get(`/dashboard/order/admin/get-order-details/${orderId}`, {
				withCredentials: true
			});
			console.log(data);
			return fulfillWithValue(data);
		} catch (e) {
			console.log(e.response.data);
			return rejectWithValue(e.response.data);
		}
	}
);


export const orderReducer = createSlice({
	name: "order",
	initialState: {
		successMessage: "",
		errorMessage: "",
		loader: false,
		totalOrders: 0,
		order: {},
		orders: [],
		pagination: {}
	},
	reducers: {
		messageClear: (state) => {
			state.successMessage = "";
			state.errorMessage = "";
		}
	},
	extraReducers: builder => {
		// * GET ADMIN ORDERS
		builder.addCase(getAdminOrders.fulfilled, (state, {payload}) => {
			state.loader = false;
			state.orders = payload.payload.orders;
			state.pagination = payload.payload.pagination;
		});
		builder.addCase(getAdminOrders.rejected, (state, {payload}) => {
			state.loader = false;
			state.errorMessage = payload.message;
		});
		builder.addCase(getAdminOrders.pending, (state, {payload}) => {
			state.loader = true;
		});
		
		// 	 * GET ORDER DETAILS
		builder.addCase(getAdminOrderDetails.fulfilled, (state, {payload}) => {
			state.loader = false;
			state.order = payload.payload.order;
		});
		builder.addCase(getAdminOrderDetails.rejected, (state, {payload}) => {
			state.loader = false;
			state.errorMessage = payload.message;
		});
		builder.addCase(getAdminOrderDetails.pending, (state, {payload}) => {
			state.loader = true;
		});
		
	}
	
});


export const {messageClear} = orderReducer.actions;
export default orderReducer.reducer;