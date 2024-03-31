import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import api from "../../api/api.js";

export const getOrders = createAsyncThunk("dashboard/getOrders", async (userId, {rejectWithValue, fulfilledWithValue}) => {
	try {
		console.log(userId);
		const {data} = await api.get(`/frontend/product/order/get-orders/${userId}`);
		return fulfilledWithValue(data);
	} catch (error) {
		return rejectWithValue(error.response.data);
	}
});

export const dashboardReducer = createSlice({
	name: "dashboard",
	initialState: {
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
	extraReducers: (builder) => {},
});

export const {messageClear} = dashboardReducer.actions;
export default dashboardReducer.reducer;
