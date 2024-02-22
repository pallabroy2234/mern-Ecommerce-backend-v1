import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import api from "../../api/api.js";



//  ! getCategories
export const getCategories = createAsyncThunk("home/getCategories",
    async (_, {rejectWithValue, fulfillWithValue}) => {
        try {
            const {data} = await api.get("/frontend/get-categories")
            return fulfillWithValue(data)
        } catch (e) {
            
            return rejectWithValue(e.response.data)
        }
    }
)


//  ! GET FEATURE PRODUCTS

export const getFeatureProducts = createAsyncThunk("home/getFeatureProducts",
    async (_, {rejectWithValue, fulfillWithValue}) => {
        try {
            const {data} = await api.get("/frontend/get-featureProducts")
            return fulfillWithValue(data)
        } catch (e) {
            
            return rejectWithValue(e.response.data)
        }
    }
)


// ! getHomePageProduct
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


//  ! price range and latest Product
export const getPriceRangeLatestProduct = createAsyncThunk("home/getPriceRangeLatestProduct",
    async (_, {rejectWithValue, fulfillWithValue}) => {
        try {
            const {data} = await api.get("/frontend/get-priceRange-latestProduct")
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
        // ! GET FEATURE PRODUCTS
        builder.addCase(getFeatureProducts.fulfilled, (state,{payload})=> {
            state.featureProducts = payload.payload
            state.loading = false;
        });
        builder.addCase(getFeatureProducts.rejected, (state, {payload}) => {
            state.loading = false;
            state.errorMessage = payload.message
        });
        builder.addCase(getFeatureProducts.pending, (state, _) => {
            state.loading = true;
        });
        
        
        // !  getHomePageProduct
        builder.addCase(getHomePageProduct.fulfilled, (state, {payload}) => {
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