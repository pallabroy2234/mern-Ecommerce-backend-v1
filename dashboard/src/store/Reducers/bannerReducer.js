import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import api from "../../api/api.js";


// export const get_categories = createAsyncThunk(
// 	"category/get_categories",
// 	async ({parPage, page, searchValue}, {rejectWithValue, fulfillWithValue}) => {
// 		try {
//
// 			const {data} = await api.get(`/get-categories?page=${page}&&searchValue=${searchValue}&&parPage=${parPage}`, {withCredentials: true})
// 			return fulfillWithValue(data)
//
// 		} catch (e) {
// 			console.log(e.response.data)
// 			return rejectWithValue(e.response.data)
// 		}
// 	}
// )


export const bannerReducer = createSlice({
	name: "banners",
	initialState: {
		successMessage: "",
		errorMessage: "",
		loader: false,
		banners: [],
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