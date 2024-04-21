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

// * GET SELLER ORDERS || GET || /api/order/seller/get-orders
export const getSellerOrders = createAsyncThunk(
	"order/getSellerOrders",
	async ({parPage, currentPage, searchValue}, {rejectWithValue, fulfillWithValue}) => {
		try {
			const {data} = await api.get(`/dashboard/order/seller/get-orders?currentPage=${currentPage || 1}&&parPage=${parPage || 5}&&searchValue=${searchValue || ""}`, {
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
			return fulfillWithValue(data);
		} catch (e) {
			console.log(e.response.data);
			return rejectWithValue(e.response.data);
		}
	}
);


//  * GET SELLER ORDER DETAILS || GET || /api/order/seller/get-order-details/:orderId
export const getSellerOrderDetails = createAsyncThunk(
	"order/getSellerOrderDetails",
	async (orderId, {rejectWithValue, fulfillWithValue}) => {
		try {
			const {data} = await api.get(`/dashboard/order/seller/get-order-details/${orderId}`, {
				withCredentials: true
			});
			return fulfillWithValue(data);
		} catch (e) {
			console.log(e.response.data);
			return rejectWithValue(e.response.data);
		}
	}
);


// * UPDATE ADMIN ORDER STATUS || PUT || /api/order/admin/update-order-status/:orderId
export const updateAdminOrderStatus = createAsyncThunk(
	"order/updateAdminOrderStatus",
	async ({orderId, info}, {rejectWithValue, fulfillWithValue}) => {
		try {
			const {data} = await api.put(`/dashboard/order/admin/update-order-status/${orderId}`, info, {
				withCredentials: true
			});
			return fulfillWithValue(data);
		} catch (e) {
			return rejectWithValue(e.response.data);
		}
	}
);

// * UPDATE SELLER ORDER STATUS || PUT || /api/order/seller/update-order-status/:orderId
export const updateSellerOrderStatus = createAsyncThunk(
	"order/updateSellerOrderStatus",
	async ({orderId, info}, {rejectWithValue, fulfillWithValue}) => {
		try {
			const {data} = await api.put(`/dashboard/order/seller/update-order-status/${orderId}`, info, {
				withCredentials: true
			});
			return fulfillWithValue(data);
		} catch (e) {
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
		
		// 	 * GET ADMIN ORDER DETAILS
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
		// 	* UPDATE ADMIN ORDER STATUS
		builder.addCase(updateAdminOrderStatus.fulfilled, (state, {payload}) => {
			state.loader = false;
			state.successMessage = payload.message;
		});
		builder.addCase(updateAdminOrderStatus.rejected, (state, {payload}) => {
			state.loader = false;
			state.errorMessage = payload.message;
		});
		builder.addCase(updateAdminOrderStatus.pending, (state, _) => {
			state.loader = true;
		});
		
		// 	* GET SELLER ORDER
		builder.addCase(getSellerOrders.fulfilled, (state, {payload}) => {
			state.orders = payload.payload.orders;
			state.pagination = payload.payload.pagination;
			state.loader = false;
		});
		builder.addCase(getSellerOrders.rejected, (state, {payload}) => {
			state.errorMessage = payload.message;
			state.loader = false;
		});
		builder.addCase(getSellerOrders.pending, (state, _) => {
			state.loader = true;
		});
		
		// 	* GET SELLER ORDER DETAILS
		builder.addCase(getSellerOrderDetails.fulfilled, (state, {payload}) => {
			state.loader = false;
			state.order = payload.payload.order;
		});
		builder.addCase(getSellerOrderDetails.rejected, (state, {payload}) => {
			state.loader = false;
			state.errorMessage = payload.message;
		});
		builder.addCase(getSellerOrderDetails.pending, (state, {payload}) => {
			state.loader = true;
		});
		
		// 	* UPDATE SELLER ORDER STATUS
		builder.addCase(updateSellerOrderStatus.fulfilled, (state, {payload}) => {
			state.loader = false;
			state.successMessage = payload.message
		
		});
		builder.addCase(updateSellerOrderStatus.rejected, (state, {payload}) => {
			state.loader = false;
			state.errorMessage = payload.message;
		});
		builder.addCase(updateSellerOrderStatus.pending, (state, _) => {
			state.loader = true;
		});
		
	}
	
});


export const {messageClear} = orderReducer.actions;
export default orderReducer.reducer;