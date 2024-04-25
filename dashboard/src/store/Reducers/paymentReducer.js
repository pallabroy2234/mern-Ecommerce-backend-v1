import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import api from "../../api/api.js";





// * GET SELLER PAYMENT DETAILS || GET || /api/payment/seller/get-payment-details
export const getSellerPaymentDetails = createAsyncThunk(
	"payment/getSellerPaymentDetails",
	async (_, {rejectWithValue, fulfillWithValue}) => {
		try {
			const {data} = await api.get("/api/payment/seller/get-payment-details",  {
				withCredentials: true,
			})
			return fulfillWithValue(data)
		} catch (e) {
			console.log(e.response.data)
			return rejectWithValue(e.response.data)
		}
	}
)

export const paymentReducer = createSlice({
	name: "payment",
	initialState: {
	
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


export const {messageClear,} = paymentReducer.actions;
export default paymentReducer.reducer;