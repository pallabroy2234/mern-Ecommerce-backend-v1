import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import api from "../../api/api.js";
import toast from "react-hot-toast";


export const admin_login = createAsyncThunk(
    "auth/admin_login",
    async (info) => {
        console.log(info)
        try {
            const {data} = await api.post("/admin-login", info, {withCredentials: true})
            if (data.success === true) {
                toast.success(data.message)
            }
        } catch (e) {
            toast.error(e.response.data.message)
        }
    }
)

export const authReducer = createSlice({
    name: "auth",
    initialState: {
        successMessage: "",
        errorMessage: "",
        loader: false,
        userInfo: "",
    },
    reducers: {},
    extraReducers: builder => {
    
    },
});

export default authReducer.reducer;
