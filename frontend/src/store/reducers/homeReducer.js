import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import api from "../../api/api.js";


export const getCategories = createAsyncThunk("home/getCategories",
    async (_, {rejectWithValue, fulfillWithValue}) => {
        try {
            const {data} =await api.get("/get-categories")
            console.log(data , "getCategories")
            return fulfillWithValue(data)
        } catch (e) {
            console.log(e.response.data , "getCategories")
         return rejectWithValue(e.response.data)
        }
    }
)


export const homeReducer = createSlice({
    name: "home",
    initialState: {
        categories: [],
        
    },
    reducers: {},
    extraReducers: builder => {
    
    }
})

export default homeReducer.reducer;