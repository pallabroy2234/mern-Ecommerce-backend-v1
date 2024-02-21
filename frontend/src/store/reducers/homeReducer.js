import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import api from "../../api/api.js";


export const getCategories = createAsyncThunk("home/getCategories",
    async (_, {rejectWithValue, fulfillWithValue}) => {
        try {
            const {data} = await api.get("/frontend/get-categories")
            console.log(data)
            return fulfillWithValue(data)
        } catch (e) {
            
            return rejectWithValue(e.response.data)
        }
    }
)

export const getHomePageProduct = createAsyncThunk("home/getHomePageProduct",
    async (_, {rejectWithValue, fulfillWithValue}) => {
        try {
            const {data} = await api.get("/frontend/get-homePageProduct")
            return fulfillWithValue(data)
        } catch (e) {
            
            return rejectWithValue(e.response.data)
        }
    }
)


export const homeReducer = createSlice({
    name: "home",
    initialState: {
        loading: false,
        errorMessage: "",
        successMessage: "",
        categories: [],
        featureProducts: [],
        latestProducts: [],
        topRatedProducts: [],
        discountProducts: [],
        
    },
    reducers: {},
    extraReducers: builder => {
        // ! getCategories
        builder.addCase(getCategories.fulfilled, (state, {payload}) => {
            state.categories = payload.payload
        });
        builder.addCase(getCategories.rejected, (state, {payload}) => {
            state.loading = false;
            state.errorMessage = payload.message
        });
        builder.addCase(getCategories.pending, (state, _) => {
            state.loading = true;
        });
        // !  getHomePageProduct
        builder.addCase(getHomePageProduct.fulfilled, (state, {payload}) => {
            state.featureProducts = payload.payload.featureProducts
            state.latestProducts = payload.payload.latestProducts
            state.topRatedProducts = payload.payload.topRatedProducts
            state.discountProducts = payload.payload.discountProducts
            state.loading = false;
        })
        builder.addCase(getHomePageProduct.rejected, (state, {payload}) => {
            state.loading = false;
            state.errorMessage = payload.message
        })
        builder.addCase(getHomePageProduct.pending, (state, _) => {
            state.loading = true;
        })
        
        
    }
})

export default homeReducer.reducer;