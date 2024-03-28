import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import api from "../../api/api.js";

export const placeOrder = createAsyncThunk("order/placeOrder", async ({price, products, shippingFee, shippingInfo, userId, navigate, items}, {rejectWithValue, fulfillWithValue}) => {
	try {
		const {data} = await api.post(`frontend/product/order/place-order`, {
			price,
			products,
			shippingFee,
			shippingInfo,
			userId,
			navigate,
			items,
		});
		console.log(data);
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
