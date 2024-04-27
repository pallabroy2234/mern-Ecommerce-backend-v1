import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import api from "../../api/api.js";
import {jwtDecode} from "jwt-decode";


// export const logout = createAsyncThunk("auth/logout", async (_, {rejectWithValue, fulfillWithValue}) => {
// 	try {
// 		const {data} = await api.get("/logout", {withCredentials: true});
// 		localStorage.removeItem("accessToken");
// 		return fulfillWithValue(data);
// 	} catch (e) {
// 		return rejectWithValue(e.response.data);
// 	}
// });


export const dashboardReducer = createSlice({
	name: "dashboard", initialState: {
		successMessage: "",
		errorMessage: "",
		loader: false
	}, reducers: {
		messageClear: (state) => {
			state.successMessage = "";
			state.errorMessage = "";
		}
		
	}, extraReducers: builder => {
	}
});


export const {messageClear} = dashboardReducer.actions;
export default dashboardReducer.reducer;
