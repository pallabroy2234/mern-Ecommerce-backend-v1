import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import api from "../../api/api.js";


// * ADD BANNER
export const addBanner = createAsyncThunk(
	"banner/get_categories",
	async (info, {rejectWithValue, fulfillWithValue}) => {
		try {
			const {data} = await api.post("/dashboard/banner/add-banner", info, {withCredentials: true});
			console.log(data);
			return fulfillWithValue(data);
		} catch (e) {
			console.log(e.response.data);
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
		banners: []
	},
	reducers: {
		messageClear: (state) => {
			state.successMessage = "";
			state.errorMessage = "";
		}
	},
	extraReducers: builder => {
	
	}
	
});


export const {messageClear, stateClear} = bannerReducer.actions;
export default bannerReducer.reducer;