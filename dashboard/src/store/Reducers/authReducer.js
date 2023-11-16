import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import api from "../../api/api.js";


export const admin_login = createAsyncThunk("auth/admin_login", async (info, {rejectWithValue, fulfillWithValue}) => {
    try {
        const {data} = await api.post("/admin-login", info, {withCredentials: true})
        localStorage.setItem("accessToken", data.payload)
        return fulfillWithValue(data)
    } catch (e) {
        return rejectWithValue(e.response.data)
    }
})

export const authReducer = createSlice({
    name: "auth", initialState: {
        successMessage: "", errorMessage: "", loader: false, userInfo: "",
    }, reducers: {
        messageClear: (state) => {
            state.successMessage = "";
            state.errorMessage = "";
        },
        
    }, extraReducers: builder => {
        builder.addCase(admin_login.pending, (state) => {
            state.loader = true;
        });
        builder.addCase(admin_login.rejected, (state, {payload}) => {
            state.loader = false;
            state.errorMessage = payload.message;
        });
        builder.addCase(admin_login.fulfilled, (state, {payload}) => {
            state.loader = false;
            state.successMessage = payload.message;
        });
    },
});


export const {messageClear} = authReducer.actions;
export default authReducer.reducer;
