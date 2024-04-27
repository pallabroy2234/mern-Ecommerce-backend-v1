import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import api from "../../api/api.js";


// * GET SELLER DASHBOARD DATA || GET || /api/dashboard/seller/get-seller-dashboard-data
export const getSellerDashboardData = createAsyncThunk(
	"dashboard/getSellerDashboardData",
	async (_, {rejectWithValue, fulfillWithValue}) => {
		try {
			const {data} = await api.get("/dashboard/seller/get-seller-dashboard-data", {withCredentials: true});
			return fulfillWithValue(data);
		} catch (e) {
			return rejectWithValue(e.response.data);
		}
	});

// * GET ADMIN DASHBOARD DATA  || GET || /api/dashboard/admin/get-admin-dashboard-data
export const getAdminDashboardData = createAsyncThunk(
	"dashboard/getAdminDashboardData",
	async (_, {rejectWithValue, fulfillWithValue}) => {
		try {
			const {data} = await api.get("/dashboard/admin/get-admin-dashboard-data", {withCredentials: true});
			return fulfillWithValue(data);
		} catch (e) {
			return rejectWithValue(e.response.data);
		}
	});

export const dashboardReducer = createSlice({
	name: "dashboard", initialState: {
		successMessage: "",
		errorMessage: "",
		loader: false,
		totalSales: 0,
		totalOrders: 0,
		totalProducts: 0,
		totalPendingOrders: 0,
		totalSellers: 0,
		recentOrders: [],
		recentMessages: []
	}, reducers: {
		messageClear: (state) => {
			state.successMessage = "";
			state.errorMessage = "";
		}
		
	}, extraReducers: builder => {
	}
});


export const {messageClear} = dashboardReducer.actions;
export default dashboardReducer.reducer;
