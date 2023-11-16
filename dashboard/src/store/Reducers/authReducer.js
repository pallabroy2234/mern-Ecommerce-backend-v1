import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";


export const admin_login = createAsyncThunk(
    "auth/admin_login",
    async (info) => {
        console.log(info)
        try {
            
            // const {data} = await api.post("/admin/login", info, {withCredentials: true})
            // console.log(data)
            
        } catch (e) {
            console.log(e)
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
    extraReducers: {},
});

export default authReducer.reducer;
