import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import api from "../../api/api.js";


//
// export const add_product = createAsyncThunk(
// 	"product/add_product",
// 	async (info, {rejectWithValue, fulfillWithValue}) => {
// 		try {
// 			const {data} = await api.post("/add_product", info, {
// 				withCredentials: true,
// 				headers: {"Content-Type": "multipart/form-data"}
// 			})
// 			return fulfillWithValue(data)
// 		} catch (e) {
// 			console.log(e.response.data)
// 			return rejectWithValue(e.response.data)
// 		}
// 	}
// )


export const orderReducer = createSlice({
	name: "order",
	initialState: {
		successMessage: "",
		errorMessage: "",
		loader: false,
		
	},
	reducers: {
		messageClear: (state) => {
			state.successMessage = "";
			state.errorMessage = "";
		},
		
	},
	extraReducers: builder => {
	
	}
	
})


export const {messageClear,} = orderReducer.actions;
export default orderReducer.reducer;