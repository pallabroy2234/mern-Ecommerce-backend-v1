import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import api from "../../api/api.js";
import {jwtDecode} from "jwt-decode";

// ! USER REGISTER

export const userRegister = createAsyncThunk("auth/userRegister", async (info, {rejectWithValue, fulfillWithValue}) => {
	try {
		const {data} = await api.post("frontend/user/user-register", info);
		// localStorage.setItem("userAuthorization", data.payload)
		return fulfillWithValue(data);
	} catch (e) {
		return rejectWithValue(e.response.data);
	}
});

//  ! USER LOGIN
export const userLogin = createAsyncThunk("auth/userLogin", async (info, {rejectWithValue, fulfillWithValue}) => {
	try {
		const {data} = await api.post("frontend/user/user-login", info);
		localStorage.setItem("userAuthorization", data.payload);
		return fulfillWithValue(data);
	} catch (e) {
		return rejectWithValue(e.response.data);
	}
});

// * LOGOUT API
export const logout = createAsyncThunk("auth/logout", async (_, {rejectWithValue, fulfillWithValue}) => {
	try {
		const {data} = await api.get("frontend/user/user-logout");
		localStorage.removeItem("userAuthorization");
		return fulfillWithValue(data);
	} catch (e) {
		return rejectWithValue(e.response.data);
	}
});

// * CHANGE PASSWORD || POST || /api/frontend/user/change-password

export const changePassword = createAsyncThunk("auth/changePassword", async (info, {rejectWithValue, fulfillWithValue}) => {
	try {
		const {data} = await api.post("frontend/user/change-password", info);
		console.log(data);
		return fulfillWithValue(data);
	} catch (e) {
		console.log(e.response.data);
		return rejectWithValue(e.response.data);
	}
});

// ! JWT DECODE TOKEN

const decodeToken = (token) => {
	if (token) {
		const userInfo = jwtDecode(token);
		return userInfo;
	} else {
		return "";
	}
};

export const authReducer = createSlice({
	name: "auth",
	initialState: {
		loader: false,
		userInfo: decodeToken(localStorage.getItem("userAuthorization")),
		successMessage: "",
		errorMessage: "",
		changePasswordSuccessMessage: "",
		changePasswordErrorMessage: "",
	},
	reducers: {
		messageClear: (state, _) => {
			state.successMessage = "";
			state.errorMessage = "";
			state.changePasswordSuccessMessage = "";
			state.changePasswordErrorMessage = "";
		},
		userReset: (state, _) => {
			state.userInfo = "";
		},
	},
	extraReducers: (builder) => {
		// ! USER REGISTER
		builder.addCase(userRegister.pending, (state, _) => {
			state.loader = true;
		});
		builder.addCase(userRegister.rejected, (state, {payload}) => {
			state.loader = false;
			state.errorMessage = payload.message;
		});
		builder.addCase(userRegister.fulfilled, (state, {payload}) => {
			state.loader = false;
			state.successMessage = payload.message;
		});

		//  ! USER LOGIN
		builder.addCase(userLogin.pending, (state, _) => {
			state.loader = true;
		});
		builder.addCase(userLogin.rejected, (state, {payload}) => {
			state.loader = false;
			state.errorMessage = payload.message;
		});
		builder.addCase(userLogin.fulfilled, (state, {payload}) => {
			const userInfo = decodeToken(payload.payload);
			state.loader = false;
			state.successMessage = payload.message;
			state.userInfo = userInfo;
		});
		// 	* USER LOGOUT
		builder.addCase(logout.fulfilled, (state, {payload}) => {
			state.loader = false;
			state.successMessage = payload.message;
		});
		builder.addCase(logout.rejected, (state, {payload}) => {
			state.loader = false;
			state.errorMessage = payload.message;
		});
		builder.addCase(logout.pending, (state, {payload}) => {
			state.loader = true;
		});
		// 	* CHANGE PASSWORD
		builder.addCase(changePassword.fulfilled, (state, {payload}) => {
			state.loader = false;
			state.changePasswordSuccessMessage = payload.message;
		});
		builder.addCase(changePassword.rejected, (state, {payload}) => {
			state.loader = false;
			state.changePasswordErrorMessage = payload.message;
		});
		builder.addCase(changePassword.pending, (state, {payload}) => {
			state.loader = true;
		});
	},
});

export const {messageClear, userReset} = authReducer.actions;
export default authReducer.reducer;
