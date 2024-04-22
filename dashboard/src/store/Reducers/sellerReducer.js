import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import api from "../../api/api.js";


// ! GET REQUEST SELLERS
export const get_request_sellers = createAsyncThunk(
	"sellers/get_request_sellers",
	async ({currentPage, parPage, searchValue}, {rejectWithValue, fulfillWithValue}) => {
		try {
			const {data} = await api.get(`/get-request-sellers?currentPage=${currentPage}&&searchValue=${searchValue}&&parPage=${parPage}`, {withCredentials: true});
			return fulfillWithValue(data);
		} catch (e) {
			return rejectWithValue(e.response.data);
		}
	}
);


// ! GET SELLER BY ID
export const get_sellerById = createAsyncThunk(
	"sellers/get_sellerById",
	async (sellerId, {rejectWithValue, fulfillWithValue}) => {
		try {
			const {data} = await api.get(`/get-sellerById/${sellerId}`, {withCredentials: true});
			return fulfillWithValue(data);
		} catch (e) {
			return rejectWithValue(e.response.data);
		}
	}
);

// ! UPDATE SELLER STATUS
export const update_sellerStatus = createAsyncThunk(
	"sellers/update_sellerStatus",
	async (info, {rejectWithValue, fulfillWithValue}) => {
		try {
			const {data} = await api.post("/update-sellerStatus", info, {withCredentials: true});
			return fulfillWithValue(data);
		} catch (e) {
			return rejectWithValue(e.response.data);
		}
	}
);


// * GET ACTIVE SELLERS
export const getActiveSellers = createAsyncThunk(
	"sellers/getActiveSellers",
	async ({currentPage, searchValue, parPage}, {rejectWithValue, fulfillWithValue}) => {
		try {
			const {data} = await api.get(`/get-active-sellers?currentPage=${currentPage || 1}&&searchValue=${searchValue || ""}&&parPage=${parPage || 5}`, {withCredentials: true});
			return fulfillWithValue(data);
		} catch (e) {
			return rejectWithValue(e.response.data);
		}
	}
);


// * GET DEACTIVE SELLERS
export const getDeActiveSellers = createAsyncThunk(
	"sellers/getDeActiveSellers",
	async ({currentPage, searchValue, parPage}, {rejectWithValue, fulfillWithValue}) => {
		try {
			const {data} = await api.get(`/get-deActive-sellers?currentPage=${currentPage || 1}&&searchValue=${searchValue || ""}&&parPage=${parPage || 5}`, {withCredentials: true});
			return fulfillWithValue(data);
		} catch (e) {
			return rejectWithValue(e.response.data);
		}
	}
);


// *  CONNECT STRIPE ACCOUNT

export const createStripeConnectAccount = createAsyncThunk(
	"sellers/createStripeConnectAccount",
	async () => {
		try {
			const {data} = await api.get("/payment/seller/connect-account", {
				withCredentials: true
			});
			window.location.href = data.payload.url;
			// return fulfillWithValue(data);
		} catch (e) {
			console.log(e.response.data);
			// return rejectWithValue(e.response.data);
		}
	}
);

// *
export const activeSellerStripeAccount = createAsyncThunk(
	"sellers/activeSellerStripeAccount",
	async (activeCode, {rejectWithValue, fulfillWithValue}) => {
		try {
			const {data} = await api.put(`/payment/seller/active-account/${activeCode}`, {}, {
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


export const sellerReducer = createSlice({
	name: "sellers",
	initialState: {
		successMessage: "",
		errorMessage: "",
		loader: false,
		stateChangeLoader: false,
		sellers: [],
		totalSellers: 0,
		seller: "" || {},
		activeSellers: [],
		deActiveSellers: [],
		pagination: {}
	},
	reducers: {
		messageClear: (state) => {
			state.successMessage = "";
			state.errorMessage = "";
		}
	},
	extraReducers: builder => {
		builder.addCase(get_request_sellers.fulfilled, (state, {payload}) => {
			state.sellers = payload?.payload?.sellers;
			state.totalSellers = payload?.payload?.totalSellers;
		});
		builder.addCase(get_request_sellers.pending, (state, _) => {
			state.loader = true;
		});
		builder.addCase(get_request_sellers.rejected, (state, {payload}) => {
			state.errorMessage = payload?.message;
			state.loader = false;
		});
		builder.addCase(get_sellerById.pending, (state, _) => {
			state.loader = true;
		});
		builder.addCase(get_sellerById.rejected, (state, {payload}) => {
			state.errorMessage = payload?.message;
			state.loader = false;
		});
		builder.addCase(get_sellerById.fulfilled, (state, {payload}) => {
			state.seller = payload.payload;
		});
		builder.addCase(update_sellerStatus.pending, (state, _) => {
			state.stateChangeLoader = true;
		});
		builder.addCase(update_sellerStatus.rejected, (state, {payload}) => {
			state.errorMessage = payload.message;
			state.stateChangeLoader = false;
		});
		builder.addCase(update_sellerStatus.fulfilled, (state, {payload}) => {
			state.successMessage = payload.message;
			state.stateChangeLoader = false;
			state.seller = payload.payload;
		});
		// 	* GET ACTIVE SELLERS
		builder.addCase(getActiveSellers.fulfilled, (state, {payload}) => {
			state.loader = false;
			state.activeSellers = payload.payload.sellers;
			state.pagination = payload.payload.pagination;
			state.successMessage = payload.message;
		});
		builder.addCase(getActiveSellers.pending, (state, _) => {
			state.loader = true;
		});
		builder.addCase(getActiveSellers.rejected, (state, {payload}) => {
			state.loader = false;
			state.errorMessage = payload.message;
		});
		
		// 	* GET DEACTIVE SELLERS
		builder.addCase(getDeActiveSellers.fulfilled, (state, {payload}) => {
			state.loader = false;
			state.deActiveSellers = payload.payload.sellers;
			state.pagination = payload.payload.pagination;
			state.successMessage = payload.message;
		});
		builder.addCase(getDeActiveSellers.pending, (state, _) => {
			state.loader = true;
		});
		builder.addCase(getDeActiveSellers.rejected, (state, {payload}) => {
			state.loader = false;
			state.errorMessage = payload.message;
		});
		builder.addCase(activeSellerStripeAccount.rejected, (state, {payload}) => {
			state.errorMessage = payload.message;
			state.loader = false;
		});
		builder.addCase(activeSellerStripeAccount.pending, (state, _) => {
			state.loader = true;
		});
		builder.addCase(activeSellerStripeAccount.fulfilled, (state, {payload}) => {
			state.loader = false;
			state.successMessage = payload.message;
		});
		
	}
	
});


export const {messageClear, stateClear} = sellerReducer.actions;
export default sellerReducer.reducer;