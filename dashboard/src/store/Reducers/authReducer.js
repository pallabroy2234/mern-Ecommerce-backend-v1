import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import api from "../../api/api.js";
import {jwtDecode} from "jwt-decode";


export const admin_login = createAsyncThunk("auth/admin_login", async (info, {rejectWithValue, fulfillWithValue}) => {
	try {
		const {data} = await api.post("/admin-login", info, {withCredentials: true});
		localStorage.setItem("accessToken", data.payload);
		return fulfillWithValue(data);
	} catch (e) {
		return rejectWithValue(e.response.data);
	}
});

// ! seller register
export const seller_register = createAsyncThunk("auth/seller_register", async (info, {
	rejectWithValue,
	fulfillWithValue
}) => {
	try {
		const {data} = await api.post("/seller-register", info, {withCredentials: true});
		localStorage.setItem("accessToken", data.payload);
		return fulfillWithValue(data);
	} catch (e) {
		return rejectWithValue(e.response.data);
	}
});


// ! get  admin and seller info
export const get_user_info = createAsyncThunk("auth/get_user_info", async (_, {rejectWithValue, fulfillWithValue}) => {
	try {
		const {data} = await api.get("/get-user", {withCredentials: true});
		return fulfillWithValue(data);
	} catch (e) {
		return rejectWithValue(e.response.data);
	}
});

// ! seller login
export const seller_login = createAsyncThunk("auth/seller_login", async (info, {rejectWithValue, fulfillWithValue}) => {
	try {
		const {data} = await api.post("/seller-login", info, {withCredentials: true});
		localStorage.setItem("accessToken", data.payload);
		return fulfillWithValue(data);
	} catch (e) {
		return rejectWithValue(e.response.data);
	}
});


// ! Profile Image Upload

export const profile_image_upload = createAsyncThunk("auth/profile_image_upload", async (image, {
	rejectWithValue,
	fulfillWithValue
}) => {
	try {
		const {data} = await api.post("/profile-image-upload", image, {withCredentials: true});
		return fulfillWithValue(data);
	} catch (e) {
		return rejectWithValue(e.response.data);
	}
});


// ! Update Seller Profile info

export const profile_info_add = createAsyncThunk("auth/profile_info_add", async (info, {
	rejectWithValue,
	fulfillWithValue
}) => {
	try {
		const {data} = await api.post("/profile-info-add", info, {withCredentials: true});
		return fulfillWithValue(data);
	} catch (e) {
		return rejectWithValue(e.response.data);
	}
});


// ! decoded token

const returnRole = (token) => {
	if (token) {
		const decodedToken = jwtDecode(token);
		const expireTime = new Date(decodedToken.exp * 1000);
		if (new Date() >= expireTime) {
			localStorage.removeItem("accessToken");
			return "";
		} else {
			return decodedToken.role;
		}
	} else {
		return "";
	}
};


// * Logout API
export const logout = createAsyncThunk("auth/logout", async (_, {rejectWithValue, fulfillWithValue}) => {
	try {
		const {data} = await api.get("/logout", {withCredentials: true});
		localStorage.removeItem("accessToken");
		return fulfillWithValue(data);
	} catch (e) {
		return rejectWithValue(e.response.data);
	}
});


export const authReducer = createSlice({
	name: "auth", initialState: {
		successMessage: "",
		errorMessage: "",
		loader: false,
		userInfo: "",
		logoutMessage: "",
		logoutError : "",
		role: returnRole(localStorage.getItem("accessToken")),
		token: localStorage.getItem("accessToken")
	}, reducers: {
		messageClear: (state) => {
			state.successMessage = "";
			state.errorMessage = "";
			state.logoutMessage = "";
			state.logoutError = "";
		}
		
	}, extraReducers: builder => {
		
		builder.addCase(admin_login.pending, (state, _) => {
			state.loader = true;
		});
		builder.addCase(admin_login.rejected, (state, {payload}) => {
			state.loader = false;
			state.errorMessage = payload.message;
		});
		builder.addCase(admin_login.fulfilled, (state, {payload}) => {
			state.loader = false;
			state.successMessage = payload.message;
			state.token = payload.payload;
			state.role = returnRole(payload.payload);
			
		});
		builder.addCase(seller_register.rejected, (state, {payload}) => {
			state.loader = false;
			state.errorMessage = payload.message;
		});
		builder.addCase(seller_register.fulfilled, (state, {payload}) => {
			state.loader = false;
			state.successMessage = payload.message;
		});
		builder.addCase(seller_login.pending, (state, _) => {
			state.loader = true;
		});
		builder.addCase(seller_login.rejected, (state, {payload}) => {
			state.loader = false;
			state.errorMessage = payload.message;
		});
		builder.addCase(seller_login.fulfilled, (state, {payload}) => {
			state.loader = false;
			state.successMessage = payload.message;
			state.token = payload.payload;
			state.role = returnRole(payload.payload);
		});
		builder.addCase(get_user_info.fulfilled, (state, {payload}) => {
			state.loader = false;
			state.userInfo = payload.payload;
		});
		builder.addCase(profile_image_upload.pending, (state, _) => {
			state.loader = true;
		});
		builder.addCase(profile_image_upload.rejected, (state, {payload}) => {
			state.loader = false;
			state.errorMessage = payload.message;
		});
		builder.addCase(profile_image_upload.fulfilled, (state, {payload}) => {
			state.loader = false;
			state.successMessage = payload.message;
			state.userInfo = payload.payload;
		});
		builder.addCase(profile_info_add.pending, (state, _) => {
			state.loader = true;
		});
		builder.addCase(profile_info_add.rejected, (state, {payload}) => {
			state.loader = false;
			state.errorMessage = payload.message;
		});
		builder.addCase(profile_info_add.fulfilled, (state, {payload}) => {
			state.loader = false;
			state.successMessage = payload.message;
			state.userInfo = payload.payload;
		});
		//     * Logout
		builder.addCase(logout.fulfilled, (state, {payload}) => {
			state.loader = false;
			state.logoutMessage = payload.message;
		});
		builder.addCase(logout.rejected, (state, {payload}) => {
			state.loader = false;
			state.logoutError = payload.message;
		});
		builder.addCase(logout.pending, (state, _) => {
			state.loader = true;
		});
	}
});


export const {messageClear} = authReducer.actions;
export default authReducer.reducer;
