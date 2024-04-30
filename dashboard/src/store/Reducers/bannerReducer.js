import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import api from "../../api/api.js";


// * ADD BANNER
export const addBanner = createAsyncThunk(
	"banner/get_categories",
	async (info, {rejectWithValue, fulfillWithValue}) => {
		try {
			const {data} = await api.post("/dashboard/banner/add-banner", info, {withCredentials: true});
			return fulfillWithValue(data);
		} catch (e) {
			return rejectWithValue(e.response.data);
		}
	}
);


export const bannerReducer = createSlice({
	name: "banner",
	initialState: {
		successMessage: "",
		errorMessage: "",
		loader: false,
		banners: [],
		banner: {}
	},
	reducers: {
		messageClear: (state) => {
			state.successMessage = "";
			state.errorMessage = "";
		}
	},
	extraReducers: builder => {
		builder.addCase(addBanner.fulfilled, (state, {payload}) => {
			state.loader = false;
			state.successMessage = payload.message;
			state.banner = payload.payload || {};
		});
		builder.addCase(addBanner.pending, (state, _) => {
			state.loader = true;
		});
		builder.addCase(addBanner.rejected, (state, {payload}) => {
			state.loader = false;
			state.errorMessage = payload.message;
		});
	}
	
});


export const {messageClear, stateClear} = bannerReducer.actions;
export default bannerReducer.reducer;