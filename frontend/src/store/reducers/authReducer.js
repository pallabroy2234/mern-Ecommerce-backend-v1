import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import api from "../../api/api.js";


// ! USER REGISTER

export const userRegister = createAsyncThunk("auth/userRegister", async (info, {rejectWithValue, fulfillWithValue}) => {
    try {
        const {data} = await api.post("frontend/user/user-register", info)
        // localStorage.setItem("userAuthorization", data.payload)
        return fulfillWithValue(data)
    } catch (e) {
        return rejectWithValue(e.response.data)
    }
})


//  ! USER LOGIN
export const userLogin = createAsyncThunk("auth/userLogin", async (info, {rejectWithValue, fulfillWithValue}) => {
    try {
        const {data} = await api.post("frontend/user/user-login", info)
        localStorage.setItem("userAuthorization", data.payload)
        return fulfillWithValue(data)
    } catch (e) {
        return rejectWithValue(e.response.data)
    }
})

export const authReducer = createSlice({
    name: "auth", initialState: {
        loader: false, userInfo: {}, successMessage: "", errorMessage: "",
    }, reducers: {
        messageClear: (state, _) => {
            state.successMessage = "";
            state.errorMessage = "";
        },
    }, extraReducers: builder => {
        // ! USER REGISTER
        builder.addCase(userRegister.pending, (state, _) => {
            state.loader = true
        });
        builder.addCase(userRegister.rejected, (state, {payload}) => {
            state.loader = false;
            state.errorMessage = payload.message
        });
        builder.addCase(userRegister.fulfilled, (state, {payload}) => {
            state.loader = false;
            state.successMessage = payload.message
        });
        
        //  ! USER LOGIN
        builder.addCase(userLogin.pending, (state, _) => {
            state.loader = true
        });
        builder.addCase(userLogin.rejected, (state, {payload}) => {
            state.loader = false;
            state.errorMessage = payload.message
        });
        builder.addCase(userLogin.fulfilled, (state, {payload}) => {
            state.loader = false;
            state.successMessage = payload.message
        })
    }
    
})


export const {messageClear} = authReducer.actions
export default authReducer.reducer;