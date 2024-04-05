import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import api from "../../api/api.js";

// export const removeWishlist = createAsyncThunk("cart/removeWishlist", async (wishlistId, {rejectWithValue, fulfillWithValue}) => {
// 	try {
// 		const {data} = await api.delete(`frontend/product/remove-wishlist/${wishlistId}`);
// 		console.log(data);
// 		return fulfillWithValue(data);
// 	} catch (e) {
// 		console.log(e.response.data());
// 		return rejectWithValue(e.response.data);
// 	}
// });
export const chatReducer = createSlice({
	name: "chat",
	initialState: {
		myFriends: [],
		friendMessages: [],
		currentFriend: {},
		successMessage: "",
		errorMessage: "",
	},
	reducers: {
		messageClear: (state, _) => {
			state.successMessage = "";
			state.errorMessage = "";
		},
	},
	extraReducers: (builder) => {},
});

export const {messageClear} = chatReducer.actions;
export default chatReducer.reducer;
