import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import api from "../../api/api.js";

// * QUANTITY DECREMENT
export const quantityDecrement = createAsyncThunk("cart/quantityDecrement", async (cartId, {rejectWithValue, fulfillWithValue}) => {
	try {
		const {data} = await api.put(`frontend/product/`);
		return fulfillWithValue(data);
	} catch (e) {
		console.log(e.response.data);
		return rejectWithValue(e.response.data);
	}
});

export const orderReducer = createSlice({
	name: "order",
	initialState: {
		loader: false,
		errorMessage: "",
		successMessage: "",
		myOrders: [],
		myOrder: {},
	},
	reducers: {
		messageClear: (state, _) => {
			state.successMessage = "";
			state.errorMessage = "";
		},
	},
	extraReducers: (builder) => {},
});

export const {messageClear} = orderReducer.actions;
export default orderReducer.reducer;
