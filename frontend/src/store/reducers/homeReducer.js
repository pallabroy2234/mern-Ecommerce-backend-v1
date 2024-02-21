import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import api from "../../api/api.js";


export const getCategories = createAsyncThunk("home/getCategories",
    async (_, {rejectWithValue, fulfillWithValue}) => {
        try {
            const {data} = await api.get("/frontend/get-categories")
            console.log(data, "getCategories")
            return fulfillWithValue(data)
        } catch (e) {
            console.log(e.response.data, "getCategories")
            return rejectWithValue(e.response.data)
        }
    }
)


export const homeReducer = createSlice({
    name: "home",
    initialState: {
        loader: false,
        errorMessage: "",
        categories: [],
        
    },
    reducers: {},
    extraReducers: builder => {
        builder.addCase(getCategories.fulfilled, (state, {payload}) => {
            state.categories = payload.payload
        });
        builder.addCase(getCategories.rejected, (state, {payload}) => {
            state.loader = false;
            state.errorMessage = payload.message
        });
        builder.addCase(getCategories.pending, (state,_)=>{
            state.loader = true;
        })
    }
})

export default homeReducer.reducer;