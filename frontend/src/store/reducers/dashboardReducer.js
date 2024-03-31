import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import api from "../../api/api.js";

export const getRecentOrders = createAsyncThunk("dashboard/getRecentOrders", async (userId, {rejectWithValue, fulfillWithValue}) => {
	try {
		const {data} = await api.get(`/frontend/product/order/get-recentOrders/${userId}`);
		return fulfillWithValue(data);
	} catch (e) {
		return rejectWithValue(e.response.data);
	}
});

export const dashboardReducer = createSlice({
	name: "dashboard",
	initialState: {
		loading: false,
		recentOrders: [],
		totalOrders: 0,
		pendingOrders: 0,
		cancelledOrders: 0,
		errorMessage: "",
		successMessage: "",
	},
	reducers: {
		messageClear: (state, _) => {
			state.successMessage = "";
			state.errorMessage = "";
		},
	},
	extraReducers: (builder) => {
		builder.addCase(getRecentOrders.pending, (state, _) => {
			state.loader = true;
		});
		builder.addCase(getRecentOrders.fulfilled, (state, {payload}) => {
			state.loader = false;
			state.recentOrders = payload.payload.recentOrders;
			state.totalOrders = payload.payload.totalOrders;
			state.pendingOrders = payload.payload.pendingOrders;
			state.cancelledOrders = payload.payload.cancelledOrders;
			state.successMessage = payload.message;
		});
		builder.addCase(getRecentOrders.rejected, (state, {payload}) => {
			state.loader = false;
			state.errorMessage = payload.message;
		});
	},
});

export const {messageClear} = dashboardReducer.actions;
export default dashboardReducer.reducer;
