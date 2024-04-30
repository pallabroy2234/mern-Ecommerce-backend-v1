import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import api from "../../api/api.js";


// * ADD BANNER || POST || /api/dashboard/banner/add-banner
export const addBanner = createAsyncThunk("banner/addBanner", async (info, {rejectWithValue, fulfillWithValue}) => {
	try {
		const {data} = await api.post("/dashboard/banner/add-banner", info, {withCredentials: true});
		return fulfillWithValue(data);
	} catch (e) {
		return rejectWithValue(e.response.data);
	}
});

// * GET BANNER BY PRODUCT ID || GET || /api/dashboard/banner/get-banner/:productId
export const getBanner = createAsyncThunk("banner/getBanner", async (productId, {
	rejectWithValue,
	fulfillWithValue
}) => {
	try {
		const {data} = await api.get(`/dashboard/banner/get-banner/${productId}`, {withCredentials: true});
		return fulfillWithValue(data);
	} catch (e) {
		return rejectWithValue(e.response.data);
	}
});

// * DELETE BANNER BY PRODUCT Id and Banner Id || DELETE || /api/dashboard/banner/delete-banner

export const deleteBanner = createAsyncThunk("banner/deleteBanner", async (info, {
	rejectWithValue,
	fulfillWithValue
}) => {
	try {
		const {data} = await api.post(`/dashboard/banner/delete-banner`, info, {withCredentials: true});
		console.log(data);
		return fulfillWithValue(data);
	} catch (e) {
		return rejectWithValue(e.response.data);
	}
});

export const bannerReducer = createSlice({
	name: "banner", initialState: {
		successMessage: "",
		errorMessage: "",
		loader: false,
		deleteLoader: false,
		banners: [],
		banner: {}
	}, reducers: {
		messageClear: (state) => {
			state.successMessage = "";
			state.errorMessage = "";

			
		}
	}, extraReducers: builder => {
		//  * UPLOAD BANNER
		builder.addCase(addBanner.fulfilled, (state, {payload}) => {
			const banner = payload.payload;
			state.loader = false;
			state.successMessage = payload.message;
			state.banner = state.banner !== banner ? banner : state.banner;
		});
		builder.addCase(addBanner.pending, (state, _) => {
			state.loader = true;
		});
		builder.addCase(addBanner.rejected, (state, {payload}) => {
			state.loader = false;
			state.errorMessage = payload.message;
		});
		
		// 	* GET BANNER
		builder.addCase(getBanner.fulfilled, (state, {payload}) => {
			state.loader = false;
			state.banner = payload.payload.banner;
		});
		builder.addCase(getBanner.pending, (state, _) => {
			state.loader = true;
		});
		builder.addCase(getBanner.rejected, (state, {payload}) => {
			state.loader = false;
			state.errorMessage = payload.message;
		});
		
		// 	* DELETE BANNER
		builder.addCase(deleteBanner.fulfilled, (state, {payload}) => {
			state.deleteLoader = false;
			state.successMessage = payload.message;
			state.banner = {};
		});
		builder.addCase(deleteBanner.pending, (state, _) => {
			state.deleteLoader = true;
		});
		builder.addCase(deleteBanner.rejected, (state, {payload}) => {
			state.deleteLoader = false;
			state.errorMessage = payload.message;
		});
	}
	
});


export const {messageClear, stateClear} = bannerReducer.actions;
export default bannerReducer.reducer;