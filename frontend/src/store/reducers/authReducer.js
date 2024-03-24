import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import api from "../../api/api.js";


// ! USER REGISTER

export const userRegister = createAsyncThunk("auth/userRegister",
    async (info, {rejectWithValue, fulfillWithValue}) => {
        try {
            const {data} = await api.post("frontend/user/user-register", info)
            console.log(data)
            return fulfillWithValue(data)
        } catch (e) {
            return rejectWithValue(e.response.data)
        }
    }
)


export const authReducer = createSlice({
    name: "auth",
    initialState: {
        loader: false,
        userInfo: {},
        successMessage: "",
        errorMessage: "",
        
    },
    
    reducers: {
        messageClear: (state, _) => {
            state.successMessage = "";
            state.errorMessage = "";
        },
    },
    extraReducers: builder => {
    
    }
    
})


export const {messageClear} = authReducer.actions
export default authReducer.reducer;